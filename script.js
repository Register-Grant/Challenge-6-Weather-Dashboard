function GetInfo() {
    let newName = document.getElementById("cityInput");
    let cityName = document.getElementById("cityName");
    cityName.innerHTML = "--"+newName.value+"--";

fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=3e282ef0bced111943e6341c3fed62c8')
.then(response => response.json())
.then(data => {
    for(i=0; i<5; i++) {
        document.getElementById("day" + (i+1) + "Temp").innerHTML = "Temp " + Number(data.list[i].main.temp).toFixed(1)+"°";
    }
    for(i=0; i<5; i++) {
        document.getElementById("day" + (i+1) + "Wind").innerHTML = "Wind Speed " + Number(data.list[i].wind.speed).toFixed(1)+"km/h";
    }
    for(i=0; i<5; i++) {
        document.getElementById("day" + (i+1) + "Humidity").innerHTML = "Humidity " + Number(data.list[i].main.humidity)+"%";
    }

    for(i=0; i<5; i++) {
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
        }
        console.log(data)
})

.catch(err => alert("You suck at this"))
}

function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "Tampa";
    GetInfo();
}

let d = new Date();
let weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function CheckDay(day) {
    if(day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    } else {
        return day + d.getDay();
    }
}

for(i=0; i<5; i++) {
    document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
}