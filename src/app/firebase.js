// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUDKPjAu9myfTV2EYbfXXn4xnpxEzplzA",
  authDomain: "pantry-app-cccc8.firebaseapp.com",
  projectId: "pantry-app-cccc8",
  storageBucket: "pantry-app-cccc8.appspot.com",
  messagingSenderId: "860777877124",
  appId: "1:860777877124:web:e89ef6067dea000a40fcd1",
  measurementId: "G-RFKGM0PW9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {
    app, firestore
}

//20:44