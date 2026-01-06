import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9gtG_DZktase4A7i8bOw1g_dum4lsGyQ",
  authDomain: "login-react-e4dd7.firebaseapp.com",
  projectId: "login-react-e4dd7",
  storageBucket: "login-react-e4dd7.firebasestorage.app",
  messagingSenderId: "760920730640",
  appId: "1:760920730640:web:e20e6d45fde2987372ae95",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
