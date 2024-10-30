import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAjpxvFRDY1r-54gGLKqLplW1AsCdT1ibU",
    authDomain: "pdf-palette.firebaseapp.com",
    projectId: "pdf-palette",
    storageBucket: "pdf-palette.appspot.com",
    messagingSenderId: "597385152612",
    appId: "1:597385152612:web:cd12fce181da2bb9a77771",
    measurementId: "G-W3ZM2EYG2F"
  };

const app = initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { signInWithPopup, auth, provider };