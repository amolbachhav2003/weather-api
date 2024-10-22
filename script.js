document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "5938991ca3585919457c1147d4370f6d";

  getWeatherBtn,addEventListener("click", async() => {
      const cityName = cityInput.value.trim();
      cityInput.value = "";
      if(!cityName) return;

      try {
        const cityDetails = await fetchCityDetails(cityName);
        displayCityDetails(cityDetails);
      } catch (error) {
        showError();
      }
      
  })

  async function fetchCityDetails(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    
    const response = await fetch(url);

    if(!response.ok){
      throw new Error("City not found");
    }

    console.log(response);

    const data = await response.json();
    console.log(data);
    
    return data;
  }

  function displayCityDetails(cityDetails) {

    const {name, main, weather} = cityDetails;

    weatherInfo.classList.remove("hidden")

    cityNameDisplay.textContent = `City: ${name}`;
    temperatureDisplay.textContent = `Temperature: ${main.temp}`;
    descriptionDisplay.textContent = `Weather: ${weather[0].main}`;
    errorMessage.classList.add("hidden");
     
  }

  function showError() {
    errorMessage.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
  }

})

