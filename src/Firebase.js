// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApNsK2BtBK5pIBBTlYotq954mTl1dOArU",
  authDomain: "react-chat-application-8a865.firebaseapp.com",
  projectId: "react-chat-application-8a865",
  storageBucket: "react-chat-application-8a865.appspot.com",
  messagingSenderId: "1015956931663",
  appId: "1:1015956931663:web:8e6ef81002a652b024d63a",
  measurementId: "G-73JHMD5BM2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
