// Сохранение и загрузка темы из localStorage
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", theme);
});

document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }
});
// Функция, добавляющая класс 'visible' при появлении элемента в зоне видимости
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;

    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 50) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
}

// Запускаем функцию при загрузке страницы и прокрутке
window.addEventListener('scroll', revealOnScroll);
document.addEventListener('DOMContentLoaded', revealOnScroll);
const apiKey = "AIzaSyBWmp9wFJNH9X5tHXwELoKBPAvgdvA1zIc"; // Вставьте ваш API Key

const searchYouTube = async () => {
    const query = document.getElementById("searchInput").value;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${apiKey}&maxResults=5`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.items);
    } catch (error) {
        console.error("Error fetching YouTube data:", error);
    }
};

const displayResults = (videos) => {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Очистка предыдущих результатов

    videos.forEach((video) => {
        const videoDiv = document.createElement("div");
        videoDiv.innerHTML = `
            <h3>${video.snippet.title}</h3>
            <p>${video.snippet.channelTitle}</p>
            <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/${video.id.videoId}" 
                frameborder="0" 
                allowfullscreen>
            </iframe>
        `;
        resultsDiv.appendChild(videoDiv);
    });
};

