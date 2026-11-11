
const tasks = [];

const taskInput = document.getElementById("task");
const searchInput = document.getElementById("search");
const taskList = document.getElementById("list");
const emptyMessage = document.getElementById("empty");
const message = document.getElementById("message");

const totalDisplay = document.getElementById("total");
const pendingDisplay = document.getElementById("pending");
const completedDisplay = document.getElementById("completed");

let currentFilter = "all";

document.getElementById("addButton").addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

searchInput.addEventListener("input", renderTasks);

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", function() {
        currentFilter = this.dataset.filter;

        document.querySelectorAll(".filter").forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");
        renderTasks();
    });
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (!taskText) {
        message.textContent = "Please enter a task.";
        return;
    }

    tasks.push({
        id: Date.now() + Math.random(),
        text: taskText,
        done: false
    });

    taskInput.value = "";
    message.textContent = "Task added successfully!";

    renderTasks();
    taskInput.focus();
}

function toggleTask(id) {
    const task = tasks.find(item => item.id === id);

    if (task) {
        task.done = !task.done;
        renderTasks();
    }
}

function deleteTask(id) {
    const index = tasks.findIndex(item => item.id === id);

    if (index !== -1) {
        tasks.splice(index, 1);
        message.textContent = "Task deleted.";
        renderTasks();
    }
}

function renderTasks() {
    const searchValue = searchInput.value.toLowerCase().trim();

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.text.toLowerCase().includes(searchValue);

        const matchesFilter =
            currentFilter === "all" ||
            (currentFilter === "pending" && !task.done) ||
            (currentFilter === "completed" && task.done);

        return matchesSearch && matchesFilter;
    });

    taskList.replaceChildren();

    totalDisplay.textContent = tasks.length;
    pendingDisplay.textContent = tasks.filter(task => !task.done).length;
    completedDisplay.textContent = tasks.filter(task => task.done).length;

    emptyMessage.textContent = tasks.length === 0
        ? "No tasks yet. Add your first task!"
        : "No matching tasks found.";

    emptyMessage.style.display =
        filteredTasks.length === 0 ? "block" : "none";

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        const label = document.createElement("label");
        label.className = "task-label";

        if (task.done) {
            label.classList.add("done");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        label.append(checkbox, span);
        li.append(label, deleteButton);
        taskList.appendChild(li);
    });
}

renderTasks();
