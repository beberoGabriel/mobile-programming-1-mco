
let answer;
let attempts = 0;
let gameFinished = false;

const guessInput = document.getElementById("guess");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const guessButton = document.getElementById("guessButton");

function newGame() {
    answer = Math.floor(Math.random() * 100) + 1;

    attempts = 0;
    gameFinished = false;

    guessInput.value = "";
    guessInput.disabled = false;
    guessButton.disabled = false;

    message.textContent = "Good luck! Make your first guess.";
    attemptsDisplay.textContent = "Attempts: 0";

    guessInput.focus();
}

function checkGuess() {
    const value = guessInput.value.trim();
    const number = Number(value);

    if (value === "" || !Number.isInteger(number) ||
        number < 1 || number > 100) {
        message.textContent = "Enter a whole number from 1 to 100.";
        return;
    }

    if (gameFinished) {
        message.textContent = "Start a new game to play again.";
        return;
    }

    attempts++;

    attemptsDisplay.textContent = "Attempts: " + attempts;

    if (number === answer) {
        message.textContent =
            `Correct! You guessed it in ${attempts} attempts!`;

        gameFinished = true;
        guessInput.disabled = true;
        guessButton.disabled = true;

    } else if (number < answer) {
        message.textContent = "Too low! Try a higher number.";

    } else {
        message.textContent = "Too high! Try a lower number.";
    }

    if (!gameFinished) {
        guessInput.value = "";
        guessInput.focus();
    }
}

guessInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});

newGame();
