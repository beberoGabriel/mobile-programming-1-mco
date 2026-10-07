let questions = [
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
    }
];

let current = 0;
let score = 0;

function showQuestion() {
    if (current >= questions.length) {
        document.getElementById("question").textContent =
            "Quiz Finished!";
        document.getElementById("answers").innerHTML = "";
        document.getElementById("score").textContent =
            "Score: " + score + "/" + questions.length;
        return;
    }

    let q = questions[current];

    document.getElementById("question").textContent = q.question;

    let answers = document.getElementById("answers");
    answers.innerHTML = "";

    q.answers.forEach((answer, index) => {
        let button = document.createElement("button");

        button.textContent = answer;
        button.className = "answer";

        button.onclick = function() {
            if (index === q.correct) {
                score++;
            }

            current++;
            showQuestion();
        };

        answers.appendChild(button);
    });
}

showQuestion();