import '../styles/components/card.css'

export default function Card( {srcCard, textoCard, tituloCard} ) {
    return(
        <>
        <div className="card">
                <img className="imagemCard" src={srcCard}/>

            <div className="conteudoCard" id="conteudoCard">
                <p className="tituloCard">{tituloCard}</p>
                <p className="textoCard">{textoCard}</p>
            </div>
        </div>
        </>
    )
}