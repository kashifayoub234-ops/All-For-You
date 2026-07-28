import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {

    if (user) {
        console.log("Logged In:", user.email);
    } else {
        console.log("No User Logged In");
    }

});

window.logoutUser = async function () {

    await signOut(auth);

    alert("Logged out successfully.");

    window.location.href = "login.html";

};
