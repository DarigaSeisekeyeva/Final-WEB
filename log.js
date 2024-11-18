const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const accountSection = document.getElementById('account-section');
const userDisplay = document.getElementById('userDisplay');
const userGender = document.getElementById('userGender');
const logoutBtn = document.getElementById('logoutBtn');
const passwordHelp = document.getElementById('passwordHelp');
const registerPasswordHelp = document.getElementById('registerPasswordHelp');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');

function checkUserSession() {
    const sessionUsername = sessionStorage.getItem('username');
    const sessionGender = sessionStorage.getItem('gender');

    if (sessionUsername && sessionGender) {
        showAccountSection(sessionUsername, sessionGender); 
    } else {
        showLoginSection(); 
    }
}

function showLoginSection() {
    loginSection.classList.remove('d-none');
    registerSection.classList.add('d-none');
    accountSection.classList.add('d-none');
}

function showRegisterSection() {
    loginSection.classList.add('d-none');
    registerSection.classList.remove('d-none');
    accountSection.classList.add('d-none');
}

function showAccountSection(username, gender) {
    loginSection.classList.add('d-none');
    registerSection.classList.add('d-none');
    accountSection.classList.remove('d-none');
    userDisplay.textContent = username;
    userGender.textContent = gender;
}

function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);       
    const hasNumber = /[0-9]/.test(password);           
    const hasSpecialChar = /[!@#$%^&*]/.test(password); 

    return password.length >= minLength && hasUpperCase && hasNumber && hasSpecialChar;
}

registerForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    const gender = document.getElementById('registerGender').value;

    if (!validatePassword(password)) {
        registerPasswordHelp.classList.remove('d-none'); 
        return; 
    } else {
        registerPasswordHelp.classList.add('d-none');
    }

    if (username && password && gender) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('gender', gender);

        alert('Registration successful! You can now log in.');
        showLoginSection();
    }
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const storedGender = localStorage.getItem('gender');

    if (username === storedUsername && password === storedPassword) {
        sessionStorage.setItem('username', storedUsername);
        sessionStorage.setItem('gender', storedGender);
        showAccountSection(storedUsername, storedGender);
    } else {
        passwordHelp.classList.remove('d-none');
    }
});

logoutBtn.addEventListener('click', () => {
    sessionStorage.clear(); 
    showLoginSection();
});

switchToRegister.addEventListener('click', showRegisterSection);
switchToLogin.addEventListener('click', showLoginSection);

checkUserSession();
