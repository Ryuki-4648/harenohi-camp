import React, { useEffect, useState } from "react";
import logo from "./logo01.png";
import "./App.css";
import axios from "axios";

interface WeatherData {
  city: string;
  date: string;
  year: string;
  month: string;
  day: string;
  temp: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  windSpeed: number;
  icon: string;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]); // 初期は空の配列
  const API_KEY = "5403a75c4ed202a7421597001decdcf9"; // 自分のAPIキー

  useEffect(() => {
    const placeArray = [
      { name: "ちくさ高原キャンプ場", lat: "35.22", lon: "134.39" },
      { name: "ふもとっぱら", lat: "35.40", lon: "138.56" },
      { name: "グリーンパーク山東", lat: "35.37", lon: "136.36" },
      {
        name: "キャンプアンドキャビンズ那須高原",
        lat: "37.02",
        lon: "140.03",
      },
      { name: "波戸岬キャンプ場", lat: "33.54", lon: "129.84" },
    ];

    const fetchData = async () => {
      const promises = placeArray.map(async (city) => {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&cnt=24&appid=${API_KEY}&units=metric`
        );
        // APIエンドポイントの応答は3時間ごとに区切られている。1回のリクエストで翌日からの5日間（120時間）取得できる。
        const data = res.data.list;
        const parsedData: WeatherData[] = [];
        console.log(data);

        data.forEach((item: any) => {
          const date = item.dt_txt.split(" ")[0]; // dt_txtの例 2022-08-30 15:00:00
          const hour = item.dt_txt.split(" ")[1];
          const year = date.split("-")[0];
          const month = date.split("-")[1];
          const day = date.split("-")[2];
          if (hour === "15:00:00") {
            parsedData.push({
              city: city.name,
              date: date,
              year: year,
              month: month,
              day: day,
              temp: Math.round(item.main.temp * 10) / 10,
              minTemp: Math.round(item.main.temp_min * 10) / 10,
              maxTemp: Math.round(item.main.temp_max * 10) / 10,
              humidity: item.main.humidity,
              windSpeed: item.wind.speed,
              icon: item.weather[0].icon,
            });
          }
        });
        //console.log(parsedData); // 各キャンプ場のオブジェクト
        return parsedData;
      });

      const result = await Promise.all(promises);
      const mergedData: WeatherData[] = result.flat(); // flatメソッド すべてのサブ配列の要素を、指定した深さで再帰的に結合した新しい配列を生成
      setWeatherData(mergedData);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="px-10 pt-4">
        <a
          className="fixed inline-block w-40"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} className="w-40" alt="ハレノヒキャンプのロゴ" />
        </a>
      </header>

      <p className="text-vertical fixed right-8 top-16 text-3xl uppercase tracking-wider">
        Enjoy camping in sunny day!
      </p>

      <img
        src="./dummy01.png"
        alt="キャンプの写真"
        className="align-center mx-auto mb-20 w-3/5"
      />
      <h1 className="mb-6 text-center text-5xl">ハレノヒキャンプ</h1>
      <p className="mb-32 text-center">晴れの日、どこでキャンプする？</p>
      <div className="mx-auto w-11/12 lg:w-3/4">
        <div className="flex flex-wrap">
          {weatherData.map((data, index) => (
            <div
              key={index}
              className="mx-auto mb-12 w-full sm:w-1/2 md:mb-36 md:w-1/3"
            >
              {index === 0 || data.city !== weatherData[index - 1].city ? (
                <h2 className="-mt-16 mb-8 text-xl font-semibold lg:text-2xl">
                  {data.city}
                </h2>
              ) : null}
              <p className="text-xl">
                {data.month}月{data.day}日
              </p>
              <img
                src={`http://openweathermap.org/img/w/${data.icon}.png`}
                alt="天気のマーク"
                className="w-40"
              />
              {/* <p className="text-md mb-2">最低気温: {data.minTemp}℃</p>
              <p className="text-md mb-2">最高気温: {data.maxTemp}℃</p> */}
              <p className="text-md mb-2">気温: {data.temp}℃</p>
              <p className="text-md mb-2">湿度: {data.humidity}%</p>
              <p className="text-md">風速: {data.windSpeed}m/s</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
