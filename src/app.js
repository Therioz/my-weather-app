import config from "../config.js";

const weatherInfo = document.getElementById("weather-info");
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", fetchWeather);

async function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    console.warn("Empty city input");
    weatherInfo.innerHTML =
      '<p class="text-yellow-500">Please enter a city name</p>';
    return;
  }

  console.log("Fetching weather for:", city);

  try {
    const response = await fetch(
      // `${config.API_BASE_URL}/weather?q=${city}&appid=${config.API_KEY}&units=metric`
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.API_KEY}&units=metric`
    );
    const data = await response.json();

    if (response.ok) {
      displayWeather(data);
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error details:", error);
    if (error instanceof TypeError) {
      console.error("Network error: Check your internet connection");
    } else if (error.message.includes("404")) {
      console.error("City not found");
    } else {
      console.error("Unknown error occurred");
    }
    weatherInfo.innerHTML = `<p class="text-red-500">${error.message}</p>`;
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;
  const temperature = main.temp.toFixed(1);
  const description = weather[0].description;
  const icon = weather[0].icon;

  weatherInfo.innerHTML = `
        <h2 class="text-2xl font-semibold mb-2">${name}</h2>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="mx-auto">
        <p class="text-4xl font-bold mb-2">${temperature}°C</p>
        <p class="text-lg capitalize">${description}</p>
    `;
}
