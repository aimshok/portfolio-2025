// Обработка формы авторизации
document.getElementById("authForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value;

  // Валидация email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
  }

  // Проверяем данные пользователя в localStorage
  const storedUser = localStorage.getItem("user_" + email);
  if (!storedUser) {
      alert("No account found with this email.");
      return;
  }

  const userData = JSON.parse(storedUser);

  // Проверяем пароль
  if (userData.password !== password) {
      alert("Incorrect password. Please try again.");
      return;
  }

  // Сохраняем пользователя при включённой опции "Remember Me"
  if (document.getElementById("rememberMe").checked) {
      localStorage.setItem("rememberedUser", email);
  } else {
      localStorage.removeItem("rememberedUser");
  }

  alert(`Welcome back, ${userData.name}!`);
  // Перенаправляем на страницу профиля
  window.location.href = "html/profile.html";
});

// Автозаполнение email при использовании "Remember Me"
window.onload = function () {
  const rememberedUser = localStorage.getItem("rememberedUser");
  if (rememberedUser) {
      document.getElementById("emailInput").value = rememberedUser;
      document.getElementById("rememberMe").checked = true;
  }
};

// Тоггл для смены темы (опционально)
function toggleTheme() {
  const body = document.getElementById("pageBody");
  body.classList.toggle("light-mode");
  body.classList.toggle("dark-mode");
}
