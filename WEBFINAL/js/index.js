
document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('#stars .star');
    const ratingFeedback = document.getElementById('rating-feedback');
    const submitButton = document.getElementById('submit-rating');
    let rating = 0;

    stars.forEach((star) => {
        star.addEventListener('mouseover', () => {
            resetStars();
            highlightStars(star.dataset.value);
            ratingFeedback.textContent = `Rating: ${star.dataset.value} stars`;
        });

        star.addEventListener('click', () => {
            rating = star.dataset.value;
            highlightStars(rating);
            ratingFeedback.textContent = `You rated us ${rating} star(s)`;
        });

        star.addEventListener('mouseout', () => {
            resetStars();
            if (rating > 0) highlightStars(rating);
            else ratingFeedback.textContent = "Hover over the stars to rate";
        });
    });

    submitButton.addEventListener('click', () => {
        if (rating > 0) {
            const comment = document.getElementById('rating-comment').value;
            alert(`Thank you for your rating of ${rating} stars! Your comment: "${comment}"`);
        } else {
            alert('Please select a star rating before submitting.');
        }
    });

    function resetStars() {
        stars.forEach((star) => star.classList.remove('selected'));
    }

    function highlightStars(num) {
        stars.forEach((star) => {
            if (star.dataset.value <= num) {
                star.classList.add('selected');
            }
        });
    }
});

let map;
let panorama;

// Инициализация карты
function initMap() {
    // Создаем карту
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.238949, lng: 76.889709 }, // Алматы, Казахстан
        zoom: 12,
    });

    // Создаем панораму Street View
    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("map"),
        {
            position: { lat: 43.238949, lng: 76.889709 },
            pov: { heading: 165, pitch: 0 },
            zoom: 1,
        }
    );

    // Устанавливаем панораму как режим просмотра карты
    map.setStreetView(panorama);

    // Добавляем обработчики событий
    document.getElementById("load-street-view").addEventListener("click", () => {
        const locationSelect = document.getElementById("locations");
        const location = locationSelect.value.split(",");
        const lat = parseFloat(location[0]);
        const lng = parseFloat(location[1]);
        panorama.setPosition({ lat: lat, lng: lng });
        panorama.setVisible(true);
    });
}

// Загружаем карту при загрузке страницы
window.initMap = initMap;

// Обработчики для открытия и закрытия чата
const chatToggle = document.getElementById("chatbot-toggle");
const chatWindow = document.getElementById("chatbot-window");
const closeChat = document.getElementById("close-chatbot");
const sendMessageButton = document.getElementById("send-message");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chatbot-messages");

// Открытие и закрытие окна чата
chatToggle.addEventListener("click", () => {
    chatWindow.classList.toggle("chatbot-hidden");
});
closeChat.addEventListener("click", () => {
    chatWindow.classList.add("chatbot-hidden");
});

// Получение текущего времени
function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0'); // Часы с ведущим нулём
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Минуты с ведущим нулём
    return `Сейчас ${hours}:${minutes}`;
}

// Ответы на вопросы
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Основные ответы
    if (message.includes("привет")) return "Здравствуйте! Я ваш гид по городу. Чем могу помочь?";
    if (message.includes("погода")) return "Сейчас в городе солнечно, около 25 градусов.";
    if (message.includes("рестораны")) return "Рекомендую посетить ресторан 'Наурыз' или кафе 'Гурман'.";
    if (message.includes("достопримечательности")) return "В нашем городе есть много интересных мест, например, Байтерек и Дворец мира и согласия.";
    if (message.includes("спасибо")) return "Пожалуйста! Обращайтесь, если будут ещё вопросы.";

    // Проверка времени
    if (message.includes("сколько времени") || message.includes("текущее время") || message.includes("сейчас время")) {
        return getCurrentTime();
    }

    // Дополнительные вопросы
    if (message.includes("какой сейчас год")) return "Сейчас 2024 год.";
    if (message.includes("что посмотреть в городе")) return "Советую посетить музей города, центральный парк и старый город.";
    if (message.includes("какие мероприятия проходят")) return "Сегодня проходят концерты на центральной площади и выставка в музее.";
    if (message.includes("как доехать до аэропорта")) return "Вы можете взять такси или воспользоваться автобусом №25.";
    if (message.includes("где остановиться")) return "Можете рассмотреть отели 'Hilton' и 'Astana International Hotel'.";
    if (message.includes("где найти сувениры")) return "Сувениры можно приобрести в торговом центре 'Mega Center'.";
    if (message.includes("как заказать такси")) return "Можете воспользоваться приложениями 'Yandex Go' или 'Uber'.";
    if (message.includes("где можно погулять вечером")) return "Попробуйте посетить центральную набережную или парк.";
    if (message.includes("как пройти в библиотеку")) return "Библиотека находится на улице Абая, напротив парка.";
    if (message.includes("есть ли аквапарк")) return "Да, в городе есть аквапарк 'AquaLand'.";
    if (message.includes("какой курс доллара")) return "Курс доллара лучше всего уточнить в приложении вашего банка.";
    if (message.includes("где купить билеты на концерт")) return "Билеты можно купить в кассах или онлайн на сайте Ticketon.kz.";
    if (message.includes("куда сходить с детьми")) return "Рекомендую зоопарк или детский развлекательный центр 'Kids Planet'.";
    if (message.includes("где лучше обменять валюту")) return "Лучше всего обменивать валюту в крупных банках.";

    // Ответ по умолчанию
    return "Извините, я не понял вопрос. Попробуйте спросить что-то другое.";
}

// Функция для отображения сообщения в чате
function addMessageToChat(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Автопрокрутка
}

// Обработка отправки сообщения
sendMessageButton.addEventListener("click", () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessageToChat("user", userMessage);
        const botResponse = getBotResponse(userMessage);
        addMessageToChat("bot", botResponse);
        userInput.value = ""; // Очистка поля ввода
    }
});

// Отправка сообщения при нажатии Enter
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessageButton.click();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Загрузка сохраненной темы из localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '🌚'; // Тёмная тема
    } else {
        themeToggle.textContent = '🌞'; // Светлая тема
    }

    // Переключение темы при клике
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '🌚' : '🌞';
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const profileLink = document.querySelector('.fa-user-circle').parentElement;

    if (isLoggedIn) {
        profileLink.style.display = 'block'; // Show profile link if logged in
    } else {
        profileLink.style.display = 'none'; // Hide profile link if not logged in
    }
});





document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById('nameInput');
    const greeting = document.getElementById('greeting');
    nameInput.addEventListener('input', () => {
        const name = nameInput.value;
        greeting.textContent = name ? `Привет, ${name}!` : 'Привет, гость!';
    });
});
    function validateReviewForm() {
        let isValid = true;

    
        document.getElementById('nameError').textContent = '';
        document.getElementById('cityError').textContent = '';
        document.getElementById('feedbackError').textContent = '';

   
        const name = document.getElementById('name').value.trim();
        const city = document.getElementById('city').value.trim();
        const feedback = document.getElementById('feedback').value.trim();

       
        if (name === '') {
            document.getElementById('nameError').textContent = 'Name is required.';
            isValid = false;
        }

   
        if (city === '') {
            document.getElementById('cityError').textContent = 'City is required.';
            isValid = false;
        }

        // Validate Feedback
        if (feedback.length < 20) {
            document.getElementById('feedbackError').textContent = 'Review must be at least 20 characters.';
            isValid = false;
        }

        return isValid;
    }

    function resetForm() {
        document.getElementById('reviewForm').reset();
        document.getElementById('nameError').textContent = '';
        document.getElementById('cityError').textContent = '';
        document.getElementById('feedbackError').textContent = '';
    }




    function changeBackgroundColor() {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F0E68C', '#FF69B4', '#8A2BE2', '#66CDAA', '#000000', '#00FFFF', '#FF00FF', '#FAEBD7'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
    }




    function updateDateTime() {
        const now = new Date();
        const options = {
            year: 'numeric', month: 'long',
            day: 'numeric'
        };
        const formattedDateTime = now.toLocaleDateString('en-US', options);
        document.getElementById('currentDateTime').textContent = formattedDateTime;
    }

    
    setInterval(updateDateTime, 1000);

    
    document.addEventListener('DOMContentLoaded', updateDateTime);



    function validateSubscribeForm() {
        let email = document.getElementById('subscribeEmail').value.trim();
        let emailError = document.getElementById('subscribeEmailError');
        let isValid = true;

        
        let emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        if (!email.match(emailPattern)) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        return isValid;
    }

    
    const subscribeModal = document.getElementById('subscribeModal');
    subscribeModal.addEventListener('hidden.bs.modal', function () {
        document.getElementById('subscribeForm').reset();
        document.getElementById('subscribeEmailError').textContent = '';
    });




document.getElementById('subscriptionForm').addEventListener('submit', function(event) {
            event.preventDefault(); 

            
            const email = document.getElementById('emailInput').value;
            const name = document.getElementById('nameInput').value;

          
        });





        const form = document.getElementById('signUpForm');
        const nameInput = document.getElementById('nameInput');
        const emailInput = document.getElementById('emailInput');
        const passwordInput = document.getElementById('passwordInput');
        const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    


       
        form.addEventListener('submit', function (event) {
            event.preventDefault();  
          
            form.classList.remove('was-validated');

           
            if (passwordInput.value !== confirmPasswordInput.value) {
                confirmPasswordInput.setCustomValidity('Passwords do not match.');
            } else {
                confirmPasswordInput.setCustomValidity('');
            }

            
            if (form.checkValidity()) {
                successMessage.style.display = 'block';
                form.reset();
                form.classList.remove('was-validated');
            } else {
                form.classList.add('was-validated');
            }
        });


        document.getElementById('themeToggle').addEventListener('click', function () {
            document.body.classList.toggle('dark-theme');
        });
        