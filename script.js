let topics = ['Menstruation', 'HIV/AIDS', 'Teenage pregnancy', 'Sexual orientation'];

function displayTopik() {
    const topicList = document.getElementById('topicList');
    topicList.innerHTML = '';

    topics.forEach(topic => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<li class="nav-item">
            <a class="nav-link text-decoration-none text-body" href="#">${topic}</a>
        </li>`;
        topicList.appendChild(listItem);
    });
}

displayTopik();

// dropdown topik di modal
let selectTopics = document.getElementById('inputTopics');
topics.forEach(topic => {
    let option = document.createElement('option');
    option.value = topic;
    option.text = topic;
    option.classList.add('dropdown-item');
    selectTopics.appendChild(option);
});

let semuaKonten = [{
        judul: 'Apa benar tidak boleh minum es saat haid?',
        topik: 'Menstruation',
        desk: 'Aku pernah ditegur saat minum es, disitu aku keadaan sedang menstruasi, katanya dapat membekukan pembuluh darah dan membuat haid tidak lancar bla bla bla.',
        kategori: 'informasi',
    },
    {
        judul: 'Haid tidak lancar setelah melahirkan, normal atau tidak?',
        desk: 'Tidak perlu khawatir, menstruasi tidak lancar setelah melahirkan adalah kondisi normal. Bila ibu memberikan ASI eksklusif selama 6 bulan, umumnya menstruasi akan tidak teratur karena hormon prolaktin berpengaruh pada siklus menstruasi.',
        topik: 'Menstruation',
        kategori: 'informasi',
    },
];

function tambahDiskusi(event) {
    event.preventDefault();
    let judul = document.getElementById('judul').value;
    let topik = document.getElementById('inputTopics').value;
    let desk = document.getElementById('desk').value;

    // Pastiin kedua field diisi sebelum menambahkan data
    if (!desk) {
        diskusi = {
            judul: judul,
            topik: topik,
            kategori: 'judul'
        };

        semuaKonten.unshift(diskusi);
        console.log('Data diskusi telah ditambahkan:', diskusi);
        displayDiskusi();

    } else if(judul && desk) {
        diskusi = {
            judul: judul,
            topik: topik,
            desk: desk,
            diskusi: 'informasi'
        };

        semuaKonten.unshift(diskusi);
        console.log('Data diskusi telah ditambahkan:', diskusi);
        displayDiskusi();
        
    } else {
        console.log('Isi semua field untuk menambahkan diskusi baru.');
    }
}

// Menangani submit form dengan memanggil fungsi tambahDiskusi
document.getElementById('buatDiskusiBaru').addEventListener('submit', tambahDiskusi);

// Fungsi untuk menampilkan data diskusi ke dalam elemen HTML
function displayDiskusi() {
    let listKonten = document.getElementById('postCard');
    let diskusiHMTL = '';

    semuaKonten.forEach((konten, index) => {
        // Membuat elemen list untuk setiap data diskusi
        diskusiHMTL += `
            <div class="post-card mb-3">
                <div class="profile-info">
                    <img src="assets/images/profile.png" alt="Profile Picture">
                    <div>
                        <h5 class="profile-name">Dr Boyke</h5>
                        <p class="post-time">1 hour ago</p>
                    </div>
                </div>
                <div class="post-content mb-3">
                    <div class="post-title">${konten.judul}</div>
                    <p class="post-text">
                        <span class="badge bg-info me-2">${konten.topik}</span>
                        ${konten.desk ? konten.desk : ``}
                    </p>

                </div>
                <div class="reply-icon" onclick="toggleReplyForm(0)"><span
                        class="bi bi-chat-right-fill"></span> Balas</div>
            </div>
            <div class="reply-form bg-white pb-3" style="display: none;">
                <img src="assets/images/profile.png" alt="Profile Picture">
                <input placeholder="Tulis balasan..."></input>
                <div class="send bi bi-send-fill" onclick="postReply(0)"></div>
            </div>
        `;
    });
    // console.log(diskusiHMTL);
    listKonten.innerHTML = diskusiHMTL;
}

// Panggil fungsi untuk menampilkan data saat halaman dimuat
window.onload = displayDiskusi();