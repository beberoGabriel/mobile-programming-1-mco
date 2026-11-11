
let books = [];

function addBook() {
    const bookInput = document.getElementById("book");
    const authorInput = document.getElementById("author");

    const title = bookInput.value.trim();
    const authorName = authorInput.value.trim();

    if (title === "" || authorName === "") {
        alert("Please enter both book title and author.");
        return;
    }

    books.push({
        title: title,
        authorName: authorName,
        borrowed: false
    });

    bookInput.value = "";
    authorInput.value = "";

    renderBooks();
    bookInput.focus();
}

function toggleBook(index) {
    if (!books[index]) return;

    books[index].borrowed = !books[index].borrowed;

    renderBooks();
}

function deleteBook(index) {
    if (!books[index]) return;

    books.splice(index, 1);

    renderBooks();
}

function renderBooks() {
    const list = document.getElementById("list");
    const search = document.getElementById("search")
        .value.trim().toLowerCase();

    list.innerHTML = "";

    const filteredBooks = books
        .map((book, index) => ({ ...book, index }))
        .filter(book =>
            book.title.toLowerCase().includes(search) ||
            book.authorName.toLowerCase().includes(search)
        );

    if (filteredBooks.length === 0) {
        const emptyMessage = document.createElement("li");

        emptyMessage.className = "empty-message";
        emptyMessage.textContent = books.length === 0
            ? "No books added yet."
            : "No matching books found.";

        list.appendChild(emptyMessage);
    }

    filteredBooks.forEach(book => {
        const li = document.createElement("li");

        const info = document.createElement("div");
        info.className = "book-info";

        const title = document.createElement("span");
        title.className = "book-title";
        title.textContent = book.title;

        const author = document.createElement("span");
        author.className = "book-author";
        author.textContent = "Author: " + book.authorName;

        const status = document.createElement("span");

        status.className = book.borrowed
            ? "status borrowed"
            : "status available";

        status.textContent = book.borrowed
            ? "● Borrowed"
            : "● Available";

        info.appendChild(title);
        info.appendChild(author);
        info.appendChild(document.createElement("br"));
        info.appendChild(status);

        const actions = document.createElement("div");
        actions.className = "book-actions";

        const borrowButton = document.createElement("button");

        borrowButton.className = "borrow-btn";
        borrowButton.textContent = book.borrowed
            ? "Return Book"
            : "Borrow Book";

        borrowButton.addEventListener("click", function() {
            toggleBook(book.index);
        });

        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteBook(book.index);
        });

        actions.appendChild(borrowButton);
        actions.appendChild(deleteButton);

        li.appendChild(info);
        li.appendChild(actions);

        list.appendChild(li);
    });

    updateStatistics();
}

function updateStatistics() {
    const total = books.length;

    const borrowed = books.filter(book => book.borrowed).length;

    const available = total - borrowed;

    document.getElementById("totalBooks").textContent = total;
    document.getElementById("availableBooks").textContent = available;
    document.getElementById("borrowedBooks").textContent = borrowed;
}

renderBooks();
