import '../styles/components/cardSlide.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'

export default function CardSlide() {
    return (
        <div className="container">
            <Swiper
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
                        <img src="src/assets/Ecologia.jpg" alt="card image" className="cardImage" />
                        <p className="badge">Planta</p>
                        <h2 className="cardTitle">conheça nossas placas</h2>
                        <span className="cardButton material-symbols-rounded">
                            comprar
                        </span>
                    </a>
                </SwiperSlide>
                
                <SwiperSlide className="cardItem">
                    <a href="#" className="cardLink">
                        <img src="src/assets/Ecologia.jpg" alt="card image" className="cardImage" />
                        <p className="badge">Planta</p>
                        <h2 className="cardTitle">conheça nossas placas</h2>
                        <span className="cardButton material-symbols-rounded">
                        comprar
                        </span>
                    </a>
                </SwiperSlide>

                <SwiperSlide className="cardItem">
                    <a href="#" className="cardLink">
                        <img src="src/assets/Ecologia.jpg" alt="card image" className="cardImage" />
                        <p className="badge">Planta</p>
                        <h2 className="cardTitle">conheça nossas placas</h2>
                        <span className="cardButton material-symbols-rounded">
                             comprar
                        </span>
                    </a>
                </SwiperSlide>

                <SwiperSlide className="cardItem">
                    <a href="#" className="cardLink">
                        <img src="src/assets/Ecologia.jpg" alt="card image" className="cardImage" />
                        <p className="badge">Planta</p>
                        <h2 className="cardTitle">conheça nossas placas</h2>
                        <span className="cardButton material-symbols-rounded">
                            comprar
                        </span>
                    </a>
                </SwiperSlide>

                <SwiperSlide className="cardItem">
                    <a href="#" className="cardLink">
                        <img src="src/assets/Ecologia.jpg" alt="card image" className="cardImage" />
                        <p className="badge">Planta</p>
                        <h2 className="cardTitle">conheça nossas placas</h2>
                        <span className="cardButton material-symbols-rounded">
                             comprar
                        </span>
                    </a>
                </SwiperSlide>                
            </Swiper>
        </div>
    )
}