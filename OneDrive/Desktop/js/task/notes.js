let title = document.getElementById("title");
let description = document.getElementById("description");
let addBtn = document.getElementById("addBtn");
let list = document.getElementById("notesList");
let totalNotes = document.getElementById("totalNotes");
let count = 0;
addBtn.addEventListener("click", function(){
if(title.value === "" || description.value === ""){
        alert("Please fill all fields!");
        return;
    }
    let li =document.createElement("li");
    li.innerText = title.value + "\n" + description.value;
    list.appendChild(li);
    count++;
    totalNotes.innerText = "Total Notes:" + count;
    title.value ="" ;
    description.value ="";
});
    
    
