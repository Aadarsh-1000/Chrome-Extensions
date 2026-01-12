// Restore saved state and wire up listeners
document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('enabled');
  const itemInput = document.getElementById('item');

  // Load values from chrome.storage
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['enabled', 'itemText'], (res) => {
      if (res.enabled !== undefined) checkbox.checked = res.enabled;
      if (res.itemText !== undefined) itemInput.value = res.itemText;
    });

    checkbox.addEventListener('change', () => {
      chrome.storage.local.set({ enabled: checkbox.checked });
    });

    itemInput.addEventListener('input', () => {
      chrome.storage.local.set({ itemText: itemInput.value });
    });
  } else {
    // Fallback for non-extension environments
    const storedEnabled = localStorage.getItem('enabled');
    const storedText = localStorage.getItem('itemText');
    if (storedEnabled !== null) checkbox.checked = storedEnabled === 'true';
    if (storedText !== null) itemInput.value = storedText;

    checkbox.addEventListener('change', () => {
      localStorage.setItem('enabled', checkbox.checked);
    });
    itemInput.addEventListener('input', () => {
      localStorage.setItem('itemText', itemInput.value);
    });
  }
});
