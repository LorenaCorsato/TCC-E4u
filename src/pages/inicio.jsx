import { useState, useEffect } from "react";
import NavBar from "../components/navegacao";
import Header from "../components/cabecalho";
import Footer from "../components/rodape";
import Aluno from "../components/aluno";
import Card from "../components/card";
import BotaoIcone from "../components/botaoIcone";
import Acessibilidade from "../components/acessibilidade";
import Popup from "../components/Popup";
import "../styles/pages/inicio.css";
import { color } from "chart.js/helpers";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import funcaoImg from "../assets/lorena.jpg";
import funcaoImg2 from "../assets/gustavo.jpg";
import funcaoImg3 from "../assets/lyncon2.jpg";
import funcaoImg4 from "../assets/lavinia2.jpg";
import funcaoImg5 from "../assets/perfil.png";
import funcaoImg6 from "../assets/gabriela.png";

const textosSlides1 = [
  "Lorena Corsato. Programadora",
  "Gustavo Costa. Designer"

];
const textosSlides2 = [
 "Lyncon Santos. Programador",
  "Lavinía Keiller. Documentadora"

];
const textosSlides3 = [
 "Raphael Scapin. Programador",
  "Gabriela Prado. Documentadora"

];

export default function Inicio() {
  const [paragrafos, setParagrafos] = useState(["", "", "", ""]);
  const [titulo, setTitulo] = useState(["", "", "", ""]);
  const [mudar, setMudar] = useState("");
  const [openPopup, setOpenPopup] = useState(null);
  const [clicado, setClicado] = useState([false, false, false, false]);
  const [slideAtivo1, setSlideAtivo1] = useState(0);
  const [slideAtivo2, setSlideAtivo2] = useState(0);
  const [slideAtivo3, setSlideAtivo3] = useState(0);

  // Dados para os novos pop-ups 
  const beneficiosPopups = [
    {
      title: "Para o Meio Ambiente",
      initialContent: "Captar energia por meio de fontes limpas e renováveis...",
      fullContent: "Captar energia através de fontes limpas e renováveis ajuda na preservação do ambiente natural e na biodiversidade. Controlar sua pegada de carbono ajuda a diminuir a quantidade de gases do efeito estufa na atmosfera, contribuindo para a redução do aquecimento global e eventos climáticos extremos."  },
    {
      title: "Para o Seu Bolso",
      initialContent: "Com a eficiência energética, por meio da utilização...",
      fullContent: "Contando com a eficiência energética, através da utilização de fontes renováveis e a otimização de processos industriais obterá economias significativas em custos operacionais. Mesmo para a sua casa, com o uso da energia fotovoltaica, a dependência da energia da rede não será necessária, diminuindo o valor da conta de luz."  },
    {
      title: "Para o Seu Conhecimento",
      initialContent: "Sustentabilidade é o que se mais ouve falar atualmente...",
      fullContent: "Sustentabilidade é o que se ouve falar atualmente, e para ajudar o meio ambiente, é essencial que o conhecimento seja acessível a todos. O Brasil conta com 27 empresas no ranking de sustentabilidade anual e 8 das maiores empresas sustentáveis do mundo. Não perca a oportunidade de entrar na onda sustentável, com nosso site você encontra o conhecimento necessário para ir além." },
    {
      title: "Para o Seu Estilo de Vida",
      initialContent: "Ao escolher utilizar a energia fotovoltaica, você incentivará ...",
      fullContent: "Ao escolher utilizar a energia fotovoltaica, você incentivará o próximo a repensar seus hábitos de vida, alcançará a independência energética e conquistará excelente imagem ao seu imóvel. Controlando a pegada de carbono poderá melhorar a qualidade do ar, conscientizará pessoas ao redor e atingirá a melhor qualidade de vida."   },
    {
      title: "Para a Sua Empresa",
      initialContent: "Adotar energia fotovoltaica em sua empresa ...",
      fullContent: "Adotar energia fotovoltaica em sua empresa não só diminui gastos ou ajuda o meio ambiente como também transforma sua imagem para o público como uma corporação ativa nas questões socioambientais."
    },
    {
      title: "Para a Sua Família",
      initialContent: "Investir no uso de energia...",
      fullContent: "Investir no uso de energia renovável em sua casa vai muito além de diminuir gastos e sim priorizar um presente e um futuro melhor para as pessoas de sua família, visando alcançar a excelente qualidade de vida."
    },
  ];

  useEffect(() => {
    MudarParagrafo1();
  }, []);

  function MudarParagrafo1() {
    setParagrafos([
      "A maneira como trabalhamos e os problemas que buscamos resolver devem beneficiar e auxiliar usuários de todo o estado de São Paulo, independentemente de sua posição social ou do local onde vivem.",
      "A maneira como trabalhamos e os problemas que buscamos resolver devem beneficiar e auxiliar usuários de todo o estado de São Paulo, independentemente de sua posição social ou do local onde vivem.",
      "Buscamos adquirir conhecimento e incentivar os usuários a terem essa incrível e necessária curiosidade, construindo, assim, uma troca que visa o bem-estar geral e a boa convivência com o espaço em que vivemos.",
      "Temos como princípio sempre incluir e melhorar a experiência de usabilidade para todos os tipos de usuário, usando ferramentas de integração para daltônicos e ajudando a criar um ambiente favorável para quaisquer pessoas."
    ]);

    setTitulo([
      "Apoiar usuários de diversos lugares:",
      "Disponibilizar informação:",
      "Incentivar o aprendizado:",
      "Incluir todas as pessoas:"
    ]);

    setClicado([true, false, false, false])
  }

  function MudarParagrafo2() {
    setParagrafos([
      "Nós nos preocupamos com o meio ambiente e, por meio do E4u, toda interação é uma oportunidade de fortalecer nosso comprometimento e dar aos usuários a sensação de proximidade com os temas sustentáveis.",
      "Todas as informações presentes são devidamente claras e pensadas de forma que o público geral possa ter o devido entendimento e clareza sobre o que foi transmitido e sobre os processos realizados no site.",
      "Queremos que nossos usuários continuem conosco, sabendo que respeitamos o tempo que dedicaram a nós. Por meio de nosso constante investimento, conseguimos essa confiança.",
      "Nossa missão consiste em facilitar o acesso à informação, o aprendizado e a utilização de nossa ferramenta, usando uma linguagem simples, porém correta, de modo que, desde grandes empresas a pessoas comuns, todos possam acessar sem problemas."
    ]);

    setTitulo([
      "Fazer parte da campanha sustentável:",
      "Apresentar claramente:",
      "Valorizar o que importa:",
      "Simplificar o complicado:"
    ]);

    setClicado([false, true, false, false])
  }

  function MudarParagrafo3() {
    setParagrafos([
      "Mantemos os dados de nossos usuários em segurança, garantindo que não sejam vazados, roubados ou utilizados de maneira ilegal ou não autorizada.",
      "Em nosso site, priorizamos recomendar aparelhos para o armazenamento e a geração de energia que mantenham um padrão de segurança.",
      "Pensamos no financeiro de nossos usuários utilizando um sistema de filtragem de preços para que possam buscar o que desejam com consciência e segurança.",
      "Nossos questionários são totalmente seguros; nenhuma pessoa terá acesso às respostas fornecidas ao nosso sistema, apenas o próprio usuário."
    ]);

    setTitulo([
      "Dados protegidos:",
      "Aparelhos seguros:",
      "Segurança financeira:",
      "Questionários anônimos:"
    ]);

    setClicado([false, false, true, false])
  }

  function MudarParagrafo4() {
    setParagrafos([
      "Principalmente para empresas, os detalhes são muito importantes. Dedicamos muita atenção e planejamento nos gráficos, artigos e sugestões exibidos.",
      "Tudo foi meticulosamente verificado e analisado por toda a nossa equipe, garantindo a veracidade e o compromisso com o conhecimento que oferecemos aos usuários, e prevalecendo a honestidade acima de tudo.",
      "Criamos um ambiente respeitoso, sem a intromissão de quaisquer tipos de ofensas ou mensagens subliminares que poderiam gerar desconforto. O respeito mútuo é a base para uma boa relação e para um ambiente com credibilidade.",
      "No E4u, priorizamos a facilidade, a velocidade e a praticidade em todas as ações a serem realizadas, devido ao tempo precioso de todos, buscando ‘poupar’ esse tempo que poderia ser desperdiçado sem nossa ajuda."
    ]);

    setTitulo([
      "Enfatizar os detalhes:",
      "Confirmar todas as informações:",
      "Respeitar os usuários:",
      "Priorizar a excelência:"
    ]);

    setClicado([false, false, false, true])
  }

  function MudarTitulo1() {
    setTitulo([
      "Apoiar usuários de diversos lugares:",
      "Disponibilizar informação:",
      "Incentivar o aprendizado:",
      "Incluir todas as pessoas:"
    ]);
  }

  function MudarTitulo2() {
    setTitulo([
      "Fazer parte da campanha sustentável:",
      "Apresentar claramente:",
      "Valorizar o que importa:",
      "Simplificar o complicado:"
    ]);
  }

  function MudarTitulo3() {
    setTitulo([
      "Dados protegidos:",
      "Aparelhos seguros:",
      "Segurança financeira:",
      "Questionários anônimos:"
    ]);
  }

  function MudarTitulo4() {
    setTitulo([
      "Enfatizar os detalhes:",
      "Confirmar todas as informações:",
      "Respeitar os usuários:",
      "Priorizar a excelência:"
    ]);
  }

  function MudarB1() {
    setMudar("Captar energia por meio de fontes limpas e renováveis ajuda na preservação do ambiente natural e da biodiversidade. Controlar sua pegada de carbono ajuda a diminuir a quantidade de gases do efeito estufa na atmosfera, contribuindo para a redução do aquecimento global e de eventos climáticos extremos.");
  }

  function MudarB2() {
    setMudar("Com a eficiência energética, por meio da utilização de fontes renováveis e da otimização de processos industriais, você obterá economias significativas em custos operacionais. Mesmo para a sua casa, com o uso da energia fotovoltaica, a dependência da energia da rede será menor, diminuindo o valor da conta de luz.");
  }

  function MudarB3() {
    setMudar("Sustentabilidade é o que se mais ouve falar atualmente e, para ajudar o meio ambiente, é essencial que o conhecimento seja acessível a todos. O Brasil conta com 27 empresas no ranking de sustentabilidade anual e 8 das maiores empresas sustentáveis do mundo. Não perca a oportunidade de entrar nessa onda sustentável; em nosso site, você encontra o conhecimento necessário para ir além.");
  }

  function MudarB4() {
    setMudar("Ao escolher utilizar a energia fotovoltaica, você incentivará outras pessoas a repensarem seus hábitos de vida, alcançará a independência energética e conquistará uma excelente imagem para o seu imóvel. Controlando a pegada de carbono, você poderá melhorar a qualidade do ar, conscientizar pessoas ao redor e atingir uma melhor qualidade de vida.");
  }

  const textosSlides = [
    "Texto do slide 1",
    "Texto do slide 2",
    "Texto do slide 3",
    "Texto do slide 4"
  ];

  return (
    <>


      <Header />

      <div className="inicio">

        <div className="conteinerExplicacao">
          <div className="explicacao">
            <div className="explicacao-left">
              <div className="explicacao-item">
                <p> <h3>Como funciona o calculo de energia para placas solares:</h3>
                Informe seu consumo, CEP e espaço disponível. Nosso sistema cruza esses dados com a irradiação solar local para recomendar as placas ideais do nosso catálogo que suprem sua necessidade e cabem no seu telhado.</p>
              </div>
              <div className="explicacao-item">
                <p><h3>Como nossos artigos vão te ajudar:</h3>
                Possuímos artigos informativos que vão te esclarecer sobre como anda o mercado sustentável para civis e empresas, questões jurídicas como a lei 14.300/22 junto a incentivos fiscais do governo, responsabilidades de grandes empresas e civis a favor da sustentabilidade e explicações sobre a pegada de carbono
                </p>
              </div>
              <div className="explicacao-item">
                <p><h3>Como funciona a pegada de carbono:</h3>
                A pegada de carbono ajuda a entender o quanto cada individuo ou empresa emite de gases contribuindo para o efeito estufa, calculamos isso usando um questionário de poucas perguntas e baseada na resposta encontramos soluções possíveis para a diminuição da emissão desses gases</p>
                </div>
            </div>

            <div className="explicacao-right"> </div>
          </div> 
        </div>

        <div className="descricoes">
          <div className="topicos">
            <a onClick={MudarParagrafo1} className={`topico ${clicado[0] ? "ativo" : ""}`}>
              <span className="linha"> Auxílio ao usuário</span>
            </a>
            <a onClick={MudarParagrafo2} className={`topico ${clicado[1] ? "ativo" : ""}`}>
              <span className="linha"> Ambiente limpo e agradável</span>
            </a>
            <a onClick={MudarParagrafo3} className={`topico ${clicado[2] ? "ativo" : ""}`}>
              <span className="linha"> Segurança</span>
            </a>
            <a onClick={MudarParagrafo4} className={`topico ${clicado[3] ? "ativo" : ""}`}>
              <span className="linha"> Seriedade</span>
            </a>
          </div>

          <div className="paragrafos-cards">
            <div className="paragrafo-card">
              <span className="paragrafo-titulo">{titulo[0]}</span>
              <span className="paragrafo-texto">{paragrafos[0]}</span>
            </div>
            <div className="paragrafo-card">
              <span className="paragrafo-titulo">{titulo[1]}</span>
              <span className="paragrafo-texto">{paragrafos[1]}</span>
            </div>
            <div className="paragrafo-card">
              <span className="paragrafo-titulo">{titulo[2]}</span>
              <span className="paragrafo-texto">{paragrafos[2]}</span>
            </div>
            <div className="paragrafo-card">
              <span className="paragrafo-titulo">{titulo[3]}</span>
              <span className="paragrafo-texto">{paragrafos[3]}</span>
            </div>
          </div>
        </div>

        <div className="beneficios-popups-container">
          <h1 className="beneficios-titulo">
            <span className="linha">Benefícios</span>
          </h1>
          <div className="beneficios-popups">
            {beneficiosPopups.map((item, index) => (
              <Popup
                key={`beneficio-${index}`}
                title={item.title}
                initialContent={item.initialContent}
                fullContent={item.fullContent}
                isOpen={openPopup === index}
                onToggle={() => setOpenPopup(openPopup === index ? null : index)}
                onClose={() => openPopup === index && setOpenPopup(null)}
              />
            ))}
          </div>
        </div>

        <div className="cards-verdes">
          <Card srcCard="src/assets/energia - lading page.png" tituloCard="Energia" textoCard="Utilize energia com aparelhos de qualidade e estabelecendo seus próprios limites. Oferecemos a oportunidade de saber com clareza a quantidade de energia que você utiliza para ajudá-lo da melhor maneira possível." />
          <Card srcCard="src/assets/Eficiencia - lading page.png" tituloCard="Eficiência" textoCard="Garantimos uma experiência positiva, que promete resultados, melhorando a geração de energia e reduzindo o nível de poluição emitido." />
          <Card srcCard="src/assets/ecologia - lading page.png" tituloCard="Ecologia" textoCard="Ao mesmo tempo em que você se beneficia, ainda ajuda a natureza com um sistema limpo e sustentável, mantendo o meio ambiente e a consciência limpos." />
          <Card srcCard="src/assets/economia - lading page.png" tituloCard="Economia" textoCard="Além de ajudar a natureza, também ajudamos a sua carteira. O investimento em aparelhos de energia limpa promete uma redução nos custos de energia a longo prazo, aumentando a eficiência e diminuindo o peso no bolso." />
        </div>

        <div className="objetivos">
          <div className="objetivos-conteudo">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/6nALgJdfgKc?si=kCSJN_t2vGz634gQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            <div className="texto-e-carrosseis">
              <p className="texto-ao-lado">
                Nós do E4U nos propusemos a desenvolver uma aplicação com a finalidade de informar e conscientizar sobre os benefícios da energia fotovoltaica e a pegada de carbono na atmosfera.
              </p>
              <div className="mini-swipers-row">
                <div className="mini-swiper-col">
                  <Swiper
                    effect="coverflow"
                    grabCursor={false}
                    centeredSlides={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper"
                    onSlideChange={swiper => setSlideAtivo1(swiper.realIndex)}
                  >
                    <SwiperSlide>
                      <img src={funcaoImg} alt="Lorena C. Programadora" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={funcaoImg2} alt="Gustavo M. Designer" />
                    </SwiperSlide>
                  </Swiper>
                  <p className="mini-swiper-text">{textosSlides1[slideAtivo1]}</p>
                </div>

                <div className="mini-swiper-col">
                  <Swiper
                    effect="coverflow"
                    grabCursor={false}
                    centeredSlides={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper"
                    onSlideChange={swiper => setSlideAtivo2(swiper.realIndex)}
                  >
                    <SwiperSlide>
                      <img src={funcaoImg3} alt="Lyncon S. Programador" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={funcaoImg4} alt="Lavinía Keiller. Documentadora" />
                    </SwiperSlide>
                  </Swiper>
                  <p className="mini-swiper-text">{textosSlides2[slideAtivo2]}</p>
                </div>

                <div className="mini-swiper-col">
                  <Swiper
                    effect="coverflow"
                    grabCursor={false}
                    centeredSlides={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper"
                    onSlideChange={swiper => setSlideAtivo3(swiper.realIndex)}
                  >
                    <SwiperSlide>
                      <img src={funcaoImg5} alt="Raphael S. Programador" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src={funcaoImg6} alt="Gabriela Documentadora" />
                    </SwiperSlide>
                  </Swiper>
                  <p className="mini-swiper-text">{textosSlides3[slideAtivo3]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 

      <Acessibilidade />
      <Footer />
    </>
  );
}