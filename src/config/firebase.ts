// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoDe5P9DhSuUyp-O_nKc1N69I85jFt0Mk",
  authDomain: "my-school-a022d.firebaseapp.com",
  projectId: "my-school-a022d",
  storageBucket: "my-school-a022d.appspot.com",
  messagingSenderId: "68716030459",
  appId: "1:68716030459:web:58a60ac07eabb34eee435e",
  measurementId: "G-W8DMQ5X24J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
export default auth;
