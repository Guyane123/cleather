import useWeather from "../utils/useWeather";
import "../styles/Pages/Home.css";
import { ReactNode } from "react";
import React from "react";

const Panel1 = ({ weather, logo }: { weather: any; logo: string }) => {
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
    const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
    ];
    const numberOfDays = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        0
    ).getDate();

    const rowsDaysOfWeeks = days.map((el) => <th>{el}</th>);
    const rowsDaysOfMonths: Array<ReactNode> = [];
    for (let i = 0; i < numberOfDays; i++) {
        if (i / 7 == 1 || i / 7 == 2 || i / 7 == 3 || i / 7 == 4) {
            rowsDaysOfMonths.push(<tr></tr>)
            if (i == new Date().getDate()) {
                rowsDaysOfMonths.push(<td className="today">{i}</td>);
            } else {
                rowsDaysOfMonths.push(<td>{i}</td>);
            }
        }
        if (i == new Date().getDate()) {
            rowsDaysOfMonths.push(<td className="today">{i}</td>);
        } else {
            rowsDaysOfMonths.push(<td>{i}</td>);
        }
    }
    // rowsDaysOfMonths.map((el: ReactNode, k: number) => {
    //     if (k / 7 == 1 || k / 7 == 2 || k / 7 == 3 || k / 7 == 4) {
    //         rowsDaysOfMonths
    //     }
    // })

    return (
        <div>
            <h2>{head}</h2>
            <table>
                <thead>
                    <tr>{rowsDaysOfWeeks}</tr>
                </thead>
                <tbody>
                    {rowsDaysOfMonths}</tbody>
            </table>
        </div>
    );
};

class Panel2 extends React.Component<unknown, unknown> {
    day: string | number;
    Date: Date;
    date: number;
    month: number | string;
    hours: number;
    betterHours: any;
    minutes: number;

    constructor(props: unknown) {
        super(props);
        this.Date = new Date();
        this.day = this.getDayString();
        this.date = this.Date.getDate();
        this.month = this.getMonthString();
        this.hours = new Date().getHours();
        this.betterHours = this.hours >= 12 ? this.hours - 12 : this.hours;
        this.minutes = new Date().getMinutes();
    }

    getDayString(): string | number {
        switch (this.Date.getDay()) {
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            case 7:
                return "Sunday";
            default:
                return this.day;
        }
    }
    getMonthString(): string | number {
        switch (this.Date.getMonth()) {
            case 1:
                return "January";
            case 2:
                return "February";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "October";
            case 11:
                return "November";
            case 12:
                return "December";
            default:
                return this.Date.getMonth();
        }
    }

    render(): ReactNode {
        return (
            <div className="date-wrapper">
                <div className="calendar">
                    <Calendar
                        head={`${this.month} ${this.Date.getFullYear()}`}
                    />
                </div>
                <div className="date">
                    <span>
                        {this.day + " "}
                        {this.date + " "}
                        {this.month + " "}
                        {this.Date.getFullYear() + " "}
                    </span>
                    <span className="hours">
                        {this.betterHours}:
                        {this.minutes >= 10 ? this.minutes : "0" + this.minutes}
                        {this.hours >= 12 ? "PM" : "AM"}
                    </span>
                </div>
            </div>
        );
    }
}

const Home = () => {
    const apiKey = "4339a532a86b4eb800539bc7d239a0ad";
    const location = "Plouay";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    const weather: any = useWeather(url);
    // console.log(weather.weather[0].icon)
    if (weather) {
        const urlLogo = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

        return (
            <div className="Weather">
                <div className="Panel1-container">
                    <Panel1 weather={weather} logo={urlLogo} />
                </div>
                <div className="weather-2">
                    <Panel2 />
                    <Panel2 />
                </div>
            </div>
        );
    } else {
        <h2>Recherche....</h2>;
    }
};

export default Home;
