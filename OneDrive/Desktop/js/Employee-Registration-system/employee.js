let fullName = document.getElementById("fullName");
let department = document.getElementById("department");
let salary = document.getElementById("salary");
let addBtn = document.getElementById("addBtn");
let totalEmployees = document.getElementById("totalEmployees");
let list = document.getElementById("list");
let count = 0;
let editLi = null;
addBtn.addEventListener("click", function(){
    if(fullName.value === "" || department.value === "" || salary.value === ""){
        alert("Please fill all the fields!");
        return;
    }
    let salaryValue = Number(salary.value);
    if(salaryValue <= 0){
        alert("Salary should not be negative and zero!");
        return;
    }
    if(editLi != null){
    editLi.querySelector(".name").innerText = fullName.value;
    editLi.querySelector(".department").innerText = department.value;
    editLi.querySelector(".salary").innerText = salary.value;
    editLi = null;
    addBtn.innerText = "Register"
    fullName.value ="" ;
    department.value ="" ;
    salary.value ="" ;
    return;
    }
 let li = document.createElement("li");
   li.appendChild(document.createTextNode("Name: "));
    let nameSpan = document.createElement("span");
    nameSpan.className = "name";
    nameSpan.innerText = fullName.value;
    li.appendChild(nameSpan);
    li.appendChild(document.createElement("br"));
    li.appendChild(document.createTextNode("Department: "));
    let departmentSpan = document.createElement("span");
    departmentSpan.className = "department";
    departmentSpan.innerText = department.value;
    li.appendChild(departmentSpan);
    li.appendChild(document.createElement("br"));
    li.appendChild(document.createTextNode("Salary: "));
    let salarySpan = document.createElement("span");
    salarySpan.className = "salary";
    salarySpan.innerText = "₹"+ salary.value;
    li.appendChild(salarySpan);
 let deleteBtn = document.createElement("button");
 deleteBtn.innerText = "Delete";
 li.appendChild(document.createElement("br"));
 li.appendChild(deleteBtn);
 deleteBtn.addEventListener("click", function(){
    li.remove();
    count--;
    totalEmployees.innerText = "Total Employees: " + count;
    });
 let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);
    editBtn.addEventListener("click", function(){
    fullName.value = li.querySelector(".name").innerText;
    department.value = li.querySelector(".department").innerText;
    salary.value = li.querySelector(".salary").innerText;
    editLi = li;
    addBtn.innerText ="Update";
    })
 list.appendChild(li);
 count++;
 totalEmployees.innerText = "Total Employees:" + count;
 fullName.value ="";
 department.value ="";
 salary.value ="";
});