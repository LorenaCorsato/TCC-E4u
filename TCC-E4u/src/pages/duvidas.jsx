import '../styles/pages/duvidas.css'
import Footer from '../components/rodape.jsx'
import { useState } from 'react'

export default function Duvidas() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "O que é o E4U?",
      answer: "O E4U é uma plataforma de conscientização ambiental que ajuda pessoas e empresas a entender e reduzir seu impacto no meio ambiente. Oferecemos ferramentas para calcular a pegada de carbono, encontrar soluções de energia solar e aprender com artigos e avaliações da comunidade."
    },
    {
      question: "Os cálculos e serviços são gratuitos?",
      answer: "Sim. Todos os nossos serviços, incluindo o cadastro, o uso das calculadoras e o acesso ao histórico e artigos, são 100% gratuitos."
    },
    {
      question: "Como é feito o cálculo da minha pegada de carbono?",
      answer: "Nosso cálculo fornece uma estimativa anual da sua emissão de CO₂ (em toneladas). O processo funciona da seguinte forma: o usuário preenche o questionário com os seus dados de consumo. Esses dados são multiplicados por fatores de emissão oficiais e, então, somados para encontrar o total anual em quilogramas, salvando no seu histórico. Por fim, o resultado final é dividido por 1000 e exibido ao usuário."
    },
    {
      question: "As fontes para os \"fatores de emissão\" são confiáveis?",
      answer: "Sim. Usamos apenas dados de fontes reconhecidas e padrões da indústria. Nossas principais referências incluem:\n\n• Eletricidade: Fatores médios da rede elétrica brasileira, publicados pelo Ministério da Ciência, Tecnologia e Inovação (MCTI).\n\n• Combustíveis e Veículos: Médias de emissão (g/km) baseadas nas tabelas do INMETRO (PBE Veicular) e metodologias do GHG Protocol Brasil.\n\n• Viagens Aéreas: Estimativas de emissão por distância baseadas nas metodologias da Organização da Aviação Civil Internacional (ICAO)."
    },
    {
      question: "Por que existem dois tipos de cadastro?",
      answer: "A existência desses dois tipos se deve ao questionário de pegada de carbono, pois essa diferença é a forma como nosso sistema identifica se o usuário é uma pessoa física ou jurídica. Assim, podemos direcioná-lo ao questionário de carbono correto e aplicar as regras de cálculo e fatores de emissão certos."
    },
    {
      question: "O que o gráfico de \"Histórico\" mostra?",
      answer: "O gráfico mostra a evolução da emissão de CO₂ do usuário ao longo do tempo. Para que os dados sejam úteis, o gráfico é inteligente. Se todos os cálculos forem de um único ano, ele mostrará os resultados individuais por mês. Se tiver registros de vários anos, ele mostrará a média de emissão de cada ano, permitindo a visualização do progresso a longo prazo."
    },
    {
      question: "Como vocês calculam a quantidade de placas solares necessárias?",
      answer: "Nosso cálculo é complexo e usa várias fontes de dados para dar uma recomendação precisa. Primeiramente, pegamos a \"média de kWh consumidos/mês\" e multiplicamos por 12 para achar seu consumo anual total. Depois, usamos seu CEP para consultar uma API externa (BrasilAPI) e, assim, encontrar a latitude e longitude exatas da sua cidade. Cruzamos esses dados com o nosso banco com mais de 72 mil registros de irradiação solar para encontrar o índice de irradiação solar da sua região. Por fim, usamos uma fórmula de engenharia que considera seu consumo, a irradiação local diária e a eficiência máxima do sistema para descobrir a potência total (Wp) necessária. Com o resultado da fórmula, nosso sistema analisa nosso catálogo de placas fotovoltaicas, calcula quantas placas de cada modelo seriam necessárias e filtra as opções que cabem no \"espaço disponível (m²)\" informado. As 3 opções mais baratas que cabem no espaço são marcadas como \"Recomendado\"."
    },
    {
      question: "O que significa \"Peso Total\" e por que ele aparece?",
      answer: "O \"Peso Total\" é a soma do peso de todas as placas necessárias. Nós mostramos essa informação como um alerta para que você possa verificar com um profissional se a estrutura do seu telhado suporta esse peso antes da instalação. Se não tivermos o dado de peso da fabricante, marcaremos como \"Sem informação\"."
    },
    {
      question: "De onde vêm as avaliações com estrelas das placas?",
      answer: "Elas vêm da nossa própria comunidade. Quando um usuário logado calcula as placas, ele pode clicar nas estrelas e deixar uma nota (de 1 a 5) e uma opinião sobre aquele produto. A nota que você vê é a média de todas as avaliações que aquele produto já recebeu de outros usuários."
    },
    {
      question: "Meu CPF/CNPJ está seguro com vocês?",
      answer: "Sim. Seu CPF ou CNPJ não é salvo em texto puro. No momento do cadastro, o seu dado é processado por um algoritmo que o transforma em um código criptografado de 60 caracteres. Esse código não pode ser revertido para o número original. Isso garante que, mesmo em um cenário extremo de vazamento de dados, seus documentos permaneçam seguros e ilegíveis."
    }
  ];

  return (
    <>
      <main className="conteudoFAQ">
        <div className="faqHeader">
          <h1>Dúvidas Frequentes</h1>
          <p className="faqSubtitle">
            Encontre respostas para as principais questões sobre o E4U
          </p>
        </div>

        <div className="faqContainer">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faqItem ${activeIndex === index ? 'active' : ''}`}
            >
              <button 
                className="faqQuestion"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{faq.question}</span>
                <span className="faqIcon">{activeIndex === index ? '−' : '+'}</span>
              </button>
              <div className="faqAnswer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faqFooterBox">
          <h3>Ainda tem dúvidas?</h3>
          <p>
            Entre em contato conosco pelo email{' '}
            <strong>equipee4u@gmail.com</strong>
          </p>
          <p className="faqEmoji">🌱⚡</p>
        </div>
      </main>
      <Footer />
    </>
  );
}