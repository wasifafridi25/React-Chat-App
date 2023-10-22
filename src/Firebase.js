// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlIU9xjOHtKSnJad_AXMmQtnKgvTMVM1g",
  authDomain: "real-time-chat-app-85e3d.firebaseapp.com",
  projectId: "real-time-chat-app-85e3d",
  storageBucket: "real-time-chat-app-85e3d.appspot.com",
  messagingSenderId: "880288161603",
  appId: "1:880288161603:web:fc49f266c4c0dca6f719f6",
  measurementId: "G-W00YRNTGNP"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
