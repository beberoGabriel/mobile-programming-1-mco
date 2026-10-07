function convert() {
    let temp = Number(document.getElementById("temperature").value);
    let unit = document.getElementById("unit").value;
    let result;

    if (unit === "celsius") {
        result = (temp * 9 / 5) + 32;
        document.getElementById("result").textContent =
            result.toFixed(2) + " °F";
    } else {
        result = (temp - 32) * 5 / 9;
        document.getElementById("result").textContent =
            result.toFixed(2) + " °C";
    }
}