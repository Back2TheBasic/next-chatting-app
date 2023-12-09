// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASYsz8agr1qD7grtoM-9z_oDyqdxIdmsQ",
  authDomain: "homework-474df.firebaseapp.com",
  projectId: "homework-474df",
  storageBucket: "homework-474df.appspot.com",
  messagingSenderId: "802925921509",
  appId: "1:802925921509:web:042f2aa5ee62afd3f7000c",
  databaseURL: "https://homework-474df-default-rtdb.firebaseio.com",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app)
export const database = getDatabase(app);