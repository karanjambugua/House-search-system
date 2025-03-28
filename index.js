document.addEventListener("DOMContentLoaded", function () {

    function toggleStatus(type) {
        document.getElementById("budget1").style.display = "none";
        document.getElementById("budget2").style.display = "none";
        document.getElementById("propertyTypeRent").style.display = "none";
        document.getElementById("propertyTypeSale").style.display = "none";

        document.querySelectorAll('.status-button').forEach(button => {
            button.classList.remove('active');
        });

        if (type === "rent") {
            document.getElementById("budget1").style.display = "inline-block";
            document.getElementById("propertyTypeRent").style.display = "inline-block";
            document.getElementById("statusRent").classList.add('active');
        } else if (type === "buy") {
            document.getElementById("budget2").style.display = "inline-block";
            document.getElementById("propertyTypeSale").style.display = "inline-block";
            document.getElementById("statusBuy").classList.add('active');
        } else {
            document.getElementById("statusAll").classList.add('active');
        }
    }

    function performSearch() {
        let selectedStatus = document.querySelector(".status-button.active");
        if (!selectedStatus) {
            alert("Please select a status (Buy or Rent).");
            return;
        }

        let status = selectedStatus.innerText.toLowerCase();
        let city = document.getElementById("city").value;
        let propertyType = status === "rent" ? document.getElementById("propertyTypeRent").value : document.getElementById("propertyTypeSale").value;
        let budget = status === "rent" ? document.getElementById("budget1").value : document.getElementById("budget2").value;

        let queryString = `results.html?status=${encodeURIComponent(status)}&city=${encodeURIComponent(city)}&propertyType=${encodeURIComponent(propertyType)}&budget=${encodeURIComponent(budget)}`;
        window.location.href = queryString;
    }

    window.performSearch = performSearch;
    window.toggleStatus = toggleStatus;
});
// Slideshow Functionality
document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slide");

    function showSlides() {
        slides.forEach((slide, index) => {
            slide.style.display = (index === slideIndex) ? "block" : "none";
        });

        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }

        setTimeout(showSlides, 3000); // Change image every 3 seconds
    }

    showSlides();
});

