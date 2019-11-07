const term = document.querySelector('.search-input');
const nearbyTemperature = document.querySelector('.nearby-temperature');
const weatherType = document.querySelector('.weather-type');
const weatherIcon = document.querySelector('.weather-icon');
const nearbyCity = document.querySelector('.nearby-city');
const searchButton = document.querySelector('.search-button');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const dateContainer = document.querySelector('.date-container');
const timeContainer = document.querySelector('.time-container');
const weatherDescription = document.querySelector('.weather-description');
const displayedData = document.querySelector('.weather-container');
let latitudeW;
let longitudeW;

const appendElements = (json) => {

    weatherBackground(json);

    nearbyCity.innerHTML = json.name;
    nearbyTemperature.innerHTML = Math.floor(json.main.temp) + '&#176';
    weatherIcon.src = 'http://openweathermap.org/img/w/' + json.weather[0].icon + '.png';
    weatherType.innerHTML = json.weather[0].main;
    const weatherResult = json.weather[0].description;
    weatherDescription.innerHTML = weatherResult.charAt(0).toUpperCase() + weatherResult.slice(1);
    windSpeed.innerHTML = 'Winds at ' + this.Math.floor(json.wind.speed) + ' m/s';
    humidity.innerHTML = 'Humidity levels at ' + json.main.humidity + ' %';
};

window.onload = function displayData() {

    nearbyCity.innerHTML = 'Loading...';

    const currentDate = new Date();
    dateContainer.innerHTML = `
    ${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDate()}`;
    timeContainer.innerHTML = `
    ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getNearbyData);
    } else {
        displayedData.innerHTML = "Geolocation is not supported by this browser.";
    }

    function getNearbyData(position) {
        latitudeW = position.coords.latitude;
        longitudeW = position.coords.longitude;

        fetch(`http://localhost:3005/nearby?lat=${latitudeW}&lon=${longitudeW}`)
            .then(response => response.json())
            .then(appendElements);
    }
};

const weatherBackground = (data) => {
    switch (data.weather[0].main) {
        case 'Clouds':
            document.body.style.backgroundImage = 'url("./weather/clouds.jpg")';
            break;
        case 'Clear':
            document.body.style.backgroundImage = 'url("./weather/clear.jpg")';
            break;
        case 'Mist':
            document.body.style.backgroundImage = 'url("./weather/mist.jpg")';
            break;
        case 'Rain':
        case 'Drizzle':
            document.body.style.backgroundImage = 'url("./weather/rain.jpg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("./weather/thunderstorm.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("./weather/snow.jpg")';
            break;
        default:
            break;
    }

};

const searchWeather = (cityName) => {
    nearbyCity.innerHTML = 'Loading...';

    fetch(`http://localhost:3005/search/${cityName}`)
        .then(response => response.json())
        .then(appendElements);
};

searchButton.addEventListener('click', () => {
    const cityName = term.value;
    searchWeather(cityName);
});

term.addEventListener('keydown', function(e) {
    const cityName = term.value;
    if (e.keyCode === 13) {
        searchWeather(cityName);
    }
});