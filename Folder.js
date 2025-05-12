const sidebar = document.getElementById('sidebar');
  const menuIcon = document.querySelector('.menu-icon i');
  const closeSidebar = document.getElementById('closeSidebar');

  menuIcon.addEventListener('click', () => {
    sidebar.classList.add('open');
  });

  closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });

//
  const params = new URLSearchParams(window.location.search);
  const groupNo = params.get("group");
  const groupName = params.get("name");

  const display = document.getElementById("groupDisplay");
  if (groupNo && groupName) {
    display.innerText = `GROUP ${groupNo} | ${decodeURIComponent(groupName).toUpperCase()}`;
  } else {
    display.innerText = "GROUP DETAILS";
  }
//

document.addEventListener('DOMContentLoaded', () => {
    const folderName = localStorage.getItem('selectedFolder') || 'My Folder';
    document.getElementById('folderTitle').textContent = folderName.toUpperCase();
  });

  // Go back to folder list page
  function goBack() {
    window.location.href = 'group-page.html'; // update with your folder list page if needed
  }