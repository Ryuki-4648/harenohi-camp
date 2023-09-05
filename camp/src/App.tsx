import "./App.css";
import Header from "./components/Header";
import Title from "./components/Title";
import { BiLinkExternal } from "react-icons/bi";
import { UseSliderHooks } from "./hooks/useSliderHooks";
import { UsePlaceHooks } from "./hooks/usePlaceHooks";

function App() {
  const { sliderImages, currentImageIndex } = UseSliderHooks();
  const weatherData = UsePlaceHooks();
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
          src="./bg/bg01.svg"
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
          src="./bg/bg02.svg"
          alt=""
          className="absolute -top-14 z-10 md:-top-20 lg:-top-24"
        />
        <p className="text-xs">&copy; ハレノヒキャンプ</p>
      </section>
    </div>
  );
}

export default App;
