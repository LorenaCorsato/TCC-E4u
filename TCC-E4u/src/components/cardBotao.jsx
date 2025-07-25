import "../styles/components/cardBotao.css"
import Button from "./botao"

export default function CardBotao( {srcCardBotao, textoCardBotao, hrefCardBotao} ) {
    return (
        <>
            <div className="cardBotao">
                <div className="conteudoCardBotao">
                    <img className="imagemCardBotao" src={srcCardBotao} />
                    <p className="textoCardBotao">{textoCardBotao}</p>
                    <Button btnNome="Conferir"/>
                </div>
            </div>
        </>
    )
}