// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZaxvpEWEPA5vmZpCtD_w7_pgNwCWy5_g",
  authDomain: "quantum-asset-solutions.firebaseapp.com",
  projectId: "quantum-asset-solutions",
  storageBucket: "quantum-asset-solutions.appspot.com",
  messagingSenderId: "650688624714",
  appId: "1:650688624714:web:903ab415570f1a15704eb3",
  measurementId: "G-CQGCPJ0TTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;