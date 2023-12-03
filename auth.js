//auth
const daftarAkunAhli = [
    { username: 'ahli1', password: 'password1', tipe: 'profile', 
    profile: { nama: 'Dr Boyke', bio: 'H. Boyke Dian Nugraha, SpOG MARS (Lahir di Bandung 14 Desember 1956) adalah Dokter Kesehatan Remaja, Keluarga & Seksolog Indonesia' } },
    // Tambahkan data profile untuk ahli2 jika diperlukan
];


document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Periksa apakah akun terdaftar dan kredensial benar
    const akunAhli = daftarAkunAhli.find(akun => akun.username === username && akun.password === password);

    if (akunAhli) {
        // Simpan status autentikasi di sesi lokal
        localStorage.setItem('isAuthenticated', true);

        // Simpan data profile di sesi lokal
        localStorage.setItem('profileData', JSON.stringify(akunAhli.profile));

        window.location.href = 'dashboard-ahli.html';

        console.log('Login berhasil!');
    } else {
        alert('Login failed. Please check your username and password.');
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


