import { useState } from "react"
import '../styles/components/acessibilidade.css'

export default function Acessibilidade() {
    const[aberto, setAberto] = useState(false)

    function abrir() {
        setAberto(!aberto)
    }
    return ( 
        <div className="acessibilidade">
            <div className={`acessibilidadeDropDown ${aberto ? "aberto" : ""}`}></div>
            <button onClick={ abrir } className="btnAcessibilidade"><img src="src/assets/Acessibilidade-removebg-preview.png" /></button>
        </div>
    )
}