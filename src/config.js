import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB-vsy2BDrbPUmLvYts_cUA6S019DHOpIA",
  authDomain: "rj-feedback-system.firebaseapp.com",
  projectId: "rj-feedback-system",
  storageBucket: "rj-feedback-system.appspot.com",
  messagingSenderId: "1086132466925",
  appId: "1:1086132466925:web:e9e78b56eb64be726988e4",
  measurementId: "G-YBYTVHMCLN"
};
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const imgDB = getStorage(app);
const txtDB = getFirestore(app);
const database = getDatabase(app);
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export {  firebase,auth, imgDB, txtDB, database, googleAuthProvider, signInWithPopup, onAuthStateChanged };