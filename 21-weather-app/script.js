
const data = {
    manila: {
        temp: 30,
        condition: "Partly Cloudy",
        icon: "⛅"
    },
    cebu: {
        temp: 29,
        condition: "Cloudy",
        icon: "☁️"
    },
    davao: {
        temp: 31,
        condition: "Sunny",
        icon: "☀️"
    }
};

const cityInput = document.getElementById("city");
const result = document.getElementById("result");
const message = document.getElementById("message");

document.getElementById("searchButton")
    .addEventListener("click", showWeather);

document.getElementById("clearButton")
    .addEventListener("click", clearWeather);

cityInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        showWeather();
    }
});

function showWeather() {
    const city = cityInput.value.trim().toLowerCase();

    if (!city) {
        message.textContent = "Please enter a city name.";
        result.replaceChildren();
        return;
    }

    const weather = data[city];

    if (!weather) {
        message.textContent = "No sample weather data for that city.";
        result.replaceChildren();

        const error = document.createElement("p");
        error.className = "condition";
        error.textContent = "Please try Manila, Cebu, or Davao.";

        result.appendChild(error);
        return;
    }

    message.textContent = "";

    const heading = document.createElement("h2");
    heading.textContent = city.toUpperCase();

    const icon = document.createElement("div");
    icon.className = "result-icon";
    icon.textContent = weather.icon;

    const temperature = document.createElement("p");
    temperature.className = "temperature";
    temperature.textContent = `${weather.temp}°C`;

    const condition = document.createElement("p");
    condition.className = "condition";
    condition.textContent = weather.condition;

    result.replaceChildren(
        heading,
        icon,
        temperature,
        condition
    );
}

function clearWeather() {
    cityInput.value = "";
    message.textContent = "";

    const placeholder = document.createElement("div");
    placeholder.className = "placeholder";

    const icon = document.createElement("span");
    icon.textContent = "🌍";

    const text = document.createElement("p");
    text.textContent = "Search for a city to see its sample weather.";

    placeholder.append(icon, text);
    result.replaceChildren(placeholder);

    cityInput.focus();
}
