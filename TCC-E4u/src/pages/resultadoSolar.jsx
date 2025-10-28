import React, { useRef, useState } from 'react'; 
import { useLocation, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import StarRating from '../components/StarRating';
import ModalAvaliacoes from '../components/ModalAvaliacoes';

import placaSolarImage from '../assets/editado.png'; 

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/pages/resultadoSolar.css';

import NavBar from '../components/navegacao';
import Footer from '../components/rodape';

export default function ResultadoSolar() {
    const location = useLocation();
    const swiperRef = useRef(null); 
    
    const resultados = location.state?.resultado?.recomendacoes;
    const dadosGerais = location.state?.resultado;

    const [modalAberta, setModalAberta] = useState(false);
    const [placaSelecionada, setPlacaSelecionada] = useState(null);

    const abrirModal = (placa) => {
        setPlacaSelecionada(placa);
        setModalAberta(true);
    };

    const fecharModal = () => {
        setModalAberta(false);
        setPlacaSelecionada(null);
    };

    if (!Array.isArray(resultados) || resultados.length === 0) {
        return (
            <>
                <NavBar />
                <div className="resultado-container erro">
                    <h1>Oops! Nenhuma placa encontrada.</h1>
                    <p>Com base nos dados fornecidos, não encontramos placas solares que caibam no espaço disponível.</p>
                    <Link to="/placaSolar" className="voltar-link">Fazer Nova Simulação</Link>
                </div>
                <Footer />
            </>
        );
    }

    const resultadosOrdenados = [...resultados].sort((a, b) => {
        if (a.recomendado && !b.recomendado) return -1;
        if (!a.recomendado && b.recomendado) return 1;
        return parseFloat(a.custo_total) - parseFloat(b.custo_total);
    });

    return (
        <>
            <NavBar />
            <div className="resultado-container">
                <h1>Você precisa de aproximadamente <strong>{dadosGerais?.potenciaNecessariaWp} Wp</strong> de potência.</h1>
                <p>Estas são as opções do nosso catálogo. As melhores estão destacadas como recomendadas.</p>
                
                <div className="swiper-container-resultados">
                    <button className="custom-swiper-arrow custom-swiper-prev" onClick={() => swiperRef.current?.slidePrev()}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>

                    <Swiper
                        onSwiper={(swiper) => { swiperRef.current = swiper; }}
                        modules={[Pagination]}
                        loop={resultadosOrdenados.length > 3}
                        spaceBetween={30}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }
                        }}
                        className="mySwiper"
                    >
                        {resultadosOrdenados.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className={`placa-card ${!item.cabe_no_espaco ? 'nao-cabe' : ''}`}>
                                    <img src={placaSolarImage} alt={`Placa solar ${item.modelo}`} className="placa-imagem" />
                                    {item.recomendado && <div className="badge">Recomendado</div>}
                                    <h2 className="cardTitle">{item.modelo}</h2>
                                    <p className="fabricante">Marca: {item.fabricante}</p>
                                    
                                    <div className="avaliacao-trigger" onClick={() => abrirModal(item)} title="Ver ou adicionar avaliações">
                                        <StarRating rating={item.media_nota} />
                                        <span>({item.total_avaliacoes})</span>
                                    </div>

                                    <div className="cardDetails">
                                        <p><strong>Quantidade:</strong> {item.quantidade_necessaria} placas</p>
                                        <p><strong>Custo Total:</strong> {parseFloat(item.custo_total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                        <p><strong>Voltagem (Vmp):</strong> {item.tensao_maxima_potencia_vmp} V</p>
                                        <p><strong>Peso Total:</strong> {item.peso_total_kg ? `${item.peso_total_kg} kg` : 'Sem informação'}</p>
                                        <p><strong>Área Total:</strong> {item.area_total_m2} m²</p>
                                    </div>
                                    {!item.cabe_no_espaco && <p className="aviso-espaco">Não cabe no seu espaço!</p>}
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="cardButton">
                                        Comprar
                                    </a>
                                </div>
                            </SwiperSlide>

                        ))}
                    </Swiper>
                
                    
                    <button className="custom-swiper-arrow custom-swiper-next" onClick={() => swiperRef.current?.slideNext()}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                </div>
                <p className='aviso_telhado'>ATENÇÃO: Certifique-se de que a estrutura do seu telhado suporta o peso dos módulos solares antes da compra.</p>
            </div>

            {placaSelecionada && (
                <ModalAvaliacoes
                    placa={placaSelecionada}
                    isOpen={modalAberta}
                    onClose={fecharModal}
                />
            )}
            
            <Footer />
        </>
    );
}