document.addEventListener("DOMContentLoaded", function () {
    const buyButton = document.getElementById("statusBuy");
    const rentButton = document.getElementById("statusRent");
    const budget1 = document.getElementById("budget1");
    const budget2 = document.getElementById("budget2");
    const propertyTypeRent = document.getElementById("propertyTypeRent");
    const propertyTypeSale = document.getElementById("propertyTypeSale");

    function toggleStatus(type) {
        budget1.style.display = "none";
        budget2.style.display = "none";
        propertyTypeRent.style.display = "none";
        propertyTypeSale.style.display = "none";

        if (type === "rent") {
            budget1.style.display = "inline-block";
            propertyTypeRent.style.display = "inline-block";
            rentButton.style.background = "#dc3545";
            rentButton.style.color = "white";
            buyButton.style.background = "white";
            buyButton.style.color = "black";
        } else if (type === "buy") {
            budget2.style.display = "inline-block";
            propertyTypeSale.style.display = "inline-block";
            buyButton.style.background = "#dc3545";
            buyButton.style.color = "white";
            rentButton.style.background = "white";
            rentButton.style.color = "black";
        }
    }

    buyButton.addEventListener("click", function () {
        toggleStatus("buy");
    });

    rentButton.addEventListener("click", function () {
        toggleStatus("rent");
    });

    document.querySelector(".search-button").addEventListener("click", function () {
        let status = buyButton.style.background === "rgb(220, 53, 69)" ? "buy" : "rent";
        let city = document.getElementById("city").value;
        let propertyType = status === "rent" ? propertyTypeRent.value : propertyTypeSale.value;
        let budget = status === "rent" ? budget1.value : budget2.value;

        alert(`Searching for: ${status}, ${city}, ${propertyType}, ${budget}`);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const scrollUpButton = document.createElement("button");
    scrollUpButton.innerText = "↑";
    scrollUpButton.id = "scrollUpButton";
    scrollUpButton.style.position = "fixed";
    scrollUpButton.style.bottom = "20px";
    scrollUpButton.style.right = "20px";
    scrollUpButton.style.padding = "10px";
    scrollUpButton.style.background = "#f59e0b";
    scrollUpButton.style.color = "white";
    scrollUpButton.style.border = "none";
    scrollUpButton.style.borderRadius = "5px";
    scrollUpButton.style.cursor = "pointer";
    scrollUpButton.style.display = "none";

    document.body.appendChild(scrollUpButton);

    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            scrollUpButton.style.display = "block";
        } else {
            scrollUpButton.style.display = "none";
        }
    });

    scrollUpButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

function updateVideoPagination() {
    const hardcodedVideos = [
        { src: "Projects/1 Bedroom Kiambu.mp4", title: "1 Bedroom - Kiambu" },
        { src: "Projects/1 bedroom Thika.mp4", title: "1 Bedroom - Thika" },
        { src: "Projects/1bedroom Kutus.mp4", title: "1 Bedroom - Kutus" },
        { src: "Projects/2 bedroom ruiru 20k.mp4", title: "2 Bedroom - Ruiru" },
        { src: "Projects/Bedsitter Embu.mp4", title: "Bedsitter - Embu" },
        { src: "Projects/Bedsitter Juja.mp4", title: "Bedsitter - Juja" },
        { src: "Projects/Bedsitter Kerugoya.mp4", title: "Bedsitter - Kerugoya" },
        { src: "Projects/Bedsitter Kiambu.mp4", title: "Bedsitter - Kiambu" },
        { src: "Projects/Bedsitter Kutus 2.mp4", title: "Bedsitter - Kutus 2" },
        { src: "Projects/Bedsitter Kutus 3.mp4", title: "Bedsitter - Kutus 3" },
        { src: "Projects/Bedsitter Thika 2.mp4", title: "Bedsitter - Thika 2" },
        { src: "Projects/Bedsitter Thikaroad 2.mp4", title: "Bedsitter - Thikaroad 2" },
        { src: "Projects/Bedsitter Utawala.mp4", title: "Bedsitter - Utawala" },
        { src: "Projects/Embu 1 bedroom 15k.mp4", title: "Embu 1 Bedroom - 15k" },
        { src: "Projects/Embu 2 bedroom.mp4", title: "Embu 2 Bedroom" },
        { src: "Projects/Kahawa West 1 bedroom.mp4", title: "Kahawa West 1 Bedroom" },
        { src: "Projects/Kerugoya 1 bedroom.mp4", title: "Kerugoya 1 Bedroom" },
        { src: "Projects/Kerugoya 2 bedroom.mp4", title: "Kerugoya 2 Bedroom" },
        { src: "Projects/Kimbo 1 bed.mp4", title: "Kimbo 1 Bedroom" },
        { src: "Projects/Roysambu Bedsitter.mp4", title: "Roysambu Bedsitter" },
        { src: "Projects/Roysambu 1 bedroom 15k.mp4", title: "Roysambu 1 Bedroom - 15k" },
        { src: "Projects/Utawala 1 bedroom.mp4", title: "Utawala 1 Bedroom" },
        { src: "Projects/Utawala 2 bedroom.mp4", title: "Utawala 2 Bedroom" }
    ];

    fetch("/videos.json")
        .then(res => res.json())
        .then(dynamicVideos => {
            const allVideos = hardcodedVideos.concat(dynamicVideos);
            const videosPerPage = 6;
            let currentPage = 1;
            const totalPages = Math.ceil(allVideos.length / videosPerPage);
            const videoContainer = document.getElementById("video-container");
            const pageNumbersContainer = document.getElementById("page-numbers");

            function loadVideos(page) {
                videoContainer.innerHTML = "";
                const start = (page - 1) * videosPerPage;
                const end = start + videosPerPage;
                const pageVideos = allVideos.slice(start, end);

                pageVideos.forEach(video => {
                    const videoItem = document.createElement("div");
                    videoItem.classList.add("video-item");
                    videoItem.innerHTML = `
                        <video controls>
                            <source src="${video.src}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <p>${video.title}</p>
                    `;
                    videoContainer.appendChild(videoItem);
                });

                updatePagination();
            }

            function updatePagination() {
                pageNumbersContainer.innerHTML = "";
                for (let i = 1; i <= totalPages; i++) {
                    const btn = document.createElement("button");
                    btn.textContent = i;
                    btn.classList.add("page-btn");
                    if (i === currentPage) btn.classList.add("active");
                    btn.addEventListener("click", () => {
                        currentPage = i;
                        loadVideos(currentPage);
                    });
                    pageNumbersContainer.appendChild(btn);
                }

                document.querySelector(".prev-btn").disabled = currentPage === 1;
                document.querySelector(".next-btn").disabled = currentPage === totalPages;
                document.querySelector(".first-btn").disabled = currentPage === 1;
                document.querySelector(".last-btn").disabled = currentPage === totalPages;
            }

            document.querySelector(".prev-btn").addEventListener("click", () => {
                if (currentPage > 1) {
                    currentPage--;
                    loadVideos(currentPage);
                }
            });

            document.querySelector(".next-btn").addEventListener("click", () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    loadVideos(currentPage);
                }
            });

            document.querySelector(".first-btn").addEventListener("click", () => {
                currentPage = 1;
                loadVideos(currentPage);
            });

            document.querySelector(".last-btn").addEventListener("click", () => {
                currentPage = totalPages;
                loadVideos(currentPage);
            });

            loadVideos(currentPage);
        })
        .catch(err => {
            console.error("Error fetching dynamic videos:", err);
        });
}

document.addEventListener("DOMContentLoaded", updateVideoPagination);
// Handle Tabs
function openTab(evt, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
      tab.style.display = 'none';
    });
  
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
  
    // Show the selected tab and mark it active
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.classList.add('active');
  }
  
  // Show the default tab on page load
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('defaultTab').click();
  });
  
  // Handle FAQ with Arrow
  function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');
  
    if (answer.style.display === 'block') {
      answer.style.display = 'none';
      arrow.innerHTML = '&#9662;'; // Down Arrow
    } else {
      answer.style.display = 'block';
      arrow.innerHTML = '&#9652;'; // Up Arrow
    }
  }
  