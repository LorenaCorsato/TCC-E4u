import '../styles/components/perguntasCarb.css'

export default function PerguntasCarb({ enunciadoPergunta, alternativa1, alternativa2, alternativa3, alternativa4 }) {
    return (
        <>
            <div className="pergunta">
                <p>{enunciadoPergunta}</p>
            </div>

            <div className="alternativas">
                <div>
                <input type="checkbox" id="alternativa1" className="alternativa"  />
                <label for="alternativa1">{alternativa1}</label>
                </div>
                <div>
                <input type="checkbox" id="alternativa2" className="alternativa" />
                <label for="alternativa2">{alternativa2}</label>
                </div>
                <div>
                <input type="checkbox" id="alternativa3" className="alternativa" />
                <label for="alternativa3">{alternativa3}</label>
                </div>
                <div>
                <input type="checkbox" id="alternativa4" className="alternativa" />
                <label for="alternativa4">{alternativa4}</label>
                </div>
            </div>
        </>
    )
}