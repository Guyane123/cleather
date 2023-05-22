import React, { memo, useState } from "react";
import Temperature from "../components/Temperature";
import Location from "../components/Location";
import Weather from "../components/Weather";
import "../styles/pages/Home.css";

function getWeatherData(location) {
    const apiKey = "4339a532a86b4eb800539bc7d239a0ad";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const weatherData = {
                temperature: data.main.temp,
                condition: data.weather[0].main,
                location: data.name,
            };
            console.log(weatherData);
            return weatherData;
        });
}

const Home = memo(() => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let currentDate =
        "Nous sommes le " +
        `${day}-${month}-${year}` +
        ". Il est " +
        `${hours}` +
        "h" +
        `${minutes}`;
    console.log(currentDate);

    const [weatherData, setWeatherData] = useState(null);

    function handleInputChange(e) {
        console.log(e.target.value);
    }

    async function handleClick(e) {
        e.preventDefault();
        let value = document.getElementById("input").value;
        const data = await getWeatherData(value);
        setWeatherData(data);
        value = "";
    }

    return (
        <div className="Home">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossorigin
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap"
                rel="stylesheet"
            ></link>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            ></link>
            <form>
                <input
                    id="input"
                    type="text"
                    placeholder="Search.."
                    onChange={handleInputChange}
                    name="search"
                />
                <button onClick={handleClick}>
                    <i className="fa fa-search"></i>
                </button>
            </form>
            <div className="info">
                <div className="weather">
                    <Weather weatherData={weatherData} />
                    <br />
                    <br />
                    <br />
                    <br />
                    <Temperature weatherData={weatherData} />
                </div>
                <div className="date">{currentDate}</div>
                <div className="location">
                    <Location weatherData={weatherData} />
                </div>
            </div>
        </div>
    );
});

const defaultWeather = getWeatherData("Paris");
console.log(defaultWeather);
export { Home, defaultWeather };
