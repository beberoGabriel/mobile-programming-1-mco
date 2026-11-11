
let students = [];

function addStudent() {
    const input = document.getElementById("studentName");
    const name = input.value.trim();

    if (name === "") {
        showMessage("Please enter a student name.");
        return;
    }

    const alreadyExists = students.some(
        student => student.name.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
        showMessage("This student is already on the list.");
        return;
    }

    students.push({
        name: name,
        status: "Not Marked"
    });

    input.value = "";
    showMessage("Student added successfully.");
    renderStudents();
}

function markAttendance(index, status) {
    students[index].status = status;
    renderStudents();
}

function deleteStudent(index) {
    students.splice(index, 1);
    showMessage("Student removed.");
    renderStudents();
}

function renderStudents() {
    const list = document.getElementById("attendanceList");

    list.innerHTML = "";

    if (students.length === 0) {
        list.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    No students added yet.
                </td>
            </tr>
        `;
    }

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        const numberCell = document.createElement("td");
        numberCell.textContent = index + 1;

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const statusCell = document.createElement("td");
        const statusLabel = document.createElement("span");

        statusLabel.textContent = student.status;
        statusLabel.className =
            student.status === "Present" ? "status-present" :
            student.status === "Absent" ? "status-absent" : "";

        statusCell.appendChild(statusLabel);

        const actionCell = document.createElement("td");

        const presentButton = document.createElement("button");
        presentButton.textContent = "Present";
        presentButton.className = "action-btn";
        presentButton.onclick = () => markAttendance(index, "Present");

        const absentButton = document.createElement("button");
        absentButton.textContent = "Absent";
        absentButton.className = "action-btn";
        absentButton.onclick = () => markAttendance(index, "Absent");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deleteStudent(index);

        actionCell.append(
            presentButton,
            absentButton,
            deleteButton
        );

        row.append(
            numberCell,
            nameCell,
            statusCell,
            actionCell
        );

        list.appendChild(row);
    });

    updateSummary();
}

function updateSummary() {
    const total = students.length;

    const present = students.filter(
        student => student.status === "Present"
    ).length;

    const absent = students.filter(
        student => student.status === "Absent"
    ).length;

    document.getElementById("totalStudents").textContent = total;
    document.getElementById("presentCount").textContent = present;
    document.getElementById("absentCount").textContent = absent;
}

function showMessage(message) {
    document.getElementById("message").textContent = message;
}

document.getElementById("studentName").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addStudent();
    }
});

renderStudents();
