// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6UnqbZvfWCDmFwQDByukN5XYAA_E9SvI",
  authDomain: "real-time-chat-app-5ce87.firebaseapp.com",
  projectId: "real-time-chat-app-5ce87",
  storageBucket: "real-time-chat-app-5ce87.appspot.com",
  messagingSenderId: "495600211518",
  appId: "1:495600211518:web:073c01f875b40f2a71236f",
  measurementId: "G-669N8B2RD8"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
