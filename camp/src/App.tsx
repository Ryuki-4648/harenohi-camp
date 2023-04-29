import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// ふもとっぱらキャンプ場、グリーンパーク山東、若杉高原おおやキャンプ場

interface WeatherData {
  date: string;
  minTemp: number;
  maxTemp: number;
  icon: string;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const API_KEY = "5403a75c4ed202a7421597001decdcf9"; // 自分のAPIキー
  const CITY = "Kobe";

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`
      );
      console.log(res);
      const data = res.data.list;
      const parsedData: WeatherData[] = [];

      data.forEach((item: any) => {
        const date = item.dt_txt.split(" ")[0];

        console.log(data);
        const hour = item.dt_txt.split(" ")[1];
        if (hour === "12:00:00") {
          parsedData.push({
            date: date,
            minTemp: item.main.temp_min,
            maxTemp: item.main.temp_max,
            icon: item.weather[0].icon,
          });
        }
      });

      setWeatherData(parsedData);
    };

    fetchData();
  }, []);

  return (
    <div className="App bg-co">
      <header className="">
        <a className="" href="/" target="_blank" rel="noopener noreferrer">
          <img src={logo} className="w-24" alt="logo" />
        </a>
      </header>

      <h1 className="text-center text-4xl">ハレノヒキャンプ</h1>
      <div className="text-center">
        <p>週末どこでキャンプしよう？</p>
      </div>

      <div>
        {weatherData.map((data, index) => (
          <div key={index}>
            <p>{data.date}</p>
            <img
              src={`http://openweathermap.org/img/w/${data.icon}.png`}
              alt="weather icon"
            />
            <p>最低気温: {data.minTemp}℃</p>
            <p>最高気温: {data.maxTemp}℃</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
