import React, { useEffect, useRef, useState } from 'react';

const images: { desktop: string, mobile: string }[] = [
  {
    desktop: "https://raw.githubusercontent.com/exyted1/assets/main/banner/airdrop.png",
    mobile: "https://raw.githubusercontent.com/exyted1/assets/main/banner/airdrop.png"
  }
];
const delay = 4000;

function isMobileDevice() {
  return window.innerWidth <= 720;
}

export const Slider: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {images.map((image, idx) => (
          <div
            className="slide"
            key={idx}
            style={{ backgroundImage: `url(${isMobileDevice() ? image.mobile : image.desktop})` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
