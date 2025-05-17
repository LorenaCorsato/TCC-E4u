import PerguntasCarb from "../components/perguntasCarb"
import Button from "../components/botao"
import '../styles/pages/questionario.css'

export default function Questionario() {
    return (
        <>
            <div className="questionario">
                <h1>Questionário:</h1>
                <form action="">
                    <PerguntasCarb enunciadoPergunta="Pergunta muito filosófica" alternativa1="pergunta um com coisas muito divertidas escritas para ver o limite" alternativa2="pergunta dois com coisas muito divertidas escritas para ver o limite" alternativa3="pergunta três com coisas muito divertidas escritas para ver o limite" alternativa4="pergunta quatro com coisas muito divertidas escritas para ver o limite" />

                    <Button btnNome="Enviar" />
                </form>
            </div>
        </>
    )
}