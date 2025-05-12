// Side Menu
const sidebar = document.getElementById('sidebar');
  const menuIcon = document.querySelector('.menu-icon i');
  const closeSidebar = document.getElementById('closeSidebar');

  menuIcon.addEventListener('click', () => {
    sidebar.classList.add('open');
  });

  closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });

  // Group 
  const params = new URLSearchParams(window.location.search);
  const groupNo = params.get("group");
  const groupName = params.get("name");

  const display = document.getElementById("groupDisplay");
  if (groupNo && groupName) {
    display.innerText = `GROUP ${groupNo} | ${decodeURIComponent(groupName).toUpperCase()}`;
  } else {
    display.innerText = "GROUP DETAILS";
  }
  
  // Main Functions
  const completed = 1;
  const total = 8;
  const percent = (completed / total) * 100;
  
  // Always show a visible portion in the doughnut chart
  const ctx = document.getElementById('progressChart').getContext('2d');
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [completed, total - completed],
          backgroundColor: [
            completed > 0 ? '#15803d' : '#15803d', // Green color for the chart portion
            '#d1fae5', // Light green for the remaining tasks, even if none are completed
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      cutout: '70%',
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });  

    // Update center label
    document.getElementById('progressLabel').innerText = percent.toFixed(1) + '%';
 
  // Firebase Integration 
