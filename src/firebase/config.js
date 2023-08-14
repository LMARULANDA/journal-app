// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ8cDeYZHq5fDXNkZug9E-IiztqCYNxUM",
  authDomain: "react-course-79864.firebaseapp.com",
  projectId: "react-course-79864",
  storageBucket: "react-course-79864.appspot.com",
  messagingSenderId: "985959976469",
  appId: "1:985959976469:web:d5b3145ce9d79ded10481c"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);

