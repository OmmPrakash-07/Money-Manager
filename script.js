let totalAmount = 0;
let remainingAmount = 0;
let expenses = [];

window.onload = function() {
    const savedTotal = localStorage.getItem('totalAmount');
    const savedRemaining = localStorage.getItem('remainingAmount');
    const savedExpenses = localStorage.getItem('expenses');
    const theme = localStorage.getItem('theme');

    if (savedTotal && savedRemaining && savedExpenses) {
        totalAmount = parseFloat(savedTotal);
        remainingAmount = parseFloat(savedRemaining);
        expenses = JSON.parse(savedExpenses);

        document.getElementById('totalMoney').value = totalAmount;
        document.getElementById('resultText').textContent = `Remaining Money: ₹${remainingAmount}`;
        renderTable();
    }

    if (theme === 'dark') {
        document.body.classList.add('dark');
        document.getElementById('themeSwitcher').checked = true;
    }
};

document.getElementById('addBtn').addEventListener('click', addExpense);
document.getElementById('resetBtn').addEventListener('click', resetManager);
document.getElementById('exportPdfBtn').addEventListener('click', exportPDF);

document.getElementById('themeSwitcher').addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
});

// Floating Add Money Icon Logic
document.getElementById('addMoneyIcon').addEventListener('click', () => {
    document.getElementById('addMoneyModal').style.display = 'block';
});

document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('addMoneyModal').style.display = 'none';
});

document.getElementById('modalAddMoneyBtn').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('modalAddMoneyInput').value);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount!");
        return;
    }

    totalAmount += amount;
    remainingAmount += amount;

    document.getElementById('totalMoney').value = totalAmount;
    document.getElementById('resultText').textContent = `Remaining Money: ₹${remainingAmount}`;
    document.getElementById('modalAddMoneyInput').value = "";
    document.getElementById('addMoneyModal').style.display = 'none';

    saveToLocalStorage();
});

// Close Modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('addMoneyModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function addExpense() {
    const totalInput = document.getElementById('totalMoney').value;
    const spendInput = document.getElementById('spendMoney').value;
    const descInput = document.getElementById('description').value;

    if (totalInput === "" || spendInput === "" || descInput === "") {
        alert("Please fill all fields!");
        return;
    }

    if (expenses.length === 0) {
        totalAmount = parseFloat(totalInput);
        remainingAmount = totalAmount;
    }

    const spendAmount = parseFloat(spendInput);

    if (spendAmount > remainingAmount) {
        alert("Not enough money left!");
        return;
    }

    remainingAmount -= spendAmount;

    const expense = {
        id: Date.now(),
        datetime: new Date().toLocaleString(),
        description: descInput,
        amount: spendAmount,
        remaining: remainingAmount
    };

    expenses.push(expense);
    saveToLocalStorage();

    document.getElementById('resultText').textContent = `Remaining Money: ₹${remainingAmount}`;
    renderTable();

    document.getElementById('spendMoney').value = "";
    document.getElementById('description').value = "";
}

function renderTable() {
    const tableBody = document.querySelector('#expenseTable tbody');
    tableBody.innerHTML = "";

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${expense.datetime}</td>
            <td>${expense.description}</td>
            <td>₹${expense.amount}</td>
            <td>₹${expense.remaining}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editExpense(${expense.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editExpense(id) {
    const expense = expenses.find(e => e.id === id);
    if (expense) {
        const newDesc = prompt("Edit Description:", expense.description);
        const newAmount = parseFloat(prompt("Edit Amount:", expense.amount));

        if (newDesc !== null && !isNaN(newAmount)) {
            expense.description = newDesc;
            let found = false;
            let tempRemaining = totalAmount;
            expenses.forEach((e, i) => {
                if (i === 0) tempRemaining = totalAmount;

                if (e.id === id) {
                    found = true;
                    e.amount = newAmount;
                    tempRemaining -= e.amount;
                    e.remaining = tempRemaining;
                } else if (found) {
                    tempRemaining -= e.amount;
                    e.remaining = tempRemaining;
                }
            });

            remainingAmount = expenses[expenses.length - 1]?.remaining || totalAmount;
            saveToLocalStorage();
            document.getElementById('resultText').textContent = `Remaining Money: ₹${remainingAmount}`;
            renderTable();
        }
    }
}

function deleteExpense(id) {
    if (confirm("Are you sure you want to delete this expense?")) {
        expenses = expenses.filter(e => e.id !== id);

        let tempRemaining = totalAmount;
        expenses.forEach(e => {
            tempRemaining -= e.amount;
            e.remaining = tempRemaining;
        });

        remainingAmount = expenses[expenses.length - 1]?.remaining || totalAmount;
        saveToLocalStorage();
        document.getElementById('resultText').textContent = `Remaining Money: ₹${remainingAmount}`;
        renderTable();
    }
}

function resetManager() {
    if (confirm("Are you sure you want to reset all data?")) {
        totalAmount = 0;
        remainingAmount = 0;
        expenses = [];

        document.getElementById('totalMoney').value = "";
        document.getElementById('spendMoney').value = "";
        document.getElementById('description').value = "";
        document.getElementById('resultText').textContent = "Remaining Money: ₹0";

        document.querySelector('#expenseTable tbody').innerHTML = "";
        localStorage.clear();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('totalAmount', totalAmount);
    localStorage.setItem('remainingAmount', remainingAmount);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function filterExpenses() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const tableRows = document.querySelectorAll('#expenseTable tbody tr');

    tableRows.forEach(row => {
        const descCell = row.children[2].textContent.toLowerCase();
        if (descCell.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

function exportPDF() {
    const actionCells = document.querySelectorAll('#expenseTable th:last-child, #expenseTable td:last-child');
    actionCells.forEach(cell => cell.style.display = 'none');

    const element = document.getElementById('expenseContent');
    var opt = {
        margin: 0.5,
        filename: 'ExpenseHistory.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        actionCells.forEach(cell => cell.style.display = '');
    });
}
