// Money Manager Script with Negative Balance Support

// DOM Elements
const totalMoneyInput = document.getElementById("totalMoney");
const spendMoneyInput = document.getElementById("spendMoney");
const descriptionInput = document.getElementById("description");
const addBtn = document.getElementById("addBtn");
const totalMoneyText = document.getElementById("totalMoneyText");
const resultText = document.getElementById("resultText");
const totalSpentText = document.getElementById("totalSpentText");
const expenseTable = document.getElementById("expenseTable").getElementsByTagName('tbody')[0];
const addMoneyIcon = document.getElementById("addMoneyIcon");
const addMoneyModal = document.getElementById("addMoneyModal");
const modalAddMoneyInput = document.getElementById("modalAddMoneyInput");
const modalAddMoneyBtn = document.getElementById("modalAddMoneyBtn");
const closeAddMoneyModal = document.querySelector(".close-btn");
const editExpenseModal = document.getElementById("editExpenseModal");
const editDescriptionInput = document.getElementById("editDescriptionInput");
const editSpentInput = document.getElementById("editSpentInput");
const saveEditBtn = document.getElementById("saveEditBtn");
const closeEditExpenseModal = document.querySelector(".edit-close-btn");
const searchInput = document.getElementById("searchInput");
const exportPdfBtn = document.getElementById("exportPdfBtn");
const resetBtn = document.getElementById("resetBtn");

let totalMoney = 0;
let expenses = [];
let editingIndex = null;

function calculateTotalSpent() {
    return expenses.reduce((acc, expense) => acc + expense.spent, 0);
}

function calculateRemainingMoney() {
    return totalMoney - calculateTotalSpent();
}

function updateDashboard() {
    const totalSpent = calculateTotalSpent();
    const remaining = calculateRemainingMoney();

    totalMoneyText.textContent = `₹${totalMoney.toFixed(2)}`;
    totalSpentText.textContent = `₹${totalSpent.toFixed(2)}`;
    resultText.textContent = `₹${remaining.toFixed(2)}`;
    resultText.style.color = remaining < 0 ? 'red' : '';
}

function renderExpenseTable() {
    expenseTable.innerHTML = "";
    expenses.forEach((expense, index) => {
        const row = expenseTable.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td class="pdf-hide">${expense.date}</td>
            <td>${expense.description}</td>
            <td>₹${expense.spent.toFixed(2)}</td>
            <td>₹${(totalMoney - expenses.slice(0, index + 1).reduce((acc, e) => acc + e.spent, 0)).toFixed(2)}</td>
            <td class="pdf-hide">
                <button class="action-btn edit-btn" data-index="${index}">Edit</button>
                <button class="action-btn delete-btn" data-index="${index}">Delete</button>
            </td>
        `;
    });
}

function updateAllDisplays() {
    updateDashboard();
    renderExpenseTable();
}

function saveToLocalStorage() {
    localStorage.setItem("totalMoney", totalMoney);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadFromLocalStorage() {
    const savedTotalMoney = localStorage.getItem("totalMoney");
    const savedExpenses = localStorage.getItem("expenses");
    if (savedTotalMoney) totalMoney = parseFloat(savedTotalMoney);
    if (savedExpenses) expenses = JSON.parse(savedExpenses);
    updateAllDisplays();
}

addBtn.addEventListener("click", () => {
    const spendAmount = parseFloat(spendMoneyInput.value);
    const description = descriptionInput.value.trim();

    if (isNaN(spendAmount) || spendAmount <= 0 || !description) {
        alert("Please enter valid spend amount and description.");
        return;
    }

    expenses.push({
        date: new Date().toLocaleString(),
        description,
        spent: spendAmount
    });

    updateAllDisplays();
    saveToLocalStorage();

    spendMoneyInput.value = "";
    descriptionInput.value = "";
});

modalAddMoneyBtn.addEventListener("click", () => {
    const addAmount = parseFloat(modalAddMoneyInput.value);

    if (isNaN(addAmount) || addAmount <= 0) {
        alert("Enter a valid amount.");
        return;
    }

    totalMoney += addAmount;
    updateAllDisplays();
    saveToLocalStorage();

    modalAddMoneyInput.value = "";
    addMoneyModal.style.display = "none";
});

addMoneyIcon.addEventListener("click", () => {
    addMoneyModal.style.display = "block";
});

closeAddMoneyModal.addEventListener("click", () => {
    addMoneyModal.style.display = "none";
});

expenseTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
        editingIndex = parseInt(e.target.dataset.index);
        const expense = expenses[editingIndex];
        editDescriptionInput.value = expense.description;
        editSpentInput.value = expense.spent;
        editExpenseModal.style.display = "block";
    } else if (e.target.classList.contains("delete-btn")) {
        const index = parseInt(e.target.dataset.index);
        expenses.splice(index, 1);
        updateAllDisplays();
        saveToLocalStorage();
    }
});

saveEditBtn.addEventListener("click", () => {
    const newDescription = editDescriptionInput.value.trim();
    const newSpent = parseFloat(editSpentInput.value);

    if (!newDescription || isNaN(newSpent) || newSpent <= 0) {
        alert("Please enter valid description and amount.");
        return;
    }

    expenses[editingIndex].description = newDescription;
    expenses[editingIndex].spent = newSpent;

    updateAllDisplays();
    editExpenseModal.style.display = "none";
    saveToLocalStorage();
});

closeEditExpenseModal.addEventListener("click", () => {
    editExpenseModal.style.display = "none";
});

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const rows = expenseTable.getElementsByTagName("tr");
    Array.from(rows).forEach(row => {
        const description = row.cells[2]?.textContent.toLowerCase();
        if (description.includes(searchTerm)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

exportPdfBtn.addEventListener("click", () => {
    const elementsToHide = document.querySelectorAll(".pdf-hide");
    elementsToHide.forEach(el => el.style.display = "none");

    const element = document.getElementById("exportContent");
    html2pdf().from(element).save("Expense_History.pdf").then(() => {
        elementsToHide.forEach(el => el.style.display = "");
    });
});

resetBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all data?")) {
        totalMoney = 0;
        expenses = [];
        updateAllDisplays();
        saveToLocalStorage();
    }
});

// Theme Toggle
const themeSwitcher = document.getElementById("themeSwitcher");
themeSwitcher.addEventListener("change", () => {
    document.body.classList.toggle("dark", themeSwitcher.checked);
    localStorage.setItem("theme", themeSwitcher.checked ? "dark" : "light");
});

// Load Theme on Page Load
window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeSwitcher.checked = true;
    }
    loadFromLocalStorage();
});
