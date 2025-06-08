import { useState } from 'react'
import '../App.css'
import Header from '../components/cabecalho'
import Footer from '../components/rodape'
import NavBar from '../components/navegacao'
import { href } from 'react-router-dom'
import '../styles/pages/inicio.css'

export default function Inicio() {
  const [revelarTexto, setRevelarTexto] = useState("");
  const [revelarTitulo, setRevelarTitulo] = useState("");
  const [revelarImg, setRevelarImg] = useState(['']);

  function MostrarEnergia() {
    setRevelarTexto("Eu vou fazer um texto grande pra ver se vai quebrar a linha Eu vou fazer um texto grande pra ver se vai quebrar a linha Eu vou fazer um texto grande pra ver se vai quebrar a linha Eu vou fazer um texto grande pra ver se vai quebrar a linha Eu vou fazer um texto grande pra ver se vai quebrar a linha Eu vou fazer um texto grande pra ver se vai quebrar a linha")
    setRevelarTitulo("Energia")
    setRevelarImg('src/assets/energia.jpg')
  }

  function MostrarEficiencia() {
    setRevelarTexto("B")
    setRevelarTitulo("Eficiência")
    setRevelarImg('src/assets/eficiencia.jpg')
  }

  function MostrarEcologia() {
    setRevelarTexto("C")
    setRevelarTitulo("Ecologia")
    setRevelarImg('src/assets/Ecologia.jpg')
  }

  function MostrarEconomia() {
    setRevelarTexto("D")
    setRevelarTitulo("Economia")
    setRevelarImg('src/assets/economia.jpg')
  }

  return (
    <>
      <NavBar />

      <div className="inicio">
        <div className="E4">
          <Vizualizar onClick={MostrarEnergia} vizText="Energia" />
          <Vizualizar onClick={MostrarEficiencia} vizText="Eficiência" />
          <Vizualizar onClick={MostrarEcologia} vizText="Ecologia" />
          <Vizualizar onClick={MostrarEconomia} vizText="Economia" />
        </div>

        <div className="conteudoE4">
          <div>
            <h1 className="tituloE4">{revelarTitulo}</h1>
            <p className="textoE4">{revelarTexto}</p>
          </div>
          <img className="imgE4" src={revelarImg} />
        </div>
      </div>
    </>
  )
}

function Vizualizar({ onClick, vizText }) {
  return (
    <>
      <button className="vizualizar" onClick={onClick}>{vizText}</button>
    </>
  )
}