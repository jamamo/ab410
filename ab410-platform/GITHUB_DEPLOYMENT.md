# GitHub & Production Deployment Guide

This guide ensures your Firebase credentials stay secure when pushing to GitHub.

---

## 🔒 Security Setup (CRITICAL)

### Before Pushing to GitHub

1. **Create `.env.local`** in your `ab410-platform` folder:

```bash
# Copy the template
cp .env.local.example .env.local

# Edit with your Firebase API key
echo "FIREBASE_API_KEY=AIzaSyAoOlEGWZ5ccJWPGydzcPU5rnhP5U8qcbA" >> .env.local
```

2. **Verify `.gitignore` includes:**

```
.env.local
.env
*.firebase-adminsdk*.json
*service-account*.json
```

✅ These are already in `.gitignore`

3. **Double-check before committing:**

```bash
# This should be EMPTY (means .env.local is ignored)
git ls-files | grep ".env.local"

# This should show the service account is ignored
git ls-files | grep "firebase-adminsdk"
```

---

## 🚀 Deployment Options

### Option 1: Local Development (Easiest)

```bash
# 1. Create .env.local with your API key
cp .env.local.example .env.local
# Edit .env.local and add your FIREBASE_API_KEY

# 2. Run locally
python -m http.server 8000

# 3. Open http://localhost:8000
# Login works because config-loader.js reads .env.local
```

✅ `.env.local` won't be pushed to GitHub (it's in `.gitignore`)

---

### Option 2: Firebase Hosting (Recommended for Production)

Firebase Hosting automatically works with your Firebase project and doesn't need API keys in code.

1. **Install Firebase CLI:**

```bash
npm install -g firebase-tools
firebase login
```

2. **Initialize Firebase Hosting:**

```bash
cd ab410-platform
firebase init hosting
# Choose: ab410-6ef04 project
# Public directory: . (current)
# Single-page app: N
# Overwrite index.html: N
```

3. **Deploy:**

```bash
firebase deploy --only hosting
```

✅ Firebase Hosting automatically provides the API key to your app

---

### Option 3: GitHub Pages + Environment Variables

If you want to use GitHub Pages:

1. **Get your API key from Firebase Console**
2. **In your GitHub repo, set a secret:**
   - Go to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `FIREBASE_API_KEY`
   - Value: (your actual API key)

3. **Create `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Generate config
        run: |
          cd ab410-platform
          echo "FIREBASE_API_KEY=${{ secrets.FIREBASE_API_KEY }}" > .env.local
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./ab410-platform
```

This way, your API key is in GitHub Secrets, not in the code.

---

## 📋 What Gets Committed to GitHub

✅ **SAFE to commit:**
- `index.html`
- `js/firebase-setup.js` (without hardcoded keys)
- `js/config-loader.js`
- `css/auth.css`, `css/progress-dashboard.css`
- `firebase-controller.js`
- `auth.js`, `auth-modal.js`, `progress-sync.js`
- `.env.local.example` (template only)
- `.gitignore` (includes `*.firebase-adminsdk.json`)

❌ **NEVER commit:**
- `.env.local` (your real credentials)
- `*.firebase-adminsdk*.json` (service account)
- `service-account*.json`
- `.env` (production secrets)

---

## 🔧 Troubleshooting

### "Firebase API key not configured"

This warning means `.env.local` wasn't found.

**Solution:**
```bash
cp .env.local.example .env.local
# Edit .env.local and add your FIREBASE_API_KEY
```

### "Failed to load config from .env.local"

This is expected in production (GitHub Pages, Firebase Hosting). They provide the API key automatically.

### Local development stops working after pushing

Make sure:
1. ✅ You created `.env.local` locally
2. ✅ `.env.local` is in your `.gitignore`
3. ✅ You didn't push `.env.local` to GitHub

Check with:
```bash
git status
# .env.local should NOT appear here
```

---

## 📱 For Team Members Cloning Your Repo

When someone clones your repo:

```bash
git clone https://github.com/yourname/ab410

cd ab410/ab410-platform

# Copy the example config
cp .env.local.example .env.local

# Ask them to add their API key to .env.local
# (They should only need it for local development)

# Run locally
python -m http.server 8000
```

---

## 🌍 Production Security Checklist

Before going live:

- [ ] `.env.local` is in `.gitignore` ✅
- [ ] No hardcoded API keys in any `.js` files ✅
- [ ] Service account JSON is NOT in repo ✅
- [ ] `.env.local.example` shows only template ✅
- [ ] GitHub repo is public (only template files exposed) ✅
- [ ] Firebase Console has HTTP restrictions on API key ✅
- [ ] Firestore security rules are strict (users can only read/write own data) ✅

---

## 🚀 Recommended Deployment Path

1. **Local:** Use `.env.local` with your API key
2. **Production:** Deploy to Firebase Hosting (handles everything)
3. **GitHub:** Repo contains only code (no secrets)

This keeps your credentials safe while making the app production-ready!

---

## 📚 See Also

- [Firebase Hosting Docs](https://firebase.google.com/docs/hosting)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Firebase Security Best Practices](https://firebase.google.com/docs/rules/security-rules)
