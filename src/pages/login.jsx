import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Button from '../components/botao.jsx';
import '../styles/pages/login.css';


// --- Ícones de Olho (SVG) ---
const IconeOlhoAberto = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const IconeOlhoFechado = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
        <line x1="2" x2="22" y1="2" y2="22"></line>
    </svg>
);

function Redirect({ redCaminho, RedDescricao }) {
    return (
        <a href={redCaminho}>{RedDescricao}</a>
    );
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false); 
    
    const navigate = useNavigate();

    const handleLogin = async (evento) => {
        evento.preventDefault(); 
        setMensagem(''); 
        if (!email || !senha) {
            setMensagem('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const resposta = await axios.post('http://localhost:3001/api/auth/login', {
                email,
                senha,
            });

            const { token } = resposta.data;
            localStorage.setItem('authToken', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            navigate('/landingPage'); 
        } catch (erro) {
            const msgErro = erro.response?.data?.mensagem || 'Email ou senha inválidos. Tente novamente.';
            setMensagem(msgErro);
        }
    };
    
    const toggleVisibilidadeSenha = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    return (
        <>
            <div className="login">
                <div className="logo">
                    <h1>E4u</h1>
                </div>

                <div className="formulario">
                    <h1>Login</h1>
                    <div className="insertEnter">
                        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            
                            <div className="input-com-icone">
                                <input
                                    type={senhaVisivel ? "text" : "password"}
                                    placeholder="Senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    minLength="6"
                                    required
                                />
                                <span onClick={toggleVisibilidadeSenha} className="icone-senha">
                                    {senhaVisivel ? <IconeOlhoAberto /> : <IconeOlhoFechado />}
                                </span>
                            </div>
                            
                            <Button type="submit" btnNome="Entrar" />
                        </form>
                    </div>

                    {mensagem && <p style={{ color: 'red', marginTop: '10px' }}>{mensagem}</p>}

                    <div className="lembrar">
                        <Redirect redCaminho="#" RedDescricao="Esqueceu a senha?" />
                    </div>

                    <h3>Ou</h3>

                    <div>
                        GOOGLE
                    </div>

                    <div className="cadastrar">
                        <p>Não possui uma conta?&nbsp;</p>
                        <Redirect redCaminho="/cadastroPessoaFisica" RedDescricao="Inscreva-se" />
                    </div>
                </div>
            </div>
        </>
    );
}