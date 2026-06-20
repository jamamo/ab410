# AB-410 Academy

A focused teaching and exam-preparation platform for Microsoft AB-410: Building Intelligent Applications.

## Learning experience

- Exam-readiness dashboard and next-best-study logic.
- Healthcare and civil-engineering lenses across concepts, scenarios, and labs.
- Full course map derived from the definitive learning material.
- Twelve cumulative labs, mastery checks, scenario practice, repair queue, and exam playbook.
- Firebase email/password accounts for Jama and Ismail.
- Private per-learner progress, cross-device sync, study streaks, and a shared summary dashboard.

## Run locally

From this folder:

    python -m http.server 8000

Open http://localhost:8000.

## Firebase provisioning

The Firebase Admin service-account key is used only for one-time local provisioning. It must never be copied into this folder or committed.

    python scripts/configure_firebase.py "C:\path\to\firebase-adminsdk.json"

The script creates or finds the Firebase web app, enables email/password authentication, authorizes localhost and GitHub Pages, deploys firestore.rules, and writes only the public web configuration to js/firebase-setup.js.

After provisioning, use Create account once for Jama and once for Ismail. Each account has private detailed progress; signed-in learners can see only the other learner's summary metrics.

## Publishing

GitHub Pages deploys from the repository workflow. Firebase client identifiers are safe to publish; the Admin SDK JSON and environment files are ignored.
