// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByzI9rCb9HbrZjZbQ8lAjD5AFAAExubqY",
  authDomain: "used-carz.firebaseapp.com",
  projectId: "used-carz",
  storageBucket: "used-carz.appspot.com",
  messagingSenderId: "361870686643",
  appId: "1:361870686643:web:6a2261e616b06b130bf3c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
