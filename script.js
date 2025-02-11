let topics = ['Menstruasi', 'HIV/AIDS', 'Kehamilan Remaja', 'Orientasi Seksual'];
let selectedCategory = 'beranda';
let selectedTopic = '';

function displayTopik() {
    const topicList = document.getElementById('topicList');
    topicList.innerHTML = '';

    topics.forEach(topic => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<li class="nav-item">
            <a class="nav-link text-decoration-none text-body" href="#" data-topic="${topic}" data-halaman="${topic}">${topic}</a>
        </li>`;
        topicList.appendChild(listItem);
    });
}

displayTopik();

//  dropdown topik di modal
let selectTopics = document.getElementById('inputTopics');
topics.forEach(topic => {
    let option = document.createElement('option');
    option.value = topic;
    option.text = topic;
    option.classList.add('dropdown-item');
    selectTopics.appendChild(option);
});

const avatars = [{
        avatar: 'monyet.png',
        nama: 'Monyet'
    },
    {
        avatar: 'kurakura.jpg',
        nama: 'Kura-kura'
    },
    {
        avatar: 'anjing.jpeg',
        nama: 'Anjing'
    },
];

const radioGroup = document.getElementById('radioGroup');
avatars.forEach((avatar, index) => {
    
    const radioContainer = document.createElement('div');
    radioContainer.classList.add('radio-container');
    
    const radioButton = document.createElement('input');
    radioButton.classList.add('radio-button');
    radioButton.id = index;
    radioButton.type = 'radio';
    radioButton.name = 'animal';
    radioButton.value = index; // pakai index sebagai value
    
    const radioTile = document.createElement('div');
    radioTile.classList.add('radio-tile');
    radioTile.innerHTML = `<img src="assets/images/${avatar.avatar}" alt="${avatar.nama}>
    <label for="${index}" class="radio-tile-label">${avatar.nama}</label>`;

    radioContainer.appendChild(radioButton);
    radioContainer.appendChild(radioTile);
    radioGroup.appendChild(radioContainer);
});

let semuaKonten = [{
        avatar: 'anjing.jpeg',
        nama: 'Anjing',
        judul: 'Apa benar tidak boleh minum es saat haid?',
        topik: 'Menstruasi',
        desk: '',
        kategori: 'pertanyaan',
        createdAt: '01/12/2023, 21:25:00'
    },
    {
        avatar: 'monyet.png',
        nama: 'Monyet',
        judul: 'Haid tidak lancar setelah melahirkan, normal atau tidak?',
        desk: 'Tidak perlu khawatir, menstruasi tidak lancar setelah melahirkan adalah kondisi normal. Bila ibu memberikan ASI eksklusif selama 6 bulan, umumnya menstruasi akan tidak teratur karena hormon prolaktin berpengaruh pada siklus menstruasi.',
        topik: 'Menstruasi',
        kategori: 'informasi',
        createdAt: '02/12/2023, 21:25:00'
    },
    {
        avatar: 'profile.png',
        nama: 'Dr Boyke',
        judul: 'Mengenal HIV/AIDS',
        desk: 'HIV adalah virus yang menyerang sistem kekebalan tubuh manusia, mengganggu kemampuannya untuk melawan infeksi dan penyakit. Jika tidak diobati, HIV dapat berkembang menjadi AIDS.',
        topik: 'HIV/AIDS',
        kategori: 'informasi',
        jenis: 'postAhli',
        createdAt: '03/12/2023, 21:25:00'
    },
];

let commentsData = [
    [
        { comment: "bole-bole aja si, aku tiap haid juga minum es ga kenapa-kenapa tuh sampe sekarang", avatar: "kurakura.jpg", nama: "pengguna umum" },
        { comment: "sepertinya itu mitos deh, gaada kaitannya minum es sama haid, soalnya es kalo udah diminum pun suhunya nyesuain sama suhu didalem tubuh", avatar: "monyet.png", nama: "pengguna umum" }
    ],
    [
        { comment: "owhh tenyata gitu, makasi infonyaa", avatar: "anjing.jpeg", nama: "pengguna umum" },
        { comment: "wahh ilmu baruu nih!", avatar: "monyet.png", nama: "pengguna umum" },
        { comment: "senang sekali, informasi ini menjawab keresahanku", avatar: "kurakura.jpg", nama: "pengguna umum" }
    ],
    [
        { comment: "nice info, thankyouu dok!", avatar: "anjing.jpeg", nama: "pengguna umum" },
        { comment: "terimakasih dokter, sehat selalu!!", avatar: "monyet.png", nama: "pengguna umum" },
    ]
];


function tambahDiskusi(event) {
    event.preventDefault();

    if (currentPage === 'dashboard') {
        // close modal
        let diskusiModal = document.getElementById('diskusiBaru');
        let modal = bootstrap.Modal.getInstance(diskusiModal);
        modal.hide();

        let judul = document.getElementById('judul').value;
        let topik = document.getElementById('inputTopics').value;
        let desk = document.getElementById('desk').value;
        let createdAt = `${new Date().toLocaleDateString('en-GB', {
            day : 'numeric',
            month : 'short',
            year : 'numeric'
        }).split(' ').join(' ')}, ${new Date().toLocaleTimeString()}` ;

        const radioButtons = document.getElementsByName('animal');
        let selectedAvatar = '';
        let selectedNamaAVatar = '';

        radioButtons.forEach((radio) => {
            if (radio.checked) {
                selectedNamaAVatar = avatars[radio.value].nama;
                selectedAvatar = avatars[radio.value].avatar;

                // hapus avatar terpilih
                radio.checked = false;
            }
        });

        // Pastiin kedua field diisi sebelum menambahkan data
        if (judul && !desk) {
            diskusi = {
                judul: judul,
                topik: topik,
                kategori: 'pertanyaan', 
                avatar: selectedAvatar,
                nama: selectedNamaAVatar,
                createdAt: createdAt
            };

            semuaKonten.unshift(diskusi);
            console.log('Data diskusi telah ditambahkan:', diskusi);
            alert('Data diskusi telah ditambahkan.');
            displayDiskusi();

            commentsData.unshift([]);

            // reset form
            document.getElementById('buatDiskusiBaru').reset();

        } else if (judul && desk && topik && selectedAvatar && selectedNamaAVatar) {
            diskusi = {
                judul: judul,
                topik: topik,
                desk: desk,
                kategori: 'informasi', 
                avatar: selectedAvatar,
                nama: selectedNamaAVatar,
                createdAt: createdAt
            };

            semuaKonten.unshift(diskusi);
            console.log('Data diskusi telah ditambahkan:', diskusi);
            alert('Data diskusi telah ditambahkan.');
            displayDiskusi();

            commentsData.unshift([]);

            // reset form
            document.getElementById('buatDiskusiBaru').reset();
            
        } else {
            console.log('Isi semua field untuk menambahkan diskusi baru.');
            alert('Isi semua field untuk menambahkan diskusi baru.');
        }

    } else if (currentPage === 'dashboard-ahli') {

        let diskusiModal = document.getElementById('diskusiBaru');
        let modal = bootstrap.Modal.getInstance(diskusiModal);
        modal.hide();

        let judul = document.getElementById('judul').value;
        let topik = document.getElementById('inputTopics').value;
        let desk = document.getElementById('desk').value;
        let createdAt = `${new Date().toLocaleDateString('en-GB', {
            day : 'numeric',
            month : 'short',
            year : 'numeric'
        }).split(' ').join(' ')}, ${new Date().toLocaleTimeString()}` ;

        const isAuthenticated = localStorage.getItem('isAuthenticated');
        
        if (isAuthenticated) {
            const profileData = JSON.parse(localStorage.getItem('profileData'));

            if (judul && desk && topik) {
                diskusi = {
                    judul: judul,
                    topik: topik,
                    desk: desk,
                    kategori: 'informasi', 
                    jenis: 'postAhli',
                    avatar: profileData.photo,
                    nama: profileData.nama,
                    createdAt: createdAt
                };

                semuaKonten.unshift(diskusi);
                console.log('Data diskusi telah ditambahkan:', diskusi);
                alert('Data diskusi telah ditambahkan.');
                displayDiskusi();

                commentsData.unshift([]);

                // reset form
                document.getElementById('buatDiskusiBaru').reset();

            } else {
                console.log('Isi semua field untuk menambahkan informasi baru.');
                alert('Isi semua field untuk menambahkan informasi baru.');
            }

        } else {
            window.location.href = 'login.html';
            alert('silahkan login terlebih dahulu!');
        }

    } else {
        console.log('Halaman tidak dikenali.');
    }
}

// Menangani submit form dengan memanggil fungsi tambahDiskusi
document.getElementById('buatDiskusiBaru').addEventListener('submit', tambahDiskusi);

//ini buat link side menu nya
document.addEventListener('DOMContentLoaded', function () {
    const linkSidebars = document.querySelectorAll('.links');
    linkSidebars.forEach(linkSidebar => {
        linkSidebar.addEventListener('click', function (event) {
            if (event.target.tagName === 'A') {
                event.preventDefault();
                const links = linkSidebar.querySelectorAll('a');
                links.forEach(link => link.classList.remove('active'));
                event.target.classList.add('active');
                selectedCategory = event.target.dataset.halaman;
                displayDiskusi();
            }
        });
    });
});

function displayDiskusi() {
    let listKonten = document.getElementById('postCard');
    let diskusiHMTL = '';

    // Filter berdasarkan kategori/topik yang dipilih
    const filteredKonten = semuaKonten.filter(konten => {
        return (
            (selectedCategory === 'beranda') ||
            (selectedCategory === 'jawab-pertanyaan' && konten.kategori === 'pertanyaan') ||
            (selectedCategory === 'informasi' && konten.kategori === 'informasi') ||
            (selectedCategory === 'Menstruasi' && konten.topik === 'Menstruasi') ||
            (selectedCategory === 'Orientasi Seksual' && konten.topik === 'Orientasi Seksual') ||
            (selectedCategory === 'Kehamilan Remaja' && konten.topik === 'Kehamilan Remaja') ||
            (selectedCategory === 'HIV/AIDS' && konten.topik === 'HIV/AIDS')
        );
    });

    listKonten.innerHTML = '';

    filteredKonten.forEach((konten, index) => {
        diskusiHMTL += `
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
            <div class="reply-form" style="display: none;">
                <div class="reply-section bg-white pb-3" >
                    <div class="comments-form">
                        <img src="assets/images/profile.png" alt="Profile Picture">
                        <input id="replyInput_${index}" placeholder="Tulis balasan..."></input>
                        <div class="send bi bi-send-fill" onclick="postReply(${index})"></div>
                    </div>
                    <div class="comments-section">
                        <h6>Balasan :</h6>
                        <ul id="commentsList_${index}"></ul>
                    </div>
                </div>
            </div>
            
        `;
        const commentsList = document.getElementById(`commentsList_${index}`);
        if (commentsList && commentsData[index] && commentsData[index].length > 0) {
            commentsList.innerHTML = '';
            commentsData[index].forEach(comment => {
                const listItem = document.createElement('li');
                listItem.textContent = comment;
                commentsList.appendChild(listItem);
            });
        }
    });

    listKonten.innerHTML = diskusiHMTL;
    
}

let replyForms = document.getElementsByClassName('reply-form');

function toggleReplyForm(index) {
    let replyForm = replyForms[index];
    let replyFormStyle = window.getComputedStyle(replyForm);

    if (replyFormStyle.display === 'none') {
        replyForm.style.display = 'flex';
        updateCommentsView(index);
    } else {
        replyForm.style.display = 'none';
    }
}

function postReply(index) {
    let replyInput = document.getElementById(`replyInput_${index}`);
    let replyText = replyInput.value;

    if (replyText.trim() !== '') {
        // Menangani posting balasan (simpan komentar, kirim ke server, dll.)
        console.log(`Balasan untuk post ${index}: ${replyText}`);
        
        // Menambahkan komentar ke commentsData
        if (!commentsData[index]) {
            commentsData[index] = [];
        }

        const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

        let avatar;
        if (isAuthenticated && currentPage === 'dashboard-ahli') {
            const profileData = JSON.parse(localStorage.getItem("profileData"));
            avatar = profileData.photo;
            nama = profileData.nama;
        } else if (currentPage === 'dashboard'){
            let randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
            avatar = randomAvatar.avatar;
            nama = "pengguna umum";
       
        } else {
            console.log('Something went wrong !')
        }

        commentsData[index].unshift({
            avatar: avatar,
            nama: nama,
            comment: replyText 
        });

        replyInput.value = '';
        updateCommentsView(index);
    } else {
        console.log('Komentar tidak boleh kosong');
        alert('Komentar tidak boleh kosong');
    }
}

function updateCommentsView(index) {

    const commentsList = document.getElementById(`commentsList_${index}`);

    if (commentsList && commentsData[index] && commentsData[index].length > 0) {
        commentsList.innerHTML = '';
        commentsData[index].forEach(commentObject => {
            const listItem = document.createElement('li');
            listItem.classList.add('comment-item');

            const avatarElement = document.createElement('img');
            avatarElement.src = `assets/images/${commentObject.avatar}`;
            avatarElement.alt = `Avatar ${commentObject.nama}`;
            avatarElement.classList.add('avatar');
            listItem.appendChild(avatarElement);

            const userInfoContainer = document.createElement('div');
            userInfoContainer.classList.add('user-info');

            const namaElement = document.createElement('span');
            namaElement.textContent = commentObject.nama;
            namaElement.classList.add('nama');
            userInfoContainer.appendChild(namaElement);

            const textElement = document.createElement('span');
            textElement.textContent = commentObject.comment;
            textElement.classList.add('comment-text');
            userInfoContainer.appendChild(textElement);

            listItem.appendChild(userInfoContainer);

            commentsList.appendChild(listItem);
        });
    }
}

window.onload = displayDiskusi();