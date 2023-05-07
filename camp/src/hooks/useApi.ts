import axios from "axios";
import { useEffect, useState } from "react";

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
}

export const fetchWeatherData = async (
  placeArray: {
    name: string;
    lat: string;
    lon: string;
  }[]
) => {
  const API_KEY = "5403a75c4ed202a7421597001decdcf9"; // 自分のAPIキー
  const promises = placeArray.map(async (city) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&cnt=24&appid=${API_KEY}&units=metric`
    );
    const data = res.data.list;
    const parsedData: WeatherData[] = [];
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
          icon: item.weather[0].icon.replace("n", "d"),
          description: item.weather[0].description,
        });
      }
    });
    return parsedData;
  });
  const result = await Promise.all(promises);
  return result;
};
