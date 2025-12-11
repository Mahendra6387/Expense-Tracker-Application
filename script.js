function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    if (email === "mahendra@gmail.com" && pass === "638754") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "Invalid Email or Password";
    }
}

if (localStorage.getItem("loggedIn") !== "true" &&
    !window.location.href.includes("index.html")) {
    window.location.href = "index.html";
}

function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("expenses");

    alert("Logout Successful! All expenses cleared.");
    window.location.href = "index.html";
}

function addExpense() {
    let product = document.getElementById("product").value;
    let type = document.getElementById("type").value;
    let date = document.getElementById("date").value;
    let amount = document.getElementById("amount").value;

    if (amount === "" || date === "") {
        alert("Please fill all fields!");
        return;
    }

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenses.push({
        product: product,
        type: type,
        date: date,
        amount: Number(amount)
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    alert("Expense Added!");
    document.getElementById("amount").value = "";
    showExpenses();   
}

function showExpenses() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

    let list = document.getElementById("expense-list");
    if (!list) return; 

    list.innerHTML = "";

    if (expenses.length === 0) {
        list.innerHTML = "<p>No expenses added yet.</p>";
        return;
    }

    expenses.forEach(exp => {
        let box = document.createElement("div");
        box.className = "expense-item";
        box.style.border = "1px solid #ccc";
        box.style.padding = "10px";
        box.style.margin = "10px 0";
        box.style.borderRadius = "8px";
        box.style.background = "#f7f7f7";

        box.innerHTML = `
            <p><b>Date:</b> ${exp.date}</p>
            <p><b>Product:</b> ${exp.product}</p>
            <p><b>Type:</b> ${exp.type}</p>
            <p><b>Amount:</b> ₹${exp.amount}</p>
        `;

        list.appendChild(box);
    });
}

if (document.getElementById("totalAmount")) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let total = expenses.reduce((acc, item) => acc + item.amount, 0);

    document.getElementById("totalAmount").innerText = "₹" + total;
}

window.onload = function () {
    if (document.getElementById("expense-list")) {
        showExpenses();
    }
};
