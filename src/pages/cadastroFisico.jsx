import { useState } from 'react';
import axios from 'axios';
import Button from '../components/botao.jsx';
import '../styles/pages/login.css';

function Redirect({ redCaminho, RedDescricao }) {
    return <a href={redCaminho}>{RedDescricao}</a>;
}

export default function CadastroFisico() {
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleCadastroFisico = async (evento) => {
        evento.preventDefault();
        
        // Validação com CPF
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

    return (
        <div className="login">
            <div className="logo">
                <h1>E4u</h1>
            </div>

            <div className="formulario">
                <h1>Cadastro Físico</h1>
                
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
                            onChange={(e) => setCpf(e.target.value)}
                            maxLength="14"  
                        />
                        
                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            minLength="6"
                        />

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
                    <Redirect redCaminho="/cadastroJuridico" RedDescricao="Inscreva-se" />
                </div>
            </div>
        </div>
    );
}