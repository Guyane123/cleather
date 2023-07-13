import { useState, useEffect } from "react";

function useWeather() {
  const [weather, setWeather] = useState(null);
  console.log("get weather")


  const fetchData = async () => {
    const apiKey = "4339a532a86b4eb800539bc7d239a0ad";
    const location = "Plouay";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      const weatherData = await response.json();
      setWeather(weatherData.main);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return weather;
}

export default useWeather;
