import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 
import '../styles/components/navegacao.css';

export default function NavBar() {
    const [menuAberto, setMenuAberto] = useState(false);
    
    const { usuario, logout } = useAuth(); 
    const navigate = useNavigate();

    const AbrirMenu = () => {
        setMenuAberto(!menuAberto);
    };

  const handleLogout = async (evento) => {
    evento.preventDefault(); 
    try {
        await logout();
    } catch (erro) {
        console.error("Erro ao fazer logout:", erro);
    }
};

    return (
        <>
            <div className="navBar">
                <div className="hamburger" onClick={AbrirMenu}>
                    H {}
                </div>

                <div className={`navLinks ${menuAberto ? 'ativo' : ''}`}>
                    <div className="navLogo"><img src="/src/assets/logoFinal.png" alt="Logo" /></div>

                    {/* Usando <Link> em vez de <a> para navegação interna do React */}
                    <div className="navInicio"><Link to="/">Inicio</Link></div>
                    <div className="navPSolar"><Link to="/placaSolar">Placas solares</Link></div>
                    <div className="navPCarbono"><Link to="/pegadaCarbono">Pegada de carbono</Link></div>

                    <div className="navDropdown">
                        <div className="navArtigos"><a href="#" onClick={(e) => e.preventDefault()}>Artigos</a></div>
                        <div className="dropArtigos">
                            <Link to="/artigosSol">Sol</Link>
                            <a href="#">Carbono</a>
                            <a href="#">Energia</a>
                            <a href="#">Sustentabilidade</a>
                        </div>
                    </div>

                    {usuario ? (
                        <>
                            <div className="navLogout"><a href="#" onClick={handleLogout}>Sair</a></div>
                        </>
                    ) : (
                        <div className="navLogin"><Link to="/login">Login</Link></div>
                    )}
                </div>
            </div> 
        </>
    );
}