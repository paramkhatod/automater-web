


import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
     apiKey: "AIzaSyCHy8T2Q8Lu1ZYAHW7gG6L6Ye6zknUDBFc",
  authDomain: "automater-web.firebaseapp.com",
  projectId: "automater-web",
  storageBucket: "automater-web.firebasestorage.app",
  messagingSenderId: "395531856980",
  appId: "1:395531856980:web:a061483c662abf9db5d1c1",
  measurementId: "G-GQ6N29H2HT"
};

// Singleton pattern to prevent re-initialization during Next.js hot-reloads
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);