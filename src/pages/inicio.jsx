import { useState, useEffect } from "react"
import NavBar from "../components/navegacao"
import Footer from "../components/rodape"
import Aluno from "../components/aluno"
import Card from "../components/card"
import BotaoIcone from "../components/botaoIcone"
import Acessibilidade from "../components/acessibilidade"
import '../styles/pages/inicio.css'
import { color } from "chart.js/helpers"

export default function Inicio() {
  const [mudar, setMudar] = useState("")
  const[paragrafos, setParagrafos] = useState(["", "", "", ""])

  useEffect(() => {
    MudarParagrafo1()
  }, [])

  function MudarParagrafo1() {
    setParagrafos(["1Muita coisa escritaMuita coisa escritaMuita coisa escritaMuita coisa escrita Muita coisa escrita Muita coisa escrita Muita coisa escrita",
      "2Muita coisa escritaMuita coisa escritaMuita coisa escritaMuita coisa escrita Muita coisa escrita Muita coisa escrita Muita coisa escrita",
      "3Muita coisa escritaMuita coisa escritaMuita coisa escritaMuita coisa escrita Muita coisa escrita Muita coisa escrita Muita coisa escrita",
      "4Muita coisa escritaMuita coisa escritaMuita coisa escritaMuita coisa escrita Muita coisa escrita Muita coisa escrita Muita coisa escrita"
    ])
  }

  function MudarParagrafo2() {
    setParagrafos(["1Receita de bolo de cenoura Receita de bolo de cenoura Receita de bolo de cenoura Receita de bolo de cenoura Receita de bolo de cenoura",
      "2Receita de bolo de cenoura Receita de bolo de cenoura Receita de bolo de cenoura Receita de bolo de cenoura Receita de bolo de cenoura",
      "3Receita de bolo de cenoura Receita de bolo de cenoura Receita de bolo de cenoura Receita de bolo de cenoura Receita de bolo de cenoura",
      "4Receita de bolo de cenoura Receita de bolo de cenoura Receita de bolo de cenoura Receita de bolo de cenoura Receita de bolo de cenoura"
    ])
  }

  function MudarParagrafo3() {
    setParagrafos(["1Aula de TCC de terça-feira Aula de TCC de terça-feira Aula de TCC de terça-feira Aula de TCC de terça-feira Aula de TCC de terça-feira",
      "2Aula de TCC de terça-feira Aula de TCC de terça-feira Aula de TCC de terça-feira Aula de TCC de terça-feira Aula de TCC de terça-feira",
      "3Aula de TCC de terça-feira Aula de TCC de terça-feira Aula de TCC de terça-feira Aula de TCC de terça-feira Aula de TCC de terça-feira",
      "4Aula de TCC de terça-feira Aula de TCC de terça-feira Aula de TCC de terça-feira Aula de TCC de terça-feira Aula de TCC de terça-feira"
    ])
  }

  function MudarParagrafo4() {
    setParagrafos(["1Muitos conteúdos interessantes Muitos conteúdos interessantes Muitos conteúdos interessantes Muitos conteúdos interessantes",
      "2Muitos conteúdos interessantes Muitos conteúdos interessantes Muitos conteúdos interessantes Muitos conteúdos interessantes",
      "3Muitos conteúdos interessantes Muitos conteúdos interessantes Muitos conteúdos interessantes Muitos conteúdos interessantes",
      "4Muitos conteúdos interessantes Muitos conteúdos interessantes Muitos conteúdos interessantes Muitos conteúdos interessantes"
    ])
  }

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
          <div className="topicos">
            <a onClick={MudarParagrafo1}><span className="linha">1. Auxiliar de usuário</span></a>
            <a onClick={MudarParagrafo2}><span className="linha">2. Ambiente limpo e agradável</span></a>
            <a onClick={MudarParagrafo3}><span className="linha">3. Espalhar conhecimento</span></a>
            <a onClick={MudarParagrafo4}><span className="linha">4. Seriedade</span></a>
          </div>

          <div className="paragrafos">
            <p>{paragrafos[0]}</p>
            <p>{paragrafos[1]}</p>
            <p>{paragrafos[2]}</p>
            <p>{paragrafos[3]}</p>
          </div>
        </div>

        <div className="beneficios">
          <h1 style={{ textAlign: "center" }}>Benefícios</h1>
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

      <Acessibilidade />
      <Footer />
    </>
  )
}