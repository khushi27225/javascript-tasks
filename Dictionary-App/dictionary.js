let wordInput = document.getElementById("wordInput");
let searchBtn = document.getElementById("searchBtn");
let word = document.getElementById("word");
let meaning = document.getElementById("meaning");
let speech = document.getElementById("speech");
let example = document.getElementById("example");
let audioBtn = document.getElementById("audioBtn");
let audioUrl = "";
wordInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        searchBtn.click();
    }
})
searchBtn.addEventListener("click" , function(){
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput.value.trim()}`;
    if(wordInput.value.trim() === ""){
        alert("Please enter a word!");
        return;
    }
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        word.innerText = "word: " + data[0].word;
        meaning.innerText ="Meaning: " + data[0].meanings[0].definitions[0].definition;
        speech.innerText = "Part of Speech: " + data[0].meanings[0].partOfSpeech; 
        example.innerText = "Example: " + (data[0].meanings[0].definitions[0].example || "No example available!");
        audioUrl = "";
        for(let i = 0; i< data[0].phonetics.length; i++){
    if(data[0].phonetics[i].audio !== ""){
        audioUrl = data[0].phonetics[i].audio;
        break;
    }
}
    })
})
audioBtn.addEventListener("click", function(){
    if(!audioUrl){
        alert("Please search a word first!");
        return;
    }
    let audio = new Audio(audioUrl);
    audio.play();
});