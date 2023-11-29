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