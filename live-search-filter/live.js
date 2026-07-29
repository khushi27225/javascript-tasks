let fruits = ["Apple", "Mango" ,"Banana", "Orange", "Grapes", "Pineapple" ];
let input = document.getElementById("searchBox");
let result = document.querySelector(".resultArea");
input.addEventListener("input" , function(){
    console.log(input.value);
    let search = input.value;
    let filtered = fruits.filter((fruit) =>{
    fruit.includes(search);
    return fruit.includes(search);
});
console.log(filtered);
result.innerText ="";
filtered.forEach((fruit) =>{
    let p = document.createElement("p");
    p.innerText = fruit;
    result.appendChild(p);
}) 
});

