import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import Title from "./components/Title";
import image01 from "./slider/slider01.png";
import image02 from "./slider/slider02.png";
import image03 from "./slider/slider03.png";
import image04 from "./slider/slider04.png";
import image05 from "./slider/slider05.png";
import bg01 from "./bg01.svg";
import bg02 from "./bg02.svg";
import { BiLinkExternal } from "react-icons/bi";

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

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]); // 初期は空の配列
  const API_KEY = "5403a75c4ed202a7421597001decdcf9"; // 自分のAPIキー

  useEffect(() => {
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

  // メインビジュアルのスライダー
  const sliderImages = [image01, image02, image03, image04, image05];
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 現在表示されている画像のインデックスを保持
  useEffect(() => {
    // 画像のインデックスを更新するインターバル処理
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % sliderImages.length
      );
    }, 5000);
    return () => clearInterval(interval); // コンポーネントがアンマウントされる際にインターバル処理をクリアするための処理
  }, [sliderImages.length]);

  return (
    <div className="App">
      <Header />

      <p className="text-vertical fixed right-3 top-16 z-30 text-sm tracking-widest lg:right-8 lg:text-3xl">
        Enjoy camping in sunny day!
      </p>

      <section className="main-visual relative pb-20 pt-24 md:pb-24 lg:pb-40 lg:pt-20">
        <div className="relative mx-auto w-4/5 lg:w-1/2">
          <img
            src={sliderImages[currentImageIndex]}
            alt="メインビジュアルのスライダー画像"
            className="slider-image align-center relative mx-auto mb-12 w-full sm:mb-20"
          />
          <div className="absolute -bottom-2 -left-8 inline-block w-64 bg-white px-2 py-2 md:-left-12 md:bottom-20 md:w-80 md:px-8 md:py-4 lg:-left-48 lg:bottom-24 lg:w-2/3">
            <p className="text-xl md:text-2xl lg:text-5xl lg:tracking-wider">
              STAY! EAT! ENJOY!
            </p>
          </div>
          <div className="absolute -bottom-12 -left-8 inline-block w-72 bg-white px-4 py-2 md:-left-12 md:bottom-8 md:w-80 lg:-left-48 lg:w-96">
            <p className="text-xs lg:text-base">
              晴れの日キャンプで わくわく・どきどき体験！
            </p>
          </div>
        </div>
        <img
          src={bg01}
          alt=""
          className="absolute bottom-0 -z-10 md:-bottom-8 lg:-bottom-20"
        />
      </section>

      <section className="main-content pb-40">
        <Title />
        <div className="mx-auto w-11/12 lg:w-3/4">
          <div className="flex flex-wrap">
            {weatherData.map((data, index) => (
              <div
                key={index}
                className="mx-auto mb-20 w-full md:mb-48 md:w-1/3"
              >
                {index === 0 || data.city !== weatherData[index - 1].city ? (
                  <>
                    <h2 className="mb-2 text-xl font-semibold md:-mt-24 lg:text-xl">
                      {data.city}
                    </h2>
                    <p className="mb-4 w-20 rounded-xl border border-solid border-gray-700 text-center text-xs text-gray-700">
                      {data.pref}
                    </p>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-900 underline hover:opacity-70"
                    >
                      サイトを見る
                      <BiLinkExternal className="ml-2 inline text-sm" />
                    </a>
                  </>
                ) : null}
                <p className="mt-8 text-xl tracking-wider">
                  {data.month}/{data.day}
                </p>
                <img
                  src={`./icon/${data.icon}.svg`}
                  alt="天気のマーク"
                  className="my-4 w-16"
                />
                <p className="mb-2 text-sm text-gray-600">{data.description}</p>
                {/* <p className="text-md mb-2">最低気温: {data.minTemp}℃</p>
                <p className="text-md mb-2">最高気温: {data.maxTemp}℃</p> */}
                <p className="text-md mb-2">気温: {data.temp}℃</p>
                <p className="text-md mb-2">湿度: {data.humidity}%</p>
                <p className="text-md">風速: {data.windSpeed}m/s</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex content-end justify-center bg-green-900 pb-3 pt-40">
        <img
          src={bg02}
          alt=""
          className="absolute -top-14 z-10 md:-top-20 lg:-top-24"
        />
        <p className="text-xs">&copy; ハレノヒキャンプ</p>
      </section>
    </div>
  );
}

export default App;
