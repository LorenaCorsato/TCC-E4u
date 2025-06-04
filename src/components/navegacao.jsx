import { useState } from 'react'
import '../styles/components/navegacao.css'

export default function NavBar() {
    const [menuAberto, setMenuAberto] = useState(false)

    const AbrirMenu = () => {
        setMenuAberto(!menuAberto)
    }

    return (
        <>
            <div className="navBar">
                <div className="hamburger" onClick={AbrirMenu}>
                    H
                </div>

                <div className={`navLinks ${menuAberto ? 'ativo' : ''}`}>
                    <div className="navLogo"><img src="src/assets/Logo-nova.png" /></div>

                    <div className="navInicio"><a href="/">Inicio</a></div>
                    <div className="navPSolar"><a href="/placaSolar">Placas solares</a></div>
                    <div className="navPCarbono"><a href="/pegadaCarbono">Pegada de carbono</a></div>

                    <div className="navDropdown">
                        <div className="navArtogos"><a href="#">Artigos</a></div>
                        <div className="dropArtigos">
                            <a href="/artigosSol">Sol</a>
                            <a href="#">Carbono</a>
                            <a href="#">Energia</a>
                            <a href="#">Sustentabilidade</a>
                        </div>
                    </div>

                    <div className="navLogin"><a href="/login">Login</a></div>
                </div>
            </div>
        </>
    )
}