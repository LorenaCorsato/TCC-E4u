import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Button from '../components/botao';
import CardBotao from '../components/cardBotao.jsx';
import NavBar from '../components/navegacao';
import '../styles/pages/plaSolar.css'; 
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
            cep: cep.replace(/\D/g, '')
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
                <div className="topoConteudoSolar">
                    <div className="textoSolar">
                        <h1><span className="linha">Placas solares</span></h1>
                        <p>As placas solares são a porta de entrada para a energia fotovoltaica. No entanto, com tantos tipos e modelos disponíveis, pode ser um desafio saber qual escolher.
            <br/>

Para simplificar sua decisão e evitar que você perca tempo pesquisando em dezenas de lojas, use nossa calculadora. Ela descobre a quantidade de placas ideal para suas necessidades e permite que você avalie as melhores opções do nosso catálogo selecionado, que já filtrou as melhores placas do mercado.
            <br/>

Após escolher a opção ideal, você será redirecionado com segurança para o site de um vendedor parceiro.</p>
                    </div>

                    <div className="calculoSolar">
                        <form onSubmit={handleSubmit}>
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
                                <div className="tooltip-container">
                                    <span className="help-icon">?</span>
                                    <div className="tooltip-text">
                                        <strong>Como encontrar essa informação:</strong>
<p>Você pode usar o valor de "Consumo em kWh" de um mês, mas para um cálculo mais preciso, o ideal é usar a média. Some o kWh dos últimos meses (veja o "Histórico de Consumo" na sua conta de luz, ou o valor de Kwh de cada uma) e divida pelo número de meses.</p>                                    </div>
                                </div>
                            </div>
                            
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

                <div className="saibaMaisSolar">
                    <h2 className="tituloSaibaMaisSolar">
                        <Link to="/artigo01" className="linkSaibaMaisSolar">Saiba mais</Link>
                    </h2>
                     <CardBotao
                        hrefCardBotao="/artigo01"
                        srcCardBotao="src/assets/energia.jpg"
                        tituloCardBotao="O futuro das energias renováveis no Brasil: Desafios e incentivos"
                        textoCardBotao="Explore os caminhos para um Brasil mais sustentável."
                    />


                    <CardBotao
                        hrefCardBotao="/artigo08"
                        srcCardBotao="src/assets/ImgArtigos/legislação.jpg"
                        tituloCardBotao="Energia solar e legislação: entenda os impactos da lei 14.300/22"
                        textoCardBotao="Saiba como a nova legislação afeta o setor de energia solar."
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}