// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCwuWrZtls0iZ50jsOhUOl3Mo-3_LXl92s",
    authDomain: "react-chat-app-aaa62.firebaseapp.com",
    projectId: "react-chat-app-aaa62",
    storageBucket: "react-chat-app-aaa62.appspot.com",
    messagingSenderId: "879792873900",
    appId: "1:879792873900:web:8551f7b57469b959315a09",
    measurementId: "G-MHHK28HCLD"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
