import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Button from "../components/botao";
import NavBar from "../components/navegacao";
import '../styles/pages/questionario.css';

function PerguntaMultiplaEscolha({ enunciado, name, alternativas, onChange, valorSelecionado }) {
    return (
        <div className="card-pergunta">
            <p className="pergunta-enunciado">{enunciado}</p>
            <div className="alternativas">
                {alternativas.map((alt, idx) => (
                    <label key={idx} className="alternativa">
                        <input
                            type="radio"
                            name={name}
                            value={alt}
                            checked={valorSelecionado === alt}
                            onChange={onChange}
                            required
                        />
                        {alt}
                    </label>
                ))}
            </div>
        </div>
    );
}

export default function Questionario() {
    // --- Estados para as seções do formulário ---
    const [veiculosAdicionados, setVeiculosAdicionados] = useState([]);
    const [maquinasAdicionadas, setMaquinasAdicionadas] = useState([]);
    const [botijoesGas, setBotijoesGas] = useState('');
    const [consumoEletricidade, setConsumoEletricidade] = useState('');
    const [tipoConsumoEletricidade, setTipoConsumoEletricidade] = useState('R$/mês');
    const [quantidadeCO2, setQuantidadeCO2] = useState('0');
    const [tipoEnergia, setTipoEnergia] = useState('Elétrica (hidrelétrica)');

    // --- Estados temporários para os formulários de adição ---
    const [veiculoAtual, setVeiculoAtual] = useState({ tipo: '', tempo: '', combustivel: '', motor: '' });
    const [maquinaAtual, setMaquinaAtual] = useState({ tipo: '', consumo: '', combustivel: '' });

    const { token } = useAuth();
    const navigate = useNavigate();

    // --- Listas de Opções ---
    const veiculosOpcoes = ["Carro", "Moto", "Ônibus", "Caminhão"];
    const maquinasOpcoes = ["Tipo de maquina 1", "Tipo de maquina 2", "Tipo de maquina 3", "Tipo de maquina 4", "Tipo de maquina 5", "Tipo de maquina 6"];
    const tempoOpcoes = ["-30 minutos", "30 minutos", "1-3 horas", "4-6 horas", "7-9 horas", "10+ horas"];
    const combustivelOpcoes = ["Diesel", "Etanol", "Gasolina", "GNV", "Elétrico", "Híbrido"];
    const combustivelOpcoesMaquinas = ["Diesel", "Etanol", "Gasolina", "Carvão", "Elétrico"];
    const motorOpcoes = ["1.0 a 1.5", "1.6 a 2.0", "Maior que 2.0", "Não possuo conhecimento"];
    const energiaOpcoes = ["Elétrica (hidrelétrica)", "Solar", "Eólica", "Biomassa"];

    // --- Funções para a Seção de Veículos ---
    const handleVeiculoAtualChange = (campo, valor) => {
        setVeiculoAtual(v => ({ ...v, [campo]: valor }));
    };

    const adicionarVeiculo = (e) => {
        e.preventDefault();
        if (!veiculoAtual.tipo || !veiculoAtual.tempo) {
            alert("Selecione o tipo de veículo e o tempo de uso."); 
            return;
        }
        if (veiculoAtual.tipo === 'Carro' && (!veiculoAtual.combustivel || !veiculoAtual.motor)) {
            alert("Para carro, por favor selecione o combustível e o motor."); 
            return;
        }
        setVeiculosAdicionados([...veiculosAdicionados, veiculoAtual]);
        setVeiculoAtual({ tipo: '', tempo: '', combustivel: '', motor: '' }); // Limpa
    };

    const removerVeiculo = (index) => {
        setVeiculosAdicionados(veiculosAdicionados.filter((_, i) => i !== index));
    };

    // --- Funções para a Seção de Máquinas ---
    const handleMaquinaAtualChange = (campo, valor) => {
        setMaquinaAtual(m => ({ ...m, [campo]: valor }));
    };

    const adicionarMaquina = (e) => {
        e.preventDefault();
        if (!maquinaAtual.tipo || !maquinaAtual.consumo || !maquinaAtual.combustivel) {
            alert("Selecione a máquina, o combustível e informe o consumo."); 
            return;
        }
        setMaquinasAdicionadas([...maquinasAdicionadas, maquinaAtual]);
        setMaquinaAtual({ tipo: '', consumo: '', combustivel: '' }); // Limpa
    };

    const removerMaquina = (index) => {
        setMaquinasAdicionadas(maquinasAdicionadas.filter((_, i) => i !== index));
    };

    // --- Função Principal de Envio ---
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const dadosFormulario = { 
            veiculosAdicionados, 
            maquinasAdicionadas, 
            botijoesGas, 
            consumoEletricidade, 
            tipoConsumoEletricidade, 
            quantidadeCO2, 
            tipoEnergia
        };
        
        try {
            const resposta = await axios.post(
                'http://localhost:3001/api/calculator/calculate', 
                dadosFormulario, 
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            navigate('/resultado', { state: { resultado: resposta.data.resultado } });
        } catch (error) {
            console.error("Erro ao enviar questionário:", error);
            alert("Não foi possível calcular sua pegada. Tente novamente.");
        }
    };

    return (
        <>
            <NavBar />
            <div className="questionario">
                <div className="questionario-titulo"><h1>Questionário</h1></div>
                <div className="texto"><h1>Responda com sinceridade para um resultado mais próximo da sua realidade.</h1></div>

                <form className="perguntas" onSubmit={handleSubmit}>
                    
                    {/* --- SEÇÃO DE VEÍCULOS --- */}
                    <div className="card-pergunta">
                        <p className="pergunta-enunciado">Quais veículos sua empresa utiliza? (Adicione um por um)</p>
                        <div className="veiculo-tempo-container">
                            <select value={veiculoAtual.tipo} onChange={(e) => handleVeiculoAtualChange('tipo', e.target.value)}>
                                <option value="">Selecione o veículo</option>
                                {veiculosOpcoes.map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                            <select value={veiculoAtual.tempo} onChange={(e) => handleVeiculoAtualChange('tempo', e.target.value)}>
                                <option value="">Tempo médio diário total</option>
                                {tempoOpcoes.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        {veiculoAtual.tipo === 'Carro' && (
                            <div className="veiculo-tempo-container" style={{marginTop: '1rem'}}>
                                <select value={veiculoAtual.combustivel} onChange={(e) => handleVeiculoAtualChange('combustivel', e.target.value)}>
                                    <option value="">Tipo de combustível</option>
                                    {combustivelOpcoes.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <select value={veiculoAtual.motor} onChange={(e) => handleVeiculoAtualChange('motor', e.target.value)}>
                                    <option value="">Tamanho do motor</option>
                                    {motorOpcoes.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                        )}
                        <div style={{textAlign: 'right', marginTop: '1rem'}}>
                            <button type="button" className="botao-adicionar" onClick={adicionarVeiculo}>Adicionar Veículo</button>
                        </div>
                        {veiculosAdicionados.length > 0 && (
                            <ul className="veiculo-tempo-lista">
                                {veiculosAdicionados.map((item, idx) => (
                                    <li key={idx}>
                                        <span><strong>{item.tipo}</strong> ({item.tempo}) {item.combustivel && `- ${item.combustivel}`}</span>
                                        <button type="button" onClick={() => removerVeiculo(idx)}>Remover</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                          {/* --- SEÇÃO DE QUANTIDADE DE MAQUINAS --- */}
                    <div className="card-pergunta">
                        <label htmlFor="quantidadeCO2" className="pergunta-enunciado">Qual a quantidade de máquinas emissoras de CO2 sua empresa possui?</label>
                        <input id="quantidadeCO2" type="number" min="1" className="pergunta-texto" value={quantidadeCO2} onChange={(e) => setQuantidadeCO2(e.target.value)} required />
                    </div>

                    {/* --- SEÇÃO DE MÁQUINAS --- */}
                    <div className="card-pergunta">
                        <p className="pergunta-enunciado">Qual o consumo das suas máquinas? (Adicione o tipo)</p>
                        <div className="veiculo-tempo-container">
                            <select value={maquinaAtual.tipo} onChange={(e) => handleMaquinaAtualChange('tipo', e.target.value)}>
                                <option value="">Selecione a máquina</option>
                                {maquinasOpcoes.map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                            <select value={maquinaAtual.combustivel} onChange={(e) => handleMaquinaAtualChange('combustivel', e.target.value)}>
                                <option value="">Tipo de combustível</option>
                                {combustivelOpcoesMaquinas.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <input
                                type="number"
                                min="0"
                                placeholder={
                                    maquinaAtual.combustivel.toLowerCase() === "carvão"
                                        ? "Consumo (kg/mês)"
                                        : maquinaAtual.combustivel.toLowerCase() === "elétrico"
                                            ? "Consumo (kWh/mês)"
                                            : "Consumo (litros/mês)"
                                }
                                value={maquinaAtual.consumo}
                                onChange={(e) => handleMaquinaAtualChange('consumo', e.target.value)}
                            />
                        </div>
                        <div style={{textAlign: 'right', marginTop: '1rem'}}>
                            <button type="button" className="botao-adicionar" onClick={adicionarMaquina}>Adicionar Máquina</button>
                        </div>
                        {maquinasAdicionadas.length > 0 && (
                            <ul className="veiculo-tempo-lista">
                                {maquinasAdicionadas.map((item, idx) => (
                                    <li key={idx}>
                                        <span>
                                            <strong>{item.tipo}</strong> - {item.consumo} {
                                                item.combustivel.toLowerCase() === "carvão"
                                                    ? "kg/mês"
                                                    : item.combustivel.toLowerCase() === "elétrico"
                                                        ? "kWh/mês"
                                                        : "L/mês"
                                            } {item.combustivel && `(${item.combustivel})`}
                                        </span>
                                        <button type="button" onClick={() => removerMaquina(idx)}>Remover</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    {/* --- SEÇÃO DE Empresa --- */}
                    <div className="card-pergunta">
                        <label htmlFor="botijoesGas" className="pergunta-enunciado">Qual o consumo de gás de cozinha na sua empresa? (botijões por ano)</label>
                        <input id="botijoesGas" type="number" min="0" placeholder="Ex: 4" className="pergunta-texto" value={botijoesGas} onChange={(e) => setBotijoesGas(e.target.value)} required />
                    </div>

                    <PerguntaMultiplaEscolha
                        enunciado="Qual o tipo de energia que você utiliza em sua empresa?" name="tipoEnergia"
                        alternativas={energiaOpcoes} valorSelecionado={tipoEnergia} onChange={(e) => setTipoEnergia(e.target.value)}
                    />
                    
                    {tipoEnergia === "Elétrica (hidrelétrica)" && (
                        <div className="card-pergunta">
                            <p className="pergunta-enunciado">Qual o seu consumo de eletricidade?</p>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <input id="consumoEletricidade" type="number" min="0" placeholder="0" className="pergunta-texto" value={consumoEletricidade} onChange={(e) => setConsumoEletricidade(e.target.value)} required />
                                <select value={tipoConsumoEletricidade} onChange={(e) => setTipoConsumoEletricidade(e.target.value)}>
                                    <option>R$/mês</option>
                                    <option>kWh/mês</option>
                                </select>
                            </div>
                        </div>
                    )}




                    <div style={{ marginTop: '2rem' }}>
                        <Button btnNome="Calcular pegada" type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}
