//ini buat side-menu to masing-masing halamannya
document.getElementById('link').addEventListener('click', function (event) {

    if (event.target.tagName === 'A') {
        event.preventDefault();

        const links = document.querySelectorAll('.links a');
        links.forEach(link => link.classList.remove('active'));

        event.target.classList.add('active');

        // document.querySelectorAll('.postCard').style.display = 'none';
        document.getElementById('postCard').style.display = 'none';
        // document.getElementById('askCard').style.display = 'none';

        switch (event.target.dataset.halaman) {
            case 'beranda':
                // document.querySelectorAll('.postCard').style.display = 'block';
                document.getElementById('postCard').style.display = 'block';
                document.getElementById('askCard').style.display = 'block';
                break;
            case 'jawab-pertanyaan':
                // document.getElementById('askCard').style.display = 'block';
                break;
            case 'informasi':
                // document.querySelectorAll('.postCard').style.display = 'block';
                document.getElementById('postCard').style.display = 'block';
                break;
            default:
                console.log('Halaman tidak ditemukan.');
        }
    }
});

//ini buat side-menu to masing-masing halamannya
document.getElementById('link').addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
        event.preventDefault();

        const links = document.querySelectorAll('.links a');
        links.forEach(link => link.classList.remove('active'));

        event.target.classList.add('active');

        // document.getElementById('profile-ahli').style.display = 'none';
        document.getElementById('postCard').style.display = 'none';
        // document.querySelectorAll('.postCard').style.display = 'none';
        // document.getElementById('askCard').style.display = 'none';
        // document.getElementById('filter-content').style.display = 'none';

        switch (event.target.dataset.halaman) {
            case 'beranda':
                // document.querySelectorAll('.postCard').style.display = 'block';
                document.getElementById('postCard').style.display = 'block';
                document.getElementById('askCard').style.display = 'block';
                document.getElementById('filter-content').style.display = 'block';
                break;
            case 'jawab-pertanyaan':
                // document.getElementById('askCard').style.display = 'block';
                // document.getElementById('filter-content').style.display = 'block';
                break;
            case 'informasi':
                document.getElementById('postCard').style.display = 'block';
                // document.getElementById('filter-content').style.display = 'block';
                break;
            case 'profile':
                document.getElementById('profile-ahli').style.display = 'block';
                break;
            default:
                console.log('Halaman tidak ditemukan.');
        }
    }
});


//tab di profile ahli
function showTab(tabId) {
    // Hide all tabs
    let tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(function (tab) {
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
    allTabs.forEach(function (tab) {
        tab.classList.remove('active');
    });

    // Add 'active' class to the selected tab
    let newActiveTab = document.querySelector('.tab[data-tab="' + tabId + '"]');
    if (newActiveTab) {
        newActiveTab.classList.add('active');
    }
}


//untuk button reply di profile ahli
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
}

//for button reply
let replyForms = document.getElementsByClassName('reply-form');

function toggleReplyForm(index) {
    let replyForm = replyForms[index];
    let replyFormStyle = window.getComputedStyle(replyForm);

    if (replyFormStyle.display === 'none') {
        replyForm.style.display = 'flex';
    } else {
        replyForm.style.display = 'none';
    }
}

function postReply(index) {
    let replyForm = replyForms[index];
    replyForm.style.display = 'none';
}