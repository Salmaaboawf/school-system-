// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBe3-gjHc3oqztP71e-XVCYk9onqL1c3Ms",

  authDomain: "schoolx-7593c.firebaseapp.com",

  projectId: "schoolx-7593c",

  storageBucket: "schoolx-7593c.appspot.com",

  messagingSenderId: "166763289684",

  appId: "1:166763289684:web:3d99cef13ca4bb227461c1",

  measurementId: "G-TVD3W8KMMM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
const auth = getAuth(app);
export default auth;
export const storage = getStorage(app);