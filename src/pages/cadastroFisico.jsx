import { useState } from 'react';
import axios from 'axios';
import Button from '../components/botao.jsx';
import '../styles/pages/login.css';


// Ícones do Olho
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

export default function CadastroFisico() {
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    const formatarCpf = (valor) => {
     const valorNumerico = valor.replace(/\D/g, '');

    // Máscara CPF
     return valorNumerico
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1'); 
     };

    const [senhaVisivel, setSenhaVisivel] = useState(false);

    const handleCadastroFisico = async (evento) => {
        evento.preventDefault();

        if (!email || !cpf || !senha) {
            setMensagem('Por favor, preencha todos os campos.');
            return;
        }

        if (senha.length < 6) {
            setMensagem('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        setMensagem('');
        try {
            const resposta = await axios.post('http://localhost:3001/api/auth/cadastrar/pf', {
                email, cpf, senha
            });
            setMensagem(resposta.data.mensagem);
        } catch (erro) {
            const msgErro = erro.response?.data?.mensagem || 'Ocorreu um erro. Tente novamente.';
            setMensagem(`Erro: ${msgErro}`);
        }
    };
    
    const toggleVisibilidadeSenha = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    return (
        <div className="login">
            <div className="logo">
                <img src='src/assets/logo.png' />
            </div>

            <div className="formulario">
                <h1>Cadastro</h1>
                
                <div className="insertEnter">
                    <form onSubmit={handleCadastroFisico} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength="254"
                        />
                        
                       <input
                            type="text"
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(formatarCpf(e.target.value))}
                            maxLength="14" 
                        />
                        
                        <div className="input-com-icone">
                            <input
                                type={senhaVisivel ? "text" : "password"}
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                minLength="6"
                            />
                            <span onClick={toggleVisibilidadeSenha} className="icone-senha">
                                {senhaVisivel ? <IconeOlhoAberto /> : <IconeOlhoFechado />}
                            </span>
                        </div>



                        <Button btnNome="Cadastrar" type="submit" />
                    </form>
                </div>
                
                <div className="lembrar" style={{display: 'flex', width: '300px', justifyContent: 'flex-start', marginTop: '15px'}}>
                    <Redirect redCaminho="#" RedDescricao="Esqueceu a senha?" />
                </div>

                {mensagem && <p style={{ marginTop: '15px', color: 'red' }}>{mensagem}</p>}

                <h3>Ou</h3>

                <div>
                    GOOGLE
                </div>

                <div className="cadastrar">
                    <p>Pessoa jurídica?&nbsp;</p>
                    <Redirect redCaminho="/cadastroPessoaJuridica" RedDescricao="Inscreva-se" />
                </div>
                 <div className="cadastrar">
                     <p>Já tem uma conta?&nbsp;</p>
                     <Redirect redCaminho="/login" RedDescricao="Faça login" />
                </div>
            </div>
        </div>
    );
}