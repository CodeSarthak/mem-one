document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get({ memories: [] }, (result) => {
    const ul = document.getElementById('memories');
    ul.innerHTML = '';
    result.memories.forEach(mem => {
      const li = document.createElement('li');
      li.textContent = mem.text;
      ul.appendChild(li);
    });
  });
}); 