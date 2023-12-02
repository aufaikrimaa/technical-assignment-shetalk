let topics = ['Menstruation', 'HIV/AIDS', 'Teenage pregnancy', 'Sexual orientation'];
let selectedCategory = 'beranda';
let selectedTopic = '';

function displayTopik() {
    const topicList = document.getElementById('topicList');
    topicList.innerHTML = '';

    topics.forEach(topic => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<li class="nav-item">
            <a class="nav-link text-decoration-none text-body" href="#" data-topic="${topic}">${topic}</a>
        </li>`;
        topicList.appendChild(listItem);
    });

    // Tambahkan event listener untuk setiap elemen topik
    topicList.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();

            // Simpan topik yang dipilih
            selectedTopic = event.target.dataset.topic;

            // Update konten berdasarkan topik yang dipilih
            displayDiskusi();
        }
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
    const radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'animal';
    radioButton.value = index; // pakai index sebagai value

    const label = document.createElement('label');
    label.innerHTML = `<img src="assets/images/${avatar.avatar}" alt="${avatar.nama}" width="50" height="50"> ${avatar.nama}`;

    radioGroup.appendChild(radioButton);
    radioGroup.appendChild(label);
    radioGroup.appendChild(document.createElement('br'));
});

let semuaKonten = [{
        avatar: 'anjing.jpeg',
        nama: 'Anjing',
        judul: 'Apa benar tidak boleh minum es saat haid?',
        topik: 'Menstruation',
        desk: 'Aku pernah ditegur saat minum es, disitu aku keadaan sedang menstruasi, katanya dapat membekukan pembuluh darah dan membuat haid tidak lancar bla bla bla.',
        kategori: 'pertanyaan',
    },
    {
        avatar: 'anjing.jpeg',
        nama: 'Anjing',
        judul: 'Haid tidak lancar setelah melahirkan, normal atau tidak?',
        desk: 'Tidak perlu khawatir, menstruasi tidak lancar setelah melahirkan adalah kondisi normal. Bila ibu memberikan ASI eksklusif selama 6 bulan, umumnya menstruasi akan tidak teratur karena hormon prolaktin berpengaruh pada siklus menstruasi.',
        topik: 'Menstruation',
        kategori: 'informasi',
    },
    {
        avatar: 'profile.png',
        nama: 'Dr Boyke',
        judul: 'Mengenal HIV/AIDS',
        desk: 'HIV adalah virus yang menyerang sistem kekebalan tubuh manusia, mengganggu kemampuannya untuk melawan infeksi dan penyakit. Jika tidak diobati, HIV dapat berkembang menjadi AIDS.',
        topik: 'HIV/AIDS',
        kategori: 'informasi',
    },
];

function tambahDiskusi(event) {
    event.preventDefault();
    let judul = document.getElementById('judul').value;
    let topik = document.getElementById('inputTopics').value;
    let desk = document.getElementById('desk').value;

    const radioButtons = document.getElementsByName('animal');
    let selectedAvatar = '';
    let selectedNamaAVatar = '';
    
    radioButtons.forEach((radio) => {
        if (radio.checked) {
            selectedNamaAVatar = avatars[radio.value].nama;
            selectedAvatar = avatars[radio.value].avatar;
        }
    });

    // Pastiin kedua field diisi sebelum menambahkan data
    if (!desk) {
        diskusi = {
            judul: judul,
            topik: topik,
            kategori: 'pertanyaan', //default kategori untuk general user itu semuanya cuma bisa posting pertanyaan
            avatar: selectedAvatar,
            nama: selectedNamaAVatar,
        };

        semuaKonten.unshift(diskusi);
        console.log('Data diskusi telah ditambahkan:', diskusi);
        displayDiskusi();

    } else if (judul && desk) {
        diskusi = {
            judul: judul,
            topik: topik,
            desk: desk,
            kategori: 'pertanyaan', //default kategori untuk general user itu semuanya cuma bisa posting pertanyaan
            avatar: selectedAvatar,
            nama: selectedNamaAVatar,
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

//ini buat link side menu nya
document.getElementById('link').addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
        event.preventDefault();

        const links = document.querySelectorAll('.links a');
        links.forEach(link => link.classList.remove('active'));

        event.target.classList.add('active');

        selectedCategory = event.target.dataset.halaman;

        displayDiskusi();
    }
});


function filterKategori(konten) {
    return (
        (selectedCategory === 'beranda') ||
        (selectedCategory === 'jawab-pertanyaan' && konten.kategori === 'pertanyaan') ||
        (selectedCategory === 'informasi' && konten.kategori === 'informasi')
    );
}

// function filterTopik(konten) {
//     return (
//     (selectedTopic === '') ||
//     (selectedTopic === 'Menstruation' && konten.topik === 'Menstruation') ||
//     (selectedTopic === 'HIV/AIDS' && konten.topik === 'HIV/AIDS') ||
//     (selectedTopic === 'Teenage pregnancy' && konten.topik === 'Teenage pregnancy') ||
//     (selectedTopic === 'Sexual orientation' && konten.topik === 'Sexual orientation'));
// }

function displayDiskusi() {
    let listKonten = document.getElementById('postCard');
    let diskusiHMTL = '';

    const filteredKonten = semuaKonten.filter(konten => {
        // Filter berdasarkan kategori yang dipilih
        return filterKategori(konten) //&& filterTopik(konten)
        ;
    });

    listKonten.innerHTML = '';

    filteredKonten.forEach((konten, index) => {
        diskusiHMTL += `
            <div class="post-card mb-3">
                <div class="profile-info">
                    <img src="assets/images/${konten.avatar}" alt="Profile Picture">
                    <div>
                        <h5 class="profile-name">${konten.nama}</h5>
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
                <div class="reply-icon" onclick="toggleReplyForm(0)"><span class="bi bi-chat-right-fill"></span> Balas</div>
            </div>
            <div class="reply-form bg-white pb-3" style="display: none;">
                <img src="assets/images/profile.png" alt="Profile Picture">
                <input placeholder="Tulis balasan..."></input>
                <div class="send bi bi-send-fill" onclick="postReply(0)"></div>
            </div>
        `;
    });

    listKonten.innerHTML = diskusiHMTL;
}

window.onload = displayDiskusi();
