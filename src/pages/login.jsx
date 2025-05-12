import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Form from '../components/escrever.jsx';
import Button from '../components/botao.jsx';
import '../styles/pages/login.css'; 
const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mantConectado, setMantConectado] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      alert('Login bem-sucedido!');
      navigate('/');
    } catch (error) {
      alert('Erro ao fazer login: ' + error.message);
    }
  };

  return (
    <div className="login">
      <div className="logo">
        <h1>E4u</h1>
      </div>

      <div className="formulario">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Form
            formValor="Email"
            id="txtemail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form
            formValor="Senha"
            id="txtsenha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <div className="lembrar">
            <Redirect redCaminho="#" RedDescricao="Esqueceu a senha?" />
            <CheckBox value={mantConectado} onChange={setMantConectado} />
          </div>
          <Button type="submit" btnNome="Entrar" />
        </form>

        <h3>Ou</h3>

        <div>GOOGLE {/* Aqui depois pode ir o botão de login com Google */}</div>

        <div className="cadastrar">
          <p>Não possui uma conta?&nbsp;</p>
          <Redirect redCaminho="/cadastroPessoaFisica" RedDescricao="Inscreva-se" />
        </div>
      </div>
    </div>
  );
};

function Redirect({ redCaminho, RedDescricao }) {
  return <a href={redCaminho}>{RedDescricao}</a>;
}

function CheckBox({ value, onChange }) {
  return (
    <>
      <input
        type="checkbox"
        id="mantConectado"
        className="mantConectado"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="descriConectado">Manter conectado</div>
    </>
  );
}

export default Login;
export { Redirect, CheckBox };
