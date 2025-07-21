import '../styles/components/cabecalho.css'
import energia from "../assets/Energia.png"
import economia from "../assets/Economia.png"
import eficiencia from "../assets/eficiencia - lading page.png"
import ecologia from "../assets/Ecologia.png"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { EffectFade, Navigation, Pagination } from 'swiper/modules'

const data = [
  {id: 1, img: energia, title: "Energia", },
  {id: 2, img: economia, title: "Economia", },
  {id: 3, img: eficiencia, title: "Eficiencia", },
  {id: 4, img: ecologia, title: "Ecologia", }
]

export default function Header() {
    return (
        <div className="container">
            <Swiper
                slidesPerView={1}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                pagination={{ clickable: true }}
                navigation
                modules={[EffectFade, Navigation, Pagination]}
            >
                {data.map((item) => (
                    <SwiperSlide key={item.id}>
                        <img src={item.img} alt={item.title} className="slider-item" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}