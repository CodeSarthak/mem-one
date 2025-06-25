// Listen for selection changes and show a floating button
let addButton = null;
let lastSelection = '';

function createButton(x, y) {
  if (addButton) addButton.remove();
  addButton = document.createElement('button');
  addButton.textContent = 'Save';
  addButton.style.position = 'fixed';
  addButton.style.top = y + 'px';
  addButton.style.left = x + 'px';
  addButton.style.zIndex = 9999;
  addButton.style.background = '#4F8AFA';
  addButton.style.color = 'white';
  addButton.style.border = 'none';
  addButton.style.borderRadius = '4px';
  addButton.style.padding = '6px 12px';
  addButton.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
  addButton.style.cursor = 'pointer';
  addButton.style.fontSize = '14px';
  addButton.style.fontFamily = 'inherit';
  addButton.style.transition = 'opacity 0.2s';
  addButton.onmousedown = e => e.preventDefault();
  addButton.onclick = () => {
    if (lastSelection) {
      chrome.runtime.sendMessage({ type: 'ADD_MEMORY', text: lastSelection });
    }
    removeButton();
    window.getSelection().removeAllRanges();
  };
  document.body.appendChild(addButton);
}

function removeButton() {
  if (addButton) {
    addButton.remove();
    addButton = null;
  }
}

document.addEventListener('selectionchange', () => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Received message:', message);
    // ...existing code...
  });
  const selection = window.getSelection();
  const text = selection ? selection.toString().trim() : '';
  console.log('Selection:', text);
  if (text && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    console.log('Rect:', rect);
    createButton(rect.right + window.scrollX, rect.bottom + window.scrollY + 5);
    lastSelection = text;
  } else {
    removeButton();
    lastSelection = '';
  }
});

document.addEventListener('scroll', removeButton, true);
document.addEventListener('mousedown', (e) => {
  if (addButton && !addButton.contains(e.target)) {
    removeButton();
  }
}); 