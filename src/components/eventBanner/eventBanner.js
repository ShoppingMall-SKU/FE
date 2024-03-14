import React, { useState } from 'react';
import styles from "./eventBanner.module.css";
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
        <div className={styles.banner}>
            <div className="mx-12 my-8 absolute inset-0 bg-cover bg-center" style={{ backgroundImage }} />
            <div className="absolute top-1/2 left-16 transform -translate-y-1/2">
                <img src="images/icon-swiper-1.svg" alt="left" onClick={handleImageToggle} />
            </div>
            <div className="absolute top-1/2 right-16 transform -translate-y-1/2">
                <img src="images/icon-swiper-2.svg" alt="right" onClick={handleImageToggle} />
            </div>
        </div>
    );
};