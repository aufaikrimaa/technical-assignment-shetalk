document.addEventListener('DOMContentLoaded', function () {
    // Cek apakah pengguna sudah terautentikasi
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (isAuthenticated) {
        showAhliContent();
    } else {
        console.log('Pengguna belum terautentikasi');
    }
});

function showAhliContent() {
    // Dapatkan data profile dari sesi lokal
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    console.log('Menampilkan konten ahli...');

    renderProfile(profileData);
}

function renderProfile(profile) {
    const dashboardContainer = document.getElementById('profile-ahli');
    let kontenHtml = '';

    kontenHtml += `
        <div class="profile-header bg-info rounded-top">
            <div class="row">
                <div class="col">
                    <img class="profile-avatar" src="assets/images/profile.png" alt="Profile Avatar">
                </div>
                <div class="col">
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <div class="dropdown">
                            <button class="btn bg-white dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                More
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a class="dropdown-item text-decoration-none text-body" href="#">Edit profile</a>
                                </li>
                                <li>
                                    <a class="dropdown-item text-decoration-none text-body" href="#">Keluar</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="profile-info">
            <h1>${profile.nama}</h1>
            <p>${profile.username}</p>
            <p id="bio">${profile.bio}</p>
        </div>

        <ul class="tabs">
            <li class="tab active" onclick="showTab('tab1')" data-tab="tab1">Postingan</li>
            <li class="tab" onclick="showTab('tab2')" data-tab="tab2">Balasan</li>
        </ul>
        
        <hr class="tab-divider" id="active-tab-line">
        <div id="tab1" class="tab-content active">
            <div id="ahliPost">
            </div>
        </div>
        <div id="tab2" class="tab-content">
            <div class="reply-card">
                <div class="profile-info">
                    <img src="../assets/images/kurakura.jpg" alt="Profile Picture">
                    <div>
                        <h5 class="profile-name">Kura-kura</h5>
                        <p class="post-time">1 hour ago</p>
                    </div>
                </div>
                <div class="post-content" id="post-reply">
                    <div class="post-title">Apa benar tidak boleh minum es saat haid? </div>
                    <p class="post-text">Aku pernah ditegur saat minum es, disitu aku keadaan sedang menstruasi, katanya dapat membekukan pembuluh darah dan membuat haid tidak lancar bla bla bla.</p>                          
                </div>
                <div class="profile-info">
                    <img src="../assets/images/profile.png" alt="Profile Picture">
                    <div>
                        <h5 class="profile-name">Dr Boyke</h5>
                        <p class="post-time">1 hour ago</p>
                    </div>
                </div>
                <div class="post-content" id="reply-post">
                    <div class="post-title">Haid tidak lancar setelah melahirkan, normal atau tidak? </div> 
                    <p class="post-text">Tidak benar! perdarahan menstruasi tidak dipengaruhi oleh suhu air yang diminum. Sebab ketika air masuk ke dalam tubuh, suhunya akan berubah menyesuaikan dengan suhu tubuh.
                        Adapun lancar atau tidaknya darah haid dipengaruhi oleh kondisi hormonal wanita, yaitu hormon estrogen dan progesteron.                                
                        Jika hormon tersebut terganggu, misalnya karena stres dan penggunaan kontrasepsi, haid biasanya menjadi tidak lancar.</p>
                </div>
            </div>
        </div>
    `;

    dashboardContainer.innerHTML = kontenHtml;
}

function displayProfilePosts() {
    let profilePostContainer = document.getElementById('ahliPost'); 
    let profilePostHTML = '';

    // Filter berdasarkan postingan ahli
    const filteredPost = semuaKonten.filter(konten => {
        return konten.jenis === "postAhli";
    });

    profilePostContainer.innerHTML = '';

    filteredPost.forEach((konten, index) => {
        profilePostHTML += `
            <div class="post-card mb-3">
                <div class="profile-info">
                    <img src="assets/images/${konten.avatar}" alt="Profile Picture">
                    <div>
                        <h5 class="profile-name">${konten.nama}</h5>
                        <p class="post-time">${konten.createdAt}</p>
                    </div>
                </div>
                <div class="post-content mb-3">
                    <div class="post-title">${konten.judul}</div>
                    <p class="post-text">
                        <span class="badge bg-info me-2">${konten.topik != 'Setiap orang' ? konten.topik : ``}</span>
                        ${konten.desk ? konten.desk : ``}
                    </p>
                </div>
                <div class="reply-icon" onclick="toggleReplyForm(${index})"><span class="bi bi-chat-right-fill"></span> Balas</div>
            </div>
            <div class="reply-form bg-white pb-3" style="display: none;">
                <img src="assets/images/profile.png" alt="Profile Picture">
                <input placeholder="Tulis balasan..."></input>
                <div class="send bi bi-send-fill" onclick="postReply(${index})"></div>
            </div>
        `;
    });

    profilePostContainer.innerHTML = profilePostHTML;
}

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

    if (tabId === 'tab1') {
        displayProfilePosts(); 
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

//untuk side menu profile di dashboard ahli
function showMenu(menuId) {
    const allContentSections = document.querySelectorAll('.content-section');
    const allLinks = document.querySelectorAll('.links a');

    allContentSections.forEach(section => {
        section.style.display = 'none';
    });

    allLinks.forEach(link => {
        link.classList.remove('active');
    });

    const selectedContent = document.getElementById(menuId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }

    const selectedLink = document.querySelector(`.links a[data-tab="${menuId}"]`);
    if (selectedLink) {
        selectedLink.classList.add('active');
    }
}

//for button reply
// let replyForms = document.getElementsByClassName('reply-form');

// function toggleReplyForm(index) {
//     let replyForm = replyForms[index];
//     let replyFormStyle = window.getComputedStyle(replyForm);

//     if (replyFormStyle.display === 'none') {
//         replyForm.style.display = 'flex';
//     } else {
//         replyForm.style.display = 'none';
//     }
// }

// function postReply(index) {
//     let replyForm = replyForms[index];
//     replyForm.style.display = 'none';
// }