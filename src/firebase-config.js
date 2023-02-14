// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth"; // getAuth is used when we want to have authentication in our project.
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_te17IKf-U5i32QuwgUWXxZRsDbUIpaU",
  authDomain: "reactchatapp-95ac2.firebaseapp.com",
  projectId: "reactchatapp-95ac2",
  storageBucket: "reactchatapp-95ac2.appspot.com",
  messagingSenderId: "339117061903",
  appId: "1:339117061903:web:d91c4522e127190aa6707a",
  measurementId: "G-Q59HZ5QWXL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const providerFb = new FacebookAuthProvider();
export const storage = getStorage();
