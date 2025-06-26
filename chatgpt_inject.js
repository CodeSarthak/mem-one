function insertMemoriesUI() {
  // Avoid duplicate UI
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
    // Fetch groups and memories
    chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, (data) => {
      const groups = data.groups || ['Default'];

      // Create modal overlay
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = 0;
      modal.style.left = 0;
      modal.style.width = '100vw';
      modal.style.height = '100vh';
      modal.style.background = 'rgba(0,0,0,0.2)';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.zIndex = 99999;

      // Modal content
      const modalContent = document.createElement('div');
      modalContent.style.background = 'white';
      modalContent.style.padding = '24px';
      modalContent.style.borderRadius = '8px';
      modalContent.style.boxShadow = '0 2px 16px rgba(0,0,0,0.2)';
      modalContent.style.display = 'flex';
      modalContent.style.flexDirection = 'column';
      modalContent.style.alignItems = 'center';

      const label = document.createElement('label');
      label.textContent = 'Select a group to insert:';
      label.style.marginBottom = '12px';

      const groupSelect = document.createElement('select');
      groupSelect.id = 'memories-group-select';
      groupSelect.style.marginBottom = '16px';
      groupSelect.style.background = 'white';
      groupSelect.style.color = '#222';
      groupSelect.style.border = '1px solid #ccc';
      groupSelect.style.borderRadius = '4px';
      groupSelect.style.padding = '4px 8px';
      groupSelect.style.fontSize = '16px';
      groups.forEach(group => {
        const option = document.createElement('option');
        option.value = group;
        option.textContent = group;
        option.style.color = '#222';
        option.style.background = 'white';
        groupSelect.appendChild(option);
      });

      const insertBtn = document.createElement('button');
      insertBtn.textContent = 'Insert';
      insertBtn.style.background = '#4F8AFA';
      insertBtn.style.color = 'white';
      insertBtn.style.border = 'none';
      insertBtn.style.borderRadius = '4px';
      insertBtn.style.padding = '6px 16px';
      insertBtn.style.cursor = 'pointer';
      insertBtn.style.marginRight = '8px';

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.style.background = '#eee';
      cancelBtn.style.color = '#333';
      cancelBtn.style.border = 'none';
      cancelBtn.style.borderRadius = '4px';
      cancelBtn.style.padding = '6px 16px';
      cancelBtn.style.cursor = 'pointer';

      // Insert memories on click
      insertBtn.onclick = () => {
        const selectedGroup = groupSelect.value;
        const groupMemories = (data.memories && data.memories[selectedGroup]) || [];
        if (groupMemories.length === 0) {
          modal.remove();
          return;
        }
        const contextMsg = `Here are some memories from "${selectedGroup}", use them for context if required:`;
        const memoriesText = groupMemories.map(m => m.text).join('\n');
        const fullText = contextMsg + '\n' + memoriesText;
        const editable = document.querySelector('[contenteditable="true"]');
        if (editable) {
          editable.textContent += (editable.textContent ? '\n' : '') + fullText;
          editable.dispatchEvent(new Event('input', { bubbles: true }));
        }
        modal.remove();
      };

      cancelBtn.onclick = () => {
        modal.remove();
      };

      // Assemble modal
      modalContent.appendChild(label);
      modalContent.appendChild(groupSelect);
      const btnRow = document.createElement('div');
      btnRow.style.display = 'flex';
      btnRow.appendChild(insertBtn);
      btnRow.appendChild(cancelBtn);
      modalContent.appendChild(btnRow);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
    });
  };
}

// Try to insert the UI every second (in case UI changes)
setInterval(insertMemoriesUI, 1000);
