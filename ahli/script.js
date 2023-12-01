let topics = ['Menstruation', 'HIV/AIDS', 'Teenage pregnancy', 'Sexual orientation'];

function displayTopics() {
    const topicList = document.getElementById('topicList');
    topicList.innerHTML = '';

    topics.forEach(topic => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<li class="nav-item">
            <a class="nav-link" href="#">${topic}</a>
        </li>`;
        topicList.appendChild(listItem);
    });
}

displayTopics();

//tab di profile ahli
function showTab(tabId) {
    // Hide all tabs
    let tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(function(tab) {
      tab.classList.remove('active');
    });

    // Show the selected tab
    let selectedTab = document.getElementById(tabId);
    if (selectedTab) {
      selectedTab.classList.add('active');
      updateActiveTabStyle(tabId);
    }
  }

function updateActiveTabStyle(tabId) {
    // Remove 'active' class from all tabs
    let allTabs = document.querySelectorAll('.tab');
    allTabs.forEach(function(tab) {
        tab.classList.remove('active');
    });

    // Add 'active' class to the selected tab
    let newActiveTab = document.querySelector('.tab[data-tab="' + tabId + '"]');
    if (newActiveTab) {
        newActiveTab.classList.add('active');
    }
}


//untuk button reply
let replyFormVisible = false;

function toggleReplyForm() {
    let replyForm = document.getElementById('replyForm');
    replyFormVisible = !replyFormVisible;

    if (replyFormVisible) {
        replyForm.style.display = 'flex';
    } else {
        replyForm.style.display = 'none';
    }
}

function postReply() {
    let replyForm = document.getElementById('replyForm');
    replyForm.style.display = 'none';
    // Add logic to handle the posted reply, e.g., updating the UI or sending data to a server.
}

