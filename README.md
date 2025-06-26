# Highlight to Memory Chrome Extension

Highlight text on any website, right-click, and select "Remember this in..." to save it to a specific group (context). Later, insert your saved memories from any group into ChatGPT with one click.

## Features
- **Group memories by context:** Save highlighted text into user-defined groups (e.g., Work, Personal, Project X)
- **Right-click context menu:** Choose which group to save a memory to via "Remember this in..."
- **Group management in popup:** Add, delete, and clear groups; view memories by group
- **Insert into ChatGPT by group:** On ChatGPT, click "Insert Memories" and select which group to insert

## Installation
1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select this extension's directory.

## Usage
1. **Save a Memory:**
   - Highlight any text on any website.
   - Right-click and choose **"Remember this in..."** and select a group.
2. **Manage Groups & Memories:**
   - Click the extension icon in your Chrome toolbar to open the popup.
   - Add new groups, delete groups, clear a group's memories, or view memories by group.
3. **Insert into ChatGPT:**
   - Go to [chat.openai.com](https://chat.openai.com) or [chatgpt.com](https://chatgpt.com).
   - Click the **"Insert Memories"** button near the chat input.
   - Select a group in the popup and insert only that group's memories into the chat box.

## Security & Privacy
- This extension stores your memories **locally** in your browser using `chrome.storage.local`.
- **No confidential or sensitive data is included in this repository.**
- No data is sent to any external server.

## License
MIT 