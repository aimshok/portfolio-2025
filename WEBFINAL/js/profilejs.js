document.addEventListener("DOMContentLoaded", () => {
    // Получаем текущего авторизованного пользователя
    const rememberedUser = localStorage.getItem("rememberedUser");
    const user = rememberedUser ? JSON.parse(localStorage.getItem("user_" + rememberedUser)) : null;

    // Проверяем авторизацию
    if (!user) {
        alert("Please log in first.");
        window.location.href = "html/signin.html";
        return;
    }

    // Отображаем данные пользователя
    document.getElementById("userName").textContent = user.name;
    document.getElementById("userEmail").textContent = user.email;

    // Загружаем сохранённый аватар
    const savedAvatar = localStorage.getItem("userAvatar");
    const avatar = document.getElementById("avatar");
    avatar.src = savedAvatar || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/avatar1.webp";
});

// Выход из аккаунта

// Выход из аккаунта
document.getElementById("logoutButton").addEventListener("click", function () {
    // Удаляем данные пользователя
    localStorage.removeItem("rememberedUser");
    alert("You have been logged out.");
    // Перенаправляем на страницу входа
    window.location.href = "html/signin.html";

});
document.getElementById("goToIndexButton").addEventListener("click", function () {
    window.location.href = "index.html";
});

// Функция загрузки аватара
function uploadAvatar(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const avatarUrl = e.target.result;
            document.getElementById("avatar").src = avatarUrl;
            localStorage.setItem("userAvatar", avatarUrl); // Сохранение в localStorage
        };
        reader.readAsDataURL(file);
    }
}
