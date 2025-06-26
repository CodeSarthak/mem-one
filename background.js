// Helper to get groups and memories
function getStorage(cb) {
  chrome.storage.local.get({ groups: ["Default"], memories: { Default: [] } }, cb);
}

// Helper to set groups and memories
function setStorage(data, cb) {
  chrome.storage.local.set(data, cb);
}

// Create or update context menus for all groups
function updateContextMenus() {
  chrome.contextMenus.removeAll(() => {
    getStorage(({ groups }) => {
      chrome.contextMenus.create({
        id: "remember_parent",
        title: "Remember this in...",
        contexts: ["selection"]
      });
      groups.forEach(group => {
        chrome.contextMenus.create({
          id: `remember_${group}`,
          parentId: "remember_parent",
          title: group,
          contexts: ["selection"]
        });
      });
    });
  });
}

// On install or update, create context menus
chrome.runtime.onInstalled.addListener(updateContextMenus);

// Listen for group changes from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "UPDATE_GROUPS") {
    setStorage({ groups: message.groups }, () => {
      updateContextMenus();
      sendResponse({ success: true });
    });
    return true;
  }
  if (message.type === "GET_MEMORIES") {
    getStorage(data => sendResponse(data));
    return true;
  }
  if (message.type === "SET_MEMORIES") {
    setStorage({ memories: message.memories }, () => sendResponse({ success: true }));
    return true;
  }
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId.startsWith("remember_")) {
    const group = info.menuItemId.replace("remember_", "");
    getStorage(({ memories }) => {
      if (!memories[group]) memories[group] = [];
      memories[group].push({ text: info.selectionText, date: new Date().toISOString() });
      setStorage({ memories });
    });
  }
}); 