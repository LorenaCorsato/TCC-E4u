const axios = require('axios'); // 1. IMPORTAÇÃO DO AXIOS ADICIONADA
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
}; // 2. CHAVE DE FECHAMENTO CORRIGIDA

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
}; // 2. CHAVE DE FECHAMENTO CORRIGIDA

exports.loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send({ mensagem: 'Email e senha são obrigatórios.' });
    }

    try {
        // Usa a API REST do Firebase para autenticar o usuário
        const resposta = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
            {
                email: email,
                password: senha,
                returnSecureToken: true
            }
        );

        // Se o login no Firebase foi bem-sucedido, pega o token de ID
        const idToken = resposta.data.idToken;
        const uid = resposta.data.localId;

        // Verifica se o usuário existe no seu banco de dados local
        const consultaSQL = `SELECT * FROM usuario WHERE firebase_uid = $1`;
        const { rows } = await db.query(consultaSQL, [uid]);

        if (rows.length === 0) {
            // Isso não deveria acontecer se o cadastro estiver funcionando bem
            return res.status(404).send({ mensagem: 'Usuário autenticado mas não encontrado no banco de dados.' });
        }
        
        // Retorna o token para o frontend
        res.status(200).send({ 
            mensagem: 'Login realizado com sucesso!', 
            token: idToken, // Envia o token para o frontend
            usuario: rows[0] 
        });

    } catch (erro) {
        // Se o erro vier da API do Firebase (ex: senha errada), ele terá uma estrutura específica
        if (erro.response && erro.response.data && erro.response.data.error) {
            const erroFirebase = erro.response.data.error.message;
            console.error('Erro de autenticação do Firebase:', erroFirebase);

            if (erroFirebase === 'INVALID_PASSWORD' || erroFirebase === 'EMAIL_NOT_FOUND' || erroFirebase === 'INVALID_LOGIN_CREDENTIALS') {
                return res.status(401).send({ mensagem: 'Email ou senha inválidos.' });
            }
        }
        
        // Para outros erros
        console.error('Erro geral no login:', erro.message);
        return res.status(500).send({ mensagem: 'Ocorreu um erro interno no servidor.' });
    }
};