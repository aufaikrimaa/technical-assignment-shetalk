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
    // Add logic to handle the posted reply, e.g., updating the UI or sending data to a server.
}

//ini buat side-menu to masing-masing halamannya
document.getElementById('link').addEventListener('click', function (event) {
    
    if (event.target.tagName === 'A') {
        event.preventDefault();

        const links = document.querySelectorAll('.links a');
        links.forEach(link => link.classList.remove('active'));

        event.target.classList.add('active');

        document.getElementById('postCard').style.display = 'none';
        document.getElementById('askCard').style.display = 'none';

        switch (event.target.dataset.halaman) {
            case 'beranda':
                document.getElementById('postCard').style.display = 'block';
                document.getElementById('askCard').style.display = 'block';
                break;
            case 'jawab-pertanyaan':
                document.getElementById('askCard').style.display = 'block';
                break;
            case 'informasi':
                document.getElementById('postCard').style.display = 'block';
                break;
            default:
                console.log('Halaman tidak ditemukan.');
        }
    }
});
