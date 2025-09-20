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
    const [botijoesGas, setBotijoesGas] = useState('');
    const [consumoEletricidade, setConsumoEletricidade] = useState('');
    const [tipoConsumoEletricidade, setTipoConsumoEletricidade] = useState('R$/mês');
    const [pessoasResidencia, setPessoasResidencia] = useState('1');
    const [tipoEnergia, setTipoEnergia] = useState('elétrica (hidrelétrica)');
    const [viagemAerea, setViagemAerea] = useState('nao');
    const [viagensAdicionadas, setViagensAdicionadas] = useState([]);
    
    // --- Estados temporários para os formulários de adição ---
    const [veiculoAtual, setVeiculoAtual] = useState({ tipo: '', tempo: '', combustivel: '', motor: '' });
    const [viagemAtual, setViagemAtual] = useState({ tipo: '', distancia: '', passageiros: '1' });

    const { token } = useAuth();
    const navigate = useNavigate();

    // --- Listas de Opções ---
    const veiculosOpcoes = ["Carro", "Moto", "Caminhão", "Ônibus", "Bicicleta elétrica", "Patinete elétrico"];
    const tempoOpcoes = ["-30 minutos", "30 minutos", "1-3 horas", "4-6 horas", "7-9 horas", "10+ horas"];
    const combustivelOpcoes = ["Diesel", "Etanol", "Gasolina", "GNV", "Elétrico", "Híbrido"];
    const motorOpcoes = ["1.0 a 1.5", "1.6 a 2.0", "Maior que 2.0", "Não possuo conhecimento"];
    const energiaOpcoes = ["Elétrica (hidrelétrica)", "Solar", "Eólica", "Biomassa"];
    const viagemTipoOpcoes = ["Somente ida", "Ida e volta"];
    const viagemDistanciaOpcoes = ["Até 300km", "300km a 1000km", "1000km a 3000km", "Mais de 3000km"];
    
    // --- Funções para a Seção de Veículos ---
    const handleVeiculoAtualChange = (campo, valor) => {
        setVeiculoAtual(v => ({ ...v, [campo]: valor }));
    };

    const adicionarVeiculo = (e) => {
        e.preventDefault();
        if (!veiculoAtual.tipo || !veiculoAtual.tempo) {
            alert("Selecione o tipo de veículo e o tempo de uso."); return;
        }
        if (veiculoAtual.tipo === 'carro' && (!veiculoAtual.combustivel || !veiculoAtual.motor)) {
            alert("Para carro, por favor selecione o combustível e o motor."); return;
        }
        setVeiculosAdicionados([...veiculosAdicionados, veiculoAtual]);
        setVeiculoAtual({ tipo: '', tempo: '', combustivel: '', motor: '' }); // Limpa
    };

    const removerVeiculo = (index) => {
        setVeiculosAdicionados(veiculosAdicionados.filter((_, i) => i !== index));
    };

    // --- Funções para a Seção de Viagem Aérea ---
    const handleViagemAtualChange = (campo, valor) => {
        setViagemAtual(v => ({ ...v, [campo]: valor }));
    };

    const adicionarViagem = (e) => {
        e.preventDefault();
        if (!viagemAtual.tipo || !viagemAtual.distancia || !viagemAtual.passageiros) {
            alert("Preencha todos os detalhes da viagem para adicionar."); return;
        }
        setViagensAdicionadas([...viagensAdicionadas, viagemAtual]);
        setViagemAtual({ tipo: '', distancia: '', passageiros: '1' }); // Limpa
    };

    const removerViagem = (index) => {
        setViagensAdicionadas(viagensAdicionadas.filter((_, i) => i !== index));
    };

    // --- Função Principal de Envio ---
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Adicione aqui uma validação mais robusta se necessário
        
        const dadosFormulario = { veiculosAdicionados, botijoesGas, consumoEletricidade, tipoConsumoEletricidade, pessoasResidencia, tipoEnergia, viagemAerea, viagensAdicionadas };
        
        try {
            const resposta = await axios.post('http://localhost:3001/api/calculator/calculate', dadosFormulario, { headers: { 'Authorization': `Bearer ${token}` } });
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
                        <p className="pergunta-enunciado">Quais veículos você utiliza? (Adicione um por um)</p>
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
                    
                    {/* --- SEÇÃO DE CASA --- */}
                    <div className="card-pergunta">
                        <label htmlFor="botijoesGas" className="pergunta-enunciado">Qual o seu consumo de gás de cozinha (botijões por ano)?</label>
                        <input id="botijoesGas" type="number" min="0" placeholder="Ex: 4" className="pergunta-texto" value={botijoesGas} onChange={(e) => setBotijoesGas(e.target.value)} required />
                    </div>

                    <PerguntaMultiplaEscolha
                        enunciado="Qual o tipo de energia que você utiliza em sua residência?" name="tipoEnergia"
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

                    <div className="card-pergunta">
                        <label htmlFor="pessoasResidencia" className="pergunta-enunciado">Quantas pessoas moram em sua residência (incluindo você)?</label>
                        <input id="pessoasResidencia" type="number" min="1" className="pergunta-texto" value={pessoasResidencia} onChange={(e) => setPessoasResidencia(e.target.value)} required />
                    </div>

                    {/* --- SEÇÃO DE VIAGEM AÉREA --- */}
                    <PerguntaMultiplaEscolha
                        enunciado="Realizou alguma viagem aérea no último ano?" name="viagemAerea"
                        alternativas={["Sim", "Não"]} valorSelecionado={viagemAerea} onChange={(e) => setViagemAerea(e.target.value)}
                    />

                    {viagemAerea === "Sim" && (
                         <div className="card-pergunta">
                            <p className="pergunta-enunciado">Adicione cada viagem aérea realizada:</p>
                            <div className="veiculo-tempo-container">
                                <select value={viagemAtual.tipo} onChange={(e) => handleViagemAtualChange('tipo', e.target.value)}>
                                    <option value="">Tipo de Viagem</option>
                                    {viagemTipoOpcoes.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                <select value={viagemAtual.distancia} onChange={(e) => handleViagemAtualChange('distancia', e.target.value)}>
                                    <option value="">Distância Total</option>
                                    {viagemDistanciaOpcoes.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div style={{marginTop: '1rem'}}>
                                <label htmlFor="passageiros" style={{fontSize: '1rem', marginBottom: '0.5rem', display: 'block'}}>Passageiros (incluindo você):</label>
                                <input id="passageiros" type="number" min="1" className="pergunta-texto" value={viagemAtual.passageiros} onChange={(e) => handleViagemAtualChange('passageiros', e.target.value)} />
                            </div>
                            <div style={{textAlign: 'right', marginTop: '1rem'}}>
                                <button type="button" className="botao-adicionar" onClick={adicionarViagem}>Adicionar Viagem</button>
                            </div>

                            {viagensAdicionadas.length > 0 && (
                                <ul className="veiculo-tempo-lista">
                                    {viagensAdicionadas.map((item, idx) => (
                                        <li key={idx}>
                                            <span><strong>{item.distancia}</strong> ({item.tipo}) - {item.passageiros} passageiro(s)</span>
                                            <button type="button" onClick={() => removerViagem(idx)}>Remover</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
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