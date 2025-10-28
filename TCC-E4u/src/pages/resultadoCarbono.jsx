import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DicasCarbono from '../components/DicasCarbono';
import NavBar from '../components/navegacao';
import Footer from '../components/rodape';
import './../styles/pages/resultadoCarbono.css';

const getStatusPegada = (toneladas, tipoUsuario) => {
    
    if (tipoUsuario === 'fisica') {
        if (toneladas <= 2.2) {
            return {
                status: 'bom',
                cor: '#668213', 
                mensagem: 'Sua pegada de carbono está ótima! Muito abaixo da média brasileira.'
            };
        } else if (toneladas <= 4.0) {
            return {
                status: 'medio',
                cor: '#F1C40F', 
                mensagem: 'Sua pegada está um pouco acima da média. Há espaço para melhorar.'
            };
        } else {
            return {
                status: 'ruim',
                cor: '#E74C3C', 
                mensagem: 'Sua pegada de carbono está alta. Veja nossas dicas para reduzir.'
            };
        }
    } 
    else if (tipoUsuario === 'juridica') {
        if (toneladas <= 50) {
            return {
                status: 'bom',
                cor: '#668213',
                mensagem: 'As emissões da sua empresa estão em um ótimo nível de controle!'
            };
        } else if (toneladas <= 200) {
            return {
                status: 'medio',
                cor: '#F1C40F', 
                mensagem: 'As emissões da sua empresa estão em um nível de atenção. Veja como otimizar.'
            };
        } else {
            return {
                status: 'ruim',
                cor: '#E74C3C', 
                mensagem: 'As emissões da sua empresa são altas. Veja nossas dicas para um plano de redução.'
            };
        }
    }
    return { status: 'medio', cor: '#555', mensagem: 'Cálculo finalizado.' };
};


export default function Resultado() {
    const location = useLocation();
    const resultado = location.state?.resultado;
    const { usuario, loading } = useAuth();

    if (loading || !resultado || !usuario) {
        return (
            <>
                <NavBar />
                <div className="resultado-container erro" style={{ textAlign: 'center', padding: '2rem' }}>
                    <h1>{loading ? "Carregando..." : "Nenhum resultado para exibir"}</h1>
                    <p>Por favor, <Link to="/">volte</Link> e preencha o questionário primeiro.</p>
                </div>
                <Footer />
            </>
        );
    }
    
    const totalAnualTon = (parseFloat(resultado.totalAnualKg) / 1000).toFixed(2);

    const statusInfo = getStatusPegada(totalAnualTon, usuario.tipo_usuario);

    return (
        <>
            <NavBar />
            <div className="resultado-container" style={{textAlign: 'center', padding: '2rem'}}>
                <h1>Sua pegada de carbono</h1>
                <h1>anual (estimada)</h1>

                <div className="resultado-total">
                    <h2 style={{ fontSize: '4rem', margin: '1rem 0', color: statusInfo.cor }}>
                        {totalAnualTon}
                    </h2>
                    <p>toneladas de CO₂</p>
                </div>
                
                <div className="resultado-comparacao">
                    <p>{statusInfo.mensagem}</p>
                </div>

                <Link to="/historico">Ver meu histórico</Link>

                {statusInfo.status !== 'bom' && (
                    <DicasCarbono 
                        breakdown={resultado.breakdown} 
                        tipoUsuario={usuario.tipo_usuario} 
                    />
                )}
            </div>
            <Footer />
        </>
    );
}