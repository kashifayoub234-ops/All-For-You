import { auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        await signInWithEmailAndPassword(auth, email, password);

        alert("Login Successful!");

        window.location.href = "index.html";

    } catch (error) {

        switch (error.code) {
  case "auth/invalid-credential":
    alert("Incorrect email or password.");
    break;

  case "auth/invalid-email":
    alert("Please enter a valid email address.");
    break;

  case "auth/too-many-requests":
    alert("Too many failed attempts. Please try again later.");
    break;

  default:
    alert("Login failed. Please try again.");
}

    }

});
