import { useState } from "react"
import NavBar from "../components/navegacao"
import Footer from "../components/rodape"
import Aluno from "../components/aluno"
import Card from "../components/card"
import BotaoIcone from "../components/botaoIcone"
import { color } from "chart.js/helpers"

export default function Inicio() {
  const [mudar, setMudar] = useState("")

  function MudarB1() {
    setMudar("B1")
  }

  function MudarB2() {
    setMudar("B2")
  }

  function MudarB3() {
    setMudar("B3")
  }

  function MudarB4() {
    setMudar("B4")
  }

  return (
    <>
      <NavBar />

      <div className="inicio">
        <div className="objetivos">
          <h1><span className="linha">E4u:</span></h1>
          <p>Vai ter algo aqui</p>
        </div>

        <div className="descricoes">

        </div>

        <div className="beneficios">
          <h1 style={{textAlign: "center"}}>beneficios</h1>
          <div className="botoesBeneficios">
            <BotaoIcone onBtnIcone={MudarB1} srcBtnIcone="src/assets/icon arvore.png" textoBtnIcone="Para o meio ambiente" />
            <BotaoIcone onBtnIcone={MudarB2} srcBtnIcone="src/assets/icone dinheiro.jpg" textoBtnIcone="Para o seu bolso" />
            <BotaoIcone onBtnIcone={MudarB3} srcBtnIcone="src/assets/icone duvidas.png" textoBtnIcone="Para o seu conhecimento" />
            <BotaoIcone onBtnIcone={MudarB4} srcBtnIcone="src/assets/icone casa.png" textoBtnIcone="Para o seu estilo de vida" />
          </div>
          <p>{mudar}</p>
        </div>

        <div className="cards">
          <Card srcCard="src/assets/images (3).jpg" tituloCard="Banana" textoCard="Esse card é muito legal! Esse card é muito legal! Esse card é muito legal! Esse card é muito legal! Esse card é muito legal!" />
          <Card srcCard="src/assets/images (3).jpg" textoCard="" tituloCard="" />
          <Card srcCard="src/assets/images (3).jpg" textoCard="" tituloCard="" />
          <Card srcCard="src/assets/images (3).jpg" textoCard="" tituloCard="" />
        </div>

        <div className="alunos">
          <Aluno srcAluno="src/assets/energia.jpg" alt="" nome="Gabriela" funcao="Revisão" />
          <Aluno srcAluno="src/assets/energia.jpg" alt="" nome="Gustavo" funcao="Designer" />
          <Aluno srcAluno="src/assets/energia.jpg" alt="" nome="Lavínia" funcao="Documentação" />
          <Aluno srcAluno="src/assets/energia.jpg" alt="" nome="Lorena" funcao="Programação" />
          <Aluno srcAluno="src/assets/energia.jpg" alt="" nome="Lyncon" funcao="Banco de dados" />
          <Aluno srcAluno="src/assets/energia.jpg" alt="" nome="Raphael" funcao="Programação" />
        </div>
      </div>

      <Footer />
    </>
  )
}