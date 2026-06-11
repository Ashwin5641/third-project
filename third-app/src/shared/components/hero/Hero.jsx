import { useState } from "react";
import './hero.css';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Hero() {
    const slides = [
        {
            image: "/src/assets/horizontal1.png",
            title: "New Collection",
            subtitle: "Discover your style"
        },
        {
            image: "/src/assets/horizontal2.png",
            title: "Summer Sale",
            subtitle: "Up to 50% Off"
        },
        {
            image: "/src/assets/horizontal3.png",
            title: "Streetwear Drop",
            subtitle: "Limited Edition"
        }
    ]

    return (
        <div className="hero-section">
            <Swiper
                modules={[Pagination, Navigation, EffectFade, Autoplay]}
                pagination={{clickable: true}}
                navigation={true}
                effect="fade"
                autoplay={{delay: 3000, disableOnInteraction: false}}
                loop={true}
                className="hero-swiper"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="hero-slide">
                            <img src={slide.image} alt="" />
                            <div className="hero-content">
                                <h1>{slide.title}</h1>
                                <p>{slide.subtitle}</p>
                                <button>Shop Now</button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}