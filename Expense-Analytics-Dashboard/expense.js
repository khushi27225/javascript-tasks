let expenseInput = document.getElementById("expenseInput");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let expenseDate = document.getElementById("expenseDate");
let addBtn = document.getElementById("addBtn");
let expenseList = document.getElementById("expenseList");
let totalExpense = document.getElementById("totalExpense");
let highestExpense = document.getElementById("highestExpense");
let searchExpense = document.getElementById("searchExpense");
let searchBtn = document.getElementById("searchBtn");
let sort = document.getElementById("sort");
let emptyMessage = document.getElementById("emptyMessage");
let expensees = JSON.parse(localStorage.getItem("expensees")) || [];
addBtn.addEventListener("click", function(){
    if(expenseInput.value === "" || amount.value === "" || category.value === "" || expenseDate.value === ""){
        alert("Please fill all the fields!");
        return;
    }
    let expenseData = {
        id : Date.now(),
        name : expenseInput.value,
        amount : amount.value,
        category : category.value,
        date : expenseDate.value
    };
    expensees.push(expenseData);
    localStorage.setItem("expensees", JSON.stringify(expensees));
    expenseList.innerText = "";
    renderExpense(expensees);
    expenseInput.value = "";
    amount.value = "";
    category.value = "";
    expenseDate.value = "";
});
function renderExpense(expensesToRender){
    expensesToRender.forEach(function(expense){
        let expenseCard = document.createElement("div");
        expenseCard.id = "expenseCard";
        let expenseName = document.createElement("p");
        expenseName.innerText = "Name: " + expense.name;
        let expenseAmount = document.createElement("p");
        expenseAmount.innerText = "Amount: " + expense.amount;
        let expenseCategory = document.createElement("p");
        expenseCategory.innerText = "Category: " + expense.category;
        let Date = document.createElement("p");
        Date.innerText = "Date: " + expense.date;
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "deleteBtn";
        deleteBtn.innerText = "Delete";
        deleteBtn.dataset.id = expense.id;
        expenseCard.appendChild(expenseName);
        expenseCard.appendChild(expenseAmount);
        expenseCard.appendChild(expenseCategory);
        expenseCard.appendChild(Date);
        expenseCard.appendChild(deleteBtn);
        expenseList.appendChild(expenseCard);
    });
}
expenseList.innerText = "";
renderExpense(expensees);
if(expensees.length === 0){
    emptyMessage.innerText = "No Expenses Found!";
}
expenseList.addEventListener("click", function(event){
    if(event.target.matches(".deleteBtn")){
        let id = Number(event.target.dataset.id);
        let index = expensees.findIndex(function(expense, index){
        if(expense.id === id){
            return index;
        }
        expenseList.innerText = "";
        renderExpense(expensees);
        calculateTotalExpense();
        calculateHighestExpense();
    });
    expensees.splice(index, 1);
    localStorage.setItem("expensees", JSON.stringify(expensees));
    }
    expenseList.innerText = "";
    renderExpense(expensees);
});
function calculateTotalExpense(){
    let sum = expensees.reduce((total, expense) =>{
        return total + Number(expense.amount);
    }, 0);
    totalExpense.innerText = "Total Expense: " + sum ;
}
calculateTotalExpense();
function calculateHighestExpense(){
    let highExpense = expensees.reduce((highest, expense)=>{
        if(Number(expense.amount)> highest){
            return expense.amount;
        }else{
            return highest;
        }
    },0);
    highestExpense.innerText = "Highest Expense: " + highExpense;
}
calculateHighestExpense();
function searchExpenses(){
    let searchText = searchExpense.value.toLowerCase();
    let filteredExpense = expensees.filter((expense) =>{
    return expense.name.toLowerCase().includes(searchText);
    });
    expenseList.innerText = "";
    renderExpense(filteredExpense);
}
searchBtn.addEventListener("click", function(){
    searchExpenses();
    searchExpense.value = "";
});

sort.addEventListener("change", function(){
   let option = sort.value;
   if(option === "highAmount"){
    expensees.sort((a,b) => b.amount - a.amount);
   }else if(option === "lowAmount"){
    expensees.sort((a,b) => a.amount - b.amount);
   }else if (option === "date"){
    expensees.sort((a,b) => new Date(a.date)- new Date(b.date));
   }
   expenseList.innerText = "";
   renderExpense(expensees);
});