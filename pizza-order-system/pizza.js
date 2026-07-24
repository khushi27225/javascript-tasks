let fullName = document.getElementById("fullName");
let pizzaName = document.getElementById("pizzaName");
let quantity = document.getElementById("quantity");
let addBtn = document.getElementById("addBtn");
let totalOrder = document.getElementById("totalOrder");
let list = document.getElementById("list");
let search = document.getElementById("search");
let count= 0;
let editLi = null;
addBtn.addEventListener("click", function(){
    if(fullName.value === "" || pizzaName.value === "" || quantity.value === ""){
        alert("Please fill all the fields!");
        return;
    }
    let quantityValue = Number(quantity.value);
    if(quantityValue <=0 ){
        alert("Quantity should not be zero or negative!");
        return;
    }
    if(editLi != null){
    editLi.querySelector(".name").innerText = fullName.value;
    editLi.querySelector(".pizza").innerText = pizzaName.value; 
    editLi.querySelector(".quantity").innerText = quantity.value;
    editLi = null;
    addBtn.innerText = "Place Order";
    fullName.value = "";
    pizzaName.value = "";
    quantity.value = "";
    return;
    }
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("Name:"));
    let nameSpan = document.createElement("span");
    nameSpan.className = "name";
    nameSpan.innerText = fullName.value;
    li.appendChild(nameSpan);
    li.appendChild(document.createElement("br"));
    li.appendChild(document.createTextNode("pizza:"));
    let pizzaSpan = document.createElement("span");
    pizzaSpan.className = "pizza";
    pizzaSpan.innerText = pizzaName.value;
    li.appendChild(pizzaSpan);
    li.appendChild(document.createElement("br"));
    li.appendChild(document.createTextNode("quantity:"));
    let quantitySpan = document.createElement("span");
    quantitySpan.className = "quantity";
    quantitySpan.innerText = quantity.value;
    li.appendChild(quantitySpan);
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    li.appendChild(document.createElement("br"));
    li.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", function(){
    li.remove();      
    count--;
    totalOrder.innerText = "Total order:" + count;
    });
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);
    editBtn.addEventListener("click", function(){
    fullName.value = li.querySelector(".name").innerText;
    pizzaName.value = li.querySelector(".pizza").innerText;
    quantity.value= li.querySelector(".quantity").innerText;
    editLi = li;
    addBtn.innerText = "Update";
    });
    list.appendChild(li);
    count++;
    totalOrder.innerText = "Total Order:" + count;
    fullName.value ="";
    pizzaName.value ="";
    quantity.value ="";
});
search.addEventListener("keyup", function(){
    let searchValue = search.value.toLowerCase();
    let allOrders = list.querySelectorAll("li");
    allOrders.forEach(function(order){
        let customerName = order.querySelector(".name").innerText.toLowerCase();
        if(customerName.includes(searchValue)){
            order.style.display ="block";
        }else{
            order.style.display ="none";
        }
    })
})