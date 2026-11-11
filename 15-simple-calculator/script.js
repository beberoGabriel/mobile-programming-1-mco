
function calculate() {
    const firstInput = document.getElementById("a");
    const secondInput = document.getElementById("b");
    const operator = document.getElementById("op").value;
    const result = document.getElementById("result");

    const firstValue = firstInput.value.trim();
    const secondValue = secondInput.value.trim();

    if (firstValue === "" || secondValue === "") {
        result.textContent = "Please enter both numbers.";
        return;
    }

    const x = Number(firstValue);
    const y = Number(secondValue);

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
        result.textContent = "Please enter valid numbers.";
        return;
    }

    let answer;

    switch (operator) {
        case "+":
            answer = x + y;
            break;

        case "-":
            answer = x - y;
            break;

        case "*":
            answer = x * y;
            break;

        case "/":
            if (y === 0) {
                result.textContent = "Cannot divide by zero.";
                return;
            }
            answer = x / y;
            break;

        default:
            result.textContent = "Invalid operation.";
            return;
    }

    if (!Number.isFinite(answer)) {
        result.textContent = "Result is too large.";
        return;
    }

    result.textContent = `Answer: ${Number(answer.toFixed(8))}`;
}

function clearCalculator() {
    document.getElementById("a").value = "";
    document.getElementById("b").value = "";
    document.getElementById("op").value = "+";
    document.getElementById("result").textContent =
        "Your answer will appear here";
}
