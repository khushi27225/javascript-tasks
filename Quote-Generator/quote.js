let quoteArea = document.getElementById("quote");
let author = document.getElementById("author");
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(){
    quoteArea.innerText ="Loading...";
 fetch("https://dummyjson.com/quotes/random")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        quoteArea.innerText = data.quote;
        author.innerText = "~" + data.author;
    })
    .catch(function(error){
        quoteArea.innerText = "Failed to load quote. Please try again.";
    })
});
   