import '../styles/components/cardSlide.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import React, { useRef } from 'react'

export default function CardSlide() {
    const swiperRef = useRef(null);

    return (
        <div className="containerSlide1" style={{ position: 'relative' }}>
            <button
                className="custom-swiper-prev"
                onClick={() => swiperRef.current.swiper.slidePrev()}
                style={{ position: 'absolute', left: '-70px', top: '50%', zIndex: 20, transform: 'translateY(-50%)' }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <Swiper
                ref={swiperRef}
                loop={true}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                    dynamicBullets: true
                }}
                navigation={true}
                breakpoints={{
                    0: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 3
                    },
                }}
                modules={[Navigation, Pagination]}
                className="cardWrapper"
            >
                
                <SwiperSlide className="cardItem">
                    <a href="#" className="cardLink">
                        <img src="src/assets/Editado.png" alt="card image" className="cardImage" />
                        <p className="badge">Planta</p>
                        <h2 className="cardTitle">conheça nossas placas</h2>
                        <button className="cardButton material-symbols-rounded">
                            comprar
                        </button>
                    </a>
                </SwiperSlide>
                
                <SwiperSlide className="cardItem">
                    <a href="#" className="cardLink">
                        <img src="src/assets/Editado.png" alt="card image" className="cardImage" />
                        <p className="badge">Planta</p>
                        <h2 className="cardTitle">conheça nossas placas</h2>
                        <button className="cardButton material-symbols-rounded">
                        comprar
                        </button>
                    </a>
                </SwiperSlide>

                <SwiperSlide className="cardItem">
                    <a href="#" className="cardLink">
                        <img src="src/assets/Editado.png" alt="card image" className="cardImage" />
                        <p className="badge">Planta</p>
                        <h2 className="cardTitle">conheça nossas placas</h2>
                        <button className="cardButton material-symbols-rounded">
                             comprar
                        </button>
                    </a>
                </SwiperSlide>

                <SwiperSlide className="cardItem">
                    <a href="#" className="cardLink">
                        <img src="src/assets/Editado.png" alt="card image" className="cardImage" />
                        <p className="badge">Melhor custo</p>
                        <h2 className="cardTitle">conheça nossas placas</h2>
                        <button className="cardButton material-symbols-rounded">
                            comprar
                        </button>
                    </a>
                </SwiperSlide>

                <SwiperSlide className="cardItem">
                    <a href="#" className="cardLink">
                        <img src="src/assets/Editado.png" alt="card image" className="cardImage" />
                        <p className="badge">Planta</p>
                        <h2 className="cardTitle">conheça nossas placas</h2>
                        <button className="cardButton material-symbols-rounded">
                             comprar
                        </button>
                    </a>
                </SwiperSlide>                
            </Swiper>
            <button
                className="custom-swiper-next"
                onClick={() => swiperRef.current.swiper.slideNext()}
                style={{ position: 'absolute', right: '-70px', top: '50%', zIndex: 20, transform: 'translateY(-50%)' }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    )
}