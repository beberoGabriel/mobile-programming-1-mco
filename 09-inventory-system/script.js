function addProduct() {
    let product = document.getElementById("product").value.trim();
    let quantity = document.getElementById("quantity").value;

    if (product === "" || quantity === "") {
        alert("Please complete the fields.");
        return;
    }

    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${product}</td>
        <td>${quantity}</td>
    `;

    document.getElementById("inventory").appendChild(row);

    document.getElementById("product").value = "";
    document.getElementById("quantity").value = "";
}