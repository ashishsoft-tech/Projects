const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const transactionList = document.getElementById("transaction-list");

const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const netBalanceEl = document.getElementById("net-balance");

const submitBtn = document.getElementById("submit-btn");
const filterRadios = document.querySelectorAll("input[name='filter']");

const resetBtn = document.getElementById("reset-btn");


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let editId = null;
let currentFilter = "all";


window.addEventListener("DOMContentLoaded", () => {
    renderTransactions();
    updateSummary();
});


form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (editId === null) {
        addTransaction();
    } else {
        updateTransaction();
    }
});

resetBtn.addEventListener("click", function () {
    form.reset();
    editId = null;
    submitBtn.textContent = "Add";
});


function addTransaction() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (description === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter valid description and amount!");
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type
    };

    transactions.push(transaction);
    saveToLocalStorage();

    renderTransactions();
    updateSummary();
    form.reset();
}


function renderTransactions() {
    transactionList.innerHTML = "";

    let filteredTransactions = transactions;

    if (currentFilter !== "all") {
        filteredTransactions = transactions.filter(
            transaction => transaction.type === currentFilter
        );
    }

    filteredTransactions.forEach((transaction) => {
        const li = document.createElement("li");
        li.classList.add("transaction-item", transaction.type);

        li.innerHTML = `
            <div>
                <strong>${transaction.description}</strong>
                <p>₹${transaction.amount}</p>
            </div>
            <div class="transaction-actions">
                <button onclick="editTransaction(${transaction.id})">Edit</button>
                <button onclick="deleteTransaction(${transaction.id})">Delete</button>
            </div>
        `;

        transactionList.appendChild(li);
    });
}


function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);

    descriptionInput.value = transaction.description;
    amountInput.value = transaction.amount;
    typeSelect.value = transaction.type;

    editId = id;
    submitBtn.textContent = "Update";
}

function updateTransaction() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (description === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter valid description and amount!");
        return;
    }

    transactions = transactions.map(transaction =>
        transaction.id === editId
            ? { ...transaction, description, amount, type }
            : transaction
    );

    editId = null;
    submitBtn.textContent = "Add";

    saveToLocalStorage();
    renderTransactions();
    updateSummary();
    form.reset();
}


function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    saveToLocalStorage();
    renderTransactions();
    updateSummary();
}


filterRadios.forEach(radio => {
    radio.addEventListener("change", function () {
        currentFilter = this.value;
        renderTransactions();
    });
});


function updateSummary() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    const netBalance = totalIncome - totalExpense;

    totalIncomeEl.textContent = "₹" + totalIncome.toFixed(2);
    totalExpenseEl.textContent = "₹" + totalExpense.toFixed(2);
    netBalanceEl.textContent = "₹" + netBalance.toFixed(2);
}


function saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

