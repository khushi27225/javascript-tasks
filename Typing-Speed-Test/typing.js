let textToType = document.getElementById("textToType");
let typingInput = document.getElementById("typingInput");
let timer = document.getElementById("timer");
let wpm = document.getElementById("wpm");
let accuracy = document.getElementById("accuracy");
let resetBtn = document.getElementById("resetBtn");
let timeLeft;
let timerInterval;
let timeUsed;
function startTimer(){
    if(timerInterval){
        return;
    }
    timeLeft = 60;
    timer.innerText = "60s";
    timerInterval = setInterval(function(){
        timeLeft--;
        timer.innerText = timeLeft;
            if(timeLeft === 0){
                clearInterval(timerInterval);
                timeUsed = 60;
                timerInterval = null;
            }
    }, 1000);
}
typingInput.addEventListener("input", function(){
    let typedText = typingInput.value;
    if(typedText.length === 1){
        startTimer();
    }
    let originalText = textToType.innerText;
    let correctCount = 0;
    for(let i = 0; i < typedText.length; i++){
        if(typedText[i] === originalText[i]){
            correctCount++;
        }
    }
    if(typedText.length === 0){
        accuracy.innerText = "0%";
        return;
    }
    accuracy.innerText = "Accuracy: " + (correctCount/typedText.length)*100 + "%";
        if(typedText === originalText){
        clearInterval(timerInterval);
        timeUsed = 60 - timeLeft;
        timerInterval = null;
        console.log(timeUsed);
        let words = typedText.length/5;
        let minutes = timeUsed/60;
        let result = words/minutes;
        wpm.innerText = "WPM: " + result;
    }
});
resetBtn.addEventListener("click", function(){
    typingInput.value = "";
    clearInterval(timerInterval);
    timerInterval = null;
    wpm.innerText = "WPM: --";
    accuracy.innerText = "Accuracy: --% ";
    timeLeft = 60;
    timer.innerText = "60s";
});