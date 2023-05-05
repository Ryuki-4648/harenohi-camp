import title01 from "../title01.svg";
import icon01 from "../icon/icon01.svg";
import icon02 from "../icon/icon02.svg";
import icon03 from "../icon/icon03.svg";

export default function Title() {
  return (
    <>
      <div className="text-center">
        <h1 className="relative mb-6 inline-block w-64 text-center text-4xl sm:text-5xl md:w-96">
          <img src={title01} alt="ハレノヒキャンプ" className="mx-auto" />
          <img src={icon01} alt="" className="absolute -right-16 -top-2 w-12" />
          <img src={icon02} alt="" className="absolute -left-20 -top-4 w-12" />
          <img src={icon03} alt="" className="absolute -left-32 top-4 w-12" />
          <img src={icon03} alt="" className="absolute -right-32 top-4 w-12" />
        </h1>
      </div>
      <p className="mb-32 text-center">晴れの日、どこでキャンプする？</p>
    </>
  );
}
