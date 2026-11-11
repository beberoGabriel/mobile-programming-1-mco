
function convert() {
    const temperatureInput = document.getElementById("temperature");
    const unit = document.getElementById("unit").value;
    const result = document.getElementById("result");
    const message = document.getElementById("message");

    const temp = temperatureInput.value.trim();

    if (temp === "") {
        result.textContent = "Please enter a temperature.";
        message.textContent = "";
        return;
    }

    const number = Number(temp);

    if (!Number.isFinite(number)) {
        result.textContent = "Please enter a valid number.";
        message.textContent = "";
        return;
    }

    let converted;

    if (unit === "celsius") {
        converted = (number * 9 / 5) + 32;

        result.textContent = converted.toFixed(2) + " °F";
        message.textContent = number + " °C converted to Fahrenheit.";
    } else {
        converted = (number - 32) * 5 / 9;

        result.textContent = converted.toFixed(2) + " °C";
        message.textContent = number + " °F converted to Celsius.";
    }
}

function clearResult() {
    document.getElementById("temperature").value = "";
    document.getElementById("result").textContent =
        "Your result will appear here";
    document.getElementById("message").textContent = "";
}
