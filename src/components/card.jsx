import { useState } from 'react'
import '../styles/components/card.css'

export default function Card({ srcCard, textoCard, tituloCard }) {
    const [hoverAtivo, setHoverAtivo] = useState(false)

    return (
        <>
            <div className="card1" onMouseEnter={() => setHoverAtivo(true)} onMouseLeave={() => setHoverAtivo(false)}>
                <img className={`imagemCard1 ${hoverAtivo ? "aberto" : ""}`} src={srcCard} />

                <p className="tituloCard1">{tituloCard}</p>
                <div className={`conteudoCard1 ${hoverAtivo ? "aberto" : ""}`}>
                    <p className="textoCard1">{textoCard}</p>
                </div>
            </div>
        </>
    )
}