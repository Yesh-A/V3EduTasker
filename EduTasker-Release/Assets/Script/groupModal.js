const placeholderMembers = ["John Doe", "Jane Smith", "Alice Brown", "Bob White", "Charlie Black", "Clara Green", "You"];
const memberInput = document.getElementById('memberInput');
const addMemberBtn = document.getElementById('addMemberBtn');
const memberList = document.getElementById('memberList');
const memberSuggestions = document.getElementById('memberSuggestions');
const createGroupBtn = document.getElementById('createGroupBtn');
const groupNameInput = document.getElementById('groupNameInput');



let addedMembers = [];

// Member Management
addMemberBtn.addEventListener('click', () => {
  const memberName = memberInput.value.trim();
  if (memberName && !addedMembers.includes(memberName)) {
    addedMembers.push(memberName);
    updateMemberList();
    memberInput.value = '';
  }
});


function updateMemberList() {
  memberList.innerHTML = '';
  addedMembers.forEach((member, index) => {
    const memberItem = document.createElement('div');
    memberItem.classList.add('bg-[#1A5E63]', 'text-white', 'px-3', 'py-1', 'rounded-full', 'flex', 'items-center', 'gap-2', 'mb-2');
    memberItem.innerHTML = ` 
      ${member}
      <span class="cursor-pointer text-xs" onclick="removeMember(${index})">X</span>
    `;
    memberList.appendChild(memberItem);
  });

  createGroupBtn.disabled = addedMembers.length === 0 || groupNameInput.value.trim() === '';
}

function removeMember(index) {
  addedMembers.splice(index, 1);
  updateMemberList();
}

// Group Creation
createGroupBtn.addEventListener('click', () => {
  const groupName = groupNameInput.value.trim();

  if (!groupName) {
    alert('Please enter a group name');
    return;
  }
  
  if (addedMembers.length === 0) {
    alert('Please add at least one member');
    return;
  }


  if (groupName && addedMembers.length > 0) {
    const groupId = Date.now().toString();
    const borderColor = getRandomColor();
    
    const newGroup = {
      id: groupId,
      name: groupName,
      members: [...addedMembers],
      progress: 0,
      status: false,
      borderColor: borderColor,
      tasks: {
        todo: [],
        inProgress: [],
        completed: []
      }
    };
    
    /* DATABASE INTEGRATION POINT - Save new group to database
    const savedGroup = await saveGroupToDatabase(newGroup);
    groupsData.push(savedGroup);
    createGroupTracker(savedGroup.name, savedGroup.members, savedGroup);
    */
    
    // Temporary in-memory implementation
    groupsData.push(newGroup);
    createGroupTracker(newGroup.name, newGroup.members, newGroup);
    
    addedMembers = [];
    updateMemberList();
    groupNameInput.value = '';
    closeGroupModal();
  }
});

// Member Suggestions
memberInput.addEventListener('input', () => {
  const inputText = memberInput.value.toLowerCase();
  const filteredNames = placeholderMembers
    .filter(name => name.toLowerCase().startsWith(inputText))
    .filter(name => !addedMembers.includes(name));

  if (filteredNames.length > 0) {
    displaySuggestions(filteredNames);
  } else {
    memberSuggestions.innerHTML = '';
  }
});

function displaySuggestions(names) {
  memberSuggestions.innerHTML = '';
  names.forEach(name => {
    const suggestionItem = document.createElement('div');
    suggestionItem.classList.add('cursor-pointer', 'px-3', 'py-1', 'hover:bg-[#1A5E63]', 'hover:text-white');
    suggestionItem.textContent = name;
    suggestionItem.addEventListener('click', () => {
      memberInput.value = name;
      addMemberBtn.click();
      memberSuggestions.innerHTML = '';
    });
    memberSuggestions.appendChild(suggestionItem);
  });
}

// Modal Control
document.getElementById('NewTaskBtn').addEventListener('click', () => {
  const modal = document.getElementById('groupModal');
  modal.classList.remove('hidden');
  modal.style.display = 'flex';
  modal.classList.add('animate__fadeIn');
});

let isInsideModal = false;
document.querySelector('.modal-content').addEventListener('mousedown', () => {
  isInsideModal = true;
});

window.addEventListener('mouseup', (e) => {
  if (!e.target.closest('.modal-content') && !isInsideModal) {
    closeGroupModal();
  }
  isInsideModal = false;
});

function closeGroupModal() {
  const modal = document.getElementById('groupModal');
  modal.classList.add('hidden');
  modal.classList.remove('animate__fadeIn');
  modal.style.display = 'none';
}
