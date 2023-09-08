import axios from "axios";
import { useEffect, useState } from "react";
import placeList from "../data/placeList.json";

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
  description: string;
  url: string;
  pref: string;
}

export const UsePlaceHooks = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]); // 初期は空の配列
  const API_KEY = "5403a75c4ed202a7421597001decdcf9"; // 自分のAPIキー
  useEffect(() => {
    if (!API_KEY) {
      console.error("APIキーが設定されていません。");
      return;
    }
    const placeArray = placeList;

    const fetchData = async () => {
      try {
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
            const month = parseInt(date.split("-")[1], 10).toString();
            const day = parseInt(date.split("-")[2]).toString();
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
                icon: item.weather[0].icon.replace("n", "d"),
                description: item.weather[0].description,
                url: city.url,
                pref: city.pref,
              });
            }
          });
          //console.log(parsedData); // 各キャンプ場のオブジェクト
          return parsedData;
        });

        const result = await Promise.all(promises);
        const mergedData: WeatherData[] = result.flat(); // flatメソッド すべてのサブ配列の要素を、指定した深さで再帰的に結合した新しい配列を生成
        setWeatherData(mergedData);
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
      }
    };

    fetchData();
  }, []);

  return { weatherData };
};
