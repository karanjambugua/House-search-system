document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("upload-form");
    const videoInput = document.getElementById("video-file");
    const dragArea = document.getElementById("drag-area");
    const videoPreview = document.getElementById("video-preview");
  
    // ========== Drag & Drop Highlight ==========
    dragArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      dragArea.classList.add("dragover");
    });
  
    dragArea.addEventListener("dragleave", () => {
      dragArea.classList.remove("dragover");
    });
  
    dragArea.addEventListener("drop", (e) => {
      e.preventDefault();
      dragArea.classList.remove("dragover");
      const file = e.dataTransfer.files[0];
      if (file && file.type === "video/mp4") {
        videoInput.files = e.dataTransfer.files;
        showPreview(file);
      } else {
        alert("Please upload a valid .mp4 video file.");
      }
    });
  
    // ========== Click to Trigger File Input ==========
    dragArea.addEventListener("click", () => {
      videoInput.click();
    });
  
    videoInput.addEventListener("change", () => {
      const file = videoInput.files[0];
      if (file) {
        showPreview(file);
      }
    });
  
    // ========== Preview Function ==========
    function showPreview(file) {
      const url = URL.createObjectURL(file);
      videoPreview.src = url;
      videoPreview.style.display = "block";
    }
  
    // ========== Submit Form ==========
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const location = document.getElementById("location").value.trim();
      const price = document.getElementById("price").value.trim();
      const videoFile = videoInput.files[0];
  
      if (!name || !location || !price || !videoFile) {
        alert("Please fill in all fields and select a video.");
        return;
      }
  
      const formData = new FormData();
      formData.append("name", name);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("video", videoFile);
  
      try {
        const response = await fetch("/upload", {
          method: "POST",
          body: formData
        });
  
        const result = await response.json();
        if (response.ok) {
          alert("Video uploaded successfully!");
          form.reset();
          videoPreview.style.display = "none";
        } else {
          alert("Upload failed: " + result.message);
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("An error occurred during upload.");
      }
    });
  });
  