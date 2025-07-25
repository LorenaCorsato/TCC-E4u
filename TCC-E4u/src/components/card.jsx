import { useState } from 'react'
import '../styles/components/card.css'

export default function Card({ srcCard, textoCard, tituloCard }) {
    const [hoverAtivo, setHoverAtivo] = useState(false)

    return (
        <>
            <div className="card" onMouseEnter={() => setHoverAtivo(true)} onMouseLeave={() => setHoverAtivo(false)}>
                <img className={`imagemCard ${hoverAtivo ? "aberto" : ""}`} src={srcCard} />

                <p className="tituloCard" >{tituloCard}</p>
                <div className={`conteudoCard ${hoverAtivo ? "aberto" : ""}`}>
                    <p className="textoCard">{textoCard}</p>
                </div>
            </div>
        </>
    )
}