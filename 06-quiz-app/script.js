
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language"
        ],
        correct: 0
    },
    {
        question: "Which language is used for styling?",
        answers: [
            "HTML",
            "CSS",
            "Java"
        ],
        correct: 1
    },
    {
        question: "Which language makes webpages interactive?",
        answers: [
            "JavaScript",
            "CSS",
            "HTML"
        ],
        correct: 0
    },
    {
        question: "Which tag is used to create a link?",
        answers: [
            "<p>",
            "<a>",
            "<h1>"
        ],
        correct: 1
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            "//",
            "##",
            "**"
        ],
        correct: 0
    }
];

let current = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");
const progressFill = document.getElementById("progress-fill");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");

function showQuestion() {
    answered = false;

    const q = questions[current];

    questionElement.textContent = q.question;
    progressElement.textContent =
        `Question ${current + 1} of ${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    progressFill.style.width =
        `${(current / questions.length) * 100}%`;

    feedbackElement.textContent = "";
    nextButton.disabled = true;

    answersElement.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.className = "answer";

        button.addEventListener("click", () => {
            selectAnswer(index, button);
        });

        answersElement.appendChild(button);
    });
}

function selectAnswer(index) {
    if (answered) return;

    answered = true;

    const correct = questions[current].correct;
    const buttons = answersElement.querySelectorAll(".answer");

    buttons.forEach((button, i) => {
        button.disabled = true;

        if (i === correct) {
            button.classList.add("correct");
        }

        if (i === index && index !== correct) {
            button.classList.add("wrong");
        }
    });

    if (index === correct) {
        score++;
        feedbackElement.textContent = "Correct answer!";
        feedbackElement.style.color = "#34d399";
    } else {
        feedbackElement.textContent = "Incorrect! Try the next question.";
        feedbackElement.style.color = "#f87171";
    }

    scoreElement.textContent = `Score: ${score}`;
    nextButton.disabled = false;
}

function nextQuestion() {
    if (!answered) return;

    current++;

    if (current < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-content").classList.add("hidden");

    const result = document.getElementById("result");
    result.classList.remove("hidden");

    const percentage = Math.round(
        (score / questions.length) * 100
    );

    document.getElementById("final-score").textContent =
        `Your Score: ${score}/${questions.length} (${percentage}%)`;

    document.getElementById("message").textContent =
        percentage === 100
            ? "Excellent! Perfect score!"
            : percentage >= 60
                ? "Good job! Keep learning!"
                : "Keep practicing. You can improve!";
    
    progressFill.style.width = "100%";
}

function restartQuiz() {
    current = 0;
    score = 0;

    document.getElementById("result").classList.add("hidden");
    document.getElementById("quiz-content").classList.remove("hidden");

    showQuestion();
}

nextButton.addEventListener("click", nextQuestion);

document.getElementById("restart-btn")
    .addEventListener("click", restartQuiz);

showQuestion();
