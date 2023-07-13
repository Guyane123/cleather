import { useState, useEffect } from "react";




/**
 * Get the fetched info
 * @date 7/13/2023 - 4:36:51 PM
 *
 * @param {string} url
 * @returns {*}
 */
function useWeather(url: string) {
  const [weather, setWeather] = useState(null);


  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const weatherData = await response.json();
      setWeather(weatherData);
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
