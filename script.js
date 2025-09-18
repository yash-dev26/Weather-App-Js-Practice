// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={c3d22219b19c5ffa5b956349821231b3
function renderWeather(city){
  let oldContent = document.querySelector(".weather-content");
  if (oldContent) oldContent.remove();
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c3d22219b19c5ffa5b956349821231b3`)
  .then((raw)=>raw.json())
  .then((data)=>{
    console.log(data);
    let weatherContent = document.createElement("div");
    weatherContent.classList.add("weather-content");

    let locationDiv = document.createElement("div");
    locationDiv.classList.add("location");
    locationDiv.textContent = `${data.name}, ${data.sys.country}`;
    weatherContent.appendChild(locationDiv);

   
    let unixTimestamp = data.dt; // API gives seconds
    let dateObj = new Date(unixTimestamp * 1000); 
    let formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let dateDiv = document.createElement("div");
    dateDiv.classList.add("date");
    dateDiv.textContent = formattedDate;
    weatherContent.appendChild(dateDiv);

    let weatheric = document.createElement("div");
    weatheric.classList.add("weather-icon");
    let weathericon =  document.createElement("img");
    weathericon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    weatheric.appendChild(weathericon);
    weatherContent.appendChild(weatheric);

    let temp = document.createElement("div");
    temp.classList.add("temperature");
    temp.textContent = `${data.main.temp} °C`;
    weatherContent.appendChild(temp);

    let weatherType = document.createElement("div");
    weatherType.classList.add("weather-description");
    weatherType.textContent = data.weather[0].main;
    weatherContent.appendChild(weatherType);

    let feelsdet =  document.createElement("div");
    feelsdet.classList.add("detail-label");
    feelsdet.textContent = "Feels like";
    let feelslike = document.createElement("div");
    feelslike.textContent = `${data.main.feels_like} °C`;
    feelslike.classList.add("detail-value");
    let FeelTemp = document.createElement("div");
    FeelTemp.classList.add("detail-item");
    FeelTemp.append(feelsdet);
    FeelTemp.append(feelslike);

    let humidityDet =  document.createElement("div");
    humidityDet.classList.add("detail-label");
    humidityDet.textContent = "Humidity";
    let humidityValue = document.createElement("div");
    humidityValue.textContent = `${data.main.humidity} %`;
    humidityValue.classList.add("detail-value");
    let Humidity = document.createElement("div");
    Humidity.classList.add("detail-item");
    Humidity.append(humidityDet);
    Humidity.append(humidityValue);

    let wind =  document.createElement("div");
    wind.classList.add("detail-label");
    wind.textContent = "Wind Speed";
    let windValue = document.createElement("div");
    windValue.textContent = `${data.wind.speed} m/s`;
    windValue.classList.add("detail-value");
    let Wind = document.createElement("div");
    Wind.classList.add("detail-item");
    Wind.append(wind);
    Wind.append(windValue);

    let pressure =  document.createElement("div");
    pressure.classList.add("detail-label");
    pressure.textContent = "Pressure";
    let pressureValue = document.createElement("div");
    pressureValue.textContent = `${data.main.pressure} hPa`;
    pressureValue.classList.add("detail-value");
    let Pressure = document.createElement("div");
    Pressure.classList.add("detail-item");
    Pressure.append(pressure);
    Pressure.append(pressureValue);

    let weatherDetails = document.createElement("div");
    weatherDetails.classList.add("weather-details");
    weatherDetails.append(FeelTemp);
    weatherDetails.append(Humidity);
    weatherDetails.append(Wind);
    weatherDetails.append(Pressure);
    weatherContent.appendChild(weatherDetails);

    document.querySelector(".weather-container").appendChild(weatherContent);
    })
    .catch((err)=>{
    console.log(err);
    let errMsg = document.createElement("div");
    errMsg.classList.add("weather-content");
    errMsg.textContent = "City not found";
    document.querySelector(".weather-container").appendChild(errMsg);
    });
}

renderWeather("delhi");
localStorage.setItem("cityName", "delhi");
let refreshBtn = document.querySelector(".refresh-btn");
refreshBtn.addEventListener("click", function(){
  renderWeather(localStorage.getItem("cityName"));
})
document.querySelector(".search-box")
.addEventListener("change", function(e){
  // console.log(e.target.value);
  renderWeather(e.target.value);
  localStorage.setItem("cityName", e.target.value);

});
