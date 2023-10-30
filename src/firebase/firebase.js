// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "next-chatting-app.firebaseapp.com",
  projectId: "next-chatting-app",
  storageBucket: "next-chatting-app.appspot.com",
  messagingSenderId: "552140168258",
  appId: "1:552140168258:web:9f37f2d6c24dac67be21db",
  measurementId: "G-RGL172YYME",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
