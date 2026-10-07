function calculateGrade() {
    let quiz = Number(document.getElementById("quiz").value);
    let exam = Number(document.getElementById("exam").value);
    let activity = Number(document.getElementById("activity").value);

    let grade = (quiz * 0.30) + (exam * 0.40) + (activity * 0.30);

    document.getElementById("result").textContent =
        "Final Grade: " + grade.toFixed(2);
}