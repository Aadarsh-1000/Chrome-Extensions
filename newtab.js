const input = document.getElementById("command");
const radar = document.getElementById("radar");
const clockTime = document.getElementById("clockTime");

/* ===============================
   CLOCK WIDGET
================================ */
setInterval(() => {
  const now = new Date();
  clockTime.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}, 1000);

/* ===============================
   DRAGGABLE WIDGETS
================================ */
document.querySelectorAll(".widget").forEach(widget => {
  let isDragging = false, offsetX, offsetY;

  widget.addEventListener("mousedown", e => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    widget.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    widget.style.left = `${e.pageX - offsetX}px`;
    widget.style.top = `${e.pageY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    widget.style.cursor = "grab";
  });
});

/* ===============================
   GESTURE MODE (MOUSE)
================================ */
let startX = 0, startY = 0;

document.addEventListener("mousedown", e => {
  startX = e.clientX;
  startY = e.clientY;
});

document.addEventListener("mouseup", e => {
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  // Swipe Right → ALERT
  if (dx > 150 && Math.abs(dy) < 80) {
    document.body.classList.add("alert");
    speak("Alert mode activated.");
  }

  // Swipe Left → NORMAL
  if (dx < -150 && Math.abs(dy) < 80) {
    document.body.classList.remove("alert");
    speak("Returning to normal operations.");
  }

  // Swipe Down → Focus input
  if (dy > 150 && Math.abs(dx) < 80) {
    input.focus();
    speak("Command input ready.");
  }
});

/* ===============================
   COMMAND HANDLER
================================ */
input.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;

  const cmd = input.value.toLowerCase().trim();
  input.value = "";

  if (cmd.startsWith("search ")) {
    location.href =
      "https://www.google.com/search?q=" +
      encodeURIComponent(cmd.replace("search ", ""));
    return;
  }

  speak("Command executed.");
});

/* ===============================
   VOICE
================================ */
function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.9;
  msg.pitch = 0.7;
  speechSynthesis.speak(msg);
}
