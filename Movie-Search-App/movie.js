let movieInput = document.getElementById("movieInput");
let searchBtn = document.getElementById("searchBtn");
let moviePoster = document.getElementById("moviePoster");
let title = document.getElementById("title");
let year = document.getElementById("year");
let genre = document.getElementById("genre");
let rating = document.getElementById("rating");
let plot = document.getElementById("plot");
let error = document.getElementById("error");
movieInput.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        searchBtn.click();
    }
})
searchBtn.addEventListener("click", function(){
    if(movieInput.value === ""){
        alert("Please enter a movie name!");
        return;
    }
    let url = `https://www.omdbapi.com/?apikey=7520542&t=${movieInput.value.trim()}`
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        title.innerText = "Title: " + data.Title;
        year.innerText = "Year: " + data.Year;
        genre.innerText = "Genre: " + data.Genre;
        rating.innerText = "Rating: " + data.imdbRating;
        plot.innerText = "Plot: " + data.Plot;
        moviePoster.src = data.Poster;
        moviePoster.style.display ="block";
    })
});