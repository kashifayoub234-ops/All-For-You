import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFGiTIEDc41ZLFGQTFF0o0r79z6VoqtWI",
  authDomain: "all-for-you-store.firebaseapp.com",
  projectId: "all-for-you-store",
  storageBucket: "all-for-you-store.firebasestorage.app",
  messagingSenderId: "125913871548",
  appId: "1:125913871548:web:c585db8a7afb42d3fe8cb9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
