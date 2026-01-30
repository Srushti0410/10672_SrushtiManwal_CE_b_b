const home = document.getElementById("home");
const chatContainer = document.getElementById("chatContainer");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatItems = document.querySelectorAll(".chat");

let currentChatId = null;

/* ------------------ STORAGE ------------------ */

const defaultChats = {
  professional: [
    { sender: "bot", text: "This is my professional resume in chat format." },
    { sender: "user", text: "What is your educational background?" },
    { sender: "bot", text: "I am pursuing Computer Science with a strong focus on fundamentals and development." },
    { sender: "user", text: "What is your CGPA?" },
    { sender: "bot", text: "I have maintained a consistent CGPA reflecting discipline and problem-solving ability." }
  ],
  experiences: [
    { sender: "bot", text: "Here are my experiences so far." },
    { sender: "user", text: "Have you worked on real projects?" },
    { sender: "bot", text: "Yes, I have built multiple UI-focused and logic-driven projects." }
  ],
  fun: [
    { sender: "bot", text: "This is my not-so-professional side 😄" },
    { sender: "user", text: "What do you enjoy outside work?" },
    { sender: "bot", text: "Designing aesthetic things, journaling, and exploring ideas." }
  ]
};

let chats = JSON.parse(localStorage.getItem("chats")) || defaultChats;

/* ------------------ HELPERS ------------------ */

function saveChats() {
  localStorage.setItem("chats", JSON.stringify(chats));
}

function clearChatUI() {
  chatContainer.innerHTML = "";
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function loadChat(chatId) {
  currentChatId = chatId;
  clearChatUI();

  home.classList.add("hidden");
  chatContainer.classList.remove("hidden");

  chats[chatId].forEach(msg => {
    addMessage(msg.text, msg.sender);
  });
}

/* ------------------ SIDEBAR CHAT CLICK ------------------ */

chatItems.forEach(item => {
  item.addEventListener("click", () => {
    chatItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const chatId = item.dataset.chat;
    loadChat(chatId);
  });
});

/* ------------------ SEND MESSAGE ------------------ */

function sendMessage() {
  const text = userInput.value.trim();
  if (!text || !currentChatId) return;

  // user message
  chats[currentChatId].push({ sender: "user", text });
  addMessage(text, "user");
  userInput.value = "";
  saveChats();

  // fake bot reply (you can replace later)
  setTimeout(() => {
    const reply = "Got it 👍 This answer will be portfolio-specific.";
    chats[currentChatId].push({ sender: "bot", text: reply });
    addMessage(reply, "bot");
    saveChats();
  }, 600);
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});
