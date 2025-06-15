const API_KEY = 'YOUR_API_KEY_HERE'
const searchBox = document.querySelector(".searchBox")
const search_bar = document.querySelector(".search-bar")
const card = document.querySelector(".card")

searchBox.addEventListener("submit", async event => {
    event.preventDefault();  //prevent default refreshing of the page
    const city = search_bar.value;
    if (city) {
        try{
            const weather_data = await getWeatherData(city);
            displayWeatherInfo(weather_data)
        }
        catch{
            console.log(error);
            displayError(error)
        }
    }
    else{
        displayError("Please Enter a City");
    }
})

async function getWeatherData(city) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(URL);

    if(!response.ok){
        throw new Error("Couldn't fetch data");
    }
    return await response.json();   //convert response to json format
}

function displayWeatherInfo(data){
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;   //object destructuring

    card.textContent = ""
    card.style.display = "flex"

    const cityDisplay = document.createElement('h1')
    const tempDisplay = document.createElement('p')
    const humidityDisplay = document.createElement('p')
    const descDisplay = document.createElement('p')
    const weatherEmoji = document.createElement('p')
    
    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay")
    card.appendChild(cityDisplay);

    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    tempDisplay.classList.add("tempDisplay")
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay")
    card.appendChild(humidityDisplay);

    descDisplay.textContent = `Description: ${description}`;
    descDisplay.classList.add("descDisplay")
    card.appendChild(descDisplay);

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji")
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "⛈️";
        case (weatherId >= 500 && weatherId < 600):
            return "⛈️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀";  //☀️
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "✨";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

function changeMode() {
    let element = document.body;
    element.classList.toggle("dark-mode");
}
