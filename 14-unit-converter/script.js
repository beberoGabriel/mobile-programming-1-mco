
function convert() {
    const valueInput = document.getElementById("value");
    const unit = document.getElementById("unit").value;
    const result = document.getElementById("result");

    const value = valueInput.value.trim();

    if (value === "" || !Number.isFinite(Number(value))) {
        result.textContent = "Please enter a valid number.";
        return;
    }

    const number = Number(value);
    let converted;
    let unitName;

    switch (unit) {
        case "kmmi":
            converted = number * 0.621371;
            unitName = "miles";
            break;

        case "mikm":
            converted = number * 1.60934;
            unitName = "kilometers";
            break;

        case "ck":
            converted = (number * 9 / 5) + 32;
            unitName = "°F";
            break;

        case "kc":
            converted = (number - 32) * 5 / 9;
            unitName = "°C";
            break;

        default:
            result.textContent = "Invalid conversion selected.";
            return;
    }

    result.textContent = `${converted.toFixed(2)} ${unitName}`;
}

function clearConverter() {
    document.getElementById("value").value = "";
    document.getElementById("result").textContent =
        "Your result will appear here";
    document.getElementById("unit").selectedIndex = 0;
}
