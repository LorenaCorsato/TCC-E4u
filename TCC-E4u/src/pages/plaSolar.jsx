import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Button from '../components/botao';
import NavBar from '../components/navegacao';
import '../styles/pages/plaSolar.css'; // Mantenha a importação do seu CSS
import Footer from '../components/rodape';

export default function PagSolar() {
    const [mediaConsumoKwh, setMediaConsumoKwh] = useState("");
    const [espacoDisponivelM2, setEspacoDisponivelM2] = useState("");
    const [cep, setCep] = useState("");
    const [mensagem, setMensagem] = useState("");
    
    const { token } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mediaConsumoKwh || !espacoDisponivelM2 || !cep) {
            setMensagem("Por favor, preencha todos os campos.");
            return;
        }
        
        const dadosFormulario = {
            mediaConsumoKwh: parseFloat(mediaConsumoKwh),
            espacoDisponivelM2: parseFloat(espacoDisponivelM2),
            cep: cep.replace(/\D/g, '') // Remove traços e pontos do CEP
        };

        setMensagem("Calculando...");
        try {
            const resposta = await axios.post(
                'http://localhost:3001/api/solar/calculate',
                dadosFormulario,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            navigate('/resultadoSolar', { state: { resultado: resposta.data } });
        } catch (error) {
            setMensagem(error.response?.data?.mensagem || "Erro ao calcular. Tente novamente.");
        }
    };

    return (
        <>
            <NavBar />
            <div className="pagPlaSolar">
                <div className="textoSolar">
                    <h1><span className="linha">Placas solares</span></h1>
                    <p>As placas solares são a forma de armazenar e usar a energia fotovoltaica. Mas
                        existem diversos tipos e modelos de placas para venda.
                        Para auxiliar na escolha daquela que melhor se encaixa na sua situação, use
                        nosso cálculo para buscar o ideal para você.</p>
                </div>

                <div className="calculoSolar">
                    <form onSubmit={handleSubmit}>
                        {/* Campo Média kWh */}
                        <div className="input-container">
                            <input 
                                id="mediaConsumo"
                                type="number" 
                                value={mediaConsumoKwh} 
                                onChange={e => setMediaConsumoKwh(e.target.value)} 
                                required 
                                placeholder=" " 
                            />
                            <label htmlFor="mediaConsumo">Média kWh consumidos/mês</label>
                        </div>
                        
                        {/* Campo Espaço Disponível */}
                        <div className="input-container">
                            <input 
                                id="espacoDisponivel"
                                type="number" 
                                value={espacoDisponivelM2} 
                                onChange={e => setEspacoDisponivelM2(e.target.value)} 
                                required 
                                placeholder=" "
                            />
                            <label htmlFor="espacoDisponivel">Espaço disponível em m²</label>
                        </div>

                        {/* Campo CEP */}
                        <div className="input-container">
                            <input 
                                id="cep"
                                type="text" 
                                value={cep} 
                                onChange={e => setCep(e.target.value)} 
                                maxLength="9" 
                                required 
                                placeholder=" "
                            />
                            <label htmlFor="cep">Seu CEP</label>
                        </div>
                        
                        <Button btnNome="Calcular" type="submit" />
                    </form>
                    {mensagem && <p style={{color: '#234F1E', marginTop: '1rem'}}>{mensagem}</p>}
                </div>
            </div>
                        <Footer />

        </>
    );
}