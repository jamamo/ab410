# Firebase Setup

Run the one-time provisioning command from the platform folder:

    python scripts/configure_firebase.py "C:\Users\you\Downloads\firebase-adminsdk.json"

The command performs these actions:

1. Creates the Firebase web application if it does not exist.
2. Enables email/password authentication.
3. Authorizes localhost, Firebase Hosting domains, and jamamo.github.io.
4. Deploys the Firestore rules in firestore.rules.
5. Updates js/firebase-setup.js with public browser identifiers.

The service-account JSON remains outside the project. Do not upload it to GitHub, paste it into JavaScript, or share it as a browser download.

## Data model

- users/{uid}: the signed-in learner's private profile.
- users/{uid}/progress/ab410: private course state and activity dates.
- learnerProgress/{uid}: summary metrics visible to authenticated learners.

Create accounts from the application's Create account tab and select Jama or Ismail. Passwords are handled by Firebase Authentication and are never stored by the application.
