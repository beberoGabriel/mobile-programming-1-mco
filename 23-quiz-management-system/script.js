
const questions = [
    {
        q: "What does HTML stand for?",
        a: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        q: "Which language is used to style a webpage?",
        a: ["HTML", "CSS", "SQL"],
        correct: 1
    },
    {
        q: "Which language adds interactivity to webpages?",
        a: ["JavaScript", "Python only", "C only"],
        correct: 0
    },
    {
        q: "Which HTML tag creates a hyperlink?",
        a: ["<p>", "<a>", "<h1>"],
        correct: 1
    },
    {
        q: "Which property changes text color in CSS?",
        a: ["background", "font-size", "color"],
        correct: 2
    }
];

let current = 0;
let points = 0;
let selectedAnswer = null;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const questionNumber = document.getElementById("questionNumber");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const message = document.getElementById("message");

const quizSection = document.getElementById("quizSection");
const resultSection = document.getElementById("resultSection");

const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");

function renderQuestion() {
    const item = questions[current];

    selectedAnswer = null;
    message.textContent = "";

    questionElement.textContent = item.q;
    questionNumber.textContent =
        `Question ${current + 1} of ${questions.length}`;

    const progress = ((current + 1) / questions.length) * 100;

    progressFill.style.width = `${progress}%`;
    progressPercent.textContent = `${Math.round(progress)}%`;

    answersElement.replaceChildren();

    item.a.forEach((answer, index) => {
        const label = document.createElement("label");
        label.className = "answer-option";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = index;

        const text = document.createElement("span");
        text.textContent = answer;

        radio.addEventListener("change", () => {
            selectedAnswer = index;

            document.querySelectorAll(".answer-option")
                .forEach(option => option.classList.remove("selected"));

            label.classList.add("selected");
            message.textContent = "";
        });

        label.append(radio, text);
        answersElement.appendChild(label);
    });

    nextButton.textContent =
        current === questions.length - 1
            ? "Finish Quiz"
            : "Next Question";
}

function nextQuestion() {
    if (selectedAnswer === null) {
        message.textContent = "Please select an answer first.";
        return;
    }

    if (selectedAnswer === questions[current].correct) {
        points++;
    }

    current++;

    if (current < questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizSection.hidden = true;
    resultSection.hidden = false;

    const percentage = Math.round(
        (points / questions.length) * 100
    );

    document.getElementById("finalScore").textContent =
        `${points}/${questions.length}`;

    document.getElementById("percentage").textContent =
        `${percentage}%`;

    let resultText;

    if (percentage === 100) {
        resultText = "Excellent! You answered all questions correctly!";
    } else if (percentage >= 60) {
        resultText = "Good job! Keep learning and improving.";
    } else {
        resultText = "Keep practicing. You can do better next time!";
    }

    document.getElementById("resultMessage").textContent = resultText;
}

function restartQuiz() {
    current = 0;
    points = 0;
    selectedAnswer = null;

    resultSection.hidden = true;
    quizSection.hidden = false;

    renderQuestion();
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

renderQuestion();
