"use strict";

const checkbox = document.getElementById("enabled");
const input = document.getElementById("item");

// Badge helper
function setBadgeText(enabled) {
  chrome.action.setBadgeText({ text: enabled ? "ON" : "OFF" });
}

// Load saved values
chrome.storage.sync.get(
  { enabled: false, item: "" },
  (data) => {
    checkbox.checked = data.enabled;
    input.value = data.item;
    setBadgeText(data.enabled);
  }
);

// Toggle system
checkbox.addEventListener("change", () => {
  const enabled = checkbox.checked;

  chrome.storage.sync.set({ enabled });
  chrome.runtime.sendMessage({ enabled });
  setBadgeText(enabled);
});

// Update keyword
input.addEventListener("input", () => {
  chrome.storage.sync.set({ item: input.value });
});
