// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhihymSmsNUnVo0wNLjXZCiWrjmIKzdMw",
  authDomain: "ihellow-74b09.firebaseapp.com",
  projectId: "ihellow-74b09",
  storageBucket: "ihellow-74b09.appspot.com",
  messagingSenderId: "456710157520",
  appId: "1:456710157520:web:ef8f3d37aa7b43b559dad5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);