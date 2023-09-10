import "./App.css";
import Header from "./components/Header";
import Title from "./components/Title";
import { BiLinkExternal } from "react-icons/bi";
import { UseSliderHooks } from "./hooks/useSliderHooks";
import { UsePlaceHooks } from "./hooks/usePlaceHooks";
import { Footer } from "./components/Footer";

function App() {
  const { sliderImages, currentImageIndex } = UseSliderHooks();
  const { weatherData } = UsePlaceHooks();
  /**
   * const weatherData = UsePlaceHooks();
   * → 「weatherDate.mapでプロパティ 'map' は型 '{ weatherData: WeatherData[]; }' に存在しません」のエラーあり。
   * mapメソッドはオブジェクトには存在しないため。オブジェクトの場合はmapやforEachを使えない。
   * mapメソッド：新しい配列を生成。配列を違う形に変換する。
   *
   * weatherData ＝ UsePlaceHooks() の戻り値そのもの、オブジェクト全体を含む。const weatherData: { weatherData: WeatherData[];}
   *
   * { weatherData }だと const weatherData: WeatherData[]
   * → weatherDataプロパティを取り出して新しい変数weatherDataとして初期化している。
   */

  return (
    <div className="App bg-primary-bg01">
      <Header />

      <p className="text-vertical font01 fixed right-3 top-16 z-30 text-sm tracking-widest lg:right-8 lg:text-3xl">
        Enjoy camping in sunny day!
      </p>

      <section className="main-visual relative pb-20 pt-24 md:pb-24 lg:pb-40 lg:pt-20">
        <div className="relative mx-auto w-4/5 lg:w-1/2">
          <img
            src={sliderImages[currentImageIndex]}
            alt="メインビジュアルのスライダー画像"
            className="slider-image align-center relative mx-auto mb-12 w-full sm:mb-20"
          />
          <div className="absolute -left-8 bottom-8 inline-block md:-left-12 md:bottom-28 lg:-left-48 lg:bottom-32">
            <p className="font01 text-md mb-2 lg:text-xl lg:tracking-wider">
              BREATH OF WIND
            </p>
            <p className="font01 text-4xl md:text-5xl lg:text-6xl lg:tracking-wider">
              CHILL OUT
            </p>
          </div>
          <div className="absolute -bottom-8 -left-8 inline-block border border-white px-4 py-2 md:-left-12 md:bottom-8 md:w-80 lg:-left-48">
            <p className="text-xs text-white lg:text-base">
              晴れの日キャンプで
              <br />
              わくわく・どきどき体験！
            </p>
          </div>
        </div>
        <img
          src="./bg/bg01.svg"
          alt=""
          className="absolute bottom-0 z-10 md:-bottom-8 lg:-bottom-20"
        />
      </section>

      <section className="main-content bg-primary-bg02 pb-40">
        <Title />
        <div className="mx-auto w-11/12 lg:w-3/4">
          <div className="flex flex-wrap">
            {weatherData.map((data, index) => (
              <div
                key={index}
                className="mx-auto mb-20 w-full md:mb-60 md:w-1/3"
              >
                {index === 0 || data.city !== weatherData[index - 1].city ? (
                  <>
                    <h2 className="mb-2 text-xl font-semibold md:-mt-24 lg:text-xl">
                      {data.city}
                    </h2>
                    <p className="text-md mb-4 w-24 rounded-xl border border-solid border-gray-700 text-center text-gray-700">
                      {data.pref}
                    </p>
                    <a
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-md text-blue-900 underline hover:opacity-70"
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

      <Footer />
    </div>
  );
}

export default App;
