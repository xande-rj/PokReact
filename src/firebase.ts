// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { environment } from '../environment.ts';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration


 
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
 const auth = getAuth(app);
 const db = getFirestore(app);

export {auth,db}