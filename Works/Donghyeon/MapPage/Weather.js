//DOM객체들
const weatherInfo = document.querySelector('.weatherInfo');
const weatherIconImg = document.querySelector('.weatherIcon');

//초기화
function init() {
    getWeather();
}


function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=fukuoka&units=metric&lang=kr&appid=bfaa613564b6762cbea175fd750e8735`).then(function(response) {
        return response.json();
    })
        .then(function(json) {

            const temperature = json.main.temp;
            const place = json.name;
            const weatherDescription = json.weather[0].description;
            const weatherIcon = json.weather[0].icon;
            const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

            weatherInfo.innerText = `${temperature} °C / ${weatherDescription}`;
            weatherIconImg.setAttribute('src', weatherIconAdrs);
        })
        .catch((error) => console.log("weather api error:", error));
}

init();