//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmCtsujlAnOxU5QIi6T1qKNBxhT1vHZrk",
  authDomain: "vald-pandemonium-f4d53.firebaseapp.com",
  databaseURL: "https://vald-pandemonium-f4d53-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vald-pandemonium-f4d53",
  storageBucket: "vald-pandemonium-f4d53.firebasestorage.app",
  messagingSenderId: "866943414000",
  appId: "1:866943414000:web:bbdde2d115618e7e925c35",
  measurementId: "G-SCE5TLWEE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);