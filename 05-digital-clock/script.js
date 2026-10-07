function updateClock() {
    let now = new Date();

    let time = now.toLocaleTimeString();
    let date = now.toLocaleDateString();

    document.getElementById("time").textContent = time;
    document.getElementById("date").textContent = date;
}

setInterval(updateClock, 1000);
updateClock();