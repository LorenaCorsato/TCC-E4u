import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/components/navegacao.css';

export default function NavBar() {
    const { usuario, logout } = useAuth(); 
    const [menuAberto, setMenuAberto] = useState(false);
    const [modalPerfilAberto, setModalPerfilAberto] = useState(false);
    
    const navigate = useNavigate();
    
    const IconePerfil = () => (
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
        >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    );

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
            style={{ marginRight: '8px' }}
        >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" x2="9" y1="12" y2="12"></line>
        </svg>
    );

    const AbrirMenu = () => {
        setMenuAberto(!menuAberto);
    };

    const abrirModalPerfil = () => {
        setModalPerfilAberto(true);
    };

    const fecharModalPerfil = () => {
        setModalPerfilAberto(false);
    };

    const handleLogout = async (evento) => {
        evento.preventDefault(); 
        try {
            await logout();
            setModalPerfilAberto(false);
            navigate('/landingPage');
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

                    <div className="navInicio"><Link to="/home">Inicio</Link></div>
                    <div className="navPSolar"><Link to="/placaSolar">Placas solares</Link></div>
                    <div className="navPCarbono"><Link to="/pegadaCarbono">Pegada de carbono</Link></div>
                    <div className="navPCarbono"><Link to="/artigosSol">Artigos</Link></div>



                    {usuario ? (
                        <div className="navPerfil">
                            <a href="#" onClick={(e) => { e.preventDefault(); abrirModalPerfil(); }} style={{ display: 'flex', alignItems: 'center' }}>
                                <IconePerfil />
                                <span style={{ marginLeft: '8px' }}>Perfil</span>
                            </a>
                        </div>
                    ) : (
                        <div className="navLogin"><Link to="/login">Login</Link></div>
                    )}
                </div>
            </div>

            {/* Modal de Perfil */}
            {modalPerfilAberto && (
                <div className="modalOverlay" onClick={fecharModalPerfil}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <button className="modalFechar" onClick={fecharModalPerfil}>&times;</button>
                        
                        <div className="modalHeader">
                         
                            <h2>Usuario físico</h2>
                        </div>
                        
                        <div className="modalBody">
                            {usuario && (
                                <div className="perfilInfo">
                                    <p><strong>Usuário:</strong> {usuario.nome || usuario.email || 'Usuário'}</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="modalFooter">
                            <button className="btnSair" onClick={handleLogout}>
                                <IconeSair />
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}