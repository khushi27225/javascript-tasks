let task = document.getElementById("text");
let addBtn = document.getElementById("addBtn");
let list = document.getElementById("list");
let totalTasks = document.getElementById("totalTasks");
let count = 0 ;
addBtn.addEventListener("click", function (){
   if(task.value === ""){
        alert("Please enter a task!");
        return;
    }
    let li = document.createElement("li");
    li.innerText = task.value;
    li.style.color="white";
    list.appendChild(li);
    count++;
    totalTasks.innerText = "Total Tasks:" + count;
    task.value = "";
});
