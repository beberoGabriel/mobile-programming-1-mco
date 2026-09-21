function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    if (username === "admin" && password === "1234") {
        message.textContent = "Login successful!";
    } else {
        message.textContent = "Invalid username or password.";
    }
}