
let expenses = [];

function addExpense() {
    const descInput = document.getElementById("desc");
    const amountInput = document.getElementById("amount");

    const description = descInput.value.trim();
    const amountValue = amountInput.value.trim();
    const amount = Number(amountValue);

    if (description === "") {
        alert("Please enter an expense description.");
        return;
    }

    if (
        amountValue === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        alert("Please enter a valid expense amount.");
        return;
    }

    expenses.push({
        description: description,
        amount: Math.round(amount * 100)
    });

    descInput.value = "";
    amountInput.value = "";

    renderExpenses();
    descInput.focus();
}

function renderExpenses() {
    const list = document.getElementById("list");
    const total = document.getElementById("total");

    list.innerHTML = "";

    if (expenses.length === 0) {
        const emptyMessage = document.createElement("li");

        emptyMessage.className = "empty-message";
        emptyMessage.textContent = "No expenses recorded yet.";

        list.appendChild(emptyMessage);
    }

    let totalAmount = 0;

    expenses.forEach((expense, index) => {
        totalAmount += expense.amount;

        const li = document.createElement("li");

        const info = document.createElement("div");
        info.className = "expense-info";

        const name = document.createElement("span");
        name.className = "expense-name";
        name.textContent = expense.description;

        const amount = document.createElement("span");
        amount.className = "expense-amount";
        amount.textContent = formatCurrency(expense.amount);

        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteExpense(index);
        });

        info.appendChild(name);
        info.appendChild(amount);

        li.appendChild(info);
        li.appendChild(deleteButton);

        list.appendChild(li);
    });

    total.textContent = formatCurrency(totalAmount);
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenses();
}

function clearExpenses() {
    expenses = [];

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";

    renderExpenses();
}

function formatCurrency(amount) {
    return "₱" + (amount / 100).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

renderExpenses();
