// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBik6E8V-51PNDUskMCxsFZn6IemuyT3Es",
  authDomain: "book-courier-firebase.firebaseapp.com",
  projectId: "book-courier-firebase",
  storageBucket: "book-courier-firebase.firebasestorage.app",
  messagingSenderId: "884599710198",
  appId: "1:884599710198:web:005eb8ba2ad25cc0bd27d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);