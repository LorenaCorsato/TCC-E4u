import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Button from "../components/botao";
import NavBar from "../components/navegacao";
import '../styles/pages/questionario.css';
import Footer from '../components/rodape'; 

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

export default function QuestionarioJuridico() {
    const [veiculosAdicionados, setVeiculosAdicionados] = useState([]);
    const [maquinasAdicionadas, setMaquinasAdicionadas] = useState([]);
    const [botijoesGas, setBotijoesGas] = useState('');
    const [consumoEletricidade, setConsumoEletricidade] = useState('');
    const [tipoConsumoEletricidade, setTipoConsumoEletricidade] = useState('R$/mês');
    const [quantidadeMaquinas, setQuantidadeMaquinas] = useState(0); 
    const [tipoEnergia, setTipoEnergia] = useState('Elétrica');

    const [veiculoAtual, setVeiculoAtual] = useState({ tipo: '', tempo: '', combustivel: '', motor: '' });
    const [maquinaAtual, setMaquinaAtual] = useState({ tipo: '', consumo: '', combustivel: '' });

    const { token } = useAuth();
    const navigate = useNavigate();

    const veiculosOpcoes = ["Carro", "Moto", "Ônibus", "Caminhão"];
    const maquinasOpcoes = ["Tipo de maquina 1", "Tipo de maquina 2", "Tipo de maquina 3", "Tipo de maquina 4", "Tipo de maquina 5", "Tipo de maquina 6"];
    const tempoOpcoes = ["-30 minutos", "30 minutos", "1-3 horas", "4-6 horas", "7-9 horas", "10+ horas"];
    const combustivelOpcoes = ["Diesel", "Etanol", "Gasolina", "GNV", "Elétrico", "Híbrido"];
    const combustivelOpcoesMaquinas = ["Diesel", "Etanol", "Gasolina", "Carvão", "Elétrico"];
    const motorOpcoes = ["1.0 a 1.5", "1.6 a 2.0", "Maior que 2.0", "Não possuo conhecimento"];
    const energiaOpcoes = ["Elétrica", "Solar", "Eólica", "Biomassa"];

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
        setVeiculoAtual({ tipo: '', tempo: '', combustivel: '', motor: '' }); 
    };

    const removerVeiculo = (index) => {
        setVeiculosAdicionados(veiculosAdicionados.filter((_, i) => i !== index));
    };

    const handleMaquinaAtualChange = (campo, valor) => {
        setMaquinaAtual(m => ({ ...m, [campo]: valor }));
    };

    const adicionarMaquina = (e) => {
        e.preventDefault();
        if (maquinasAdicionadas.length >= quantidadeMaquinas) {
            alert("Você já adicionou a quantidade total de máquinas informada.");
            return;
        }
        if (!maquinaAtual.consumo || !maquinaAtual.combustivel) {
            alert("Selecione o combustível e informe o consumo da máquina."); 
            return;
        }
        setMaquinasAdicionadas([...maquinasAdicionadas, maquinaAtual]);
        setMaquinaAtual({ consumo: '', combustivel: '' }); 
    };

    const removerMaquina = (index) => {
        setMaquinasAdicionadas(maquinasAdicionadas.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (parseInt(quantidadeMaquinas, 10) > 0 && maquinasAdicionadas.length !== parseInt(quantidadeMaquinas, 10)) {
            alert(`Você informou ${quantidadeMaquinas} máquinas, mas adicionou ${maquinasAdicionadas.length}. Por favor, adicione todas as máquinas.`);
            return;
        }
        if (!botijoesGas || (tipoEnergia === 'Elétrica' && !consumoEletricidade)) {
            alert("Por favor, preencha os campos de consumo de Gás e Eletricidade.");
            return;
        }
        
        const dadosFormulario = { 
            veiculosAdicionados, 
            maquinasAdicionadas, 
            botijoesGas, 
            consumoEletricidade, 
            tipoConsumoEletricidade, 
            quantidadeMaquinas, 
            tipoEnergia
        };
        
        try {
            const resposta = await axios.post(
                'http://localhost:3001/api/calculator/calculate/juridica', 
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
            <div className="questionario1">
                <div className="questionario-titulo"><h1>Questionário Empresarial</h1></div>
                <div className="texto"><h1>Responda com sinceridade para um resultado mais próximo da sua realidade.</h1></div>

                <form className="perguntas" onSubmit={handleSubmit}>
                    
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

                    <div className="card-pergunta">
                        <label htmlFor="quantidadeMaquinas" className="pergunta-enunciado">Qual a quantidade de máquinas (com emissão direta) sua empresa possui?</label>
                        <input id="quantidadeMaquinas" type="number" min="0" placeholder="0" className="pergunta-texto" value={quantidadeMaquinas} onChange={(e) => setQuantidadeMaquinas(e.target.value)} required />
                    </div>

                    {quantidadeMaquinas > 0 && (
                        <div className="card-pergunta">
                            <p className="pergunta-enunciado">Adicione o consumo MENSAL de cada máquina ({maquinasAdicionadas.length} de {quantidadeMaquinas} adicionadas):</p>
                            <div className="veiculo-tempo-container">
                                <select value={maquinaAtual.combustivel} onChange={(e) => handleMaquinaAtualChange('combustivel', e.target.value)}>
                                    <option value="">Tipo de combustível</option>
                                    {combustivelOpcoesMaquinas.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder={
                                        maquinaAtual.combustivel.toLowerCase() === "carvão" ? "Consumo (kg/mês)"
                                        : maquinaAtual.combustivel.toLowerCase() === "elétrico" ? "Consumo (kWh/mês)"
                                        : "Consumo (litros/mês)"
                                    }
                                    value={maquinaAtual.consumo}
                                    onChange={(e) => handleMaquinaAtualChange('consumo', e.target.value)}
                                    className="pergunta-texto"
                                />
                            </div>
                            <div style={{textAlign: 'right', marginTop: '1rem'}}>
                                <button 
                                    type="button" 
                                    className="botao-adicionar" 
                                    onClick={adicionarMaquina}
                                    disabled={maquinasAdicionadas.length >= quantidadeMaquinas}
                                >
                                    Adicionar Máquina
                                </button>
                            </div>
                            {maquinasAdicionadas.length > 0 && (
                                <ul className="veiculo-tempo-lista">
                                    {maquinasAdicionadas.map((item, idx) => (
                                        <li key={idx}>
                                            <span>
                                                <strong>Máquina {idx + 1} ({item.combustivel})</strong>: {item.consumo} {
                                                    item.combustivel.toLowerCase() === "carvão" ? "kg/mês"
                                                    : item.combustivel.toLowerCase() === "elétrico" ? "kWh/mês"
                                                    : "L/mês"
                                                }
                                            </span>
                                            <button type="button" onClick={() => removerMaquina(idx)}>Remover</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                    
                    <div className="card-pergunta">
                        <label htmlFor="botijoesGas" className="pergunta-enunciado">Qual o consumo de gás de cozinha na sua empresa? (botijões por ano)</label>
                        <input id="botijoesGas" type="number" min="0" placeholder="Ex: 12" className="pergunta-texto" value={botijoesGas} onChange={(e) => setBotijoesGas(e.target.value)} required />
                    </div>

                    <PerguntaMultiplaEscolha
                        enunciado="Qual o tipo de energia que você utiliza em sua empresa?" name="tipoEnergia"
                        alternativas={energiaOpcoes} valorSelecionado={tipoEnergia} onChange={(e) => setTipoEnergia(e.target.value)}
                    />
                    
                    {tipoEnergia === "Elétrica" && (
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
            <Footer />
        </>
    );
}