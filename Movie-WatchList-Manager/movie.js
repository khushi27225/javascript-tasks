let movieTitle = document.getElementById("movieTitle");
let movieGenre = document.getElementById("movieGenre");
let movieRating = document.getElementById("movieRating");
let movieStatus = document.getElementById("movieStatus");
let addBtn = document.getElementById("addBtn");
let totalMovies = document.getElementById("totalMovies");
let watched = document.getElementById("watched");
let averageRating = document.getElementById("averageRating");
let searchInput = document.getElementById("searchInput");
let genreFilter = document.getElementById("genreFilter");
let statusFilter = document.getElementById("statusFilter");
let searchBtn = document.getElementById("searchBtn");
let movieList = document.getElementById("movieList");
let emptyMessage = document.getElementById("emptyMessage");
let editId = null;
let movies = JSON.parse(localStorage.getItem("movies")) || [];
addBtn.addEventListener("click", function(){
    if(movieTitle.value === "" || movieGenre.value === "" || movieRating.value === "" || movieStatus.value === ""){
        alert("Please fill all the fields!");
        return;
    }
    if(editId === null){
        let moviesData = {
        id : Date.now(),
        title : movieTitle.value,
        genre : movieGenre.value,
        rating : movieRating.value, 
        status : movieStatus.value
    };
    movies.push(moviesData);
    localStorage.setItem("movies", JSON.stringify(movies));
    movieTitle.value = "";
    movieGenre.value = "";
    movieRating.value = "";
    movieStatus.value = "";
    movieList.innerText = "";
    renderMovie(movies);
    updateStatistics();
    }else{
        let index = movies.findIndex(function(movie, index){
        return movie.id === editId;
    });
    movies[index].title = movieTitle.value;
    movies[index].genre = movieGenre.value; 
    movies[index].rating = movieRating.value; 
    movies[index].status = movieStatus.value;
    editId = null;
    }
    localStorage.setItem("movies", JSON.stringify(movies));
    movieTitle.value = "";
    movieGenre.value = "";
    movieRating.value = "";
    movieStatus.value = "";
    movieList.innerText = "";
    renderMovie(movies);
    updateStatistics();
});

function renderMovie(moviesToRender){
    moviesToRender.forEach(function(movie){
        let movieCard = document.createElement("div");
        movieCard.className = "movieCard";
        let mTitle = document.createElement("p");
        mTitle.innerText = "Title: " + movie.title;
        let mGenre = document.createElement("p");
        mGenre.innerText = "Genre: " + movie.genre;
        let mRating = document.createElement("p");
        mRating.innerText = "Rating: " + movie.rating;
        let mStatus = document.createElement("p");
        mStatus.innerText = "Status: " + movie.status;
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "deleteBtn";
        deleteBtn.dataset.id = movie.id;
        deleteBtn.innerText = "Delete";
        let editBtn = document.createElement("button");
        editBtn.className = "editBtn";
        editBtn.dataset.id = movie.id;
        editBtn.innerText = "Edit";
        movieCard.appendChild(mTitle);
        movieCard.appendChild(mGenre);
        movieCard.appendChild(mRating);
        movieCard.appendChild(mStatus);
        movieCard.appendChild(deleteBtn);
        movieCard.appendChild(editBtn);
        movieList.appendChild(movieCard);
    });
}
movieList.innerText = "";
renderMovie(movies);
if(movies.length === 0){
    emptyMessage.innerText = "No Movie Found!"
}

function updateStatistics(){
totalMovies.innerText = "Total Movies: " + movies.length;
let wMovies = movies.filter((movie) =>{
    return movie.status === "watched";
});
watched.innerText = "Watched: " + wMovies.length;
let sum = movies.reduce((total, movie) => {
    return total + Number(movie.rating);
}, 0);
if(movies.length === 0){
    averageRating.innerText = "Average Rating: 0"
}else{
averageRating.innerText = "Average Rating: " + sum/movies.length;
}
}
updateStatistics();

movieList.addEventListener("click", function(event){
    if(event.target.matches(".deleteBtn")){
        let id = Number(event.target.dataset.id);
        let index = movies.findIndex(function(movie , index){
            return movie.id === id;
        });
        movies.splice(index, 1);
        localStorage.setItem("movies", JSON.stringify(movies));
    }
    movieList.innerText = "";
    renderMovie(movies);
    updateStatistics();
    if(movies.length === 0){
    emptyMessage.innerText = "No Movie Found!"
}
 if(event.target.matches(".editBtn")){
    let id = Number(event.target.dataset.id);
    editId = id;
    let index = movies.findIndex(function(movie, index){
        return movie.id === id;
    });
    movieTitle.value = movies[index].title;
    movieGenre.value = movies[index].genre;
    movieRating.value = movies[index].rating;
    movieStatus.value = movies[index].status;
    }
});
searchBtn.addEventListener("click", function(){
    applyFilters();
});
genreFilter.addEventListener("change", function(){
    applyFilters();
});
statusFilter.addEventListener("change", function(){
    applyFilters();
});
function applyFilters(){
    let searchText = searchInput.value;
    let selectedGenre = genreFilter.value;
    let selectedStatus = statusFilter.value;
    let filteredMovies = movies.filter(function(movie){
        return ( (searchText === "" || movie.title.toLowerCase().includes(searchText)) && (selectedGenre === "all" || movie.genre === selectedGenre) && (selectedStatus === "all" || movie.status === selectedStatus));
    });
    movieList.innerText ="";
    renderMovie(filteredMovies);
    if(filteredMovies.length === 0){
        emptyMessage.innerText = "No Movie Found!";
    }else{
        emptyMessage.innerText = "";
    }
}