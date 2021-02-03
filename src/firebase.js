import firebase from "@firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCh3lek0d1w5Iuaq2_8cdhd_71fZNq945M",
  authDomain: "sous-les-paves-le-vintage.firebaseapp.com",
  projectId: "sous-les-paves-le-vintage",
  storageBucket: "sous-les-paves-le-vintage.appspot.com",
  messagingSenderId: "640261474781",
  appId: "1:640261474781:web:76572829e1ea7a424dce34",
  measurementId: "G-EMCNW84ZZ9"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fb, db };
