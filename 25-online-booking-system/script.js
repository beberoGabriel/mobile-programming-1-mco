
const bookingForm = document.getElementById("bookingForm");
const nameInput = document.getElementById("name");
const dateInput = document.getElementById("date");
const serviceInput = document.getElementById("service");
const bookingList = document.getElementById("list");
const bookingCount = document.getElementById("bookingCount");
const emptyMessage = document.getElementById("emptyMessage");

// Store bookings temporarily
const bookings = [];

// Prevent selecting past dates
const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;

// Add a new booking
bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const customerName = nameInput.value.trim();
    const bookingDate = dateInput.value;
    const selectedService = serviceInput.value;

    if (!customerName || !bookingDate) {
        alert("Please complete all fields.");
        return;
    }

    if (bookingDate < localToday) {
        alert("Please select today or a future date.");
        return;
    }

    const booking = {
        id: Date.now(),
        name: customerName,
        date: bookingDate,
        service: selectedService
    };

    bookings.push(booking);

    bookingForm.reset();
    dateInput.min = localToday;

    renderBookings();
});

// Display all bookings
function renderBookings() {
    bookingList.replaceChildren();

    bookings.forEach(function(booking) {
        const item = document.createElement("li");
        item.className = "booking-item";

        const info = document.createElement("div");
        info.className = "booking-info";

        const customer = document.createElement("strong");
        customer.textContent = booking.name;

        const details = document.createElement("span");
        details.textContent =
            booking.service + " | " + booking.date;

        const cancelButton = document.createElement("button");
        cancelButton.className = "cancel-btn";
        cancelButton.textContent = "Cancel";

        cancelButton.addEventListener("click", function() {
            cancelBooking(booking.id);
        });

        info.append(customer, details);
        item.append(info, cancelButton);
        bookingList.appendChild(item);
    });

    // Update booking count
    bookingCount.textContent =
        bookings.length + (bookings.length === 1 ? " Booking" : " Bookings");

    // Show empty message when there are no bookings
    emptyMessage.style.display =
        bookings.length === 0 ? "block" : "none";
}

// Cancel a booking
function cancelBooking(id) {
    const index = bookings.findIndex(function(booking) {
        return booking.id === id;
    });

    if (index !== -1) {
        bookings.splice(index, 1);
        renderBookings();
    }
}

// Initial display
renderBookings();
