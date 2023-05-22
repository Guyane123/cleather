import React, { memo, useState } from "react";
import { defaultWeather } from "../pages/Home";

const Weather = memo(({ weatherData }) => {
    defaultWeather.then((data) => {
        setWeather({
            condition: data.condition,
            temp: data.temperature,
            location: data.location,
        });
    });
    const [weather, setWeather] = useState("?");
    if (!weatherData) return weather.condition;

    const { condition } = weatherData;

    return <div className="components">{condition}</div>;
});

export default Weather;
