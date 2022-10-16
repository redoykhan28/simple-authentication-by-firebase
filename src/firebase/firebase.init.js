// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyClhxHWKr-48AKIxftfbxP95tsKNvkSZbk",
    authDomain: "simple-authentication-3a0cd.firebaseapp.com",
    projectId: "simple-authentication-3a0cd",
    storageBucket: "simple-authentication-3a0cd.appspot.com",
    messagingSenderId: "403787997085",
    appId: "1:403787997085:web:4b845c696b587111b75974"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;