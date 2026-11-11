
// Display a welcome message in the browser console
console.log("Welcome to Bebero Jhon Gabriel P.'s Portfolio!");

// Highlight navigation link when clicked
const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(link => {
    link.addEventListener("click", function() {
        navigationLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");
    });
});

// Display current year in the footer
const footer = document.querySelector("footer p");

const currentYear = new Date().getFullYear();

footer.textContent =
    `© ${currentYear} Bebero Jhon Gabriel P. | My Portfolio`;
