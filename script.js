// Check if local storage exists for lost & found items
if (!localStorage.getItem("lostItems")) {
    localStorage.setItem("lostItems", JSON.stringify([]));
}
if (!localStorage.getItem("foundItems")) {
    localStorage.setItem("foundItems", JSON.stringify([]));
}

// Function to report a lost item
function reportLostItem() {
    let name = document.getElementById("lostItemName").value;
    let location = document.getElementById("lostItemLocation").value;
    let description = document.getElementById("lostItemDescription").value;

    if (name === "" || location === "" || description === "") {
        alert("Please fill all fields!");
        return;
    }

    let lostItems = JSON.parse(localStorage.getItem("lostItems"));
    lostItems.push({ name, location, description });
    localStorage.setItem("lostItems", JSON.stringify(lostItems));

    displayLostItems();
    alert("Lost item reported successfully!");
}

// Function to report a found item
function reportFoundItem() {
    let name = document.getElementById("foundItemName").value;
    let location = document.getElementById("foundItemLocation").value;
    let description = document.getElementById("foundItemDescription").value;

    if (name === "" || location === "" || description === "") {
        alert("Please fill all fields!");
        return;
    }

    let foundItems = JSON.parse(localStorage.getItem("foundItems"));
    foundItems.push({ name, location, description });
    localStorage.setItem("foundItems", JSON.stringify(foundItems));

    displayFoundItems();
    alert("Found item reported successfully!");
}

// Function to display lost items
function displayLostItems() {
    let lostItems = JSON.parse(localStorage.getItem("lostItems"));
    let list = document.getElementById("lostItemsList");
    list.innerHTML = "";

    lostItems.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - ${item.location}`;
        list.appendChild(li);
    });
}

// Function to display found items
function displayFoundItems() {
    let foundItems = JSON.parse(localStorage.getItem("foundItems"));
    let list = document.getElementById("foundItemsList");
    list.innerHTML = "";

    foundItems.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - ${item.location}`;
        list.appendChild(li);
    });
}

// Function to search for matching lost & found items
function searchItems() {
    let query = document.getElementById("searchQuery").value.toLowerCase();
    let lostItems = JSON.parse(localStorage.getItem("lostItems"));
    let foundItems = JSON.parse(localStorage.getItem("foundItems"));
    let resultsList = document.getElementById("searchResults");

    resultsList.innerHTML = "";

    let matchedItems = lostItems.filter(lost =>
        foundItems.some(found =>
            found.name.toLowerCase() === lost.name.toLowerCase()
        )
    );

    if (matchedItems.length > 0) {
        matchedItems.forEach(item => {
            let li = document.createElement("li");
            li.textContent = `Possible match: ${item.name} - Last seen: ${item.location}`;
            resultsList.appendChild(li);
        });
    } else {
        resultsList.innerHTML = "<li>No matches found</li>";
    }
}

// Function to enable notifications
function subscribeNotifications() {
    alert("You will be notified when a matching lost item is found!");
}

// Load existing data when the page loads
window.onload = function () {
    displayLostItems();
    displayFoundItems();
};
const API_URL = "http://localhost:5000/api";

// Signup function
async function signup() {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    alert(data.message);
}

// Login function
async function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
    } else {
        alert("Invalid credentials");
    }
}
async function reportLostItem() {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first!");

    const formData = new FormData();
    formData.append("name", document.getElementById("lostItemName").value);
    formData.append("location", document.getElementById("lostItemLocation").value);
    formData.append("description", document.getElementById("lostItemDescription").value);
    formData.append("image", document.getElementById("lostItemImage").files[0]);

    const res = await fetch(`${API_URL}/items/lost`, {
        method: "POST",
        headers: { "Authorization": token },
        body: formData
    });

    const data = await res.json();
    alert(data.message);
}
async function fetchItems() {
    const res = await fetch(`${API_URL}/items`);
    const items = await res.json();

    const list = document.getElementById("searchResults");
    list.innerHTML = ""; // Clear previous items

    items.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.name}</strong> (${item.type.toUpperCase()}) - ${item.location} <br>
            <img src="${API_URL}/${item.imageUrl}" width="100"><br>
            <small>${item.description}</small>
        `;
        list.appendChild(li);
    });
}
