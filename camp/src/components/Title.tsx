export default function Title() {
  return (
    <>
      <div className="text-center">
        <h1 className="relative z-20 mb-2 mt-6 inline-block w-64 text-center text-4xl sm:text-5xl md:mb-6 md:mt-8 md:w-96">
          <img
            src="./title01.svg"
            alt="ハレノヒキャンプ"
            className="mx-auto w-4/5 sm:w-full"
          />
          <img
            src="./icon/icon01.svg"
            alt=""
            className="absolute -right-8 -top-2 w-10 sm:-right-16 sm:w-12"
          />
          <img
            src="./icon/icon02.svg"
            alt=""
            className="absolute -left-8 -top-4 w-10 sm:-left-20 sm:w-12"
          />
          <img
            src="./icon/icon03.svg"
            alt=""
            className="absolute -left-16 top-4 w-10 sm:-left-32 sm:w-12"
          />
          <img
            src="./icon/icon03.svg"
            alt=""
            className="absolute -right-16 top-4 w-10 sm:-right-32 sm:w-12"
          />
        </h1>
      </div>
      <p className="mb-16 text-center sm:mb-60">
        晴れの日、どこでキャンプする？
      </p>
    </>
  );
}
