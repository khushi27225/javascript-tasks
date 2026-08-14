let taskTitle = document.getElementById("taskTitle");
let description = document.getElementById("description");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let pTaskList = document.getElementById("pTaskList");
let cTaskList = document.getElementById("cTaskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let draggedCard; 
description.addEventListener("keydown" , function(event){
    if(event.key === "Enter"){
        addBtn.click();
    }
});
addBtn.addEventListener("click", function(){
    if(taskTitle.value === "" || description.value === ""){
        alert("Please fill all fields!");
        return;
    }
    let task = {
        title : taskTitle.value,
        description : description.value,
        status : "todo"
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    let taskCard = document.createElement("div");
    taskCard.className = "taskCard";
    taskCard.draggable = true;
    taskCard.addEventListener("dragstart", function(event){
        event.dataTransfer.setData("text/plain", task.title);
        draggedCard = taskCard;
    });
    let h3 = document.createElement("h3");
    h3.innerText = taskTitle.value;
    let p = document.createElement("p");
    p.innerText = description.value;
    let deleteBtn = document.createElement("button");
    deleteBtn.id = "deleteBtn";
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", function(){
        taskCard.remove();
        tasks = tasks.filter(function(item){
            return item !== task;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
    taskCard.appendChild(h3);
    taskCard.appendChild(p);
    taskCard.appendChild(deleteBtn);
    taskList.appendChild(taskCard);
});
taskList.addEventListener("dragover", function(event){
        event.preventDefault();
    });
    pTaskList.addEventListener("dragover", function(event){
        event.preventDefault();
    });
    cTaskList.addEventListener("dragover", function(event){
        event.preventDefault();
    });
    function handleDrop(list, status){
        list.addEventListener("drop", function(event){
        let title = event.dataTransfer.getData("text/plain");
        let result = tasks.find(function(item){
            return item.title === title;
        });
        result.status = status;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        list.appendChild(draggedCard);
        console.log(result);
        });
    }
    handleDrop(taskList, "todo");
    handleDrop(pTaskList, "progress");
    handleDrop(cTaskList, "completed");
    function renderTasks(){
        taskList.innerHTML = "";
        pTaskList.innerHTML = "";
        cTaskList.innerHTML = "";
        tasks.forEach((task) => {
            let taskCard = document.createElement("div");
            taskCard.className = "taskCard";
            taskCard.draggable = true;
            taskCard.addEventListener("dragstart", function(event){
            event.dataTransfer.setData("text/plain", task.title);
            draggedCard = taskCard;
        });
            let h3 = document.createElement("h3");
            h3.innerText = task.title;
            let p = document.createElement("p");
            p.innerText = task.description;
            let deleteBtn = document.createElement("button");
            deleteBtn.id = "deleteBtn";
            deleteBtn.innerText = "Delete";
            deleteBtn.addEventListener("click", function(){
            taskCard.remove();
            tasks = tasks.filter(function(item){
            return item !== task;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
            taskCard.appendChild(h3);
            taskCard.appendChild(p);
            taskCard.appendChild(deleteBtn);
            if(task.status === "todo"){
                taskList.appendChild(taskCard);
            }
            else if(task.status === "progress"){
                pTaskList.appendChild(taskCard);
            }
            else if(task.status === "completed"){
                cTaskList.appendChild(taskCard);
            }
        });
    }
    renderTasks();