let cityInput = document.getElementById("city");
let getBtn = document.getElementById("getBtn");
let apiKey = "YOUR_API_KEY";
let temperature = document.getElementById("temp");
let condition = document.getElementById("condition");
let humidity = document.getElementById("humidity");
cityInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        getBtn.click();
    }
});
getBtn.addEventListener("click", function(){
    let city = cityInput.value;
    if(cityInput.value == ""){
        alert("Please enter a city name");
        return;
    }
    let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        temperature.innerText= data.current.temp_c + "℃";
        condition.innerText = data.current.condition.text;
        humidity.innerText= data.current.humidity + "%";
    })
    .catch(function(error){
        alert("City not found!");
    })
});
