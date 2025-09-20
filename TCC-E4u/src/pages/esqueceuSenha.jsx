import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; 
import { sendPasswordResetEmail } from 'firebase/auth'; 
import '../styles/pages/esqueceuSenha.css';

export default function EsqueceuSenha() {
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState(''); 

    const handleResetPassword = async (evento) => {
        evento.preventDefault();
        if (!email) {
            setMensagem('Por favor, digite seu endereço de email.');
            setTipoMensagem('error');
            return;
        }

        setMensagem('Enviando...');
        setTipoMensagem('');

        try {
            // Envia o email de redefinição
            await sendPasswordResetEmail(auth, email);
            
            setMensagem('Se este email estiver cadastrado, um link para redefinir a senha foi enviado para sua caixa de entrada.');
            setTipoMensagem('success');

        } catch (erro) {
            console.error("Erro ao enviar email de redefinição:", erro.code);
           
            setMensagem('Se este email estiver cadastrado, um link para redefinir a senha foi enviado para sua caixa de entrada.');
            setTipoMensagem('success');
        }
    };

    return (
        <div className="esqueceu-container">
            <div className="esqueceu-popup">
                <h1 className="esqueceu-title">Redefinir Senha</h1>
                <p className="esqueceu-text">
                    Digite seu email e enviaremos um link para você voltar a acessar sua conta.
                </p>
                
                <form className="esqueceu-form" onSubmit={handleResetPassword}>
                    <div className="esqueceu-input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu.email@exemplo.com"
                        />
                    </div>
                    <button type="submit" className="esqueceu-button">
                        Enviar Link de redefinição
                    </button>
                </form>

                {mensagem && 
                    <p className="esqueceu-mensagem" style={{ color: tipoMensagem === 'success' ? 'green' : 'red' }}>
                        {mensagem}
                    </p>
                }

                <div className="esqueceu-link">
                    <Link to="/login">Voltar para o Login</Link>
                </div>
            </div>

            <div className="logo4">
                <img src="src\assets\logoFinal.png" alt="Logo E4U" className='logo img' />
                                <p className="esqueceu-text">
                    Patente E4u.
                </p>
            </div>
        </div>

        
    );
}