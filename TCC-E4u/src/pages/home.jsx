// src/pages/Inicio.jsx
import { useState, useEffect } from "react";
import NavBar from "../components/navegacao";
import Footer from "../components/rodape";
import CardBotao from "../components/cardBotao";
import Acessibilidade from "../components/acessibilidade";
import "../styles/pages/home.css";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="home">
        <div className="artigosPreview">
          <div className="titulo">
          <h1>Seja Bem Vindo</h1>
          </div>
          <div className="cardArtigosPreview">
            <CardBotao
              hrefCardBotao="/artigo02"
              srcCardBotao="src/assets/Ecologia.jpg"
              tituloCardBotao="Pegada de carbono: o que é, como calcular e como reduzir?"
              textoCardBotao="Inicie sua jornada rumo à sustentabilidade"
            />
            
            <CardBotao
              hrefCardBotao="/artigo03"
              srcCardBotao="src/assets/mercado1.png"
              tituloCardBotao="Mercado sustentável"
              textoCardBotao="Tendências e oportunidades para negócios verdes"
            />
            
            <CardBotao
              hrefCardBotao="artigo/06"
              srcCardBotao="src/assets/fiscal.jpg"
              tituloCardBotao="Incentivos fiscais para sustentabilidade "
              textoCardBotao="Como funcionam e quem pode usar?"
            />
          </div>
        </div>
        
        <div className="placasPreview">
          <h5>Prestadores de serviço recomendados :</h5>
          
          <div className="containerCards">
            <div className="itemCard">
              <a href="#" className="linkCard">
                <div style={{position: 'relative'}}>
                  <img src="src/assets/empresa1.png" alt="Placa Solar LR5-54HTH-435M" className="imagemCard" />
                </div>
                <h2 className="tituloCard">Empresa Tal</h2>
                <div className="detalhesCard">
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">CEP:</span>
                    <span className="valorDetalhe">01234-567</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">E-mail:</span>
                    <span className="valorDetalhe">contato@empresatal.com</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">Telefone:</span>
                    <span className="valorDetalhe">(11) 91234-5678</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">Cidade:</span>
                    <span className="valorDetalhe">São Paulo - SP</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">Site:</span>
                    <span className="valorDetalhe">www.empresatal.com</span>
                  </div>
                </div>
                <button className="botaoCard">Contatar</button>
              </a>
            </div>
            
            <div className="itemCard">
              <a href="#" className="linkCard">
                <div style={{position: 'relative'}}>
                  <img src="src/assets/empresa1.png" alt="Placa Solar Alta Eficiência" className="imagemCard" />
                </div>
                <h2 className="tituloCard">Empresa Tal</h2>
                <div className="detalhesCard">
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">CEP:</span>
                    <span className="valorDetalhe">98765-432</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">E-mail:</span>
                    <span className="valorDetalhe">vendas@empresatal.com</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">Telefone:</span>
                    <span className="valorDetalhe">(21) 99876-5432</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">Cidade:</span>
                    <span className="valorDetalhe">Rio de Janeiro - RJ</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">Site:</span>
                    <span className="valorDetalhe">www.empresatal-rj.com</span>
                  </div>
                </div>
                <button className="botaoCard">Contatar</button>
              </a>
            </div>
            
            <div className="itemCard">
              <a href="#" className="linkCard">
                <div style={{position: 'relative'}}>
                  <img src="src/assets/empresa1.png" alt="Placa Solar Durabilidade" className="imagemCard" />
                </div>
                <h2 className="tituloCard">Empresa tal</h2>
                <div className="detalhesCard">
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">CEP:</span>
                    <span className="valorDetalhe">55443-210</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">E-mail:</span>
                    <span className="valorDetalhe">suporte@empresatal.com</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">Telefone:</span>
                    <span className="valorDetalhe">(31) 93421-1234</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">Cidade:</span>
                    <span className="valorDetalhe">Belo Horizonte - MG</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">Site:</span>
                    <span className="valorDetalhe">www.empresatal-mg.com</span>
                  </div>
                </div>
                <button className="botaoCard">Contatar</button>
              </a>
            </div>

            <div className="itemCard">
              <a href="#" className="linkCard">
                <div style={{position: 'relative'}}>
                  <img src="src/assets/empresa1.png" alt="Serviços Sustentáveis" className="imagemCard" />
                </div>
                <h2 className="tituloCard">Empresa Nova</h2>
                <div className="detalhesCard">
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">CEP:</span>
                    <span className="valorDetalhe">80000-000</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">E-mail:</span>
                    <span className="valorDetalhe">contato@empresanova.com</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">Telefone:</span>
                    <span className="valorDetalhe">(41) 91234-0000</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">Cidade:</span>
                    <span className="valorDetalhe">Curitiba - PR</span>
                  </div>
                  <div className="linhaDetalhe">
                    <span className="rotuloDetalhe">Site:</span>
                    <span className="valorDetalhe">www.empresanova.com</span>
                  </div>
                </div>
                <button className="botaoCard">Contatar</button>
              </a>
            </div>
          </div>
        </div>
        
        <div className="pegCarbonoPreview">
          <h5>Cálculo de pegada de carbono:</h5>
          
          <div className="containerGraficos">
            <a href="/placaSolar" className="graficoPreview">
              <img src="src/assets/Energia.png" alt=""  />
            </a>
            <a href="/pegadaCarbono" className="graficoPreview">
              <img src="src/assets/Energia.png" alt="" />
            </a>
          </div>
        </div>
      </div>
      
      <Acessibilidade />
      <Footer />
    </>
  );
}