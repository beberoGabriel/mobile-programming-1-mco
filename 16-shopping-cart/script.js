
let cartItems = [];

function addItem() {
    const itemInput = document.getElementById("item");
    const priceInput = document.getElementById("price");

    const name = itemInput.value.trim();
    const price = Number(priceInput.value);

    if (name === "") {
        alert("Please enter a product name.");
        return;
    }

    if (
        priceInput.value.trim() === "" ||
        !Number.isFinite(price) ||
        price <= 0
    ) {
        alert("Please enter a valid product price.");
        return;
    }

    cartItems.push({
        name: name,
        price: Math.round(price * 100)
    });

    itemInput.value = "";
    priceInput.value = "";

    displayCart();
    itemInput.focus();
}

function displayCart() {
    const cart = document.getElementById("cart");
    const total = document.getElementById("total");

    cart.innerHTML = "";

    if (cartItems.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent = "Your cart is empty.";
        cart.appendChild(emptyMessage);
    }

    let totalAmount = 0;

    cartItems.forEach((item, index) => {
        totalAmount += item.price;

        const li = document.createElement("li");

        const info = document.createElement("div");
        info.className = "product-info";

        const name = document.createElement("span");
        name.className = "product-name";
        name.textContent = item.name;

        const price = document.createElement("span");
        price.className = "product-price";
        price.textContent = formatPrice(item.price);

        const removeButton = document.createElement("button");
        removeButton.className = "remove-btn";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function () {
            removeItem(index);
        });

        info.appendChild(name);
        info.appendChild(price);

        li.appendChild(info);
        li.appendChild(removeButton);

        cart.appendChild(li);
    });

    total.textContent = formatPrice(totalAmount);
}

function removeItem(index) {
    cartItems.splice(index, 1);
    displayCart();
}

function clearCart() {
    cartItems = [];
    displayCart();

    document.getElementById("item").value = "";
    document.getElementById("price").value = "";
}

function formatPrice(amount) {
    return "₱" + (amount / 100).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

displayCart();
