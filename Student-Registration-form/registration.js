let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let age = document.getElementById("age");
let addBtn = document.getElementById("addBtn");
let list = document.getElementById("list");
let totalStudents = document.getElementById("totalStudents");
let count = 0;
let editLi = null;
addBtn.addEventListener("click", function() {
    if(fullName.value === "" || email.value === ""|| age.value === ""){
        alert("Please fill all fields!");
        return;
    }
    if(!email.value.includes("@")){
        alert("Email must contain @");
        return;
    }
    if(age.value < 18 ){
        alert("Age must be 18 or above 18");
        return;
    }
    if(editLi != null){
    editLi.querySelector(".name").innerText = fullName.value;
    editLi.querySelector(".email").innerText = email.value;
    editLi.querySelector(".age").innerText = age.value;
    editLi = null;
    addBtn.innerText = "Register"
    fullName.value ="" ;
    email.value ="" ;
    age.value ="" ;
    return;
    }
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("Name: "));
    let nameSpan = document.createElement("span");
    nameSpan.className = "name";
    nameSpan.innerText = fullName.value;
    li.appendChild(nameSpan);
    li.appendChild(document.createElement("br"));
    li.appendChild(document.createTextNode("Email: "));
    let emailSpan = document.createElement("span");
    emailSpan.className = "email";
    emailSpan.innerText = email.value;
    li.appendChild(emailSpan);
    li.appendChild(document.createElement("br"));
    li.appendChild(document.createTextNode("Age: "));
    let ageSpan = document.createElement("span");
    ageSpan.className = "age";
    ageSpan.innerText = age.value;
    li.appendChild(ageSpan);
    li.appendChild(document.createElement("br"));
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    li.appendChild(document.createElement("br"));
    li.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", function(){
        li.remove();
        count--;
        totalStudents.innerText = "Total Students: " + count;
    });
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);
    editBtn.addEventListener("click", function(){
    fullName.value = li.querySelector(".name").innerText;
    email.value = li.querySelector(".email").innerText;
    age.value = li.querySelector(".age").innerText;
    editLi = li;
    addBtn.innerText ="Update";
    })
    list.appendChild(li);
    count++;
    totalStudents.innerText = "Total Students: " + count;
    fullName.value ="" ;
    email.value ="" ;
    age.value ="" ;
});