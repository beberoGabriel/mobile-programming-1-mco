
let account = null;

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

const registerButton = document.getElementById("registerButton");
const loginButton = document.getElementById("loginButton");
const clearButton = document.getElementById("clearButton");
const togglePassword = document.getElementById("togglePassword");

function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

function register() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        showMessage("Please enter your username and password.", "error");
        return;
    }

    if (username.length < 3) {
        showMessage("Username must have at least 3 characters.", "error");
        return;
    }

    if (password.length < 6) {
        showMessage("Password must have at least 6 characters.", "error");
        return;
    }

    account = {
        username: username,
        password: password
    };

    showMessage("Registration successful! You can now log in.", "success");
}

function login() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        showMessage("Please enter your username and password.", "error");
        return;
    }

    if (
        account &&
        username === account.username &&
        password === account.password
    ) {
        showMessage("Login successful! Welcome, " + account.username + "!", "success");
    } else {
        showMessage("Invalid username or password.", "error");
    }
}

function clearForm() {
    usernameInput.value = "";
    passwordInput.value = "";
    passwordInput.type = "password";
    togglePassword.textContent = "Show";
    showMessage("", "");
    usernameInput.focus();
}

function changePasswordVisibility() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }
}

registerButton.addEventListener("click", register);
loginButton.addEventListener("click", login);
clearButton.addEventListener("click", clearForm);
togglePassword.addEventListener("click", changePasswordVisibility);

passwordInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        login();
    }
});
