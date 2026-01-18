const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const modes = document.querySelectorAll(".mode");

let lang = "en";
let mode = "chat";

sendBtn.onclick = sendMessage;

input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

modes.forEach(btn => {
  btn.onclick = () => {
    modes.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    mode = btn.dataset.mode;
  };
});

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = type;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  addMessage(lang === "ar" ? "⏳ جاري التفكير..." : "⏳ Thinking...", "ai");

  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message: text, mode, lang })
  });

  const data = await res.json();
  chatBox.lastChild.innerText = data.reply;
}
