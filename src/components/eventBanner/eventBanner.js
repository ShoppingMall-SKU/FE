import React, { useState, useEffect } from 'react';

export const EventBanner = () => {
    const images = [
        "url('images/event.png')",
        "url('images/event2.png')",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // 3초마다 자동 슬라이드
    useEffect(() => {
        const intervalId = setInterval(handleNext, 5000);  // 3초 간격

        return () => clearInterval(intervalId);  // 컴포넌트 언마운트 시 setInterval 정리
    }, []);

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow : 'hidden'
        }}>
            <div
                style={{
                    display: 'flex',
                    transform: `translateX(-${currentIndex * 50}%)`,  // 슬라이드 이동
                    transition: 'transform 1s ease-in-out',  // 부드러운 애니메이션
                    width: `${images.length * 100}%`,  // 모든 이미지를 한 줄에 배치
                }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundImage: image,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '100%',  // 각 이미지의 너비를 100%로 설정
                            height: '300px',
                        }}
                    />
                ))}
            </div>
            {/* 왼쪽 버튼 */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '16px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    zIndex: 1
                }}
                onClick={handlePrev}
            >
                <img src="images/icon-swiper-1.svg" alt="left" />
            </div>
            {/* 오른쪽 버튼 */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '16px',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    zIndex: 1
                }}
                onClick={handleNext}
            >
                <img src="images/icon-swiper-2.svg" alt="right" />
            </div>
        </div>
    );
};
