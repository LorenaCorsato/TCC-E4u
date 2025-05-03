import { useState } from 'react'
import Form from '../components/escrever.jsx'
import Button from '../components/botao.jsx'
import '../styles/pages/login.css'

export default function Login() {

    return (
        <>
            <div className="login">
                <div className="logo">
                    <h1>E4u</h1>

                </div>

                <div className="formulario">
                    <h1>Login</h1>
                    <div className="insertEnter">
                        <form>
                            <Form formValor="Email" id="txtemail" type="email" />
                            <Form formValor="Senha" id="txtsenha" type="password" />
                            <Button href="/" type="submit" btnNome="entrar" />
                        </form>
                    </div>

                    <div className="lembrar">
                        <Redirect redCaminho="" RedDescricao="Esqueceu a senha?" />
                        <CheckBox />
                    </div>

                    <h3>Ou</h3>

                    <div>
                        GOOGLE
                    </div>

                    <div className="cadastrar">
                        <p>Não possui uma conta?&nbsp;</p>
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