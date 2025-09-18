import React, { useRef } from 'react'
import '../styles/components/cabecalho.css'
import energia from "../assets/img1.png"
import economia from "../assets/img5.png"
import eficiencia from "../assets/img4.png"
import ecologia from "../assets/img3.png"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules'


const data = [
  {id: 1, img: energia, title: "Energia", },
  {id: 2, img: economia, title: "Economia", },
  {id: 3, img: eficiencia, title: "Eficiencia", },
  {id: 4, img: ecologia, title: "Ecologia", }
]

export default function Header() {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);

    const onAutoplayTimeLeft = (s, time, progress) => {
        if (progressCircle.current && progressContent.current) {
            progressCircle.current.style.setProperty('--progress', 1 - progress);
            progressContent.current.textContent = `${Math.ceil(time / 1000)}`;
        }
    };

    return (
        <div className="container" style={{position: 'relative'}}>
            <Swiper
                slidesPerView={1}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                pagination={{ clickable: true }}
                navigation
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                {data.map((item) => (
                    <SwiperSlide key={item.id}>
                        <img src={item.img} alt={item.title} className="slider-item" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="autoplay-progress">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                    <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
            </div>
        </div>
    )
}