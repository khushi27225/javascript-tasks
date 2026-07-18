let english = document.getElementById("english");
let math = document.getElementById("math");
let science = document.getElementById("science");
let addBtn = document.getElementById("addBtn");
let totalMarks = document.getElementById("totalMarks");
let percentage = document.getElementById("percentage");
let result = document.getElementById("result");
let count = 0;
addBtn.addEventListener("click", function() {
    if(english.value === "" || math.value === "" || science.value === ""){
        alert("Please fill all fields");
        return;
    }
    let englishMarks = Number(english.value);
    let mathMarks= Number(math.value);
    let scienceMarks = Number(science.value);
    let total = englishMarks + mathMarks + scienceMarks;
    totalMarks.innerText = "Total Marks:" + total;
    if(englishMarks < 0 || englishMarks > 100 || mathMarks <0 || mathMarks > 100 || scienceMarks < 0 || scienceMarks > 100 ){
        alert("Marks must be between 0 and 100");
        return;
    }
    let prcntg = total / 300 *100;
    percentage.innerText = "Percentage:" + prcntg.toFixed(2) + "%";
    if (prcntg >= 33) {
        result.innerText = "Result: Pass";
    }else {
        result.innerText = "Result: Fail";
    }
    });