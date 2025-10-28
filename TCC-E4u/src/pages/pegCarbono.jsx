import React from 'react'; 
import Footer from '../components/rodape';
import Button from '../components/botao.jsx';
import '../styles/pages/pegCarbono.css';
import { useNavigate } from 'react-router-dom';
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
                <div className="textoCarbono">
                    <h1><span className="linha">Pegada de carbono</span></h1>
                    <p>&nbsp;Através das informações fornecidas no questionário, podemos exibir para
                        você seu nível de emissão de CO2.
                        Calcularemos se sua pegada de carbono está em um nível bom ou ruim.
                        Você pode salvar o relatório gerado, utiliza-lo para definir metas e
                        compara-lo com resultados anteriores.<br /><br />
                        Todos os relatórios salvos ficarão armazenados no histórico.</p>
                </div>

                <div className="questionario">
                    <Button onClick={handleQuestionarioClick} btnNome="Questionário"/>
                    <Button href="/historico" btnNome="Histórico"/>
                </div>
            </div>
            <Footer />
        </>
    );
}