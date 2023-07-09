import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseSettings = {
  apiKey: "AIzaSyCXMuS3FYUC4et2Ecvjk--I1W1QRzwjUKc",
  authDomain:"project1point5.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: "project1point5",
  storageBucket: "project1point5.appspot.com",
  messagingSenderId: "961301757571",
  appId: "1:961301757571:web:f6434663df48cdbf56e5b6",
};

let app = !firebase.apps.length
  ? firebase.initializeApp(firebaseSettings)
  : firebase.app();

const firestore = app.firestore();

export const database = {
  exercises: firestore.collection("exercises"),
  workouts: firestore.collection("workouts"),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const auth = app.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default app;
