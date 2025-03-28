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
                </div>
            `;
        });
    } else {
        videoResults.innerHTML = "<p>No matches found. Try searching a different keyword.</p>";
    }
}

// Ensure the function runs when the page loads
window.onload = displayResults;
