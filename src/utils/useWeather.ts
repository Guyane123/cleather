import { useState } from 'react';
import weatherType from './types';




/**
 * Get the fetched info
 * @date 7/13/2023 - 4:36:51 PM
 *
 * @param {string} url
 * @returns {*}
 */
function useWeather(url: string): weatherType {
  const [weather, setWeather] = useState<weatherType>();


  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const weatherData = await response.json();
      setWeather(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  fetchData();

  return weather as weatherType
}

export default useWeather;
