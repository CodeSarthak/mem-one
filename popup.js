let groups = [];
let memories = {};
let currentGroup = null;

function renderGroups() {
  const groupList = document.getElementById('group-list');
  groupList.innerHTML = '';
  groups.forEach(group => {
    const btn = document.createElement('button');
    btn.textContent = group;
    btn.onclick = () => showGroup(group);
    btn.className = 'group-btn';
    if (group === currentGroup) btn.style.fontWeight = 'bold';
    groupList.appendChild(btn);
  });
}

function showGroup(group) {
  currentGroup = group;
  document.getElementById('memories-section').style.display = '';
  document.getElementById('group-title').textContent = group;
  renderGroups();
  renderMemories();
}

function renderMemories() {
  const ul = document.getElementById('memories');
  ul.innerHTML = '';
  (memories[currentGroup] || []).forEach(mem => {
    const li = document.createElement('li');
    li.textContent = mem.text;
    ul.appendChild(li);
  });
}

function updateStorage() {
  chrome.runtime.sendMessage({ type: 'SET_MEMORIES', memories }, () => {});
}

function updateGroupsStorage() {
  chrome.runtime.sendMessage({ type: 'UPDATE_GROUPS', groups }, () => {});
}

document.getElementById('add-group').onclick = () => {
  const val = document.getElementById('new-group').value.trim();
  if (val && !groups.includes(val)) {
    groups.push(val);
    memories[val] = [];
    updateGroupsStorage();
    updateStorage();
    renderGroups();
    document.getElementById('new-group').value = '';
  }
};

document.getElementById('delete-group').onclick = () => {
  if (!currentGroup || currentGroup === 'Default') return;
  groups = groups.filter(g => g !== currentGroup);
  delete memories[currentGroup];
  updateGroupsStorage();
  updateStorage();
  currentGroup = 'Default';
  showGroup(currentGroup);
};

document.getElementById('clear-group').onclick = () => {
  if (!currentGroup) return;
  memories[currentGroup] = [];
  updateStorage();
  renderMemories();
};

chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, data => {
  groups = data.groups || ['Default'];
  memories = data.memories || { Default: [] };
  if (!groups.includes('Default')) groups.unshift('Default');
  if (!memories.Default) memories.Default = [];
  renderGroups();
  showGroup(groups[0]);
}); 