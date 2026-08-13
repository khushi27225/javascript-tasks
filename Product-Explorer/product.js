let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let category = document.getElementById("category");
let sort = document.getElementById("sort");
let loading = document.getElementById("loading");
let error = document.getElementById("error");
let productArea = document.getElementById("productArea");
let cartCount = document.getElementById("cartCount");
let count = Number(localStorage.getItem("cartCount")) || 0;
cartCount.innerText ="Count: " + count;
searchInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        searchBtn.click();
    }
})
searchBtn.addEventListener("click", async function(){
    if(searchInput.value === ""){
        alert("Please enter a product name!");
        return;
    }
    loading.innerText = "loading..."
    try{
    let product = searchInput.value;
    let url = `https://dummyjson.com/products/search?q=${product}`;
    productArea.innerHTML = "";
    let response = await fetch(url);
    if(!response.ok){
        throw new Error("Product Not Found!");
    }
    let data = await response.json();
    console.log(data);
        let selectedCategory = category.value;
        let filteredProducts;
        if(selectedCategory === "all"){
            filteredProducts = data.products;
        }
        else{
            filteredProducts = data.products.filter(function(product){
                return product.category === selectedCategory;
            });
        }
        let selectedSort= sort.value;
        let sortedProducts;
        if(selectedSort === "price-low"){
            sortedProducts = filteredProducts.sort((a, b) => {
                return a.price - b.price;
            });
        }
            else if(selectedSort === "price-high"){
                sortedProducts = filteredProducts.sort((a, b) =>{
                    return b.price - a.price;
                });
            }
            else if(selectedSort === "rating"){
                sortedProducts = filteredProducts.sort((a, b) => {
                    return b.rating - a.rating;
                });
            }
            else{
                sortedProducts = filteredProducts;
            }
    sortedProducts.forEach((product) => {
        let productCard = document.createElement("div");
        productCard.className = "productCard";
        let img = document.createElement("img");
        img.src = product.thumbnail;
        let title = document.createElement("h2");
        title.innerText = "Title: " + product.title;
        let price = document.createElement("p");
        price.innerText = "Price: " + product.price;
        let rating = document.createElement("p");
        rating.innerText = "Rating: " + product.rating;
        let pCategory = document.createElement("p");
        pCategory.innerText = "Category: " +  product.category;
        let cartBtn = document.createElement("button");
        cartBtn.innerText = "Add to Cart";
        cartBtn.addEventListener("click", function(){
            count++;
            localStorage.setItem("cartCount" , count);
            cartCount.innerText = "Count: " + count;
        });
        productCard.appendChild(img);
        productCard.appendChild(title);
        productCard.appendChild(price);
        productCard.appendChild(rating);
        productCard.appendChild(pCategory);
        productCard.appendChild(cartBtn);
        productArea.appendChild(productCard);
    });
    loading.innerText = "";
    }
    catch{
        error.innerText = "Product Not Found!"
        loading.innerText = "";
    }
});