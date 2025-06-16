// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo6PLH4OmQ58FFOqse3ArEypdF8u-QfM0",
  authDomain: "bambistic-7be6f.firebaseapp.com",
  projectId: "bambistic-7be6f",
  storageBucket: "bambistic-7be6f.firebasestorage.app",
  messagingSenderId: "657092262530",
  appId: "1:657092262530:web:c29722e3cdf907eb4c529b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);