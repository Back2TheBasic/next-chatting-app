// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbxY4wy_10YXFX9zf5MsesiELfYm5m8YQ",
  authDomain: "react-chat-61087.firebaseapp.com",
  projectId: "react-chat-61087",
  storageBucket: "react-chat-61087.appspot.com",
  messagingSenderId: "981022867198",
  appId: "1:981022867198:web:4da279701afbb9e7c9efaf",
  measurementId: "G-L5PXWL4W15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth(app);

export { db, auth, app };
