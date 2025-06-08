import { useState } from 'react'
import Form from '../components/escrever.jsx'
import Button from '../components/botao.jsx'
import '../styles/pages/login.css'

export default function CadastroJuridico() {
    const [email, setEmail] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [senha, setSenha] = useState('')

    function ValoresLogin() {
        setEmail(txtemail)
        setCnpj(txtcnpj)
        setSenha(txtsenha)
    }

    return (
        <>
            <div className="login">
                <div className="logo">
                    <h1>E4u</h1>
                </div>

                <div className="formulario">
                    <h1>Cadastro</h1>
                    <div className="insertEnter">
                        <form>
                            <Form type="email" formValor="Email" id="txtemail" />
                            <Form type="text" formValor="CNPJ" id="txtcnpj" />
                            <Form type="password" formValor="Senha" id="txtsenha" />
                            <Button btnNome="entrar" />
                        </form>
                    </div>

                    <div className="lembrar">
                        <CheckBox />
                    </div>

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
        </>
    )
}

function Redirect({ redCaminho, RedDescricao }) {
    return (
        <>
            <a href={redCaminho}>{RedDescricao}</a>
        </>
    )
}

function CheckBox() {
    return (
        <>
            <input type="checkbox" id="mantConectado" className="mantConectado" />
            <div className="descriConectado">Manter conectado</div>
        </>
    )
}