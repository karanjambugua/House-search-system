// Define Chatbot HTML Structure
const chatHTML = `
  <div id="chat-container">
    <div id="chat-header">
      Caretaker Services
      <button id="close-btn">&times;</button>
    </div>
    <div id="chat-body"></div>
    <div id="chat-input-area">
      <input type="text" id="chat-input" placeholder="Type your message..." />
      <button id="chat-send">Send</button>
    </div>
  </div>
  <button id="chat-btn"></button>
`;

// Add Chatbot to the Page
document.body.insertAdjacentHTML("beforeend", chatHTML);

// Select Elements
const chatBtn = document.getElementById("chat-btn");
const chatContainer = document.getElementById("chat-container");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");
const closeBtn = document.getElementById("close-btn");

// Initial Variables
let chatOpen = false;
let inactivityTimer;
let agentLinkSent = false; // Track if the WhatsApp link was sent

// Show Initial Greeting
function showGreeting() {
  addBotMessage(
    "Hello, welcome to Caretaker Services! What kind of house are you looking for?"
  );
}

// Toggle Chat Visibility
function toggleChat() {
  chatOpen = !chatOpen;
  chatContainer.style.display = chatOpen ? "block" : "none";
  chatBtn.classList.toggle("hide", chatOpen);

  if (chatOpen) {
    showGreeting();
  }
}

// Send Message and Handle Responses
function sendMessage() {
  const userMessage = chatInput.value.trim();
  if (userMessage === "") return;

  addUserMessage(userMessage);
  chatInput.value = "";

  // Regardless of user response, go ahead and link to WhatsApp
  if (!agentLinkSent) {
    sendWhatsAppLink();
    agentLinkSent = true; // Prevent duplicate WhatsApp links
  }
}

// Handle Bot Responses — Now all messages eventually link to WhatsApp
function handleBotResponse(message) {
  if (message.includes("hello") || message.includes("hey")) {
    addBotMessage("Nice to know you! What house are you looking for?");
  } else if (
    message.includes("apartment") ||
    message.includes("bungalow") ||
    message.includes("mansion") ||
    message.includes("house")
  ) {
    addBotMessage("Great choice! Do you wish to speak to one of our agents?");
    startInactivityTimer(); // Start timer for inactivity fallback
  } else {
    addBotMessage("Do you wish to speak to one of our agents?");
    startInactivityTimer(); // Start timer again for any response
  }
}

// Add User Message
function addUserMessage(message) {
  addMessage(message, "user");
  // Immediately send WhatsApp link after any user message
  if (!agentLinkSent) {
    setTimeout(sendWhatsAppLink, 1000); // Delay slightly for a smooth UX
    agentLinkSent = true;
  }
}

// Add Bot Message
function addBotMessage(message) {
  addMessage(message, "bot");
}

// Add General Message
function addMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `${sender}-message`;
  messageDiv.innerHTML = `<strong>${
    sender === "bot" ? "Caretaker:" : "You:"
  }</strong> ${message}`;
  chatBody.appendChild(messageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Start Inactivity Timer to Send WhatsApp Link
function startInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    if (!agentLinkSent) {
      sendWhatsAppLink();
      agentLinkSent = true;
    }
  }, 10000); // 10 seconds of inactivity
}

// Send WhatsApp Link to the Agent
function sendWhatsAppLink() {
  const whatsappURL = `https://wa.me/254792530210?text=Hello%20Caretaker%20referred%20me%20to%20you.`;

  addBotMessage(`
    I would like to link you to our field agent. Here’s their WhatsApp number. Just tell them Caretaker referred you: 
    <br/><br/>
    📲 <a href="${whatsappURL}" target="_blank">Click to Chat with Agent</a>
    <br/><br/>
    ☎️ Or you can call them directly at: <strong>+254 792 530 210</strong>. We hope you get the property you're looking for!
  `);
}

// Close Chat
function closeChat() {
  chatContainer.style.display = "none";
  chatBtn.classList.remove("hide");
}

// Event Listeners
chatBtn.addEventListener("click", toggleChat);
chatSend.addEventListener("click", sendMessage);
closeBtn.addEventListener("click", closeChat);

// Auto Show Chat on Load
setTimeout(() => {
  toggleChat();
}, 1500);
