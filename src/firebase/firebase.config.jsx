// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHM4SCzoOUiwlHEpzMvOF7q6pYVe_8Ww0",
  authDomain: "learn-nyanja-46624.firebaseapp.com",
  projectId: "learn-nyanja-46624",
  storageBucket: "learn-nyanja-46624.appspot.com",
  messagingSenderId: "942725583134",
  appId: "1:942725583134:web:06d78376040404c791f90f",
  measurementId: "G-0X694PRR33",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();
export { db, app, auth, storage };
