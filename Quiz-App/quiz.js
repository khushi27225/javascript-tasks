let quiz = [
    {
    question:" Which keyword declares a Variable?",
    options: ["Var", "Let", "Const", "All of the above"],
    answer: "All of the above"
},
{
    question:"which method is used to print output in the console?",
    options:["alert()", "console.log()", "print()", "printf()"],
    answer:"console.log()"
},
{
    question:"Which method is used to fetch data from an API?",
    options:["getData()", "fetch()", "axios()", "url()"],
    answer:"fetch()"
}
];
let question = document.getElementById("question");
let options = document.getElementsByName("options");
let submitBtn = document.getElementById("submitBtn");
let nextBtn = document.getElementById("nextBtn");
let score = document.getElementById("score");
let currentQuestion = 0;
let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");
let option4 = document.getElementById("option4");
let userAnswer;
let totalScore = 0;
function loadQuestion(){
    question.innerText = quiz[currentQuestion].question;
    option1.innerText =quiz[currentQuestion].options[0];
    option2.innerText =quiz[currentQuestion].options[1];
    option3.innerText =quiz[currentQuestion].options[2];
    option4.innerText =quiz[currentQuestion].options[3];

    options[0].value = quiz[currentQuestion].options[0];
    options[1].value = quiz[currentQuestion].options[1];
    options[2].value = quiz[currentQuestion].options[2];
    options[3].value = quiz[currentQuestion].options[3];

    for(let i = 0; i< options.length; i++){
        options[i].checked = false;
    }

}
loadQuestion();
nextBtn.addEventListener("click", function(){
    if(currentQuestion < quiz.length-1){
        currentQuestion++;
        loadQuestion();
        submitBtn.disabled = false;
    }
});
submitBtn.addEventListener("click", function(){
    for(let i = 0; i < options.length; i++){
        if(options[i].checked){
            userAnswer = options[i].value;
        }
    }
    if(userAnswer === quiz[currentQuestion].answer){
        totalScore++;
    }
    submitBtn.disabled = true;
    score.innerText ="score: " + totalScore;
});