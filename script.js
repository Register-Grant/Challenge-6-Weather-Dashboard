const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const currentWeatherItemsElement = document.getElementById("current-weather-items");
const timeZoneElement = document.getElementById("time-zone");
const countryElement = document.getElementById("country");
const weatherForecastElement = document.getElementById("weather-forecast");
const currentTempElement = document.getElementById("current-temp");
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

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

    timeElement.innerHTML = hoursIn12HourFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`
    dateElement.innerHTML = days[day] + ', ' + date + ' ' + months[month];
}, 1000);

getWeatherData();
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
      
        let {latitude, longitude} = success.coords;

        // Getting a 401 unauthorized api key message here
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=
        ${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=
        ${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
        })
    })
}