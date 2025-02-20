require("dotenv").config();

const apiKey = process.env.API_KEY;
const weatherInfo = document.getElementById("weatherInfo");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", fetchWeather);

async function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (response.ok) {
      displayWeather(data);
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
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
