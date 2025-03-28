// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSJt6ty_oKwV2d8IGd20k93dZ1Kw7k9fc",
    authDomain: "rental-search-system.firebaseapp.com",
    projectId: "rental-search-system",
    storageBucket: "rental-search-system.appspot.com",
    messagingSenderId: "799272479207",
    appId: "1:799272479207:web:20fb774ebd6ab6f07f7542"
};

// Prevent multiple Firebase initializations
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase instances for use in other scripts
export { app, auth, db };
