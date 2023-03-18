// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkBxCU4RIrlbgxxXxxjcQUggZ6lfjxoMU",
  authDomain: "finalproject-3f313.firebaseapp.com",
  projectId: "finalproject-3f313",
  storageBucket: "finalproject-3f313.appspot.com",
  messagingSenderId: "45904994512",
  appId: "1:45904994512:web:9854db925cdf85775dfed5",
  measurementId: "G-3LSLLSJBSX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig
