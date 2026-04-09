// Money Manager Script with Negative Balance Support + Category Feature

// DOM Elements
const spendMoneyInput = document.getElementById("spendMoney");
const descriptionInput = document.getElementById("description");
const categorySelect = document.getElementById("categorySelect");         // NEW
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
const editCategorySelect = document.getElementById("editCategorySelect"); // NEW
const saveEditBtn = document.getElementById("saveEditBtn");
const closeEditExpenseModal = document.querySelector(".edit-close-btn");
const searchInput = document.getElementById("searchInput");
const exportPdfBtn = document.getElementById("exportPdfBtn");
const resetBtn = document.getElementById("resetBtn");

let totalMoney = 0;
let expenses = [];
let editingIndex = null;
let activeFilter = "all"; // NEW — tracks current category filter

// ─── Helpers ───────────────────────────────────────────────────────────────

// 🔐 Login Protection
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

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

// ─── Render Table ──────────────────────────────────────────────────────────

function renderExpenseTable(filterCategory = "all", searchTerm = "") {
    expenseTable.innerHTML = "";

    let runningRemaining = totalMoney;

    expenses.forEach((expense, index) => {
        runningRemaining -= expense.spent;

        // Apply category filter
        if (filterCategory !== "all" && expense.category !== filterCategory) return;

        // Apply search filter
        if (searchTerm && !expense.description.toLowerCase().includes(searchTerm)) return;

        const row = expenseTable.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td class="pdf-hide">${expense.date}</td>
            <td>${expense.description}</td>
            <td><span class="category-badge">${expense.category || "📦 Other"}</span></td>
            <td>₹${expense.spent.toFixed(2)}</td>
            <td>₹${runningRemaining.toFixed(2)}</td>
            <td class="pdf-hide no-print">
                <button class="action-btn edit-btn no-print" data-index="${index}">✏️ Edit</button>
                <button class="action-btn delete-btn no-print" data-index="${index}">🗑️ Delete</button>
            </td>
        `;
    });
}

function updateAllDisplays() {
    updateDashboard();
    renderExpenseTable(activeFilter, searchInput.value.toLowerCase().trim());
}

// ─── LocalStorage ──────────────────────────────────────────────────────────

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

// ─── Add Expense ───────────────────────────────────────────────────────────

addBtn.addEventListener("click", () => {
    const spendAmount = parseFloat(spendMoneyInput.value);
    const description = descriptionInput.value.trim();
    const category = categorySelect.value || "📦 Other"; // NEW

    if (isNaN(spendAmount) || spendAmount <= 0 || !description) {
        alert("Please enter valid spend amount and description.");
        return;
    }

    expenses.push({
        date: new Date().toLocaleString(),
        description,
        category, // NEW
        spent: spendAmount
    });

    updateAllDisplays();
    saveToLocalStorage();

    spendMoneyInput.value = "";
    descriptionInput.value = "";
    categorySelect.value = ""; // NEW — reset dropdown
});

// ─── Add Money Modal ───────────────────────────────────────────────────────

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

// ─── Edit / Delete ─────────────────────────────────────────────────────────

expenseTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
        editingIndex = parseInt(e.target.dataset.index);
        const expense = expenses[editingIndex];
        editDescriptionInput.value = expense.description;
        editSpentInput.value = expense.spent;
        editCategorySelect.value = expense.category || ""; // NEW — pre-fill category
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
    const newCategory = editCategorySelect.value || "📦 Other"; // NEW

    if (!newDescription || isNaN(newSpent) || newSpent <= 0) {
        alert("Please enter valid description and amount.");
        return;
    }

    expenses[editingIndex].description = newDescription;
    expenses[editingIndex].spent = newSpent;
    expenses[editingIndex].category = newCategory; // NEW

    updateAllDisplays();
    editExpenseModal.style.display = "none";
    saveToLocalStorage();
});

closeEditExpenseModal.addEventListener("click", () => {
    editExpenseModal.style.display = "none";
});

// ─── Category Filter Buttons (NEW) ─────────────────────────────────────────

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeFilter = btn.dataset.category;
        renderExpenseTable(activeFilter, searchInput.value.toLowerCase().trim());
    });
});

// ─── Search ────────────────────────────────────────────────────────────────

searchInput.addEventListener("input", () => {
    renderExpenseTable(activeFilter, searchInput.value.toLowerCase().trim());
});

// ─── Export PDF ────────────────────────────────────────────────────────────

exportPdfBtn.addEventListener("click", () => {
    const elementsToHide = document.querySelectorAll(".pdf-hide, .no-print");

    // Hide unwanted elements
    elementsToHide.forEach(el => el.style.display = "none");

    const element = document.getElementById("exportContent");

    const opt = {
        margin: 0.5,
        filename: 'Expense_History.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            scrollY: 0
        },
        jsPDF: {
            unit: 'in',
            format: 'a4',
            orientation: 'portrait'
        }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        // Restore elements after PDF
        elementsToHide.forEach(el => el.style.display = "");
    });
});

// ─── Reset ─────────────────────────────────────────────────────────────────

resetBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all data?")) {
        totalMoney = 0;
        expenses = [];
        activeFilter = "all"; // NEW — reset filter too
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        document.querySelector('.filter-btn[data-category="all"]').classList.add("active");
        updateAllDisplays();
        saveToLocalStorage();
    }
});

// ─── Theme Toggle ──────────────────────────────────────────────────────────

const themeSwitcher = document.getElementById("themeSwitcher");
themeSwitcher.addEventListener("change", () => {
    document.body.classList.toggle("dark", themeSwitcher.checked);
    localStorage.setItem("theme", themeSwitcher.checked ? "dark" : "light");
});

// ─── Load on Start ─────────────────────────────────────────────────────────

window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        themeSwitcher.checked = true;
    }
    loadFromLocalStorage();
});

// 🔓 Logout
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}