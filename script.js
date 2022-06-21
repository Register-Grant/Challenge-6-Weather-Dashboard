const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const currentWeatherItemsElement = document.getElementById("current-weather-items");
const timeZoneElement = document.getElementById("time-zone");
const countryElement = document.getElementById("country");
const weatherForecastElement = document.getElementById("weather-forecast");
const currentTempElement = document.getElementById("current-temp");
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const cityName = document.getElementById("city-name");

const API_KEY = '74fec2d8057ec0ff885d19b7ff4a5faa';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HourFormat = hour >= 13 ? hour %12: hour;
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";

    timeElement.innerHTML = (hoursIn12HourFormat < 10? '0' + hoursIn12HourFormat : hoursIn12HourFormat)
     + ':' + (minutes < 10? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`
    dateElement.innerHTML = days[day] + ', ' + date + ' ' + months[month];
}, 1000);

getWeatherData();
function getWeatherData (cityName) {
    navigator.geolocation.getCurrentPosition((success) => {
      
        let {latitude, longitude} = success.coords;

        // Getting a 401 unauthorized api key message here
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=Tampa&appid=` + API_KEY).then(res => res.json()).then(data => {
        
        console.log(data);
        showWeatherData(data);
        })
    })
}

//I feel like I can grab whatever I want from the "current" object, like if I don't care about wind_speed
function showWeatherData(data) {

    //Console log is saying humidity is undefined, but I'll bet that's because of the invalid api key
    currentWeatherItemsElement.innerHTML = 
    `<div class="weather-item">
        <div>Temperature</div>
        <div>${(data.main.temp)} &#176F</div>
    </div>
    <div class="weather-item">
        <div>Humidity</div>
        <div>${data.main.humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${data.wind.speed} mph</div>
    </div>`;

    let otherDayForecast = ''
    data.daily.forEach((day, idx) => {
        if (idx == 0) {
            currentTempElement.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176; F</div>
                <div class="temp">Day - ${day.temp.day}&#176; F</div>
            </div>
            `
        } else {
            otherDayForecast = `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                    <div class="temp">Night - ${day.temp.night}&#176; F</div>
                    <div class="temp">Day - ${day.temp.day}&#176; F</div>
            </div>`
        }
    });

    weatherForecastElement.innerHTML = otherDayForecast;
}