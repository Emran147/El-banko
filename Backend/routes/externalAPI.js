const axios = require("axios");

const getWeather = async function getWeather(city) {
  try {
    const externalAPIURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e3e7b1a1cf3ee568ce5f852c69c0c90d&units=imperial`
    const response = await axios.get(externalAPIURL);
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}

module.exports = {
  getWeather,
}