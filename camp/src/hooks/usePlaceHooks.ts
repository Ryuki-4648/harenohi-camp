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
  url: string;
  pref: string;
}

export const UsePlaceHooks = async (
  placeArray: {
    name: string;
    lat: string;
    lon: string;
    url: string;
    pref: string;
  }[]
) => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]); // 初期は空の配列
  useEffect(() => {
    const API_KEY = "5403a75c4ed202a7421597001decdcf9"; // 自分のAPIキー
    const placeArray = [
      {
        name: "ちくさ高原キャンプ場",
        lat: "35.213928645135276",
        lon: "134.39454838053783",
        url: "https://www.chikusakogen.com/camp/",
        pref: "兵庫県",
      },
      {
        name: "ふもとっぱら",
        lat: "35.39956791766412",
        lon: "138.56543427632667",
        url: "https://fumotoppara.net/",
        pref: "静岡県",
      },
      {
        name: "グリーンパーク山東",
        lat: "35.372537239674585",
        lon: "136.36280647555668",
        url: "https://greenpark-santo.com/",
        pref: "滋賀県",
      },
      {
        name: "キャンプ&キャビンズ那須高原",
        lat: "37.02167152623438",
        lon: "140.03795686501616",
        url: "https://www.camp-cabins.com/",
        pref: "栃木県",
      },
      {
        name: "波戸岬キャンプ場",
        lat: "33.54586668534841",
        lon: "129.84982006645023",
        url: "https://www.hadomisaki-camp.jp/",
        pref: "福岡県",
      },
      {
        name: "南光自然観察村",
        lat: "35.08804021719414",
        lon: "134.42928509773049",
        url: "https://www.nanko-camp.com/",
        pref: "兵庫県",
      },
      {
        name: "CAMP Knot",
        lat: "33.555089876626084",
        lon: "135.48284925800436",
        url: "https://campknot.com/",
        pref: "和歌山県",
      },
      {
        name: "焚き火キャンプ場 士別ペコラ",
        lat: "44.15974418849687",
        lon: "142.40465831811127",
        url: "https://pecora.jp/camp/",
        pref: "北海道",
      },
      {
        name: "奥八女焚火の森キャンプフィールド",
        lat: "33.22450883083387",
        lon: "130.73685886221665",
        url: "https://www.takibinomori.com/",
        pref: "福岡県",
      },
      {
        name: "長崎鼻ビーチリゾート",
        lat: "33.68128749845433",
        lon: "131.52818211985402",
        url: "https://nagasakibana-beach.com/",
        pref: "長崎県",
      },
    ];

    const fetchData = async () => {
      const promises = placeArray.map(async (city) => {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&cnt=24&appid=${API_KEY}&units=metric`
        );
        // APIエンドポイントの応答は3時間ごとに区切られている。1回のリクエストで翌日からの5日間（120時間）取得できる。
        const data = res.data.list;
        const parsedData: WeatherData[] = [];
        //console.log(data);

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
    };

    fetchData();
  }, []);

  return { weatherData };
};
