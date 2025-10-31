import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Button from '../components/botao.jsx';
import '../styles/pages/login.css'; 
import { auth } from '../firebase';
import Modal from '../components/modal.jsx';

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
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [concordaTermos, setConcordaTermos] = useState(false); // <-- ADICIONADO

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usuarioGoogle, setUsuarioGoogle] = useState(null);
    const [cnpjModal, setCnpjModal] = useState(''); 
    const [concordaTermosModal, setConcordaTermosModal] = useState(false); // <-- ADICIONADO

    const { login, startGoogleSignUp, setToken, usuario } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (usuario) {
            navigate('/home');
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
            setIsModalOpen(true);
        } catch (error) {
            setMensagem('Falha ao autenticar com o Google.');
        }
    };

    const handleCompleteGoogleRegistration = async (evento) => {
        evento.preventDefault();
        if (!cnpjModal) {
            alert('Por favor, preencha seu CNPJ.');
            return;
        }

        // vvv VALIDAÇÃO ADICIONADA vvv
        if (!concordaTermosModal) {
            alert('Você deve aceitar os Termos de Uso e Privacidade para continuar.');
            return;
        }
        // ^^^ FIM DA ADIÇÃO ^^^

        const payload = {
            email: usuarioGoogle.email,
            cnpj: cnpjModal.replace(/\D/g, ''),
            nome: usuarioGoogle.displayName,
            googleUid: usuarioGoogle.uid
        };
        try {
            await axios.post('http://localhost:3001/api/auth/cadastrar/pj', payload);
            
            const novoToken = await auth.currentUser.getIdToken();
            localStorage.setItem('authToken', novoToken);
            setToken(novoToken); 

            setIsModalOpen(false);
        } catch (erro) {
            const msgErro = erro.response?.data?.mensagem || 'Ocorreu um erro.';
            alert(`Erro: ${msgErro}`);
        }
    };
    
    const handleCadastroJuridico = async (evento) => {
        evento.preventDefault();
        if (!email || !cnpj || !senha) {
            setMensagem('Por favor, preencha todos os campos.');
            return;
        }
        if (senha.length < 6) {
            setMensagem('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        // vvv VALIDAÇÃO ADICIONADA vvv
        if (!concordaTermos) {
            setMensagem('Você deve aceitar os Termos de Uso e Privacidade.');
            return;
        }
        // ^^^ FIM DA ADIÇÃO ^^^
        
        const payload = { 
            email, 
            cnpj: cnpj.replace(/\D/g, ''), 
            senha, 
            nome: email.split('@')[0] 
        };

        setMensagem('Cadastrando.');
        try {
            await axios.post('http://localhost:3001/api/auth/cadastrar/pj', payload);
            setMensagem('Cadastro realizado! Fazendo login.');
            await login(email, senha);
        } catch (erro) {
            const msgErro = erro.response?.data?.mensagem || 'Ocorreu um erro.';
            setMensagem(`Erro: ${msgErro}`);
        }
    };
    
    const toggleVisibilidadeSenha = () => { setSenhaVisivel(!senhaVisivel); };

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
                        />
                        <input
                            type="text"
                            placeholder="CNPJ"
                            value={cnpj}
                            onChange={(e) => setCnpj(formatarCnpj(e.target.value))}
                        />
                        <div className="input-com-icone">
                            <input
                                type={senhaVisivel ? "text" : "password"}
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <span onClick={toggleVisibilidadeSenha} className="icone-senha">
                                {senhaVisivel ? <IconeOlhoAberto /> : <IconeOlhoFechado />}
                            </span>
                        </div>

                        {/* vvv JSX ADICIONADO vvv */}
                        <div className="termos-container">
                            <input 
                                type="checkbox"
                                id="termos"
                                checked={concordaTermos}
                                onChange={(e) => setConcordaTermos(e.target.checked)}
                            />
                            <label htmlFor="termos">
                                Eu li e concordo com os <Link to="/termos" target="_blank">Termos de Uso e Privacidade</Link>.
                            </label>
                        </div>
                        {/* ^^^ FIM DA ADIÇÃO ^^^ */}

                        <Button btnNome="Cadastrar" type="submit" />
                    </form>
                </div>
                {mensagem && (
                    <p style={{ 
                        marginTop: '15px', 
                        color: mensagem.includes('Cadastrando') || mensagem.includes('Fazendo login') ? 'green' : 'red' 
                    }}>
                        {mensagem}
                    </p>
                )}
                <h3>Ou</h3>
                <div>
                   <button type="button" className="googleBotao" onClick={handleGoogleSignUp}>
                      <img src="src/assets/iconeGoogle.svg" alt="Google" className="googleIcone"/>
                      <span>Cadastrar com Google</span>
                   </button>
                </div>
                <div className="cadastrar">
                    <img src='src/assets/Pessoa fisica.png' className="iconPessoa"/>
                    <p>Pessoa Física?&nbsp;</p>
                    <Link to="/cadastroPessoaFisica">Inscreva-se</Link>
                </div>
                <div className="cadastrar">
                    <p>Já tem uma conta?&nbsp;</p>
                    <Link to="/login">Faça login</Link>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Complete seu Cadastro</h2>
                <p>Olá, {usuarioGoogle?.displayName}! Por favor, informe seu CNPJ para finalizar.</p>
                <form onSubmit={handleCompleteGoogleRegistration}>
                    <input
                        type="text"
                        placeholder="Digite seu CNPJ"
                        value={cnpjModal}
                        onChange={(e) => setCnpjModal(formatarCnpj(e.target.value))}
                        maxLength="18"
                        required
                    />
                    <br/>

                    {/* vvv JSX ADICIONADO vvv */}
                    <div className="termos-container-modal" style={{ marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <input 
                            type="checkbox"
                            id="termosModal"
                            checked={concordaTermosModal}
                            onChange={(e) => setConcordaTermosModal(e.target.checked)}
                        />
                        <label htmlFor="termosModal" style={{ marginLeft: '8px' }}>
                            Eu li e concordo com os <Link to="/termos" target="_blank">Termos de Uso e Privacidade</Link>.
                        </label>
                    </div>
                    {/* ^^^ FIM DA ADIÇÃO ^^^ */}

                    <Button btnNome="Finalizar" type="submit" style={{ marginTop: '20px' }}/>
                </form>
            </Modal>
        </div>
    );
}