"use strict"

let textToHighlight = ""

/* ===============================
   INJECT TRUE JARVIS HUD CSS
================================ */
const style = document.createElement("style")
style.textContent = `
  .jarvis-hud {
    position: relative !important;
    background:
      linear-gradient(135deg, rgba(0,234,255,0.08), rgba(0,234,255,0.02)),
      repeating-linear-gradient(
        0deg,
        rgba(0,234,255,0.05) 0px,
        rgba(0,234,255,0.05) 1px,
        transparent 1px,
        transparent 4px
      ) !important;

    border: 1px solid rgba(0,234,255,0.6) !important;
    border-left: 3px solid #00eaff !important;
    color: #aef6ff !important;

    font-family: "Orbitron", "Consolas", monospace !important;
    text-shadow: 0 0 6px rgba(0,234,255,0.9);
    padding: 6px 10px !important;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* HUD CORNERS */
  .jarvis-hud::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    border:
      1px solid transparent;
    clip-path: polygon(
      0 0, 92% 0, 100% 8%, 100% 100%,
      8% 100%, 0 92%
    );
    box-shadow: inset 0 0 18px rgba(0,234,255,0.5);
  }

  /* SCANNING LINE */
  .jarvis-hud::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      #00eaff,
      transparent
    );
    animation: jarvisScan 2.2s linear infinite;
    opacity: 0.8;
  }

  @keyframes jarvisScan {
    0% { top: 0%; }
    100% { top: 100%; }
  }
`
document.documentElement.appendChild(style)

/* ===============================
   PROCESS DOM
================================ */
function processNode(node) {
  if (node.childNodes.length > 0) {
    node.childNodes.forEach(processNode)
  }

  if (
    node.nodeType === Node.TEXT_NODE &&
    node.textContent &&
    node.textContent.trim().length > 0
  ) {
    const parent = node.parentElement
    if (!parent) return

    if (textToHighlight && node.textContent.includes(textToHighlight)) {
      parent.classList.add("jarvis-hud")
    } else {
      parent.classList.remove("jarvis-hud")
    }
  }
}

/* ===============================
   OBSERVER
================================ */
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach(processNode)
    } else {
      processNode(mutation.target)
    }
  })
})

/* ===============================
   ENABLE EXTENSION
================================ */
chrome.storage.sync.get(["enabled", "item"], (data) => {
  if (!data.enabled) return

  textToHighlight = data.item || ""
  processNode(document.body)

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
})
