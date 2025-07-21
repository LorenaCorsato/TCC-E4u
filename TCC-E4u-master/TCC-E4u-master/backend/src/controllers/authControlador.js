const axios = require('axios'); 
const admin = require('../config/firebase');
const db = require('../config/database');

exports.cadastrarPF = async (req, res) => {
    const { email, cpf, senha } = req.body;

    if (!email || !cpf || !senha) {
        return res.status(400).send({ mensagem: 'Email, CPF e senha são obrigatórios.' });
    }

    try {
        const registroDeUsuario = await admin.auth().createUser({
            email: email,
            password: senha,
        });

        const { uid } = registroDeUsuario;

        const consultaSQL = `
            INSERT INTO usuario(email_usuario, cpf_usuario, tipo_usuario, firebase_uid)
            VALUES($1, $2, 'fisica', $3)
            RETURNING id_usuario, email_usuario;
        `;
        const valores = [email, cpf, uid];

        const { rows } = await db.query(consultaSQL, valores);

        res.status(201).send({ mensagem: 'Usuário físico criado com sucesso!', usuario: rows[0] });

    } catch (error) {
        console.error("Erro ao criar usuário:", error);

        if (error.code === 'auth/email-already-exists') {
            return res.status(409).send({ mensagem: "O email já está cadastrado" });
        }

        return res.status(500).send({ mensagem: "Ocorreu um erro no servidor ao tentar cadastrar." });
    }
}; 

exports.cadastrarPJ = async (req, res) => {
    const { email, cnpj, senha } = req.body;

    if (!email || !cnpj || !senha) {
        return res.status(400).send({ mensagem: 'Email, CNPJ e senha são obrigatórios.' });
    }

    try {
        const registroDeUsuario = await admin.auth().createUser({
            email: email,
            password: senha,
        });

        const { uid } = registroDeUsuario;

        const consultaSQL = `
            INSERT INTO usuario(email_usuario, cnpj_usuario, tipo_usuario, firebase_uid)
            VALUES($1, $2, 'juridica', $3)
            RETURNING id_usuario, email_usuario;
        `;
        const valores = [email, cnpj, uid];
        
        const { rows } = await db.query(consultaSQL, valores);

        res.status(201).send({ mensagem: 'Usuário jurídico criado com sucesso!', usuario: rows[0] });

    } catch (error) {
        console.error("Erro ao criar usuário:", error);

        if (error.code === 'auth/email-already-exists') {
            return res.status(409).send({ mensagem: "O email já está cadastrado" });
        }

        return res.status(500).send({ mensagem: "Ocorreu um erro no servidor ao tentar cadastrar." });
    }
}; 
exports.loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send({ mensagem: 'Email e senha são obrigatórios.' });
    }

    try {
        const resposta = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
            {
                email: email,
                password: senha,
                returnSecureToken: true
            }
        );

        const idToken = resposta.data.idToken;
        const uid = resposta.data.localId;

        const consultaSQL = `SELECT * FROM usuario WHERE firebase_uid = $1`;
        const { rows } = await db.query(consultaSQL, [uid]);

        if (rows.length === 0) {
            return res.status(404).send({ mensagem: 'Usuário autenticado mas não encontrado no banco de dados.' });
        }
        
        res.status(200).send({ 
            mensagem: 'Login realizado com sucesso!', 
            token: idToken, 
            usuario: rows[0] 
        });

    } catch (erro) {
        if (erro.response && erro.response.data && erro.response.data.error) {
            const erroFirebase = erro.response.data.error.message;
            console.error('Erro de autenticação do Firebase:', erroFirebase);

            if (erroFirebase === 'INVALID_PASSWORD' || erroFirebase === 'EMAIL_NOT_FOUND' || erroFirebase === 'INVALID_LOGIN_CREDENTIALS') {
                return res.status(401).send({ mensagem: 'Email ou senha inválidos.' });
            }
        }
        
        console.error('Erro geral no login:', erro.message);
        return res.status(500).send({ mensagem: 'Ocorreu um erro interno no servidor.' });
    }
};