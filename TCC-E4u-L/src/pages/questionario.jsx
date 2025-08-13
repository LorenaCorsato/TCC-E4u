import React, { useState } from "react";
import PerguntasCarb from "../components/perguntasCarb";
import Button from "../components/botao";
import NavBar from "../components/navegacao";
import '../styles/pages/questionario.css';

export default function Questionario() {
    const [valorGas, setValorGas] = useState("");
    const [valorEletricidade, setValorEletricidade] = useState("");
    const [respostaPergunta5, setRespostaPergunta5] = useState("");
    const [respostas, setRespostas] = useState({
        pergunta6: "",
        numeroPessoas: ""
    });

    // Novos estados para veículos e tempos
    const [veiculoSelecionado, setVeiculoSelecionado] = useState("");
    const [tempoSelecionado, setTempoSelecionado] = useState("");
    const [veiculosTempos, setVeiculosTempos] = useState([]);

    const veiculos = ["Carro", "Moto", "Caminhão", "Ônibus", "Bicicleta"];
    const tempos = [
        " -30 minutos",
        "30 minutos",
        "1-3 horas",
        "4-6 horas",
        "7-9 horas",
        "10 horas ou mais"
    ];

    const destinos = ["Oceania", "América do Norte", "América do Sul", "Europa", "África", "Ásia", "Antártida", "América Central"];


    function formatarReais(valor) {
        let v = valor.replace(/\D/g, "");
        v = v.padStart(3, "0");
        v = v.replace(/(\d+)(\d{2})$/, "$1,$2");
        v = v.replace(/^0+(\d)/, "$1");
        return v;
    }

    function adicionarVeiculoTempo(e) {
        e.preventDefault();
        if (!veiculoSelecionado || !tempoSelecionado) {
            alert("Selecione um veículo e um tempo médio!");
            return;
        }
        setVeiculosTempos(list => [
            ...list,
            { veiculo: veiculoSelecionado, tempo: tempoSelecionado }
        ]);
        setVeiculoSelecionado("");
        setTempoSelecionado("");
    }

    function removerVeiculoTempo(idx) {
        setVeiculosTempos(list => list.filter((_, i) => i !== idx));
    }

    function validarFormulario(event) {
        event.preventDefault();

        if (
            veiculosTempos.length === 0 ||
            !valorGas ||
            !valorEletricidade ||
            !respostaPergunta5 ||
            (respostaPergunta5 === "Sim" && (!respostas.pergunta6 || !respostas.numeroPessoas))
        ) {
            alert("Por favor, responda todas as perguntas obrigatórias.");
            return;
        }

        console.log("Formulário enviado com sucesso!");
        window.location.reload(); // Recarrega a página
    }

    return (
        <>
            <NavBar />
            <div className="questionario">
                <div className="questionario-titulo">
                    <h1>Questionário</h1>
                </div>

                <div className="texto">
                    <h1>Para a realização do questionário responda todas as perguntas, e para um resultado mais próximo da sua realidade responda com sinceridade.</h1>
                </div>

                <form className="perguntas" onSubmit={validarFormulario}>
                    <div className="card-pergunta">
                        <div className="pergunta-content">
                            <p className="pergunta-enunciado">Selecione os veículos e o tempo médio deles :</p>
                            
                            <div className="veiculo-tempo-container">
                                <select
                                    value={veiculoSelecionado}
                                    onChange={e => setVeiculoSelecionado(e.target.value)}
                                    className="pergunta-texto"
                                >
                                    <option value="">Selecione o veículo</option>
                                    {veiculos
                                        .filter(v => !veiculosTempos.some(item => item.veiculo === v))
                                        .map((v, idx) => (
                                            <option key={idx} value={v}>{v}</option>
                                        ))}
                                </select>
                                <select
                                    value={tempoSelecionado}
                                    onChange={e => setTempoSelecionado(e.target.value)}
                                    className="pergunta-texto"
                                >
                                    <option value="">Tempo médio diário</option>
                                    {tempos.map((t, idx) => (
                                        <option key={idx} value={t}>{t}</option>
                                    ))}
                                </select>
                                <button type="button" onClick={adicionarVeiculoTempo}>
                                    Adicionar
                                </button>
                            </div>
                            {/* Lista de veículos e tempos adicionados */}
                            {veiculosTempos.length > 0 && (
                                <ul className="veiculo-tempo-lista">
                                    {veiculosTempos.map((item, idx) => (
                                        <li key={idx}>
                                            <span>
                                                <strong>{item.veiculo}</strong> — {item.tempo}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removerVeiculoTempo(idx)}
                                            >
                                                Remover
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="card-pergunta2">
                        <label htmlFor="valorGas" className="pergunta-enunciado" style={{ marginBottom: "1rem" }}>
                            Informe o valor gasto em gás (R$):
                        </label>
                        <input
                            type="text"
                            id="valorGas"
                            name="valorGas"
                            placeholder="Digite o valor em reais"
                            value={valorGas}
                            onChange={e => setValorGas(formatarReais(e.target.value))}
                            className="pergunta-texto"
                            inputMode="numeric"
                        />
                    </div>

                    <div className="card-pergunta2">
                        <label htmlFor="valorEletricidade" className="pergunta-enunciado" style={{ marginBottom: "1rem" }}>
                            Informe o valor gasto em eletricidade (R$):
                        </label>
                        <input
                            type="text"
                            id="valorEletricidade"
                            name="valorEletricidade"
                            placeholder="Digite o valor em reais"
                            value={valorEletricidade}
                            onChange={e => setValorEletricidade(formatarReais(e.target.value))}
                            className="pergunta-texto"
                            inputMode="numeric"
                        />
                    </div>

                    <PerguntasCarb
                        name="pergunta5"
                        enunciadoPergunta="Realizou alguma viagem aérea esse mês?"
                        alternativas={["Sim", "Nao"]}
                        onChange={e => setRespostaPergunta5(e.target.value)}
                        
                    />

                    {respostaPergunta5 === "Sim" && (
                        <PerguntasCarb
                            name="pergunta6"
                            enunciadoPergunta="Tipo de viagem:"
                            alternativas={["Somente ida", "Somente volta", "Ida e volta"]}
                            onChange={e => setRespostas(r => ({ ...r, pergunta6: e.target.value }))}
                        />
                    )}

                
                    {respostaPergunta5 === "Sim" && (
                    <div className="card-pergunta2">
                        <label htmlFor="destinoViagem" className="pergunta-enunciado" style={{ marginBottom: "1rem" }}>
                            Informe o seu destino da viagem aérea:
                        </label>
                        <div className="veiculo-tempo-container">
                        <select
                            id="destinoViagem"
                            name="destinoViagem"
                            className="pergunta-texto"
                        >
                            <option value="">Selecione o destino</option>
                            {destinos.map((destino, idx) => (
                                <option key={idx} value={destino}>{destino}</option>
                            ))}
                        </select>
                        </div>
                    </div>
                    )}

                    {respostaPergunta5 === "Sim" && (
                        <div className="card-pergunta2">
                            <label htmlFor="numeroPessoas" className="pergunta-enunciado" style={{ marginBottom: "1rem" }}>
                                Informe quantas pessoas viajaram com você?:
                            </label>
                            <input
                                type="number"
                                id="numeroPessoas"
                                name="numeroPessoas"
                                placeholder="Digite o número de pessoas"
                                min="0"
                                className="pergunta-texto"
                                value={respostas.numeroPessoas}
                                onChange={e => setRespostas(r => ({ ...r, numeroPessoas: e.target.value }))}
                            />
                        </div>
                    )}

                    <Button btnNome="Enviar" type="submit" />
                </form>
            </div>
        </>
    )
}
