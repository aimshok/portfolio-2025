// Сохранение и загрузка темы из localStorage
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Проверка сохраненной темы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '🌚';
    } else {
        themeToggle.textContent = '🌞';
    }

    // Переключение темы при клике
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '🌚' : '🌞';
    });
});

// Валидация формы
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Invalid email format');
        return;
    }
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    alert('Form submitted successfully');
});

// Play song
document.getElementById('play-song1').addEventListener('click', () => {
    const song = document.getElementById('song1');
    song.paused ? song.play() : song.pause();
});

// Load Random Fact
document.getElementById('load-content').addEventListener('click', async () => {
    const fact = await fetchFact();
    document.getElementById('fact').textContent = fact;
});

async function fetchFact() {
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
    const data = await response.json();
    return data.text;
}
