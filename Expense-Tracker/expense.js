let expenseInput = document.getElementById("expenseInput");
let amountInput = document.getElementById("amountInput");
let expenses = document.getElementById("expenses");
let addBtn = document.getElementById("addBtn");
let expenseList = document.getElementById("expenseList");
let totalExpense = document.getElementById("totalExpense");
let expenseData = JSON.parse(localStorage.getItem("expenses")) || [];
addBtn.addEventListener("click", function(){
    let expense = {
        name: expenseInput.value,
        amount: Number(amountInput.value),
        category: expenses.value
    };
    expenseData.push(expense);
    localStorage.setItem("expenses",JSON.stringify(expenseData));
    displayExpenses();
    updateTotal();
});
function displayExpenses(){
    expenseList.innerHTML = "";
    expenseData.forEach(function(expense , index){
        let expenseItem = document.createElement("p");
        expenseItem.innerText = expense.name + " - ₹" + expense.amount + " - " + expense.category;
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", function(){
            expenseData.splice(index , 1);
            localStorage.setItem("expenses", JSON.stringify(expenseData));
            displayExpenses();
            updateTotal();
        });
        expenseList.appendChild(expenseItem); 
        expenseList.appendChild(deleteBtn);
    });
}
displayExpenses();
updateTotal();
function updateTotal(){
    let total = expenseData.reduce(function(sum, expense){
        return sum + expense.amount;
    },0);
    totalExpense.innerText = "Total Expense: ₹" + total;
}