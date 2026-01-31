// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwvkob9pn7xkt7LGpKylSiGw1nzQUe4KM",
  authDomain: "nebula-44a97.firebaseapp.com",
  databaseURL: "https://nebula-44a97-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "nebula-44a97",
  storageBucket: "nebula-44a97.firebasestorage.app",
  messagingSenderId: "538203985977",
  appId: "1:538203985977:web:e1fb88ad43b3780f4615e8",
  measurementId: "G-X1KD8GQCJH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);