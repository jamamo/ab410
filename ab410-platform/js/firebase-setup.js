import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  "apiKey": "AIzaSyAoOlEGWZ5ccJWPGydzcPU5rnhP5U8qcbA",
  "authDomain": "ab410-6ef04.firebaseapp.com",
  "projectId": "ab410-6ef04",
  "storageBucket": "ab410-6ef04.firebasestorage.app",
  "messagingSenderId": "209625564222",
  "appId": "1:209625564222:web:09132fbddf4cb7ffaefd6f"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export {
  auth,
  collection,
  createUserWithEmailAndPassword,
  db,
  doc,
  getDoc,
  getDocs,
  onAuthStateChanged,
  serverTimestamp,
  setDoc,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
};
