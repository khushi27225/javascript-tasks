let recipeInput = document.getElementById("recipeInput");
let searchBtn = document.getElementById("searchBtn");
let loading = document.getElementById("loading");
let error = document.getElementById("error");
let recipeArea = document.getElementById("recipeArea");
recipeInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        searchBtn.click();
    }
});
searchBtn.addEventListener("click", async function(){
    if(recipeInput.value === ""){
        alert("Please enter a recipe name!");
        return;
    }
    loading.innerText = "loading...."
    try{
    let name = recipeInput.value;
    let url = `https://dummyjson.com/recipes/search?q=${name}`;
    console.log(url);
    recipeArea.innerHTML = "";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    console.log(data.recipes[0].name);
        if(data.recipes.length === 0){
            alert("N0 Recipe Found!");
             loading.innerText = "";
            return;
        }
    data.recipes.forEach((recipe) => {
    let recipeCard = document.createElement("div");
    recipeCard.className = "recipeCard";
    let img = document.createElement("img");
    img.src = recipe.image;
    let heading = document.createElement("h1");
    heading.innerText = recipe.name;
    let ingredients = document.createElement("p");
    ingredients.innerText = "Ingredients: "+ recipe.ingredients.join(", ");
    let instructions = document.createElement("p");
    instructions.innerText = "Instructions: " + recipe.instructions;
    recipeCard.appendChild(img);
    recipeCard.appendChild(heading);
    recipeCard.appendChild(ingredients);
    recipeCard.appendChild(instructions);
    recipeArea.appendChild(recipeCard);
    });
    loading.innerText = "";
    }
    catch(err){
        error.innerText = "Something went wrong."
        loading.innerText = "";
    }
});