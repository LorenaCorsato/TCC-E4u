// src/pages/Inicio.jsx
import { useState, useEffect } from "react";
import NavBar from "../components/navegacao";
import Footer from "../components/rodape";
import CardBotao from "../components/cardBotao";
import CardSlide from "../components/cardSlide"
import Acessibilidade from "../components/acessibilidade";
import "../styles/pages/home.css";

//home

export default function Inicio() {
  return (
    <>
      <NavBar />
      <div className="inicio">
        <div className="artigosPreview">
          <h5>Artigos informativos:</h5>

          <div className="cardArtigosPreview">
            <CardBotao
              hrefCardBotao="/artigo02"
              srcCardBotao="src/assets/Ecologia.jpg"
              tituloCardBotao="Pegada de carbono: o que é, como calcular e como reduzir?"
              textoCardBotao="Subtítulo interessante para o artigo Subtítulo interessante para o artigo"
            />

            <CardBotao
              hrefCardBotao="/artigo03"
              srcCardBotao="src/assets/Ecologia.jpg"
              tituloCardBotao="Mercado sustentável: Como a sustentabilidade impacta na economia nacional?"
              textoCardBotao="Subtítulo interessante para o artigo Subtítulo interessante para o artigo"
            />

            <CardBotao
              hrefCardBotao="/artigo06"
              srcCardBotao="src/assets/Ecologia.jpg"
              tituloCardBotao="Incentivos fiscais para sustentabilidade: Como funcionam e quem pode usar?"
              textoCardBotao="Subtítulo interessante para o artigo Subtítulo interessante para o artigo"
            />
          </div>
        </div>

        <div className="placasPreview">
          <h5>Cálculo de placas:</h5>
          <CardSlide />
        </div>

        <div className="pegCarbonoPreview">
          <h5>Cálculo de pegada de carbono:</h5>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
            <div className="graficoPreview">
              <img src="src/assets/print_pegCarbono.jpeg" alt="" />
            </div>
            <div className="graficoPreview">
              <img src="src/assets/print_plaSolar.jpeg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <Acessibilidade />
      <Footer />
    </>
  );
}
