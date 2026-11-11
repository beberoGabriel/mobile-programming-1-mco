
function calculateBMI() {
    const weightInput = document.getElementById("weight");
    const heightInput = document.getElementById("height");
    const result = document.getElementById("result");
    const message = document.getElementById("message");

    const weight = Number(weightInput.value);
    const height = Number(heightInput.value);

    if (
        weightInput.value.trim() === "" ||
        heightInput.value.trim() === "" ||
        !Number.isFinite(weight) ||
        !Number.isFinite(height) ||
        weight <= 0 ||
        height <= 0
    ) {
        result.textContent = "Invalid Input";
        message.textContent = "Please enter valid positive values.";
        return;
    }

    const bmi = weight / (height * height);

    result.textContent = "BMI: " + bmi.toFixed(2);

    message.textContent =
        "Calculation completed. BMI alone cannot determine your health status.";
}

function clearCalculator() {
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";

    document.getElementById("result").textContent =
        "Your result will appear here";

    document.getElementById("message").textContent = "";
}
