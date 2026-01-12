"use strict"

// Function to update the "ON" or "OFF" text on the extension icon
function setBadgeText(enabled) {
  const text = enabled ? "ON" : "OFF"
  void chrome.action.setBadgeText({ text: text })
}

// Update the badge when the extension is first installed or loaded
chrome.storage.sync.get("enabled", (data) => {
  setBadgeText(!!data.enabled)
})

// Listen for changes in storage (from the popup) to update the badge in real-time
chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    setBadgeText(changes.enabled.newValue)
  }
})