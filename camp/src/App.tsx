import React, { useEffect, useState } from "react";
import logo from "./logo01.png";
import "./App.css";
import axios from "axios";

interface WeatherData {
  city: string;
  date: string;
  minTemp: number;
  maxTemp: number;
  icon: string;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const API_KEY = "5403a75c4ed202a7421597001decdcf9";
  const placeArray = [
    { name: "Kobe", lat: "34.69", lon: "135.19" },
    { name: "Tokyo", lat: "35.69", lon: "139.69" },
    { name: "Kyoto", lat: "35.01", lon: "135.75" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const promises = placeArray.map(async (city) => {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`
        );
        const data = res.data.list;
        const parsedData: WeatherData[] = [];

        data.forEach((item: any) => {
          const date = item.dt_txt.split(" ")[0];
          const hour = item.dt_txt.split(" ")[1];
          if (hour === "12:00:00") {
            parsedData.push({
              city: city.name,
              date: date,
              minTemp: item.main.temp_min,
              maxTemp: item.main.temp_max,
              icon: item.weather[0].icon,
            });
          }
        });

        return parsedData;
      });

      const result = await Promise.all(promises);
      const mergedData: WeatherData[] = result.flat();
      setWeatherData(mergedData);
    };

    fetchData();
  }, []);

  return (
    <div className="App bg-co">
      <header className="">
        <a
          className="inline-block w-40"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} className="w-40" alt="logo" />
        </a>
      </header>

      <h1 className="text-center text-4xl">ハレノヒキャンプ</h1>
      <div className="text-center">
        <p>週末どこでキャンプしよう？</p>
      </div>

      <div>
        {weatherData.map((data, index) => (
          <div key={index}>
            <h2 className="text-xl">{data.city}</h2>
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
