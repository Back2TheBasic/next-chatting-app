// Import the functions you need from the SDKs you need
"use client";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
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
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

const currentUser = auth.currentUser;
const updateUserDB = (user: any) => {
  updateDoc(doc(db, "users", user.email), {
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

const createUserDB = (user: any) => {
  setDoc(
    doc(db, "users", user.email),
    {
      email: user?.email,
      lastActive: Date.now(),
      photoURL: user?.photoURL
        ? user?.photoURL
        : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FtEMUl%2FbtrDc6957nj%2FNwJoDw0EOapJNDSNRNZK8K%2Fimg.jpg",
      displayName: user?.displayName
        ? user?.displayName
        : user?.email.split("@")[0],
      uid: user?.uid,
      chats: {},
    },
    { merge: true }
  );
};

const createOrUpdateDB = async (user: any) => {
  const usersCollection = doc(db, "users", user.email);
  const userSnapshots = await getDoc(usersCollection);
  if (userSnapshots.exists()) {
    updateUserDB(user);
  } else {
    createUserDB(user);
  }
};

const getUserDB = async (currentEmail: string) => {
  const usersCollection = collection(db, "users");
  const userSnapshots = await getDocs(usersCollection);

  const otherUsersEmails = userSnapshots.docs
    .map((doc) => doc.data())
    .filter((user) => user.email !== currentEmail);

  return otherUsersEmails;
};

const createOrUpdateUserChats = async (friendUid: string, newId: string) => {
  const currentUserEmail = currentUser?.email!;
  const usersCollection = doc(db, "users", currentUserEmail);
  const userSnapshots = await getDoc(usersCollection);
  const chats = userSnapshots.data()?.chats || {};
  console.log("chats", chats);

  if (chats) {
    updateUserChats(friendUid, newId);
  } else {
    createUserChats(friendUid, newId);
  }
};

const createUserChats = async (friendUid: string, newId: string) => {
  const currentUserEmail = currentUser?.email!;
  const currentUserDB = doc(db, "users", currentUserEmail);
  const currentUserSnapshot = await getDoc(currentUserDB);
  const prevChat = currentUserSnapshot.data()?.chats || {};

  if (!prevChat) {
    setDoc(doc(db, "users", currentUserEmail), { chats: {} }, { merge: true });
  }
};

const updateUserChats = async (friendUid: string, newId: string) => {
  const currentUserEmail = currentUser?.email!;
  const currentUserDB = doc(db, "users", currentUserEmail);
  const currentUserSnapshot = await getDoc(currentUserDB);
  const prevChat = currentUserSnapshot.data()?.chats || {};
  updateDoc(doc(db, "users", currentUserEmail), {
    chats: {
      ...prevChat,
      [friendUid]: newId,
    },
  });
};

const createChatId = async (friendUid: string, myUid: string) => {
  const chatCollection = collection(db, "chats");

  const newData = await addDoc(chatCollection, {
    createAt: Date.now(),
    users: [friendUid, myUid],
  });
  updateUserChats(friendUid, newData.id);
  return newData.id;
};

const getChatId = async (
  myEmail: string,
  myUid: string,
  friendEmail: string
) => {
  const friendDB = doc(db, "users", friendEmail);
  const friendSnapshots = await getDoc(friendDB);
  const friendUid = await friendSnapshots.data()?.uid;
  const currentUserDB = doc(db, "users", myEmail);
  const currentUserSnapshots = await getDoc(currentUserDB);
  const myChatId = await currentUserSnapshots.data()?.chats?.[friendUid];
  const friendChatId = await friendSnapshots.data()?.chats?.[myUid];
  console.log("1", myChatId, friendChatId);

  if (myChatId) {
    return myChatId;
  }
  if (friendChatId) {
    updateUserChats(friendUid, friendChatId);
    return friendChatId;
  }
  if (!myChatId && !friendChatId) {
    return createChatId(friendUid, myUid);
  }
};

const getUserInfo = async (email: string) => {
  const userDB = doc(db, "users", email);
  const userSnapshots = await getDoc(userDB);
  const userInfo = userSnapshots.data();
  return userInfo;
};
export {
  db,
  auth,
  app,
  updateUserDB,
  getUserDB,
  getChatId,
  createOrUpdateDB,
  getUserInfo,
};
