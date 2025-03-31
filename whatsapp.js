document.addEventListener("DOMContentLoaded", function () {
    const whatsappButton = document.createElement("div");
    whatsappButton.innerHTML = `
      <div id="whatsapp-chat" class="whatsapp-chat">
        <div class="whatsapp-header">
          <span>WhatsApp</span>
          <button onclick="hideChat()">×</button>
        </div>
        <div class="whatsapp-body">
          <p>Hello 👋<br>How can we help you?</p>
        </div>
       <a href="https://wa.me/254792530210" target="_blank" class="whatsapp-btn">Open chat</a>
      </div>
      <button id="whatsapp-btn" onclick="showChat()">
        <img src="https://img.icons8.com/color/48/000000/whatsapp.png" alt="WhatsApp" />
      </button>
    `;
    document.body.appendChild(whatsappButton);
  });
  
  function showChat() {
    document.getElementById("whatsapp-chat").style.display = "block";
  }
  
  function hideChat() {
    document.getElementById("whatsapp-chat").style.display = "none";
  }
  