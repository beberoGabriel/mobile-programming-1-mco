
let products = [];

function addProduct() {
    const nameInput = document.getElementById("product");
    const quantityInput = document.getElementById("quantity");

    const name = nameInput.value.trim();
    const quantity = Number(quantityInput.value);

    if (name === "" || quantityInput.value.trim() === "") {
        showMessage("Please complete all fields.");
        return;
    }

    if (!Number.isSafeInteger(quantity) || quantity < 0) {
        showMessage("Please enter a valid non-negative quantity.");
        return;
    }

    const existingProduct = products.find(
        product => product.name.toLowerCase() === name.toLowerCase()
    );

    if (existingProduct) {
        showMessage("Product already exists. Update its stock instead.");
        return;
    }

    products.push({
        name: name,
        quantity: quantity
    });

    nameInput.value = "";
    quantityInput.value = "";

    showMessage("Product added successfully!");
    displayProducts();
}

function updateStock(index, amount) {
    const newQuantity = products[index].quantity + amount;

    if (newQuantity < 0) {
        showMessage("Stock cannot be negative.");
        return;
    }

    products[index].quantity = newQuantity;

    showMessage("Stock updated successfully.");
    displayProducts();
}

function deleteProduct(index) {
    products.splice(index, 1);

    showMessage("Product deleted successfully.");
    displayProducts();
}

function displayProducts() {
    const inventory = document.getElementById("inventory");
    const search = document.getElementById("search").value.toLowerCase();

    inventory.innerHTML = "";

    const filteredProducts = products
        .map((product, index) => ({ ...product, index }))
        .filter(product => product.name.toLowerCase().includes(search));

    if (filteredProducts.length === 0) {
        inventory.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    No products found.
                </td>
            </tr>
        `;
    }

    filteredProducts.forEach(product => {
        const row = document.createElement("tr");

        const numberCell = document.createElement("td");
        numberCell.textContent = product.index + 1;

        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;

        const quantityCell = document.createElement("td");
        quantityCell.textContent = product.quantity;

        const statusCell = document.createElement("td");
        statusCell.textContent =
            product.quantity === 0 ? "Out of Stock" :
            product.quantity <= 5 ? "Low Stock" : "In Stock";

        statusCell.className =
            product.quantity <= 5 ? "stock-low" : "stock-good";

        const actionCell = document.createElement("td");

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.className = "action-btn";
        increaseButton.onclick = () => updateStock(product.index, 1);

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.className = "action-btn";
        decreaseButton.onclick = () => updateStock(product.index, -1);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deleteProduct(product.index);

        actionCell.append(
            increaseButton,
            decreaseButton,
            deleteButton
        );

        row.append(
            numberCell,
            nameCell,
            quantityCell,
            statusCell,
            actionCell
        );

        inventory.appendChild(row);
    });

    updateSummary();
}

function updateSummary() {
    const totalProducts = products.length;

    const totalStock = products.reduce(
        (total, product) => total + product.quantity,
        0
    );

    document.getElementById("totalProducts").textContent = totalProducts;
    document.getElementById("totalStock").textContent = totalStock;
}

function showMessage(message) {
    document.getElementById("message").textContent = message;
}

displayProducts();
