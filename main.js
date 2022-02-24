apiKey = '54b60381bd02063b8a2731d360b1a93f';
const formSubmit = document.querySelector('#submitForm')
let selectedCity = document.querySelector("#citySelector");
let selectedState = document.querySelector("#stateSelector");
let tempUnit = document.querySelector('#tempCategory')
let cityList = document.querySelector('#cityList')
// Card
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

        // Create the elements to display
        let temp = document.createElement("li");
        temp.classList.add("form-control");
        temp.innerText = `${Math.round(temperature)}`;
        let city = document.createElement("h1");
        city.classList.add("col-md-6");
        city.innerText = `${cityName}`
        let mxTempTitle = document.createElement("h1");
        mxTempTitle.classList.add("col-md-6");
        mxTempTitle.innerText = "High"
        let mxTemp = document.createElement("li");
        mxTemp.classList.add("form-control");
        mxTemp.innerText = `${Math.round(tempMax)}`;
        let mnTempTitle = document.createElement("h1");
        mnTempTitle.classList.add("col-md-6");
        mnTempTitle.innerText = "Low";
        let mnTemp = document.createElement("li");
        mnTemp.classList.add("form-control");
        mnTemp.innerText = `${Math.round(tempMin)}`;
        let feelTitle = document.createElement("h1");
        feelTitle.classList.add("col-md-6");
        feelTitle.innerText = "Feels Like";
        let feels = document.createElement("li");
        feels.classList.add("form-control");
        feels.innerText = `${Math.round(feel)}`;
        let forecast = document.createElement("h1");
        forecast.classList.add("col-md-6");
        forecast.innerText = "Forecast";
        let fCast = document.createElement("li");
        fCast.classList.add("form-control");
        fCast.innerText = `${weather}`;
        let humidityTitle = document.createElement("h1");
        humidityTitle.classList.add("col-md-6");
        humidityTitle.innerText = "Humidity";
        let humid = document.createElement("li");
        humid.classList.add("form-control");
        humid.innerText = `${humidity}`;
        let windTitle = document.createElement("h1");
        windTitle.classList.add("col-md-6");
        windTitle.innerText = "Wind Speed";
        let winds = document.createElement("li");
        winds.classList.add("form-control");
        winds.innerText = `${wind} mph`;
        
        cityName1.innerText = `${cityName}`;
        console.log(temperature)
        current1.innerText = `${Math.round(temperature)}`;
        high1.innerText = `${Math.round(tempMax)}`;
        low1.innerText = `${Math.round(tempMin)}`;
        feels1.innerText = `${Math.round(feel)}`;
        forecast1.innerText = weather;
        wind1.innerText = `${wind} mph`;
        humidity1.innerText = humidity

        // Add to list
        cityList.appendChild(city);
        cityList.appendChild(temp);
        cityList.appendChild(mxTempTitle);
        cityList.appendChild(mxTemp);
        cityList.appendChild(mnTempTitle)
        cityList.appendChild(mnTemp);
        cityList.appendChild(feelTitle);
        cityList.appendChild(feels)
        cityList.appendChild(forecast);
        cityList.appendChild(fCast);
        cityList.appendChild(humidityTitle);
        cityList.appendChild(humid);
        cityList.appendChild(windTitle);
        cityList.appendChild(winds);

        selectedCity.value = ""
        selectedState.value= "" 
    });
});