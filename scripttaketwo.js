let weather = {
    apiKey: "74fec2d8057ec0ff885d19b7ff4a5faa",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=imperial&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => console.log(data));
    },
    displayWeather: function(data) {

    }
};