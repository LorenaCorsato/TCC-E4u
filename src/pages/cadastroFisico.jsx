import { useState } from 'react'
import Form from '../components/escrever.jsx'
import Button from '../components/botao.jsx'
import '../styles/pages/login.css'
import axios from 'axios'

export default function CadastroFisico() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')

  const handleCadastro = async () => {
    try {
       const response = await axios.post('http://localhost:5000/api/usuarios/cadastro', {
    nome,
    email,
    cpf,
    senha,
    tipo_usuario: 'fisico'
});
        console.log('Cadastro realizado com sucesso:', response.data);

        alert('Cadastro realizado com sucesso!');
    } catch (erro) {
        console.error('Erro no cadastro:', erro);
        alert('Erro ao cadastrar: ' + (erro.response?.data?.mensagem || erro.message));
    }
};


    return (
        <div className="login">
            <div className="logo"><h1>E4u</h1></div>
            <div className="formulario">
                <h1>Cadastro</h1>
                <div className="insertEnter">
                    <Form type="text" formValor="Nome" id="txtnome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <Form type="email" formValor="Email" id="txtemail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form type="text" formValor="CPF" id="txtcpf" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                    <Form type="password" formValor="Senha" id="txtsenha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <Button btnNome="Cadastrar" onClick={handleCadastro} />
                </div>

                <div className="lembrar">
                    <Redirect redCaminho="" RedDescricao="Esqueceu a senha?" />
                    <CheckBox />
                </div>

                <h3>Ou</h3>
                <div>GOOGLE</div>
                <div className="cadastrar">
                    <p>Pessoa jurídica?&nbsp;</p>
                    <Redirect redCaminho="/cadastroPessoaJuridica" RedDescricao="Inscreva-se" />
                </div>
            </div>
        </div>
    )
}

function Redirect({ redCaminho, RedDescricao }) {
    return <a href={redCaminho}>{RedDescricao}</a>
}

function CheckBox() {
    return (
        <>
            <input type="checkbox" id="mantConectado" className="mantConectado" />
            <div className="descriConectado">Manter conectado</div>
        </>
    )
}
