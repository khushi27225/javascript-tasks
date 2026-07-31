let button = document.getElementById("addBtn");
let jokeArea = document.getElementById("Joke");
button.addEventListener("click", function(){
    fetch("https://official-joke-api.appspot.com/random_joke")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        jokeArea.innerText= data.setup + "\n\n" + data.punchline;
    })
});