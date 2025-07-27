document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('themeSwitcher');
    const totalMoneyInput = document.getElementById("totalMoney");
    const spendMoneyInput = document.getElementById("spendMoney");
    const descriptionInput = document.getElementById("description");
    const addBtn = document.getElementById("addBtn");
    const resultText = document.getElementById("resultText");
    const totalSpentText = document.getElementById("totalSpentText");
    const totalMoneyText = document.getElementById("totalMoneyText");
    const expenseTableBody = document.querySelector("#expenseTable tbody");
    const searchInput = document.getElementById("searchInput");
    const exportPdfBtn = document.getElementById("exportPdfBtn");
    const resetBtn = document.getElementById("resetBtn");
    const addMoneyIcon = document.getElementById("addMoneyIcon");
    const addMoneyModal = document.getElementById("addMoneyModal");
    const closeBtn = document.querySelector(".close-btn");
    const modalAddMoneyInput = document.getElementById("modalAddMoneyInput");
    const modalAddMoneyBtn = document.getElementById("modalAddMoneyBtn");
    const editExpenseModal = document.getElementById("editExpenseModal");
    const editCloseBtn = document.querySelector(".edit-close-btn");
    const editDescriptionInput = document.getElementById("editDescriptionInput");
    const editSpentInput = document.getElementById("editSpentInput");
    const saveEditBtn = document.getElementById("saveEditBtn");

    let totalMoney = 0;
    let remainingMoney = 0;
    let expenses = [];
    let editingIndex = null;

    // Theme Persistence
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeSwitcher.checked = true;
    }

    themeSwitcher.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    });

    // Load Saved Data
    const savedData = JSON.parse(localStorage.getItem('moneyManagerData'));
    if (savedData) {
        totalMoney = savedData.totalMoney;
        remainingMoney = savedData.remainingMoney;
        expenses = savedData.expenses;
        updateAllDisplays();
    }

    function saveToLocalStorage() {
        const data = {
            totalMoney,
            remainingMoney,
            expenses
        };
        localStorage.setItem('moneyManagerData', JSON.stringify(data));
    }

    function updateRemainingMoney() {
        resultText.textContent = `Remaining Money: ₹${remainingMoney}`;
    }

    function updateTotalSpent() {
        const totalSpent = expenses.reduce((sum, expense) => sum + expense.spent, 0);
        totalSpentText.textContent = `Total Spent: ₹${totalSpent}`;
    }

    function updateTotalMoney() {
        totalMoneyText.textContent = `Total Money: ₹${totalMoney}`;
    }

    function updateAllDisplays() {
        updateExpenseTable();
        updateRemainingMoney();
        updateTotalSpent();
        updateTotalMoney();
    }

    function updateExpenseTable() {
        expenseTableBody.innerHTML = "";
        expenses.forEach((expense, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td class="pdf-hide">${expense.date}</td>
                <td>${expense.description}</td>
                <td>₹${expense.spent}</td>
                <td>₹${expense.remaining}</td>
                <td class="pdf-hide">
                    <button class="action-btn edit-btn" onclick="editExpense(${index})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteExpense(${index})">Delete</button>
                </td>
            `;
            expenseTableBody.appendChild(row);
        });
    }

    addBtn.addEventListener("click", () => {
        const spendAmount = parseFloat(spendMoneyInput.value);
        const description = descriptionInput.value.trim();

        if (isNaN(spendAmount) || spendAmount <= 0 || !description) {
            alert("Please enter valid spend amount and description.");
            return;
        }

        if (spendAmount > remainingMoney) {
            alert("Not enough remaining money!");
            return;
        }

        remainingMoney -= spendAmount;

        expenses.push({
            date: new Date().toLocaleString(),
            description,
            spent: spendAmount,
            remaining: remainingMoney
        });

        updateAllDisplays();
        saveToLocalStorage();

        spendMoneyInput.value = "";
        descriptionInput.value = "";
    });

    totalMoneyInput.addEventListener("change", () => {
        const inputAmount = parseFloat(totalMoneyInput.value);
        if (isNaN(inputAmount) || inputAmount <= 0) {
            alert("Please enter a valid total money amount.");
            return;
        }

        totalMoney = inputAmount;
        const totalSpent = expenses.reduce((sum, exp) => sum + exp.spent, 0);
        remainingMoney = totalMoney - totalSpent;
        updateAllDisplays();
        saveToLocalStorage();
    });

    window.deleteExpense = (index) => {
        remainingMoney += expenses[index].spent;
        expenses.splice(index, 1);
        updateAllDisplays();
        saveToLocalStorage();
    };

    window.editExpense = (index) => {
        editingIndex = index;
        const expense = expenses[index];
        editDescriptionInput.value = expense.description;
        editSpentInput.value = expense.spent;
        editExpenseModal.style.display = "block";
    };

    editCloseBtn.addEventListener("click", () => {
        editExpenseModal.style.display = "none";
    });

    saveEditBtn.addEventListener("click", () => {
        const newDescription = editDescriptionInput.value.trim();
        const newSpent = parseFloat(editSpentInput.value);

        if (!newDescription || isNaN(newSpent) || newSpent <= 0) {
            alert("Please enter valid description and amount.");
            return;
        }

        const expense = expenses[editingIndex];
        remainingMoney += expense.spent;

        if (newSpent > remainingMoney) {
            alert("Not enough remaining money!");
            return;
        }

        expense.description = newDescription;
        expense.spent = newSpent;
        remainingMoney -= newSpent;

        for (let i = editingIndex; i < expenses.length; i++) {
            if (i === editingIndex) {
                expenses[i].remaining = remainingMoney;
            } else {
                remainingMoney -= expenses[i].spent;
                expenses[i].remaining = remainingMoney;
            }
        }

        updateAllDisplays();
        editExpenseModal.style.display = "none";
        saveToLocalStorage();
    });

    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.toLowerCase();
        const rows = expenseTableBody.getElementsByTagName("tr");

        Array.from(rows).forEach(row => {
            const descriptionCell = row.getElementsByTagName("td")[2];
            if (descriptionCell) {
                const textValue = descriptionCell.textContent || descriptionCell.innerText;
                row.style.display = textValue.toLowerCase().includes(filter) ? "" : "none";
            }
        });
    });

    exportPdfBtn.addEventListener("click", () => {
        const elementsToHide = document.querySelectorAll(
            "h2, #totalMoney, #spendMoney, #description, #addBtn, .stats, #searchInput, #exportPdfBtn, #resetBtn, #addMoneyIcon"
        );
        const pdfHideElements = document.querySelectorAll(".pdf-hide");

        elementsToHide.forEach(el => el.style.display = "none");
        pdfHideElements.forEach(el => el.style.display = "none");

        const exportContent = document.getElementById("exportContent");

        html2pdf()
            .from(exportContent)
            .save()
            .then(() => {
                elementsToHide.forEach(el => el.style.display = "");
                pdfHideElements.forEach(el => el.style.display = "");
            });
    });

    resetBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to reset?")) {
            localStorage.removeItem('moneyManagerData');
            totalMoneyInput.value = "";
            spendMoneyInput.value = "";
            descriptionInput.value = "";
            totalMoney = 0;
            remainingMoney = 0;
            expenses = [];
            updateAllDisplays();
        }
    });

    addMoneyIcon.addEventListener("click", () => {
        addMoneyModal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
        addMoneyModal.style.display = "none";
    });

    modalAddMoneyBtn.addEventListener("click", () => {
        const addAmount = parseFloat(modalAddMoneyInput.value);
        if (!isNaN(addAmount) && addAmount > 0) {
            totalMoney += addAmount;
            remainingMoney += addAmount;
            modalAddMoneyInput.value = "";
            addMoneyModal.style.display = "none";
            updateAllDisplays();
            saveToLocalStorage();
        } else {
            alert("Enter a valid amount!");
        }
    });
});
