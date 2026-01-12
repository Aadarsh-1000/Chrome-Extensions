const input = document.getElementById("command");
const timeEl = document.getElementById("time");
const boot = document.getElementById("bootSound");

// Voice greeting
window.onload = () => {
  speak("Good evening, sir. All systems are online.");
  if (boot) boot.play();
};

// Live clock
setInterval(() => {
  const now = new Date();
  timeEl.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}, 1000);

// Command handling
input.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;

  const cmd = input.value.toLowerCase().trim();
  input.value = "";

  if (cmd === "alert") {
    document.body.classList.add("alert");
    speak("Alert mode activated.");
    return;
  }

  if (cmd === "normal") {
    document.body.classList.remove("alert");
    speak("Returning to normal operations.");
    return;
  }

  if (cmd.startsWith("search ")) {
    const q = encodeURIComponent(cmd.replace("search ", ""));
    location.href = `https://www.google.com/search?q=${q}`;
    return;
  }

  speak("Command not recognized.");
});

// Voice helper
function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.9;
  msg.pitch = 0.7;
  speechSynthesis.speak(msg);
}
