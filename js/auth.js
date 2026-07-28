import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

    const accountMenu = document.getElementById("accountMenu");

    // اگر یہ element اس page پر موجود نہیں تو کچھ نہ کریں
    if (!accountMenu) return;

    if (user) {

        accountMenu.innerHTML = `
            <span style="color:white; margin-right:10px;">
                Hi, ${user.displayName || "User"}
            </span>

            <a href="javascript:void(0)"
               class="header-icon account-icon"
               onclick="logoutUser()">
                🚪
            </a>
        `;

    } else {

        accountMenu.innerHTML = `
            <a href="login.html"
               class="header-icon account-icon"
               aria-label="Login or Sign Up">
                👤
            </a>
        `;

    }

});

window.logoutUser = async function () {

    await signOut(auth);

    alert("Logged out successfully.");

    window.location.href = "login.html";

};
