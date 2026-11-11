
let bal = 1000;

const startingBalance = 1000;
const transactions = [];

const amountInput = document.getElementById("amount");
const balanceDisplay = document.getElementById("balance");
const message = document.getElementById("message");
const historyList = document.getElementById("history");
const emptyMessage = document.getElementById("empty");

const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP"
});

document.getElementById("depositButton")
    .addEventListener("click", deposit);

document.getElementById("withdrawButton")
    .addEventListener("click", withdraw);

document.getElementById("resetButton")
    .addEventListener("click", resetAccount);

function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

function updateBalance() {
    balanceDisplay.textContent = formatter.format(bal);
}

function getAmount() {
    const value = amountInput.value.trim();
    const amount = Number(value);

    if (value === "" || !Number.isFinite(amount) || amount <= 0) {
        showMessage("Please enter a valid amount greater than zero.", "error");
        return null;
    }

    // Keep the demo limited to two decimal places.
    if (Math.round(amount * 100) !== amount * 100) {
        showMessage("Please enter an amount with up to two decimal places.", "error");
        return null;
    }

    return amount;
}

function addTransaction(type, amount) {
    transactions.unshift({
        type: type,
        amount: amount,
        date: new Date().toLocaleString()
    });

    renderHistory();
}

function deposit() {
    const amount = getAmount();

    if (amount === null) return;

    bal += amount;

    addTransaction("Deposit", amount);
    updateBalance();

    amountInput.value = "";
    showMessage("Deposit successful!", "success");
}

function withdraw() {
    const amount = getAmount();

    if (amount === null) return;

    if (amount > bal) {
        showMessage("Insufficient balance. Please enter a smaller amount.", "error");
        return;
    }

    bal -= amount;

    addTransaction("Withdrawal", amount);
    updateBalance();

    amountInput.value = "";
    showMessage("Withdrawal successful!", "success");
}

function renderHistory() {
    historyList.replaceChildren();

    emptyMessage.style.display =
        transactions.length === 0 ? "block" : "none";

    transactions.forEach(transaction => {
        const item = document.createElement("li");

        const details = document.createElement("span");
        details.textContent =
            `${transaction.type} - ${transaction.date}`;

        const value = document.createElement("strong");
        value.textContent =
            `${transaction.type === "Deposit" ? "+" : "-"}${formatter.format(transaction.amount)}`;

        value.className = transaction.type === "Deposit"
            ? "deposit-amount"
            : "withdraw-amount";

        item.append(details, value);
        historyList.appendChild(item);
    });
}

function resetAccount() {
    bal = startingBalance;
    transactions.length = 0;

    amountInput.value = "";

    updateBalance();
    renderHistory();

    showMessage("Demo account has been reset.", "success");
}

updateBalance();
renderHistory();
