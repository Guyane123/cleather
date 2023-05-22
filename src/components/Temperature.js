import React, { memo, useState } from "react";
import { defaultWeather } from "../pages/Home";

const Temperature = memo(({ weatherData }) => {
    defaultWeather.then((data) => {
        setWeather({
            condition: data.condition,
            temp: data.temperature,
            location: data.location,
        });
    });
    const [weather, setWeather] = useState("?");
    if (!weatherData) return weather.temp + " °C";
    const { temperature } = weatherData;

    return <div className="components">{temperature}&deg;C</div>;
});

export default Temperature;
