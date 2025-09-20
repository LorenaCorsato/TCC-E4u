const admin = require('../config/firebase');
const db = require('../config/database');

//Cadastro de Pessoa física 
exports.cadastrarPF = async (req, res) => {
    const { email, cpf, senha, googleUid, nome } = req.body;

    // Cadastro via Google (sem senha)
    if (googleUid) {
        if (!email || !cpf || !googleUid) {
            return res.status(400).send({ mensagem: 'Email, CPF e Google UID são obrigatórios.' });
        }
        try {
            const consultaSQL = `
              INSERT INTO usuario(email_usuario, cpf_usuario, nome, tipo_usuario, firebase_uid)
              VALUES($1, $2, $3, 'fisica', $4)
              RETURNING *;
            `;
            const valores = [email, cpf, nome, googleUid];
            const { rows } = await db.query(consultaSQL, valores);
            return res.status(201).send({ mensagem: 'Usuário físico criado com sucesso via Google!', usuario: rows[0] });
        } catch (erro) {
            console.error("Erro ao criar usuário físico com Google:", erro);
            if (erro.code === '23505') { 
                return res.status(409).send({ mensagem: 'Este usuário já está cadastrado.' });
            }
            return res.status(500).send({ mensagem: "Ocorreu um erro no servidor." });
        }
    } else {

        // Cadastro com email e senha
        if (!email || !cpf || !senha) {
            return res.status(400).send({ mensagem: 'Email, CPF e senha são obrigatórios.' });
        }
        try {
            const registroDeUsuario = await admin.auth().createUser({ email: email, password: senha, displayName: nome });
            const { uid } = registroDeUsuario;
            const consultaSQL = `
              INSERT INTO usuario(email_usuario, cpf_usuario, nome, tipo_usuario, firebase_uid)
              VALUES($1, $2, $3, 'fisica', $4)
              RETURNING *;
            `;
            const valores = [email, cpf, nome, uid];
            const { rows } = await db.query(consultaSQL, valores);
            return res.status(201).send({ mensagem: 'Usuário físico criado com sucesso!', usuario: rows[0] });
        } catch (erro) {
            console.error("Erro ao criar usuário:", erro);
            if (erro.code === 'auth/email-already-exists') {
                return res.status(409).send({ mensagem: "O email já está cadastrado" });
            }
            return res.status(500).send({ mensagem: "Ocorreu um erro no servidor." });
        }
    }
};

// Cadastro de Pessoa jurídica 
exports.cadastrarPJ = async (req, res) => {
    const { email, cnpj, senha, googleUid, nome } = req.body;

    if (googleUid) {
        if (!email || !cnpj || !googleUid) {
            return res.status(400).send({ mensagem: 'Email, CNPJ e Google UID são obrigatórios.' });
        }
        try {
            const consultaSQL = `
              INSERT INTO usuario(email_usuario, cnpj_usuario, nome, tipo_usuario, firebase_uid)
              VALUES($1, $2, $3, 'juridica', $4)
              RETURNING *;
            `;
            const valores = [email, cnpj, nome, googleUid];
            const { rows } = await db.query(consultaSQL, valores);
            return res.status(201).send({ mensagem: 'Usuário jurídico criado com sucesso via Google!', usuario: rows[0] });
        } catch (erro) {
            console.error("Erro ao criar usuário jurídico com Google:", erro);
            if (erro.code === '23505') {
                return res.status(409).send({ mensagem: 'Este usuário já está cadastrado.' });
            }
            return res.status(500).send({ mensagem: "Ocorreu um erro no servidor." });
        }
    } else {
        //Cadastro  com email e senha
        if (!email || !cnpj || !senha) {
            return res.status(400).send({ mensagem: 'Email, CNPJ e senha são obrigatórios.' });
        }
        try {
            const registroDeUsuario = await admin.auth().createUser({ email: email, password: senha, displayName: nome });
            const { uid } = registroDeUsuario;
            const consultaSQL = `
              INSERT INTO usuario(email_usuario, cnpj_usuario, nome, tipo_usuario, firebase_uid)
              VALUES($1, $2, $3, 'juridica', $4)
              RETURNING *;
            `;
            const valores = [email, cnpj, nome, uid];
            const { rows } = await db.query(consultaSQL, valores);
            return res.status(201).send({ mensagem: 'Usuário jurídico criado com sucesso!', usuario: rows[0] });
        } catch (erro) {
            console.error("Erro ao criar usuário:", erro);
            if (erro.code === 'auth/email-already-exists') {
                return res.status(409).send({ mensagem: "O email já está cadastrado" });
            }
            return res.status(500).send({ mensagem: "Ocorreu um erro no servidor." });
        }
    }
};

