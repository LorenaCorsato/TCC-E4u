import { useState } from 'react'
import Form from '../components/escrever.jsx'
import Button from '../components/botao.jsx'
import '../styles/pages/login.css'


export default function CadastroFisico() {
    return (
        <>
            <div className="login">
                <div className="logo">
                    <h1>E4u</h1>

                </div>

                <div className="formulario">
                    <h1>Cadastro</h1>
                    <div className="insertEnter">
                        <Form type="email" formValor="Email" id="txtemail"/>
                        <Form type="text" formValor="N° de telefone" id="txttelefone"/>
                        <Form type="password" formValor="Senha" id="txtsenha"/>
                        <Button btnNome="entrar" />
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
                        <p>Pessoa jurídica?&nbsp;</p>
                        <Redirect redCaminho="/cadastroPessoaJuridica" RedDescricao="Inscreva-se" />
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