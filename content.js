"use strict"

const blurFilter = "blur(6px)"
let textToBlur = ""

// Search this DOM node for text to blur and blur the parent element if found
function processNode(node) {
  if (node.childNodes.length > 0) {
    Array.from(node.childNodes).forEach(processNode)
  }

  if (
    node.nodeType === Node.TEXT_NODE &&
    node.textContent !== null &&
    node.textContent.trim().length > 0
  ) {
    const parent = node.parentElement
    if (parent === null) {
      return
    }

    if (textToBlur.length > 0 && node.textContent.includes(textToBlur)) {
      parent.style.filter = blurFilter
    } else {
      parent.style.filter = "none"
    }
  }
}

// Observe the DOM for changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach(processNode)
    } else {
      processNode(mutation.target)
    }
  })
})

// Enable the content script and get initial data
chrome.storage.sync.get(["enabled", "item"], (data) => {
  if (data.enabled) {
    textToBlur = data.item || ""
    processNode(document.body)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }
})