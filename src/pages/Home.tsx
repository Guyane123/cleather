import useWeather from "../utils/useWeather";
import weatherType from '../utils/types';
import "../styles/Pages/Home.css";
import {
    ChangeEvent,
    ReactNode,
    createRef,
    useEffect,
    useState,
} from "react";
import React from "react";
import fr from "../assets/fr.json";
import { Dispatch, SetStateAction } from 'react';


interface SearchBarType {
    onSearch: Dispatch<SetStateAction<weatherType>>,
    location: string,
    onLocationChange: Dispatch<SetStateAction<string>>,
    URL: string,
    onURLChange: Dispatch<SetStateAction<string>>,
    apiKey: string
}

const SearchBar = ({onSearch, location, onLocationChange, URL, onURLChange, apiKey}: SearchBarType) => {
    const [suggestItems, setSuggestItems] = useState<ReactNode[]>([]);
    const [value, setValue] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        suggestFunc();
    };

    function search() {
        onLocationChange(value)
        onURLChange(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)

        // eslint-disable-next-line react-hooks/rules-of-hooks
        onSearch(useWeather(URL))
    }

    const cities: Array<string> = [];
    const suggest = createRef<HTMLDivElement>();
    const input = createRef<HTMLInputElement>();
    let element: string;

    window.addEventListener("click", () => {
        if (input.current == document.activeElement) { 
            suggest.current?.classList.remove("hidden");
        } else {
            suggest.current?.classList.add("hidden");
        }
    })


    function suggestFunc() {
        if (input.current == document.activeElement) {
            // if (p.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            //     return;
            // }
            if (cities.length >= 5) {
                for (let i = 0; i <= 5; i++) {
                    cities.pop();
                }
            } else {
                fr.filter((el) => {
                    if (
                        el.city.toLowerCase().indexOf(value.toLowerCase()) ===
                        -1
                    ) {
                        return;
                    }
                    element = el.city;
                    cities.push(element);
                });
                
                setSuggestItems(cities.slice(0,5));
            }
        }
    }

    const handleClick = () => {
        suggestFunc();
    };
    const handleLiClick = (val: string) => {
        setValue(val)
        search()
    }
    return (
        <div className="searchBar" onClick={handleClick}>
            <input
                ref={input}
                type="text"
                placeholder="search.."
                onChange={handleChange}
            />
            <button onClick={search}>Click me !</button>
            <div ref={suggest} className="suggest hidden">
                <ul className="suggest-list">
                    {suggestItems.map((el, k) => {
                        return <li onClick={() => handleLiClick(el? el.toString() : "")} key={k}>{el}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
};

const Panel1 = ({ weather, logo }: { weather: weatherType; logo: string }) => {
    console.log(weather);

    const hours = new Date().getHours();
    const betterHours = hours >= 12 ? hours - 12 : hours;
    const minutes = new Date().getMinutes();

    console.log(new Date());
    return (
        <>
            <div className="Panel1">
                <div>
                    <div>
                        <h2>Current Weather</h2>
                        <h4>
                            {betterHours}:
                            {minutes >= 10 ? minutes : "0" + minutes}
                            {hours >= 12 ? "PM" : "AM"}
                        </h4>
                    </div>
                    <div className="Emoji">
                        <img src={logo} alt="Current weather logo" />
                        <span>
                            <span className="temp">
                                {weather ? weather.main.temp : "20"}°
                            </span>
                            <span>C</span>
                        </span>
                    </div>
                    <h2>
                        {weather ? weather.weather[0].description : "Cloudy"}
                    </h2>
                </div>
                <div>
                    <h2>
                        Feels like{" "}
                        <span>
                            {weather ? weather.main.feels_like : "20"}°C
                        </span>
                    </h2>
                    <hr />
                    <h2>
                        Wind {weather ? weather.wind.speed + "km/h" : "20km/h"}
                    </h2>
                    <hr />
                    <h2>
                        Humidity {weather ? weather.main.humidity + "%" : "50%"}
                    </h2>
                    <hr />
                </div>
            </div>
        </>
    );
};

const Calendar = ({ head }: { head: string }) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const numberOfDays = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        0
    ).getDate();

    const rowsDaysOfWeeks = days.map((el, k) => <th key={k}>{el}</th>);

    // TODO: Redo this dirty thing
    const rowsDaysOfMonths1: Array<ReactNode> = [];
    const rowsDaysOfMonths2: Array<ReactNode> = [];
    const rowsDaysOfMonths3: Array<ReactNode> = [];
    const rowsDaysOfMonths4: Array<ReactNode> = [];
    const rowsDaysOfMonths5: Array<ReactNode> = [];
    const DaysOfMonthsArray: Array<number> = [];

    for (let index = 0; index <= numberOfDays; index++) {
        DaysOfMonthsArray.push(index);
    }
    DaysOfMonthsArray.map((k) => {
        if (k < 7) {
            rowsDaysOfMonths1.push(
                <td className={"k" + k.toString()} key={k}>
                    {k}
                </td>
            );
        } else if (k > 7 && k <= 14) {
            rowsDaysOfMonths2.push(
                <td className={"k" + k.toString()} key={k}>
                    {k}
                </td>
            );
        } else if (k > 14 && k <= 21) {
            rowsDaysOfMonths3.push(
                <td className={"k" + k.toString()} key={k}>
                    {k}
                </td>
            );
        } else if (k > 21 && k <= 28) {
            rowsDaysOfMonths4.push(
                <td className={"k" + k.toString()} key={k}>
                    {k}
                </td>
            );
        } else if (k > 28 && k <= 35) {
            rowsDaysOfMonths5.push(
                <td className={"k" + k.toString()} key={k}>
                    {k}
                </td>
            );
        }
    });

    useEffect(() => {
        ($(`.k${new Date().getDate()}`) as HTMLElement).style.backgroundColor =
            "green";
    }, []);
    function $(el: string): HTMLElement | null {
        const element = document.querySelector(`${el}`);
        if (element) {
            return document.querySelector(el) as HTMLElement;
        } else {
            throw new Error("Error, this element does not exist : " + el);
            return null;
        }
    }

    return (
        <div>
            <h2>{head}</h2>
            <table>
                <thead>
                    <tr>{rowsDaysOfWeeks}</tr>
                </thead>
                <tbody>
                    <tr>{rowsDaysOfMonths1}</tr>
                    <tr>{rowsDaysOfMonths2}</tr>
                    <tr>{rowsDaysOfMonths3}</tr>
                    <tr>{rowsDaysOfMonths4}</tr>
                    <tr>{rowsDaysOfMonths5}</tr>
                </tbody>
            </table>
        </div>
    );
};

class Panel2 extends React.Component<unknown, unknown> {
    Date: Date;
    date: number;

    constructor(props: unknown) {
        super(props);
        this.Date = new Date();
        this.date = this.Date.getDate();
    }

    render(): ReactNode {
        return (
            <div className="date-wrapper">
                <div className="calendar">
                    <Calendar
                        head={`${this.Date.toLocaleDateString("en-us", {
                            month: "long",
                        })} ${this.Date.getFullYear()}`}
                    />
                </div>
                <div className="date">
                    <span>
                        {this.Date.toLocaleDateString("en-us", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                    <span className="hours">
                        {this.Date.toLocaleTimeString("en-us", {
                            minute: "2-digit",
                            hour: "2-digit",
                        })}
                    </span>
                </div>
            </div>
        );
    }
}

const Panel3 = ({ location }: { location: string }) => {
    return (
        <div className="location">
            <iframe
                src={`https://www.google.com/maps/embed/v1/place?q=${location}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
            ></iframe>
        </div>
    );
};

const Home = () => {
    const apiKey = "4339a532a86b4eb800539bc7d239a0ad";
    const [location, setLocation] = useState("Paris")
    const [URL, setURL] = useState(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
    const [weather, setWeather] = useState<weatherType>(useWeather(URL as string));

    if (weather) {
        const weather2 = weather as weatherType;
        const urlLogo = `https://openweathermap.org/img/wn/${weather2.weather[0].icon}@2x.png`;
        return (
            <div className="Weather">
                <SearchBar location={location} apiKey={apiKey} onLocationChange={setLocation} URL={URL} onURLChange={setURL} onSearch={ setWeather } />
                <div className="Panel1-container">
                    <Panel1 weather={weather} logo={urlLogo} />
                </div>
                <div className="weather-2">
                    <Panel2 />
                    <Panel3 location={location} />
                </div>
            </div>
        );
    } else {
        <h2>Recherche....</h2>;
    }
};

export default Home;
