// signup.js
document.getElementById('authForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const password = document.getElementById('passwordInput').value;
  const confirmPassword = document.getElementById('confirmPasswordInput').value;

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
  }

  // Check password length
  if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
  }

  // Save user data to localStorage
  const userData = {
      name: name,
      email: email,
      password: password,
  };
  localStorage.setItem('user_' + email, JSON.stringify(userData));

  alert('Registration successful! Redirecting to Sign In page...');
  window.location.href = 'html/signin.html';
});

// Optional: Dark/Light mode toggle
function toggleTheme() {
  const body = document.getElementById('pageBody');
  body.classList.toggle('light-mode');
  body.classList.toggle('dark-mode');
}
