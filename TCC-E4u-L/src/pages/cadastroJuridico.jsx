import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Button from '../components/botao.jsx';
import '../styles/pages/login.css'; 
import { auth } from '../firebase';

// Ícones de Olho
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
    return <a href={redCaminho}>{RedDescricao}</a>;
}

export default function CadastroJuridico() {
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [usuarioGoogle, setUsuarioGoogle] = useState(null);

    const { login, startGoogleSignUp, setToken, usuario } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (usuario) {
            navigate('/landingPage');
        }
    }, [usuario, navigate]);

    const formatarCnpj = (valor) => {
        const valorNumerico = valor.replace(/\D/g, '');
        return valorNumerico
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

    const handleGoogleSignUp = async () => {
        try {
            const usuarioFirebase = await startGoogleSignUp();
            setUsuarioGoogle(usuarioFirebase);
            setEmail(usuarioFirebase.email);
            setMensagem('Google conectado! Por favor, complete seu cadastro com o CNPJ.');
            setTipoMensagem('success');
        } catch (error) {
            setMensagem('Falha ao autenticar com o Google.');
            setTipoMensagem('error');
        }
    };

    const handleCadastroJuridico = async (evento) => {
        evento.preventDefault();
        
        let payload;
        if (usuarioGoogle) {
            if (!cnpj) {
                setMensagem('Por favor, preencha seu CNPJ para completar o cadastro.');
                setTipoMensagem('error');
                return;
            }
            payload = {
                email: usuarioGoogle.email,
                cnpj: cnpj,
                nome: usuarioGoogle.displayName,
                googleUid: usuarioGoogle.uid
            };
        } else {
            if (!email || !cnpj || !senha) {
                setMensagem('Por favor, preencha todos os campos.');
                setTipoMensagem('error');
                return;
            }
            if (senha.length < 6) {
                setMensagem('A senha deve ter no mínimo 6 caracteres.');
                setTipoMensagem('error');
                return;
            }
            payload = { email, cnpj, senha };
        }

        setMensagem('Cadastrando...');
        setTipoMensagem('success');
        try {
            await axios.post('http://localhost:3001/api/auth/cadastrar/pj', payload);
            setMensagem("Cadastro realizado! Fazendo login...");
            
            if (usuarioGoogle) {
                const novoToken = await auth.currentUser.getIdToken();
                localStorage.setItem('authToken', novoToken);
                setToken(novoToken);
            } else {
                await login(email, senha);
            }
        } catch (erro) {
            const msgErro = erro.response?.data?.mensagem || 'Ocorreu um erro.';
            setMensagem(`Erro: ${msgErro}`);
            setTipoMensagem('error');
        }
    };

    const toggleVisibilidadeSenha = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    const corDaMensagem = tipoMensagem === 'success' ? 'green' : 'red';

    return (
        <div className="login">
            <div className="logo">
                <img src="src/assets/logoFinal.png"  className="logoImg" alt="Logo E4u" />
            </div>
            <div className="formulario">
                <h1>Cadastro</h1>
                
                <div className="insertEnter">
                    <form onSubmit={handleCadastroJuridico}>
                        <input
                            type="email"
                            placeholder="Email Corporativo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength="254"
                            disabled={!!usuarioGoogle}
                        />
                        <input
                            type="text"
                            placeholder="CNPJ"
                            value={cnpj}
                            onChange={(e) => setCnpj(formatarCnpj(e.target.value))}
                            maxLength="18"
                        />
                        <div className="input-com-icone">
                            <input
                                type={senhaVisivel ? "text" : "password"}
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                minLength="6"
                                disabled={!!usuarioGoogle}
                            />
                            <span onClick={toggleVisibilidadeSenha} className="icone-senha">
                                {senhaVisivel ? <IconeOlhoAberto /> : <IconeOlhoFechado />}
                            </span>
                        </div>
                        <Button btnNome={usuarioGoogle ? "Completar Cadastro" : "Cadastrar"} type="submit" />
                    </form>
                </div>
                
                {mensagem && <p style={{ marginTop: '15px', color: corDaMensagem }}>{mensagem}</p>}

                <h3>Ou</h3>
                <div>
                    <button type="button" onClick={handleGoogleSignUp}>
                        Cadastrar com Google
                    </button>
                </div>

                <div className="cadastrar">
                    <p>Pessoa física?&nbsp;</p>
                    <Redirect redCaminho="/cadastroPessoaFisica" RedDescricao="Inscreva-se" />
                </div>
                <div className="cadastrar">
                    <p>Já tem uma conta?&nbsp;</p>
                    <Redirect redCaminho="/login" RedDescricao="Faça login" />
                </div>
            </div>
        </div>
    );
}