import React, { useState } from 'react';

export const EventBanner = () => {
    const [backgroundImage, setBackgroundImage] = useState("url('images/event.png')");
    const [isImageToggled, setIsImageToggled] = useState(false);

    const handleImageToggle = () => {
        if (isImageToggled) {
            setBackgroundImage("url('images/event.png')");
        } else {
            setBackgroundImage("url('images/event2.png')");
        }
        setIsImageToggled(!isImageToggled);
    };

    return (
        <div className="relative h-screen">
            <div className="mx-12 my-8 absolute h-1/2 inset-0 bg-cover bg-center" style={{ backgroundImage }} />
            <div className="absolute top-1/3 left-16 transform -translate-y-1/2">
                <img src="images/icon-swiper-1.svg" alt="left" onClick={handleImageToggle} />
            </div>
            <div className="absolute top-1/3 right-16 transform -translate-y-1/2">
                <img src="images/icon-swiper-2.svg" alt="right" onClick={handleImageToggle} />
            </div>
        </div>
    );
};