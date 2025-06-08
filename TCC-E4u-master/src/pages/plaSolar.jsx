import { useState } from 'react'
import Header from '../components/cabecalho'
import Footer from '../components/rodape'
import Form from '../components/escrever'
import Button from '../components/botao'
import NavBar from '../components/navegacao'
import '../styles/pages/plaSolar.css'

export default function PagSolar() {
    const [valorMediaConsumida, setValorMediaConsumida] = useState("")
    const [valorEspacoDisponivel, setValorEspacoDisponivel] = useState("")

    function ValorCalculo() {

    }
    return (
        <>
            <NavBar />
            <div className="pagPlaSolar">
                <div className="textoSolar">
                    <h1><span className="linha">Placas solares:</span></h1>
                    <p> &nbsp;As placas solares são a forma de armazenar e usar a energia fotovoltaica. Mas
                        existem diversos tipos e modelos de placas para venda.
                        Para auxiliar na escolha daquela que melhor se encaixa na sua situação, use
                        nosso filtro para buscar o ideal para você.</p>
                </div>

                <div className="calculoSolar">
                    <form>
                        <Form type="number" formValor="Média kWh consumidos" id="mediaConsumida" />
                        <Form type="number" formValor="Espaço disponível" id="espacoDisponivel" />
                        <Button btnNome="Procurar" />
                    </form>
                </div>
            </div>
        </>
    )
}