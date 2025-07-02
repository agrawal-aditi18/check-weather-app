document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-messag");

  const API_KEY = "your-api-key"; //Usually stored secretly using environment variables
  //API Key provided to u that u only can make request
  //API key — like a secret password that gives you access to weather data from the OpenWeather website.

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return; //empty string considered as false value if user type empty str return
    //Now , if we have city we make web request

    //  Whenever u r making web request to any server or tu the database 2 things to remember---->
    // 1. the server may throw u some an error so use try catch
    // 2. server/database is always in another continent means it tooks some time not immediate response (ms/s)

    try {
      //fetchWeatherData use to fetch the weather data of the city enetred and the response will not immediate as told in point 2 so u have to wait a little- using await so the func needs to be async
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    //🟢 This function takes the city and makes a request to the OpenWeather API.
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`; //City and the api key is passed in this url
    //🟢 This is the link (URL) we will send to get the weather info.
    // q=${city} adds the city name into the URL
    // units=metric gives temperature in Celsius
    // appid=${API_KEY} adds your unique API key
    // 📌 This is how we pass data in the URL (query parameters).

    const response = await fetch(url); //🟢 fetch() sends the web request to the API.
    console.log(typeof response); //object
    console.log("RESPONSE", response); //promise
    //here u can handle the promise using .then and catch or by using await
    // i will await till the promise is fullfilled nd then give me the response becz initially the promise is in pending stage
    if (!response.ok) {
      throw new Error(" City Not found"); //we manually throw an error to stop and go to the catch block.
    }
    const data = await response.json();

    return data;
  }

  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data; //main is and obj and weather is an array
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    //unlock the display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
});
