// Create context menu on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'remember_this',
    title: 'Remember this',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'remember_this' && info.selectionText) {
    chrome.storage.local.get({ memories: [] }, (result) => {
      const memories = result.memories;
      memories.push({ text: info.selectionText, date: new Date().toISOString() });
      chrome.storage.local.set({ memories });
    });
  }
});

// Existing message handling for ChatGPT injection
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received message:', message);
  if (message.type === 'GET_MEMORIES') {
    chrome.storage.local.get({ memories: [] }, (result) => {
      console.log('Background sending memories:', result.memories);
      sendResponse({ memories: result.memories });
    });
    return true;
  }
}); 