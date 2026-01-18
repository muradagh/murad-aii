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

  // إضافة رسالة Thinking
  const thinkingDiv = document.createElement("div");
  thinkingDiv.className = "ai";
  thinkingDiv.innerText = lang === "ar" ? "⏳ جاري التفكير..." : "⏳ Thinking...";
  chatBox.appendChild(thinkingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    // رابط Serverless Function على Vercel
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, mode, lang })
    });

    const data = await res.json();
    thinkingDiv.innerText = data.reply;
  } catch (err) {
    thinkingDiv.innerText = "❌ Error: Unable to get response from AI.";
    console.error(err);
  }
}
