import { auth } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Ensure user authentication
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("user-name").innerText = user.displayName || "User";
        loadUserProperties();
    } else {
        window.location.href = "auth.html";
    }
});

// Function to save property data locally
function savePropertyData(step, data) {
    localStorage.setItem(step, JSON.stringify(data));
}

// Function to load saved data from local storage
function loadSavedPropertyData() {
    const steps = ["propertyInfo", "rentDetails", "media", "amenities", "screeningCriteria", "costsFees", "finalDetails", "review"];
    let propertyData = {};
    steps.forEach(step => {
        const savedData = localStorage.getItem(step);
        if (savedData) {
            propertyData[step] = JSON.parse(savedData);
        }
    });
    return propertyData;
}

// Function to update the dashboard view
function loadUserProperties() {
    const steps = ["propertyInfo", "rentDetails", "media", "amenities", "screeningCriteria", "costsFees", "finalDetails", "review"];
    const dashboardContainer = document.getElementById("dashboard-container");
    dashboardContainer.innerHTML = "";

    steps.forEach(step => {
        const stepElement = document.createElement("div");
        stepElement.classList.add("dashboard-step");
        stepElement.innerHTML = `<h3>${step.replace(/([A-Z])/g, ' $1').trim()}</h3><button onclick="openStep('${step}')">Edit</button>`;
        dashboardContainer.appendChild(stepElement);
    });
}

// Function to open a step in the listing process
function openStep(step) {
    alert(`Opening step: ${step}`);
}

// Logout functionality
document.getElementById("logout-button").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "auth.html";
    }).catch((error) => {
        console.error("Error signing out:", error);
    });
});

// ========== PROFILE MODAL ==========
const profileBtn = document.getElementById("profile-button");
const profileModal = document.getElementById("profile-modal");
const profileCloseBtn = document.querySelector("#profile-modal .close");

if (profileBtn) {
    profileBtn.addEventListener("click", () => {
        profileModal.style.display = "block";
    });
}

if (profileCloseBtn) {
    profileCloseBtn.addEventListener("click", () => {
        profileModal.style.display = "none";
    });
}

window.addEventListener("click", (event) => {
    if (event.target === profileModal) {
        profileModal.style.display = "none";
    }
});
//form
window.addEventListener("DOMContentLoaded", () => {
    const signupModal = document.getElementById("signup-modal");
    const formTitle = document.getElementById("form-title");
    const categoryInput = document.getElementById("category");
    const getStartedButtons = document.querySelectorAll(".category-card button");
    const formCloseBtn = document.querySelector("#signup-modal .close");
  
    // Open modal on Get Started
    getStartedButtons.forEach(button => {
      button.addEventListener("click", () => {
        const categoryName = button.closest(".category-card").querySelector("h3").textContent;
        formTitle.textContent = `Get Started - ${categoryName}`;
        categoryInput.value = categoryName;
        signupModal.style.display = "flex";
      });
    });
  
    // Close modal on "X"
    if (formCloseBtn) {
      formCloseBtn.addEventListener("click", () => {
        signupModal.style.display = "none";
      });
    }
  
    // Close modal when clicking outside the modal
    window.addEventListener("click", (event) => {
      if (event.target === signupModal) {
        signupModal.style.display = "none";
      }
    });
  
    // Optional: Feedback on form submission
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
      signupForm.addEventListener("submit", () => {
        alert("Submitting your form. Please wait...");
      });
    }
  });
  