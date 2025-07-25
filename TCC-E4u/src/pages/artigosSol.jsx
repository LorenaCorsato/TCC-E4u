import BotaoIcone from "../components/botaoIcone.jsx";
import CardBotao from "../components/cardBotao";
import NavBar from "../components/navegacao.jsx";
import "../styles/pages/artigosSol.css";

export default function ArtigosSol() {
  return (
    <>
      <NavBar />
      
      <div className="artigosSol">
        <h1>Para você:</h1>
        <div className="artigosCards">
          <BotaoIcone srcBtnIcone="src/assets/icone olho aberto.png" />
          <CardBotao
            srcCardBotao="src/assets/Ecologia.jpg"
            textoCardBotao="Um artigo muito interessante"
            hrefCardBotao=""
          />
          <CardBotao
            srcCardBotao="src/assets/Ecologia.jpg"
            textoCardBotao="Um artigo muito interessante"
            hrefCardBotao=""
          />
          <CardBotao
            srcCardBotao="src/assets/Ecologia.jpg"
            textoCardBotao="Um artigo muito interessante"
            hrefCardBotao=""
          />
          <CardBotao
            srcCardBotao="src/assets/Ecologia.jpg"
            textoCardBotao="Um artigo muito interessante"
            hrefCardBotao=""
          />
          <BotaoIcone srcBtnIcone="src/assets/icone olho fechado.png" />
        </div>

        <h1>Outros:</h1>
        <div className="artigosOutros"></div>
      </div>
    </>
  );
}
