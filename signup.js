// Import Firebase modules
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

async function signup() {
    console.log("Signup function started");

    // Get form values
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = ""; // Clear previous error messages

    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        errorMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        return;
    }

    try {
        console.log("Creating user in Firebase...");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User created:", user);

        console.log("Saving user data to Firestore...");
        await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            email,
            phone,
            userId: user.uid
        });

        alert("Signup successful! Redirecting...");
        window.location.href = "dashboard.html"; // Redirect after signup
    } catch (error) {
        console.error("Error signing up:", error);
        errorMessage.textContent = error.message;
    }
}

// Attach signup function globally
window.signup = signup;

// Attach event listener when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const signupButton = document.getElementById("signup-button");
    if (signupButton) {
        signupButton.addEventListener("click", signup);
    } else {
        console.error("Signup button not found!");
    }

    // Password toggle logic
    function togglePasswordVisibility(toggleId, inputId) {
        document.getElementById(toggleId).addEventListener("click", () => {
            const passwordInput = document.getElementById(inputId);
            passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        });
    }

    togglePasswordVisibility("toggle-password", "signup-password");
    togglePasswordVisibility("toggle-confirm-password", "confirm-password");
});
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Display name fallback
        const displayName = user.displayName || "N/A";
        const email = user.email || "Not Available";

        // Update profile modal
        document.getElementById("profile-name").innerHTML = `${displayName} <a href="#" class="edit-link">Edit</a>`;
        document.getElementById("email").innerHTML = `${email} <span class="email-status">unverified</span> <a href="#" class="verify-link">Verify</a> <a href="#" class="edit-link">Edit</a>`;

        // Optional: Load profile picture if available
        const profilePic = user.photoURL || "default-profile.png";
        document.getElementById("profile-pic-preview").src = profilePic;

        loadUserProperties(); // Load dashboard steps
    } else {
        window.location.href = "auth.html";
    }
});
