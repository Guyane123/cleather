import weatherType from "../utils/types";
import "../styles/Pages/Home.css";
import {
    ChangeEvent,
    FormEvent,
    ReactNode,
    Suspense,
    createRef,
    useEffect,
    useState,
} from "react";
import React from "react";
import franceCity from "../assets/fr.json";
function $(el: string): HTMLElement | null {
    const element = document.querySelector(`${el}`);
    if (element) {
        return document.querySelector(el) as HTMLElement;
    } else {
        throw new Error("Error, this element does not exist : " + el);
        return null;
    }
}

interface city {
    city: string;
}
const france = franceCity as Array<city>;

const capitalize = (val: string) => {
    const chars = val.split("")

    const newArr = chars.map((el, k) => {
        if (el === " ") {
            console.log(el)
            return '-';
        }
        if (k == 0) {
            return el.toUpperCase()
        }
        if (chars[k - 1] == " ") {
            return el.toUpperCase()
        }
        return el
    })


    return newArr.join("");
};

const SearchBar = ({ onSearch }: { onSearch: (value: string) => void }) => {

    const searchBar = createRef<HTMLDivElement>()

    const [suggestItems, setSuggestItems] = useState<ReactNode[]>([]);
    const [value, setValue] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        suggestFunc();
    };

    const cities: Array<string> = [];
    const suggest = createRef<HTMLDivElement>();
    const input = createRef<HTMLInputElement>();
    let element: string;

    function handleWindowClick() {
            if (input.current == document.activeElement) {
                suggest.current?.classList.remove("hidden");
            } else {
                suggest.current?.classList.add("hidden");
            }
    }

    useEffect(() => {
        window.addEventListener("click", handleWindowClick)

        return () => {
            window.removeEventListener("click", handleWindowClick)
        }
    })


    function suggestFunc() {
        if (input.current == document.activeElement) {
            if (cities.length >= 5) {
                for (let i = 0; i <= 5; i++) {
                    cities.pop();
                }
            } else {
                france.filter((el) => {
                    if (
                        el.city.toLowerCase().indexOf(value.toLowerCase()) ===
                        -1
                    ) {
                        return;
                    }
                    element = el.city;
                    cities.push(element);
                });

                setSuggestItems(cities.slice(0, 5));
            }
        }
    }

    const handleLiClick = (val: string) => {
        setValue(val);
        onSearch(val);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <div className="searchBar" onClick={suggestFunc} ref={searchBar}>
            <form onSubmit={handleSubmit} className="searchBar--wrapper">
                <button onClick={() => onSearch(value)}>
                    <span className="material-symbols-outlined">search</span>
                </button>
                <input
                    value={value}
                    ref={input}
                    type="text"
                    placeholder="search.."
                    onChange={handleChange}
                />
                <button onClick={() => setValue("")}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </form>
            <div ref={suggest} className="suggest hidden">
                <ul className="suggest-list">
                    <hr />
                    {suggestItems.map((el, k) => {
                        return (
                            <li
                                onClick={() =>
                                    handleLiClick(el ? el.toString() : "")
                                }
                                key={k}
                            >
                                <span className="material-symbols-outlined">
                                    search
                                </span>
                                {el}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

const Panel1 = ({
    weather,
    logo,
}: {
    weather: weatherType | null;
    logo: string;
}) => {
    console.log(weather);
    console.log(new Date());
    return (
        <>
            <div className="Panel1">
                <div>
                    <div>
                        <h2>Current Weather</h2>
                        <h4>
                            {new Date().toLocaleTimeString("en-us", {
                                minute: "2-digit",
                                hour: "2-digit",
                            })}
                        </h4>
                    </div>
                    <div className="Emoji">
                        <img src={logo} alt="Current weather logo" />
                        <span>
                            <span className="temp">
                                {weather
                                    ? weather.main != undefined
                                        ? weather.main.temp
                                        : "Lorem Ipsum"
                                    : "Lorem Ipsum"}
                                °
                            </span>
                            <span>C</span>
                        </span>
                    </div>
                    <h2>
                        { weather ? weather.weather != undefined ? weather.weather[0].description + " in " + weather.name : "Lorem Ipsum" : "Lorem Ipsum"}
                    </h2>
                </div>
                <div>
                    <h2>
                        Feels like{" "}
                        <span>
                            {weather
                                ? weather.main != undefined
                                    ? weather.main.feels_like
                                    : "Lorem Ipsum"
                                : "Lorem Ipsum"}
                            °C
                        </span>
                    </h2>
                    <hr />
                    <h2>
                        Wind{" "}
                        {weather
                            ? weather.wind != undefined
                                ? weather.wind.speed
                                : "Lorem Ipsum"
                            : "Lorem Ipsum"}
                        km/h
                    </h2>
                    <hr />
                    <h2>
                        Humidity{" "}
                        {weather
                            ? weather.main != undefined
                                ? weather.main.humidity
                                : "Lorem Ipsum"
                            : "Lorem Ipsum"}
                        %
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

function Fallback() {
    return <div>Wainting...</div>;
}

const Home = () => {
    const [location, setLocation] = useState("Paris");
    const apiKey = "4339a532a86b4eb800539bc7d239a0ad";
    const [URL, setURL] = useState(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    );
    const [currentWeather, setWeather] = useState<weatherType | null>(null);

    useEffect(() => {
        console.log(URL);
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                const data = await response.json();
                setWeather(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setWeather(null);
            }
        };

        fetchData();
    }, [URL]);

    function onSearch(value: string) {
        setLocation(value);
        setURL(
            `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${apiKey}`
        );
    }

    const urlLogo = `https://openweathermap.org/img/wn/${
        currentWeather == null
            ? "02d"
            : Array.isArray(currentWeather.weather)
            ? currentWeather.weather.length == 0
                ? currentWeather.weather[0].icon
                : "02d"
            : "02d"
    }@2x.png`;
    return (
        <Suspense fallback={<Fallback />}>
            <div className="Weather">
                <SearchBar onSearch={onSearch} />
                <div className="Panel1-container">
                    <Panel1
                        weather={currentWeather ? currentWeather : null}
                        logo={urlLogo}
                    />
                </div>
                <div className="weather-2">
                    <Panel2 />
                    <Panel3 location={location} />
                </div>
            </div>
        </Suspense>
    );
};

export default Home;
