import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './../styles/pages/resultadoCarbono.css'; // 1. Importe o novo CSS



export default function Resultado() {
    const location = useLocation();
    const resultado = location.state?.resultado;

    if (!resultado) {
        return (
            <div>
                <h1>Nenhum resultado para exibir</h1>
                <p>Por favor, <Link to="/questionario">preencha o questionário</Link> primeiro.</p>
            </div>
        );
    }
    
    const totalAnualTon = (parseFloat(resultado.totalAnualKg) / 1000).toFixed(2);

    return (
        <div className="resultado-container" style={{textAlign: 'center', padding: '2rem'}}>
            <h1>Sua pegada de carbono</h1>
            <h1>anual (estimada)</h1>

            <div className="resultado-total">
                <h2 style={{fontSize: '4rem', margin: '1rem 0'}}>{totalAnualTon}</h2>
                <p>toneladas de CO₂</p>
            </div>
            <div className="resultado-comparacao">
                <p>A média de emissões por pessoa no Brasil é de cerca de 2.2 toneladas por ano.</p>
            </div>
            <Link to="/historico">Ver meu histórico</Link>

        </div>
        
        
    );
}