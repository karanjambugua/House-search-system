const videos = [
    { src: "Projects/1 Bedroom Kiambu.mp4", title: "1 Bedroom - Kiambu" },
    { src: "Projects/1 bedroom Thika.mp4", title: "1 Bedroom - Thika" },
    { src: "Projects/1bedroom Kutus.mp4", title: "1 Bedroom - Kutus" },
    { src: "Projects/2 bedroom ruiru 20k.mp4", title: "2 Bedroom - Ruiru" },
    { src: "Projects/Bedsitter Embu.mp4", title: "Bedsitter - Embu" },
    { src: "Projects/Bedsitter Juja.mp4", title: "Bedsitter - Juja" },
    { src: "Projects/Bedsitter Kerugoya.mp4", title: "Bedsitter - Kerugoya" },
    { src: "Projects/Bedsitter Kiambu.mp4", title: "Bedsitter - Kiambu" },
    { src: "Projects/Bedsitter Kutus 2.mp4", title: "Bedsitter - Kutus 2" },
    { src: "Projects/Kahawa West 1 bedroom.mp4", title: "Kahawa West 1 Bedroom" },
    { src: "Projects/Roysambu Bedsitter.mp4", title: "Roysambu Bedsitter" },
    { src: "Projects/Roysambu 1 bedroom 15k.mp4", title: "Roysambu 1 Bedroom - 15k" },
    { src: "Projects/Embu 1 bedroom 15k.mp4", title: "Embu 1 Bedroom - 15k" },
    { src: "Projects/Embu 2 bedroom.mp4", title: "Embu 2 Bedroom" },
    { src: "Projects/Kimbo 1 bed.mp4", title: "Kimbo 1 Bedroom" },
    { src: "Projects/Kerugoya 1 bedroom.mp4", title: "Kerugoya 1 Bedroom" },
    { src: "Projects/Kerugoya 2 bedroom.mp4", title: "Kerugoya 2 Bedroom" },
    { src: "Projects/Utawala 1 bedroom.mp4", title: "Utawala 1 Bedroom" },
    { src: "Projects/Utawala 2 bedroom.mp4", title: "Utawala 2 Bedroom" }
];

// Get Query Parameters
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        status: params.get("status"),
        city: params.get("city"),
        propertyType: params.get("propertyType"),
        budget: params.get("budget")
    };
}

// Display Search Results
function displayResults() {
    const queryParams = getQueryParams();
    console.log("Received search parameters:", queryParams);
    
    const videoResults = document.getElementById("video-results");
    if (!videoResults) {
        console.error("Error: video-results element not found!");
        return;
    }

    const { city, propertyType, budget } = queryParams;

    // Debugging: Show query
    console.log(`Filtering videos for city: ${city}, propertyType: ${propertyType}, budget: ${budget}`);

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(city ? city.toLowerCase() : "") ||
        video.title.toLowerCase().includes(propertyType ? propertyType.toLowerCase() : "")
    );

    videoResults.innerHTML = "";
    if (filteredVideos.length > 0) {
        filteredVideos.forEach(video => {
            videoResults.innerHTML += `
                <div class="video-card">
                    <video controls>
                        <source src="${video.src}" type="video/mp4">
                    </video>
                    <p>${video.title}</p>
                    <button class="request-tour-btn" onclick="openBookingModal(this)">Book a House Tour</button>
                </div>
            `;
        });
    } else {
        videoResults.innerHTML = "<p>No results found. Try refining your search.</p>";
    }
}

// Refine Search on the Results Page
function refineSearch() {
    const query = document.getElementById("search-input").value.toLowerCase();
    console.log("Refining search for:", query);

    const videoResults = document.getElementById("video-results");

    const matchedVideos = videos.filter(video =>
        video.title.toLowerCase().includes(query)
    );

    videoResults.innerHTML = "";
    if (matchedVideos.length > 0) {
        matchedVideos.forEach(video => {
            videoResults.innerHTML += `
                <div class="video-card">
                    <video controls>
                        <source src="${video.src}" type="video/mp4">
                    </video>
                    <p>${video.title}</p>
                    <button class="request-tour-btn" onclick="openBookingModal('${video.title}')">Book a House Tour</button>
                </div>
            `;
        });
    } else {
        videoResults.innerHTML = "<p>No matches found. Try searching a different keyword.</p>";
    }
}

// Ensure the function runs when the page loads
window.onload = displayResults;
// Open the Tour Modal
function openTourModal(propertyName) {
    const modal = document.getElementById("tour-modal");
    const propertyInput = document.getElementById("property");
    const tourTitle = document.getElementById("tour-title");

    propertyInput.value = propertyName;
    tourTitle.textContent = `Book a Tour for ${propertyName}`;
    modal.style.display = "block";
}

// Close the Tour Modal
function closeTourModal() {
    const modal = document.getElementById("tour-modal");
    modal.style.display = "none";
}

// Close Modal if Clicking Outside
window.onclick = function (event) {
    const modal = document.getElementById("tour-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
// Add 'Book a House Tour' button only inside video containers
function addBookingButtons() {
    const videoCards = document.querySelectorAll('.video-card'); // Target correct video containers
    videoCards.forEach(card => {
        // Avoid adding duplicate buttons
        if (!card.querySelector('.request-tour-btn')) {
            const button = document.createElement('button');
            button.className = 'request-tour-btn';
            button.innerText = 'Book a House Tour';
            button.onclick = () => openBookingModal(card);
            card.appendChild(button);
        }
    });
}
// Open the modal and populate tour details dynamically
function openBookingModal(propertyName) {
    document.getElementById("property-name").value = propertyName;
    document.getElementById("booking-modal").style.display = "block";
}


// Handle Form Submission with Daraja Integration
document.getElementById("booking-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from reloading

    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const property = formData.get("property-name");

    // ================================
    // ✅ Send Form Data to Formspree (Email Notification)
    // ================================
    const emailResponse = await fetch("https://formspree.io/f/xzzerpeq", {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "application/json"
        }
    });

    if (emailResponse.ok) {
        console.log("✅ Form details sent to email successfully!");
    } else {
        alert("❌ Error sending form details. Please try again.");
        return;
    }

    // ================================
    // ✅ Process Daraja Payment for KES 100 via PHP on Heroku
    // ================================
    const paymentResponse = await fetch("https://caretaker.herokuapp.com/stk_initiate.php", {
        method: "POST",
        body: formData,
    });

    const result = await paymentResponse.json();
    if (result.ResponseCode === "0") {
        alert(`✅ Tour booked successfully for ${property}. We will get back to you shortly.`);
        closeBookingModal(); // Close modal after successful submission
    } else {
        alert("❌ Payment failed. Please try again.");
    }
});

// ================================
// ✅ Close Booking Modal Function
// ================================
function closeBookingModal() {
    document.getElementById("booking-modal").style.display = "none";
}

// ================================
// ✅ Close Modal When Clicking Outside
// ================================
window.onclick = function (event) {
    const modal = document.getElementById("booking-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
