function insertMemoriesButton() {
  // Avoid duplicate buttons
  if (document.getElementById('memories-insert-btn')) return;

  // Find the chat input area (contenteditable div)
  const editable = document.querySelector('[contenteditable="true"]');
  if (!editable) return;

  // Create the button
  const btn = document.createElement('button');
  btn.id = 'memories-insert-btn';
  btn.textContent = 'Insert Memories';
  btn.style.marginLeft = '8px';
  btn.style.padding = '6px 12px';
  btn.style.background = '#4F8AFA';
  btn.style.color = 'white';
  btn.style.border = 'none';
  btn.style.borderRadius = '4px';
  btn.style.cursor = 'pointer';

  // Insert the button after the input area
  editable.parentNode.appendChild(btn);

  btn.onclick = () => {
    console.log('Insert Memories button clicked');
    chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, (response) => {
      console.log('Received response from background:', response);
      const editable = document.querySelector('[contenteditable="true"]');
      if (editable && response && response.memories) {
        const contextMsg = 'Here are some memories, use them for context if required:';
        const memoriesText = response.memories.map(m => m.text).join('\n');
        const fullText = contextMsg + '\n' + memoriesText;
        editable.textContent += (editable.textContent ? '\n' : '') + fullText;
        editable.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  };
}

// Try to insert the button every second (in case UI changes)
setInterval(insertMemoriesButton, 1000);
