import { useEffect, useState } from "react";

export const UseSliderHooks = () => {
  // メインビジュアルのスライダー
  const sliderImages = [
    "./slider/slider01.png",
    "./slider/slider02.png",
    "./slider/slider03.png",
    "./slider/slider04.png",
    "./slider/slider05.png",
  ];
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

  return { sliderImages, currentImageIndex };
};
