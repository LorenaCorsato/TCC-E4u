import { useState } from 'react';
import axios from 'axios';
import Button from '../components/botao.jsx';
import '../styles/pages/login.css';

// Componente auxiliar
function Redirect({ redCaminho, RedDescricao }) {
    return <a href={redCaminho}>{RedDescricao}</a>;
}

// A função CheckBox foi removida daqui.

export default function CadastroJuridico() {
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

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

        setMensagem('');
        try {
            const resposta = await axios.post('http://localhost:3001/api/auth/cadastrar/pj', {
                email, cnpj, senha
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
                <h1>Cadastro Jurídico</h1>
                
                <div className="insertEnter">
                    <form onSubmit={handleCadastroJuridico} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        
                        <input
                            type="email"
                            placeholder="Email Corporativo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength="254"
                        />
                        
                        <input
                            type="text"
                            placeholder="CNPJ"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            maxLength="18"   
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
                    <p>Pessoa física?&nbsp;</p>
                    <Redirect redCaminho="/cadastroPessoaFisica" RedDescricao="Inscreva-se" />
                </div>
            </div>
        </div>
    );
}