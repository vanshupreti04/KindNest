// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZkrf68dpCeyX6qlyt009VBLxiu2R4lQY",
  authDomain: "kindnest-5c41b.firebaseapp.com",
  projectId: "kindnest-5c41b",
  storageBucket: "kindnest-5c41b.firebasestorage.app",
  messagingSenderId: "795149245381",
  appId: "1:795149245381:web:9ccc99c0f4f0fe176f49ac",
  measurementId: "G-GYFM6T9H54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


export { auth, googleProvider };