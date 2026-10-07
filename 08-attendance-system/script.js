function addStudent() {
    let name = document.getElementById("studentName").value.trim();

    if (name === "") {
        alert("Enter student name.");
        return;
    }

    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>
            <button onclick="markPresent(this)">Present</button>
        </td>
    `;

    document.getElementById("attendanceList").appendChild(row);

    document.getElementById("studentName").value = "";
}

function markPresent(button) {
    button.textContent = "Present ✓";
    button.disabled = true;
}