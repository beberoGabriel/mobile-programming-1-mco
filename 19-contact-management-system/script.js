
const contacts = [];

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const searchInput = document.getElementById("search");
const contactList = document.getElementById("list");
const totalDisplay = document.getElementById("total");
const emptyMessage = document.getElementById("empty");
const message = document.getElementById("message");

document.getElementById("addButton").addEventListener("click", addContact);

function addContact() {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !phone) {
        message.textContent = "Please enter both name and phone number.";
        return;
    }

    contacts.push({
        id: Date.now() + Math.random(),
        name: name,
        phone: phone
    });

    nameInput.value = "";
    phoneInput.value = "";
    message.textContent = "Contact added successfully!";

    renderContacts();
    nameInput.focus();
}

function deleteContact(id) {
    const index = contacts.findIndex(contact => contact.id === id);

    if (index !== -1) {
        contacts.splice(index, 1);
        message.textContent = "Contact deleted.";
        renderContacts();
    }
}

function renderContacts() {
    const searchValue = searchInput.value.toLowerCase().trim();

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchValue) ||
        contact.phone.toLowerCase().includes(searchValue)
    );

    contactList.replaceChildren();

    totalDisplay.textContent =
        `${contacts.length} ${contacts.length === 1 ? "Contact" : "Contacts"}`;

    emptyMessage.textContent = contacts.length === 0
        ? "No contacts added yet."
        : "No matching contacts found.";

    emptyMessage.style.display =
        filteredContacts.length === 0 ? "block" : "none";

    filteredContacts.forEach(contact => {
        const li = document.createElement("li");

        const info = document.createElement("div");
        info.className = "contact-info";

        const contactName = document.createElement("strong");
        contactName.textContent = contact.name;

        const contactPhone = document.createElement("span");
        contactPhone.textContent = contact.phone;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => {
            deleteContact(contact.id);
        });

        info.append(contactName, contactPhone);
        li.append(info, deleteButton);
        contactList.appendChild(li);
    });
}

searchInput.addEventListener("input", renderContacts);

renderContacts();
