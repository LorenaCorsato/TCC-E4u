import Header from '../components/cabecalho'
import Footer from '../components/rodape'
import NavBar from '../components/navegacao.jsx'
import Button from '../components/botao.jsx'
import '../styles/pages/pegCarbono.css'
import { Link, useNavigate } from 'react-router-dom'

export default function PagCarbono() {
    const navigate = useNavigate();
    return (
        <>
            <NavBar />
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
                    <Button href="/" btnNome="Questionário"/>
                    <Button href="/landingPage" btnNome="Histórico"/>
                </div>
            </div>
        </>
    )
}