import "../styles/components/cardBotao.css"

export default function CardBotao( {srcCardBotao, textoCardBotao, hrefCardBotao} ) {
    return (
        <>
            <div className="cardBotao">
                <div className="conteudoCardBotao">
                    <img className="imagemCardBotao" src={srcCardBotao} />
                    <p className="textoCardBotao">{textoCardBotao}</p>
                    <button className="botaoCardBotao" href={hrefCardBotao}>Conferir</button>
                </div>
            </div>
        </>
    )
}