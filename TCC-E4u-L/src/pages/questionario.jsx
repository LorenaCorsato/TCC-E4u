import PerguntasCarb from "../components/perguntasCarb"
import Button from "../components/botao"
import NavBar from "../components/navegacao"
import '../styles/pages/questionario.css'

export default function Questionario() {
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
                    />
                    <PerguntasCarb
                      name="pergunta2"
                      enunciadoPergunta="Qual o tempo médio de utilização diária desses veículos no total?"
                      alternativas={[" -30 minutos",
                         "30 minutos",
                          "1-3 horas",
                           "4-6 horas",
                            "7-9 horas",   
                        "10 horas ou mais"]}
                    />
                    <PerguntasCarb
                      name="pergunta3"
                      enunciadoPergunta="Qual o consumo de gás?"
                      alternativas={["A", "B", "C", "D"]}
                    />
                    <PerguntasCarb
                      name="pergunta4"
                      enunciadoPergunta="Qual o consumo de eletricidade?"
                      alternativas={["A", "B", "C", "D"]}
                    />
                     <PerguntasCarb
                      name="pergunta5"
                      enunciadoPergunta="Realizou alguma viagem aérea esse mês?"
                      alternativas={["Sim", "Nao", ]}
                    />
                     <PerguntasCarb
                      name="pergunta6"
                      enunciadoPergunta="Tipo de viagem:"
                      alternativas={["Somente ida", "Somente volta", "Ida e volta"]}
                    />
                    
                    <Button btnNome="Enviar" />
                </form>
            </div>
        </>
    )
}