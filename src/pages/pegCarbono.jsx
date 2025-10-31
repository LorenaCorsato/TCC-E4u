import React from 'react'; 
import Footer from '../components/rodape';
import Button from '../components/botao.jsx';
import CardBotao from '../components/cardBotao.jsx';
import '../styles/pages/pegCarbono.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

export default function PagCarbono() {
    const navigate = useNavigate();
    const { usuario } = useAuth(); 
    const handleQuestionarioClick = () => {
        if (!usuario) {
            navigate('/login');
            return;
        }

        if (usuario.tipo_usuario === 'fisica') {
            navigate('/questionario');
        } else if (usuario.tipo_usuario === 'juridica') {
            navigate('/questionarioJ');
        } else {
            alert("Tipo de usuário não reconhecido.");
            navigate('/landingPage');
        }
    };

    return (
        <>
            <div className="pagPegCarbono">
                <div className="topoConteudo">
                    <div className="textoCarbono">
                        <h1><span className="linha">Pegada de carbono</span></h1>
                        <p>&nbsp;Com base em suas respostas, calculamos sua pegada de carbono — o indicador que mede o total de gases de efeito estufa (como o CO2) gerados por suas atividades diárias.
            <br/>

Vamos exibir seu nível de emissão (classificado como baixo, moderado ou alto) para que você entenda seu impacto atual.

Mais importante: se sua emissão puder ser melhorada, indicaremos a área que mais precisa de atenção e daremos dicas práticas para você começar a reduzi-la.
            <br/>

Para visualizar sua jornada, todos os seus resultados serão salvos em um gráfico.<br /><br />
                        </p>
                    </div>

                    <div className="questionario">
                        <Button onClick={handleQuestionarioClick} btnNome="Questionário"/>
                        <Button href="/historico" btnNome="Histórico"/>
                    </div>
                </div>

                <div className="saibaMaisCarbono">
                    <h2 className="tituloSaibaMais">
                        <Link to="/artigo02" className="linkSaibaMais">Saiba mais</Link>
                    </h2>             
                    <CardBotao
                        hrefCardBotao="/artigo02"
                        srcCardBotao="src/assets/co2.jpg"
                        tituloCardBotao="Pegada de carbono: o que é, como calcular e como reduzir?"
                        textoCardBotao="Aprenda a medir e diminuir seu impacto ambiental."
                    />

                    <CardBotao
                        hrefCardBotao="/artigo06"
                        srcCardBotao="src/assets/ImgArtigos/Fiscal1.jpg"
                        tituloCardBotao="Incentivos fiscais para sustentabilidade: Como funcionam e quem pode usar?"
                        textoCardBotao="Descubra como os incentivos fiscais podem impulsionar práticas sustentáveis."
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}