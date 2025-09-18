import NavBar from "../components/navegacao"
import Button from "../components/botao"
import '../styles/pages/historico.css'

export default function Historico() {
    return (
        <>
        <NavBar />

        <h2>Histórico</h2>

        <div className="historicos">
            <Button btnNome="Gráfico-01"/>
            <Button btnNome="Gráfico-02"/>
        </div>
        </>
    )
}