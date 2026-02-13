/* ================= SAFE ELEMENT SELECTION ================= */

const home = document.getElementById("home");
const chatContainer = document.getElementById("chatContainer");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatItems = document.querySelectorAll(".chat");
const examples = document.querySelectorAll(".example");
const themeToggle = document.getElementById("themeToggle");

let currentChatId = null;

/* ================= BOT REPLY LOGIC ================= */

function getBotReply(message) {

  if (message.includes("professionally")) {
    return "I am a Computer Engineering student passionate about web development and creative design.";
  }

  else if (message.includes("project")) {
    return "You can explore my projects including my Portfolio Website and Clone GPT project.";
  }

  else if (message.includes("skill")) {
    return "My key skills include HTML, CSS, JavaScript, Flutter, and UI Design.";
  }

  else if (message.includes("achievement")) {
    return "I am proud of building real-world projects and continuously improving my technical skills.";
  }

  else {
    return "I'm still learning! Try asking about my skills, projects, or achievements 😊";
  }
}

/* ================= STORAGE ================= */

const defaultChats = {
  professional: [],
  experiences: [],
  fun: []
};

let chats = JSON.parse(localStorage.getItem("chats")) || defaultChats;

function saveChats() {
  localStorage.setItem("chats", JSON.stringify(chats));
}

/* ================= HELPERS ================= */

function clearChatUI() {
  if (chatContainer) chatContainer.innerHTML = "";
}

function addMessage(text, sender) {
  if (!chatContainer) return;

  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function loadChat(chatId) {
  currentChatId = chatId;
  clearChatUI();

  if (home) home.classList.add("hidden");
  if (chatContainer) chatContainer.classList.remove("hidden");

  if (chats[chatId]) {
    chats[chatId].forEach(msg => {
      addMessage(msg.text, msg.sender);
    });
  }
}

/* ================= SIDEBAR CLICK ================= */

if (chatItems.length > 0) {
  chatItems.forEach(item => {
    item.addEventListener("click", () => {
      chatItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const chatId = item.dataset.chat;
      if (chatId) loadChat(chatId);
    });
  });
}

/* ================= SEND MESSAGE ================= */

function sendMessage() {
  if (!userInput) return;

  const text = userInput.value.trim();
  if (!text || !currentChatId) return;

  chats[currentChatId].push({ sender: "user", text });
  addMessage(text, "user");
  userInput.value = "";
  saveChats();

  setTimeout(() => {
    const reply = getBotReply(text.toLowerCase());
    chats[currentChatId].push({ sender: "bot", text: reply });
    addMessage(reply, "bot");
    saveChats();
  }, 600);
}

if (sendBtn && userInput) {
  sendBtn.addEventListener("click", sendMessage);

  userInput.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });
}

/* ================= EXAMPLE CLICK ================= */

if (examples.length > 0) {
  examples.forEach(example => {
    example.addEventListener("click", function () {

      if (!userInput) return;

      userInput.value = this.innerText;

      if (!currentChatId) {
        loadChat("professional");
        const firstChat = document.querySelector('[data-chat="professional"]');
        if (firstChat) firstChat.classList.add("active");
      }

      sendMessage();
    });
  });
}

/* ================= THEME TOGGLE ================= */

if (themeToggle) {
  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "☀ Light Mode";
    } else {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "🌙 Dark Mode";
    }
  });
}

/* ================= LOAD SAVED THEME ================= */

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (themeToggle) themeToggle.textContent = "☀ Light Mode";
  } else {
    if (themeToggle) themeToggle.textContent = "🌙 Dark Mode";
  }
});
const clearBtn = document.getElementById("clearChat");

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    if (!currentChatId) return;
    chats[currentChatId] = [];
    saveChats();
    clearChatUI();
  });
}
