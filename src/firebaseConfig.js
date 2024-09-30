// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDD5elKWHuTN6qRG8HZEYfS7ACADCsu5Kw",
  authDomain: "hackathonteam1-33ab6.firebaseapp.com",
  projectId: "hackathonteam1-33ab6",
  storageBucket: "hackathonteam1-33ab6.appspot.com",
  messagingSenderId: "342190693691",
  appId: "1:342190693691:web:30151196ec9d573e966b1e",
  measurementId: "G-Y9Y9JS8ZX0",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
