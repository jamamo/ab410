"""Provision Firebase Auth, web config, and Firestore rules for AB-410 Academy."""

from __future__ import annotations

import argparse
import json
import re
import time
from pathlib import Path
from typing import Any

from google.auth.transport.requests import AuthorizedSession
from google.oauth2 import service_account


PROJECT_ID = "ab410-6ef04"
SCOPES = [
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/firebase",
]


class SetupError(RuntimeError):
    pass


def request_json(
    session: AuthorizedSession,
    method: str,
    url: str,
    *,
    expected: tuple[int, ...] = (200,),
    **kwargs: Any,
) -> tuple[int, dict[str, Any]]:
    response = session.request(method, url, timeout=(10, 35), **kwargs)
    try:
        payload = response.json() if response.content else {}
    except ValueError:
        payload = {"raw": response.text[:500]}
    if response.status_code not in expected:
        message = payload.get("error", {}).get("message") or payload
        raise SetupError(f"{method} {url} returned {response.status_code}: {message}")
    return response.status_code, payload


def wait_operation(
    session: AuthorizedSession,
    operation: dict[str, Any],
    base_url: str,
    *,
    attempts: int = 30,
) -> dict[str, Any]:
    if operation.get("done"):
        if operation.get("error"):
            raise SetupError(str(operation["error"]))
        return operation.get("response", operation)

    name = operation.get("name")
    if not name:
        return operation

    for _ in range(attempts):
        _, current = request_json(session, "GET", f"{base_url}/{name}")
        if current.get("done"):
            if current.get("error"):
                raise SetupError(str(current["error"]))
            return current.get("response", current)
        time.sleep(2)
    raise SetupError(f"Operation did not finish: {name}")


def ensure_web_app(session: AuthorizedSession) -> dict[str, Any]:
    url = f"https://firebase.googleapis.com/v1beta1/projects/{PROJECT_ID}/webApps"
    _, payload = request_json(session, "GET", url)
    apps = payload.get("apps", [])
    if not apps:
        print("Creating Firebase web app...", flush=True)
        _, operation = request_json(
            session,
            "POST",
            url,
            expected=(200, 201),
            json={"displayName": "AB-410 Academy"},
        )
        wait_operation(session, operation, "https://firebase.googleapis.com/v1beta1")
        _, payload = request_json(session, "GET", url)
        apps = payload.get("apps", [])
    if not apps:
        raise SetupError("Firebase web app creation completed but no app was returned.")
    return apps[0]


def get_web_config(session: AuthorizedSession, app: dict[str, Any]) -> dict[str, Any]:
    name = app.get("name")
    if not name:
        raise SetupError("Firebase web app has no resource name.")
    _, config = request_json(
        session,
        "GET",
        f"https://firebase.googleapis.com/v1beta1/{name}/config",
    )
    required = ["apiKey", "appId", "projectId", "messagingSenderId"]
    missing = [key for key in required if not config.get(key)]
    if missing:
        raise SetupError("Web configuration is missing: " + ", ".join(missing))
    return config


def ensure_auth(session: AuthorizedSession) -> None:
    config_url = (
        "https://identitytoolkit.googleapis.com/admin/v2/"
        f"projects/{PROJECT_ID}/config"
    )
    response = session.get(config_url, timeout=(10, 35))
    if response.status_code == 404:
        print("Initializing Firebase Authentication...", flush=True)
        _, operation = request_json(
            session,
            "POST",
            "https://identitytoolkit.googleapis.com/v2/"
            f"projects/{PROJECT_ID}/identityPlatform:initializeAuth",
            expected=(200, 201),
            json={},
        )
        wait_operation(
            session,
            operation,
            "https://identitytoolkit.googleapis.com/v2",
        )
    elif response.status_code != 200:
        raise SetupError(
            f"Authentication config returned {response.status_code}: "
            f"{response.text[:500]}"
        )

    _, current = request_json(session, "GET", config_url)
    domains = set(current.get("authorizedDomains", []))
    domains.update(
        {
            "localhost",
            "ab410-6ef04.firebaseapp.com",
            "ab410-6ef04.web.app",
            "jamamo.github.io",
        }
    )
    update_mask = (
        "signIn.email.enabled,"
        "signIn.email.passwordRequired,"
        "authorizedDomains"
    )
    request_json(
        session,
        "PATCH",
        config_url,
        expected=(200,),
        params={"updateMask": update_mask},
        json={
            "signIn": {
                "email": {
                    "enabled": True,
                    "passwordRequired": True,
                }
            },
            "authorizedDomains": sorted(domains),
        },
    )
    print("Email/password authentication enabled.", flush=True)


def deploy_rules(session: AuthorizedSession, rules_path: Path) -> None:
    content = rules_path.read_text(encoding="utf-8")
    _, ruleset = request_json(
        session,
        "POST",
        f"https://firebaserules.googleapis.com/v1/projects/{PROJECT_ID}/rulesets",
        expected=(200, 201),
        json={
            "source": {
                "files": [
                    {
                        "name": "firestore.rules",
                        "content": content,
                    }
                ]
            }
        },
    )
    ruleset_name = ruleset.get("name")
    if not ruleset_name:
        raise SetupError("Rules API did not return a ruleset name.")

    release_name = f"projects/{PROJECT_ID}/releases/cloud.firestore"
    release = {
        "name": release_name,
        "rulesetName": ruleset_name,
    }
    try:
        request_json(
            session,
            "POST",
            f"https://firebaserules.googleapis.com/v1/projects/{PROJECT_ID}/releases",
            expected=(200, 201),
            json=release,
        )
    except SetupError as error:
        if "returned 403" not in str(error):
            raise
        request_json(
            session,
            "PATCH",
            f"https://firebaserules.googleapis.com/v1/{release_name}",
            expected=(200,),
            json={
                "release": release,
                "updateMask": "rulesetName",
            },
        )
    print("Firestore security rules deployed.", flush=True)


def write_web_config(config: dict[str, Any], target: Path) -> None:
    browser_config = {
        "apiKey": config["apiKey"],
        "authDomain": config.get(
            "authDomain",
            f"{PROJECT_ID}.firebaseapp.com",
        ),
        "projectId": config.get("projectId", PROJECT_ID),
        "storageBucket": config.get(
            "storageBucket",
            f"{PROJECT_ID}.firebasestorage.app",
        ),
        "messagingSenderId": config["messagingSenderId"],
        "appId": config["appId"],
    }
    config_json = json.dumps(browser_config, indent=2)
    template = f"""import {{ initializeApp }} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {{
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
}} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {{
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc
}} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {config_json};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export {{
  auth,
  collection,
  createUserWithEmailAndPassword,
  db,
  deleteUser,
  doc,
  getDoc,
  getDocs,
  onAuthStateChanged,
  sendPasswordResetEmail,
  serverTimestamp,
  setDoc,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
}};
"""
    target.write_text(template, encoding="utf-8", newline="\n")
    print("Public Firebase web configuration written.", flush=True)

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "service_account",
        type=Path,
        help="Path to the Firebase Admin service-account JSON file.",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=Path(__file__).resolve().parents[1],
        help="AB-410 platform root.",
    )
    args = parser.parse_args()

    credentials = service_account.Credentials.from_service_account_file(
        str(args.service_account),
        scopes=SCOPES,
    )
    session = AuthorizedSession(credentials)
    root = args.root.resolve()

    app = ensure_web_app(session)
    config = get_web_config(session, app)
    ensure_auth(session)
    deploy_rules(session, root / "firestore.rules")
    write_web_config(config, root / "js" / "firebase-setup.js")
    print("Firebase provisioning complete.", flush=True)


if __name__ == "__main__":
    main()
