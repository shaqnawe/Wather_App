apiKey = '54b60381bd02063b8a2731d360b1a93f';
// ID selectors for form
const formSubmit = document.querySelector('#submitForm')
let selectedCity = document.querySelector("#citySelector");
let selectedState = document.querySelector("#stateSelector");
let tempUnit = document.querySelector('#tempCategory')

// ID selectors for Display Card
let cityName1 = document.querySelector("#cityName");
let current1 = document.querySelector("#currentTemp");
let high1 = document.querySelector("#high");
let low1 = document.querySelector("#low");
let wind1 = document.querySelector("#wind");
let feels1 = document.querySelector("#feels");
let forecast1 = document.querySelector("#forecast");
let humidity1 = document.querySelector("#humidity");
// let degree = '&#176;'

formSubmit.addEventListener("click", () => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity.value},${selectedState.value}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let cityName = data.name
        let fetchedTemp = data.main['temp']
        let maxTemp = data.main["temp_max"];
        let minTemp = data.main["temp_min"];
        let feelsLike = data.main["feels_like"];
        let wind = data.wind["speed"];
        let humidity = data.main["humidity"];
        let weather = data.weather[0]["main"];
        
        // Calculate temp in Celcius or Farenheit
        if(tempUnit.value === 'Celcius') {
            var temperature = fetchedTemp - 273.15;
            var tempMax = maxTemp - 273.15;
            var tempMin = minTemp - 273.15;
            var feel = feelsLike - 273.15;
        }
        else if(tempUnit.value === 'Farenheit') {
            var temperature = fetchedTemp * 1.8 - 459.67;
            var tempMax = maxTemp * 1.8 - 459.67;
            var tempMin = minTemp * 1.8 - 459.67;
            var feel = feelsLike * 1.8 - 459.67;
        }
        
        cityName1.innerText = `${cityName}`;
        console.log(temperature)
        current1.innerText = `${Math.round(temperature)}`;
        high1.innerText = `${Math.round(tempMax)}`;
        low1.innerText = `${Math.round(tempMin)}`;
        feels1.innerText = `${Math.round(feel)}`;
        forecast1.innerText = weather;
        wind1.innerText = `${wind} mph`;
        humidity1.innerText = humidity
        
        // Reset the form values
        selectedCity.value = ""
        selectedState.value= "" 
    });
});