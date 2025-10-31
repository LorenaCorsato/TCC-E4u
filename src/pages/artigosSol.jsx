import BotaoIcone from "../components/botaoIcone.jsx";
import CardBotao from "../components/cardBotao.jsx";
import NavBar from "../components/navegacao.jsx";
import Footer from "../components/rodape.jsx"
import "../styles/pages/artigosSol.css";

export default function Artigos() {
  return (
    <>
      <NavBar />

      <div className="artigos">
        <div className="artigosTopo">
          <CardBotao
            hrefCardBotao="/artigo06"
            srcCardBotao="src/assets/ImgArtigos/Fiscal.jpg"
            tituloCardBotao="Incentivos fiscais para sustentabilidade: Como funcionam e quem pode usar?"
            textoCardBotao="Descubra como os incentivos fiscais podem impulsionar práticas sustentáveis."
          />

          <div style={{display: "flex", flexDirection: "column", width: "600px"}}>
            <CardBotao
              hrefCardBotao="/artigo07"
              srcCardBotao="src/assets/ImgArtigos/Direitos.jpg"
              tituloCardBotao="Direito ambiental e responsabilidade civil: o que as empresas precisam saber"
               />

            <CardBotao
              hrefCardBotao="/artigo08"
              srcCardBotao="src/assets/ImgArtigos/Lei.jpg"
              tituloCardBotao="Energia solar e legislação: entenda os impactos da lei 14.300/22"
            />
          </div>
        </div>

        {/* Área de artigos de coluna */}

        <div style={{display: "flex", flexDirection: "row"}}>
          <div className="artigosCards">
            <CardBotao
              hrefCardBotao="/artigo01"
              srcCardBotao="src/assets/energia.jpg"
              tituloCardBotao="O futuro das energias renováveis no Brasil: Desafios e incentivos"
              textoCardBotao="Explore os caminhos para um Brasil mais sustentável."
            />

            <CardBotao
              hrefCardBotao="/artigo02"
              srcCardBotao="src/assets/co2.jpg"
              tituloCardBotao="Pegada de carbono: o que é, como calcular e como reduzir?"
              textoCardBotao="Aprenda a medir e diminuir seu impacto ambiental."
            />

            <CardBotao
              hrefCardBotao="/artigo03"
              srcCardBotao="src/assets/mercado.jpg"
              tituloCardBotao="Mercado sustentável: Como a sustentabilidade impacta na economia nacional?"
              textoCardBotao="Descubra como práticas sustentáveis estão transformando a economia."
            />

            <CardBotao
              hrefCardBotao="/artigo05"
              srcCardBotao="src/assets/ImgArtigos/cotidiano.jpg"
              tituloCardBotao="Sustentabilidade no cotidiano: Ações que impactam"
              textoCardBotao="Inspire-se com pequenas mudanças que fazem a diferença."
            />

            <CardBotao
              hrefCardBotao="/artigo06"
              srcCardBotao="src/assets/ImgArtigos/Fiscal1.jpg"
              tituloCardBotao="Incentivos fiscais para sustentabilidade: Como funcionam e quem pode usar?"
              textoCardBotao="Descubra como os incentivos fiscais podem impulsionar práticas sustentáveis."
            />

            <CardBotao
              hrefCardBotao="/artigo07"
              srcCardBotao="src/assets/ImgArtigos/Direitos1.jpg"
              tituloCardBotao="Direito ambiental e responsabilidade civil: o que as empresas precisam saber"
              textoCardBotao="Entenda as obrigações legais e como proteger o meio ambiente."
            />

            <CardBotao
              hrefCardBotao="/artigo08"
              srcCardBotao="src/assets/ImgArtigos/legislação.jpg"
              tituloCardBotao="Energia solar e legislação: entenda os impactos da lei 14.300/22"
              textoCardBotao="Saiba como a nova legislação afeta o setor de energia solar."
            />

             <CardBotao
              hrefCardBotao="/artigo09"
              srcCardBotao="src/assets/ImgArtigos/mercadoS.png"
              tituloCardBotao="A chegada do mercado sustentável ao Brasil"
              textoCardBotao="Entenda a nova tendencia do mercado."
            />

              <CardBotao
              hrefCardBotao="/artigo10"
              srcCardBotao="src/assets/ImgArtigos/inversores.png"
              tituloCardBotao="Inversores e Transformadores"
              textoCardBotao="Saiba como os inversores e transformadores funcionam."
            />
          </div>










            {/* Área de artigos pequenos à direita */}
          <div style={{width: "400px", height: "200px"}}>
            <div className="artigosArea">
              <CardBotao
                hrefCardBotao="/artigo01"
                srcCardBotao="src/assets/ImgArtigos/futuro.jpg"
                tituloCardBotao="O futuro das energias renováveis no Brasil"
               />

              <CardBotao
                hrefCardBotao="/artigo03"
                srcCardBotao="src/assets/ImgArtigos/Impacto.jpg"
                tituloCardBotao="Como a sustentabilidade impacta na economia nacional?"
               />

              <CardBotao
                hrefCardBotao="/artigo05"
                srcCardBotao="src/assets/ImgArtigos/cotidiano.jpg"
                tituloCardBotao="Sustentabilidade no cotidiano"
               />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
