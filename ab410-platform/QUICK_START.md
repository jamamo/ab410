# Quick Start Guide

Get the AB-410 Academy progress tracker running in 5 minutes.

## 1. Get Your Firebase Config

Your Firebase project is: **ab410-6ef04**

1. Go to https://console.firebase.google.com
2. Select **ab410-6ef04**
3. Click ⚙️ Settings → Project Settings
4. Scroll to "Your apps" → Find your web app
5. Copy the config (starts with `apiKey: "..."`

## 2. Update Firebase Configuration

Edit `js/firebase-setup.js` and replace:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD_YOUR_API_KEY_HERE",
  authDomain: "ab410-6ef04.firebaseapp.com",
  projectId: "ab410-6ef04",
  storageBucket: "ab410-6ef04.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

With your actual Firebase config values.

## 3. Create User Accounts

In Firebase Console → Authentication → Users, create:

**Account 1:**
- Email: `jama.mohamed@nhs.net`
- Password: `YourSecurePassword123!`

**Account 2:**
- Email: `ismail@nhs.net`  
- Password: `YourSecurePassword123!`

(Use strong passwords, but remember them for testing!)

## 4. Enable Firestore

In Firebase Console:
1. Go to **Firestore Database**
2. Click **Create Database**
3. Choose **Production mode**
4. Select region: `europe-london` (or closest to you)
5. Click **Create**

Then update Security Rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      match /progress/{document=**} {
        allow read, write: if request.auth.uid == userId;
      }
      match /stats/{document=**} {
        allow read, write: if request.auth.uid == userId;
      }
      match /activities/{document=**} {
        allow read, write: if request.auth.uid == userId;
      }
    }
  }
}
```

## 5. Enable Authentication

In Firebase Console → Authentication:
1. Click **Get started**
2. Select **Email/Password**
3. Click **Enable**
4. Save

## 6. Run Locally

```powershell
cd ab410-platform
python -m http.server 8000
```

Open browser to: **http://localhost:8000**

## 7. Test Login

Click the login modal:
- Email: `jama.mohamed@nhs.net`
- Password: (the password you set)

Or use the demo account buttons in the modal.

## What You Get

✅ **Progress Dashboard**
- Exam readiness score (%)
- Modules/Quizzes/Labs completed
- Streak tracking with fire emoji 🔥
- Weekly activity heatmap

✅ **Real-time Sync**
- Progress automatically saved to Firestore
- Sync across devices
- Activity log with timestamps

✅ **Beautiful UI**
- Harvard-style design
- Elegant animations
- Responsive mobile design
- Dark mode support

## File Structure

```
ab410-platform/
├── index.html                       # Main HTML (updated with Firebase scripts)
├── js/
│   ├── firebase-setup.js           # Firebase config (UPDATE THIS!)
│   ├── auth.js                     # Authentication manager
│   ├── auth-modal.js               # Login modal UI
│   ├── progress-sync.js            # Firestore sync
│   ├── progress-dashboard-renderer.js  # Dashboard UI
│   ├── app-firebase.js             # NEW: Firebase-integrated app
│   ├── app.js                      # Original app (still works)
│   └── courseData.js               # Course data
├── css/
│   ├── styles.css                  # Original styles
│   ├── auth.css                    # Login modal styles (NEW)
│   └── progress-dashboard.css      # Dashboard styles (NEW)
└── FIREBASE_SETUP.md               # Detailed setup guide
```

## Next Steps

1. **Test login** - Make sure Jama/Ismail can log in
2. **Complete a module** - Check if progress saves to Firestore
3. **Check the dashboard** - See streaks, stats, heatmap
4. **Monitor Firestore** - Watch data flow in Firebase Console

## Troubleshooting

### "Failed to initialize Firebase"
→ Check your config in `firebase-setup.js` matches your project

### "User not found" on login
→ Create accounts in Firebase Console → Authentication → Users

### Progress not saving
→ Check Firestore rules allow writes to `/users/{userId}`

### CORS errors
→ Don't use `file://` URLs - always use `http://localhost:8000`

## Files to Keep Secure

⚠️ **Never commit these with real credentials:**
- `js/firebase-setup.js` (if it has your real API keys)
- `.env.local`
- Service account JSON file

They're in `.gitignore` already, but be careful!

## What's Next?

→ See `FIREBASE_SETUP.md` for complete documentation
→ Run `/code-review` to check for security issues
→ Deploy to Firebase Hosting for production

---

**Need help?** Check the [Firebase documentation](https://firebase.google.com/docs) or the detailed setup guide.
