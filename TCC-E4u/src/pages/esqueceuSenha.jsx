import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; 
import { sendPasswordResetEmail } from 'firebase/auth'; 
import '../styles/pages/login.css'; // Reutilizando o  estilo do login

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
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title" style={{ fontSize: '32px' }}>Redefinir Senha</h1>
                <p style={{ textAlign: 'center', marginBottom: '20px', color: '#555' }}>
                    Digite seu email e enviaremos um link para você voltar a acessar sua conta.
                </p>
                
                <form onSubmit={handleResetPassword}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu.email@exemplo.com"
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Enviar Link de redefinição
                    </button>
                </form>

                {mensagem && 
                    <p style={{ 
                        textAlign: 'center', 
                        color: tipoMensagem === 'success' ? 'green' : 'red', 
                        marginTop: '20px' 
                    }}>
                        {mensagem}
                    </p>
                }

                <div className="signup-link" style={{ marginTop: '25px' }}>
                    <Link to="/login">Voltar para o Login</Link>
                </div>
            </div>
        </div>
    );
}