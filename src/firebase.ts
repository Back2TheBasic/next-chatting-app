// Import the functions you need from the SDKs you need
"use client";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth(app);
const updateUserDB = (user: any) => {
  setDoc(doc(db, "users", user.email), {
    email: user?.email,
    lastActive: Date.now(),
    photoURL: user?.photoURL
      ? user?.photoURL
      : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtEMUl%2FbtrDc6957nj%2FNwJoDw0EOapJNDSNRNZK8K%2Fimg.jpg",
    displayName: user?.displayName
      ? user?.displayName
      : user?.email.split("@")[0],
    uid: user?.uid,
  });
};

const getUserDB = async (currentEmail: string) => {
  const usersCollection = collection(db, "users");
  const userSnapshots = await getDocs(usersCollection);

  const otherUsersEmails = userSnapshots.docs
    .map((doc) => doc.data())
    .filter((user) => user.email !== currentEmail);

  return otherUsersEmails;
};
export { db, auth, app, updateUserDB, getUserDB };
