import useWeather from "../utils/useWeather";
import "../styles/Pages/Home.css";

const Panel1 = ({weather}: {weather: any}) => {
    return (
        <>
            <div className="Panel1">
                <div>
                    <div>
                        <h2>Current Weather</h2>
                        <h4>2:34 PM</h4>
                    </div>
                    <div className="Emoji">
                        <div className="img">
                            {weather ? weather.temp == "cloudy" ?  "☁️" : weather.temp == "sunny" ? "🌞" : "🌕": "☁️"}
                        </div>
                        <span>
                            <span className="temp">{weather ? weather.temp : "20"}°</span>
                            <span>C</span>
                        </span>
                    </div>
                    <h2>{ weather ? weather.temp : "Cloudy"}</h2>
                </div>
                <div>
                    <h2>
                        Feels like: <span>{weather ? weather.feels_like : "20"}°</span>
                    </h2>
                    <hr />
                    <h2>
                        Wind 20KM/h
                    </h2>
                    <hr />
                </div>
            </div>
        </>
    );
};

const Home = () => {
    const weather = useWeather();

    return (
        <div className="Weather">
            <Panel1 weather={ weather } />
        </div>
    );
};

export default Home;
