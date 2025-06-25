# Highlight to Memory Chrome Extension

Highlight text on any website, right-click, and select "Remember this" to save it to your memory. Later, insert your saved memories into ChatGPT with one click.

## Features
- Save highlighted text from any website via right-click context menu ("Remember this")
- View and manage your memories in the extension popup
- Insert memories into ChatGPT (chat.openai.com or chatgpt.com) with a single button

## Installation
1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select this extension's directory.

## Usage
1. **Save a Memory:**
   - Highlight any text on any website.
   - Right-click and choose **"Remember this"** from the context menu.
2. **View Memories:**
   - Click the extension icon in your Chrome toolbar to open the popup and see your saved memories.
3. **Insert into ChatGPT:**
   - Go to [chat.openai.com](https://chat.openai.com) or [chatgpt.com](https://chatgpt.com).
   - Click the **"Insert Memories"** button near the chat input to paste your saved memories (with context) into the chat box.

## Security & Privacy
- This extension stores your memories **locally** in your browser using `chrome.storage.local`.
- **No confidential or sensitive data is included in this repository.**
- No data is sent to any external server.

## License
MIT 