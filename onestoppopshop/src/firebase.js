// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqzaSHDHjePznWcYSXWiHpC92u9nuqaeU",
  authDomain: "onestoppopshop-cffc9.firebaseapp.com",
  databaseURL: "https://onestoppopshop-cffc9-default-rtdb.firebaseio.com",
  projectId: "onestoppopshop-cffc9",
  storageBucket: "onestoppopshop-cffc9.appspot.com",
  messagingSenderId: "289707496017",
  appId: "1:289707496017:web:f81e1a67eb130af2549e70"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)