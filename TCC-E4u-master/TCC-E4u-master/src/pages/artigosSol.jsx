import CardBotao from "../components/cardBotao"
import Card from "../components/card.jsx"
import '../styles/pages/artigosSol.css'

export default function ArtigosSol() {
    return (
        <>
            <h1>Para você:</h1>
            <div className="artigosSol">
                <CardBotao srcCardBotao="src/assets/Ecologia.jpg" textoCardBotao="Um artigo muito interessante" hrefCardBotao="" />
                <CardBotao srcCardBotao="src/assets/Ecologia.jpg" textoCardBotao="Um artigo muito interessante" hrefCardBotao="" />
                <CardBotao srcCardBotao="src/assets/Ecologia.jpg" textoCardBotao="Um artigo muito interessante" hrefCardBotao="" />
                <CardBotao srcCardBotao="src/assets/Ecologia.jpg" textoCardBotao="Um artigo muito interessante" hrefCardBotao="" />
            </div>

            <h1>Outros:</h1>
            <div className="artigosOutros">
                <CardBotao srcCardBotao="" textoCardBotao="" hrefCardBotao="" />
                <CardBotao srcCardBotao="" textoCardBotao="" hrefCardBotao="" />
                <CardBotao srcCardBotao="" textoCardBotao="" hrefCardBotao="" />
                <CardBotao srcCardBotao="" textoCardBotao="" hrefCardBotao="" />
            </div>
        </>
    )
}