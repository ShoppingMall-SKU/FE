import React, { useState, useEffect } from 'react';
import { useColor } from 'color-thief-react';

export const EventBanner = () => {
    const images = [
        'images/event.png',
        'images/event2.png',
        'images/event3.jpg'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // 현재 이미지의 색상 추출
    const { data, loading, error } = useColor(
        images[currentIndex],
        'rgbString'
    );

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // 5초마다 자동 슬라이드
    useEffect(() => {
        const intervalId = setInterval(handleNext, 5000);
        console.log(data);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="max-w-screen-lg xl:max-w-screen-2xl mt-5 mx-auto relative ">
            <div className="relative ml-3 mr-3 h-56 overflow-hidden rounded-lg md:h-96 flex items-center justify-center">
                {images.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute block w-full h-full transition-opacity duration-700 ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img
                            src={slide}
                            className="absolute object-cover block h-full w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt='img'
                            style={{objectFit:'contain', backgroundColor: data, transition: 'background-color 0.445s ease-in-out'}}

                        />
                    </div>
                ))}
            </div>

            {/* Indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'
                        }`}
                        onClick={() => setCurrentIndex(index)}
                        aria-current={index === currentIndex}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>

    );
};
