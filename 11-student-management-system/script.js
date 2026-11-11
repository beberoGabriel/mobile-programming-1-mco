
let students = [];
let editingIndex = -1;

function saveStudent() {
    const nameInput = document.getElementById("name");
    const courseInput = document.getElementById("course");

    const name = nameInput.value.trim();
    const course = courseInput.value.trim();

    if (name === "" || course === "") {
        showMessage("Please complete all fields.");
        return;
    }

    const duplicate = students.some((student, index) =>
        student.name.toLowerCase() === name.toLowerCase() &&
        index !== editingIndex
    );

    if (duplicate) {
        showMessage("Student already exists.");
        return;
    }

    if (editingIndex === -1) {
        students.push({ name, course });
        showMessage("Student added successfully.");
    } else {
        students[editingIndex] = { name, course };
        showMessage("Student updated successfully.");
    }

    cancelEdit();
    renderStudents();
}

function editStudent(index) {
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("course").value = student.course;

    editingIndex = index;

    document.getElementById("formTitle").textContent = "Edit Student";
    document.getElementById("saveButton").textContent = "Update Student";
    document.getElementById("cancelButton").hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteStudent(index) {
    students.splice(index, 1);

    if (editingIndex === index) {
        cancelEdit();
    } else if (editingIndex > index) {
        editingIndex--;
    }

    showMessage("Student deleted successfully.");
    renderStudents();
}

function cancelEdit() {
    document.getElementById("name").value = "";
    document.getElementById("course").value = "";

    editingIndex = -1;

    document.getElementById("formTitle").textContent = "Add New Student";
    document.getElementById("saveButton").textContent = "Add Student";
    document.getElementById("cancelButton").hidden = true;
}

function renderStudents() {
    const list = document.getElementById("studentList");
    const search = document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    const filteredStudents = students
        .map((student, index) => ({ ...student, index }))
        .filter(student =>
            student.name.toLowerCase().includes(search) ||
            student.course.toLowerCase().includes(search)
        );

    if (filteredStudents.length === 0) {
        list.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    No student records found.
                </td>
            </tr>
        `;
    }

    filteredStudents.forEach(student => {
        const row = document.createElement("tr");

        const numberCell = document.createElement("td");
        numberCell.textContent = student.index + 1;

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const courseCell = document.createElement("td");
        courseCell.textContent = student.course;

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "action-btn";
        editButton.onclick = () => editStudent(student.index);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deleteStudent(student.index);

        actionCell.append(editButton, deleteButton);

        row.append(
            numberCell,
            nameCell,
            courseCell,
            actionCell
        );

        list.appendChild(row);
    });

    document.getElementById("totalStudents").textContent =
        students.length;
}

function showMessage(message) {
    document.getElementById("message").textContent = message;
}

renderStudents();
