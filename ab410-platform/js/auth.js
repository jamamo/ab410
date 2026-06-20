import { auth, db, ALLOWED_USERS, signInWithEmailAndPassword, signOut, onAuthStateChanged, doc, getDoc, setDoc, updateDoc, serverTimestamp } from './firebase-setup.js';

export class AuthManager {
  constructor() {
    this.currentUser = null;
    this.userProfile = null;
    this.listeners = [];
  }

  init() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.currentUser = user;
          this.userProfile = await this.getUserProfile(user.uid);
          this.notifyListeners();
          resolve(user);
        } else {
          this.currentUser = null;
          this.userProfile = null;
          resolve(null);
        }
      });
    });
  }

  async login(email, password) {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      return credential.user;
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  async logout() {
    try {
      await signOut(auth);
      this.currentUser = null;
      this.userProfile = null;
      this.notifyListeners();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getUserProfile() {
    return this.userProfile;
  }

  async getUserProfile(uid) {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      return userSnap.data();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  async createOrUpdateProfile(uid, data) {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create new profile with initial data
        await setDoc(userRef, {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } else {
        // Update existing profile
        await updateDoc(userRef, {
          ...data,
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  }

  onChange(listener) {
    this.listeners.push(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.currentUser, this.userProfile));
  }
}

export default new AuthManager();
