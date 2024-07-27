// Import the functions you need from the SDKs you need
//import * as firebase from "firebase
//import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// cada produto do firebase deve ser importad separadamente
//por exemplo auth de autenticação
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2ByaK0-QHI5U8j2kgxkZKo184cLwEYSQ",

  authDomain: "tads-97ad8.firebaseapp.com",

  projectId: "tads-97ad8",

  storageBucket: "tads-97ad8.appspot.com",

  messagingSenderId: "32173798325",

  appId: "1:32173798325:web:9698bf0e81be2ecc06dffc",

  measurementId: "G-MSLW9M8WLM",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
export { auth, firestore, storage };
