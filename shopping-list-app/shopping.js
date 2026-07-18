let itemName = document.getElementById("item");
let quantity = document.getElementById("quantity");
let addBtn = document.getElementById("addBtn");
let list = document.getElementById("list");
let totalItems = document.getElementById("totalItems");
let count = 0;
addBtn.addEventListener("click" , function(){
    if(itemName.value === "" || quantity.value === ""){
        alert("PLease fill all fields!");
        return;
    }
    if(quantity.value<= 0){
        alert("Quantity must be greater than 0!");
        return;
    }
    let li = document.createElement("li");
    li.innerText = itemName.value + "-" + quantity.value;
    list.appendChild(li);
    count++;
    totalItems.innerText = "Total Items:" + count;
    itemName.value = "";
    quantity.value = "";
});
