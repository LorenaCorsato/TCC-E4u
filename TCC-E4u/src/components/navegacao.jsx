import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/components/navegacao.css';

export default function NavBar() {
    const { usuario, logout } = useAuth(); 
    const [menuAberto, setMenuAberto] = useState(false);
    
    const navigate = useNavigate();
    const IconeSair = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        style={{ marginRight: '8px' }} // Adiciona um espaço entre o ícone e o texto
    >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" x2="9" y1="12" y2="12"></line>
    </svg>
);

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
                    <div className="navLogout">
                     <a href="#" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center' }}>
                <IconeSair /> {/* <-- ÍCONE ADICIONADO AQUI */}
                Sair
            </a>
        </div>                        </>
                    ) : (
                        <div className="navLogin"><Link to="/login">Login</Link></div>
                    )}
                </div>
            </div> 
        </>
    );
}