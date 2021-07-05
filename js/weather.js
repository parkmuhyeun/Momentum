const API_KEY = "8dbf19dd4ff8e5b19650edcd7e8cf219";

function onGeoOk(position) {                                                                                                //getCurrentPosition 성공시
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;      //날씨 api
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
           const weather = document.querySelector("#weather span:first-child");
           const city = document.querySelector("#weather span:last-child");
           city.innerText = data.name;                                                                                      // 도시
           weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;                                               // 날씨 / 온도
        });
}

function onGeoError(){                                                                                                      //getCurrrentPosition 실패시
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);