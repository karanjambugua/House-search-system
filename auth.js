// Import Firebase authentication
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Initialize Firebase Authentication providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Function to log in with email and password
async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const errorMessage = document.getElementById("error-message");

    if (!email || !password) {
        errorMessage.textContent = "Please enter both email and password!";
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful:", userCredential.user);
        alert("Login successful!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } catch (error) {
        console.error("Login error:", error);
        if (error.code === "auth/user-not-found") {
            errorMessage.textContent = "Email does not exist. Please sign up.";
        } else if (error.code === "auth/wrong-password") {
            errorMessage.textContent = "Incorrect password. Please try again.";
        } else {
            errorMessage.textContent = error.message;
        }
    }
}

// Function to log in with Google
function googleLogin() {
    signInWithPopup(auth, googleProvider)
        .then(result => {
            console.log("Google Login Success:", result.user);
            alert("Google Login Successful!");
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            console.error("Google Login Failed:", error);
            alert("Google login failed: " + error.message);
        });
}

// Function to log in with Facebook
function facebookLogin() {
    signInWithPopup(auth, facebookProvider)
        .then(result => {
            console.log("Facebook Login Success:", result.user);
            alert("Facebook Login Successful!");
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            console.error("Facebook Login Failed:", error);
            alert("Facebook login failed: " + error.message);
        });
}

// Attach event listeners after page load
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-button");
    const googleButton = document.getElementById("google-login");
    const facebookButton = document.getElementById("facebook-login");
    const togglePassword = document.getElementById("toggle-password");
    const passwordField = document.getElementById("login-password");

    if (loginButton) loginButton.addEventListener("click", login);
    if (googleButton) googleButton.addEventListener("click", googleLogin);
    if (facebookButton) facebookButton.addEventListener("click", facebookLogin);
    
    if (togglePassword) {
        togglePassword.addEventListener("click", () => {
            if (passwordField.type === "password") {
                passwordField.type = "text";
                togglePassword.textContent = "🙈";
            } else {
                passwordField.type = "password";
                togglePassword.textContent = "👁";
            }
        });
    }
});
