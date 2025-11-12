// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  deleteDoc,
  writeBatch,
  doc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// --- Firebase config ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementID: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);

// --- Core services ---
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// --- Auth helpers ---
export const signIn = () => signInWithPopup(auth, provider);
export const logOut = () => signOut(auth);
export const listenAuth = (callback) => onAuthStateChanged(auth, callback);

// --- Bundle helper for convenience ---
export const f = {
  auth,
  db,
  storage,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  deleteDoc,
  writeBatch,
  doc,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
};