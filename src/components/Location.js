import React, { memo, useState } from "react";
import { defaultWeather } from "../pages/Home";

const Location = memo(({ weatherData }) => {
    defaultWeather.then((data) => {
        setWeather({
            condition: data.condition,
            temp: data.temperature,
            location: data.location,
        });
    });
    const [weather, setWeather] = useState("?");
    if (!weatherData) return weather.location;

    const { location } = weatherData;

    return <div className="components">{location}</div>;
});

export default Location;
