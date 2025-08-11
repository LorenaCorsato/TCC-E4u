import React, { useState, useRef } from "react";
import PerguntasCarb from "../components/perguntasCarb";
import Button from "../components/botao";
import NavBar from "../components/navegacao";
import '../styles/pages/questionario.css';

export default function Questionario() {
    const [respostaPergunta5, setRespostaPergunta5] = useState("");



    return (
        <>
        <NavBar />
            <div className="questionario">
                <div className="questionario-titulo">
                     <h1>Questionario</h1>
                </div>
                <form className="perguntas" action="">
                    <PerguntasCarb
                      name="pergunta1"
                      enunciadoPergunta="Quais veículos você utiliza no seu dia a dia?"
                      alternativas={[
                        "Carro",
                        "Moto",
                        "Caminhão",
                        "Ônibus",
                        "Bicicleta",
                        "Outro"
                      ]}
                      onChange={e => {
                        scrollToNext(0);
                      }}
                    />
                    <PerguntasCarb
                      name="pergunta2"
                      enunciadoPergunta="Qual o tempo médio de utilização diária desses veículos no total?"
                      alternativas={[
                        " -30 minutos",
                        "30 minutos",
                        "1-3 horas",
                        "4-6 horas",
                        "7-9 horas",   
                        "10 horas ou mais"
                      ]}
                    />

                    <div className="card-pergunta">
                      <label htmlFor="valorGas" className="pergunta-enunciado" style={{marginBottom: "1rem"}}>
                        Informe o valor gasto em gás (R$):
                      </label>
                      <input
                        type="number"
                        id="valorGas"
                        name="valorGas"
                        placeholder="Digite o valor em reais"
                        min="0"
                        step="0.01"
                        className="pergunta-texto"
                      />
                    </div>

                    <div className="card-pergunta">
                      <label htmlFor="valorEletricidade" className="pergunta-enunciado" style={{marginBottom: "1rem"}}>
                        Informe o valor gasto em eletricidade (R$):
                      </label>
                      <input
                        type="number"
                        id="valorEletricidade"
                        name="valorEletricidade"
                        placeholder="Digite o valor em reais"
                        min="0"
                        step="0.01"
                        className="pergunta-texto"
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
                      />
                    )
                    }

                    {respostaPergunta5 === "Sim" && (                    <div className="card-pergunta">
                      <label htmlFor="numeroPessoas" className="pergunta-enunciado" style={{marginBottom: "1rem"}}>
                        Informe quantas viajaram com você?:
                      </label>
                      <input
                        type="number"
                        id="numeroPessoas"
                        name="numeroPessoas"
                        placeholder="Digite o número de pessoas"
                        min="0"
                        className="pergunta-texto"
                      />
                    </div>)}


                    
                    <Button btnNome="Enviar" />
                </form>
            </div>
        </>
    )
}