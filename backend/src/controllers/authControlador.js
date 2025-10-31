const admin = require('../config/firebase');
const db = require('../config/database');
const { encrypt } = require('../utils/cryptoUtil');

    function capitalizarNome(str) {
    return str.split(' ') 
              .map(part => part.charAt(0).toUpperCase() + part.slice(1)) 
              .join(' '); 
    }

// Cadastro de Pessoa física 
exports.cadastrarPF = async (req, res) => {
    const { email, cpf, senha, googleUid, nome: nomeGoogle } = req.body;

    const cpfCriptografado = encrypt(cpf);

    //  Cadastro via Google 
    if (googleUid) {
        if (!email || !cpfCriptografado || !googleUid || !nomeGoogle) { // ...
        }
        try {
            const consultaSQL = `
              INSERT INTO usuario(email_usuario, cpf_usuario, nome, tipo_usuario, firebase_uid)
              VALUES($1, $2, $3, 'fisica', $4) RETURNING *;
            `;
            const valores = [email, cpfCriptografado, nomeGoogle, googleUid]; 
            const { rows } = await db.query(consultaSQL, valores);
            return res.status(201).send({ mensagem: 'Usuário físico criado com sucesso via Google!', usuario: rows[0] });
        } catch (erro) {
            if (erro.code === '23505') return res.status(409).send({ mensagem: 'Este usuário já está cadastrado.' });
            return res.status(500).send({ mensagem: "Ocorreu um erro no servidor." });
        }
    } else {

        // Cadastro com email e senha 
        if (!email || !cpfCriptografado || !senha) {
            return res.status(400).send({ mensagem: 'Email, CPF e senha são obrigatórios.' });
        }
        try {
           
            let nome = email.split('@')[0]              
                         .replace(/[^a-zA-Z.]/g, '') 
                         .replace(/\./g, ' ');       
            
            nome = capitalizarNome(nome);

            if (nome.trim().length === 0) {
                nome = 'Usuario'; 
            }

            const registroDeUsuario = await admin.auth().createUser({ email: email, password: senha, displayName: nome });
            const { uid } = registroDeUsuario;
            
            const consultaSQL = `
              INSERT INTO usuario(email_usuario, cpf_usuario, nome, tipo_usuario, firebase_uid)
              VALUES($1, $2, $3, 'fisica', $4)
              RETURNING *;
            `;
            const valores = [email, cpfCriptografado, nome, uid]; 
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
    const { email, cnpj, senha, googleUid, nome: nomeGoogle } = req.body;

    const cnpjCriptografado = encrypt(cnpj);
    
    // Cadastro via Google 
    if (googleUid) {
        if (!email || !cnpjCriptografado || !googleUid || !nomeGoogle) {
            return res.status(400).send({ mensagem: 'Email, CNPJ, Nome e Google UID são obrigatórios.' });
        }
        try {
            const consultaSQL = `
              INSERT INTO usuario(email_usuario, cnpj_usuario, nome, tipo_usuario, firebase_uid)
              VALUES($1, $2, $3, 'juridica', $4)
              RETURNING *;
            `;
            const valores = [email, cnpjCriptografado, nomeGoogle, googleUid];
            const { rows } = await db.query(consultaSQL, valores);
            return res.status(201).send({ mensagem: 'Usuário jurídico criado com sucesso via Google!', usuario: rows[0] });
        } catch (erro) {
            if (erro.code === '23505') return res.status(409).send({ mensagem: 'Este usuário já está cadastrado.' });
            return res.status(500).send({ mensagem: "Ocorreu um erro no servidor." });
        }
    } else {
        // Cadastro com email e senha 
        if (!email || !cnpjCriptografado || !senha) {
            return res.status(400).send({ mensagem: 'Email, CNPJ e senha são obrigatórios.' });
        }
        try {
           
            let nome = email.split('@')[0]
                         .replace(/[^a-zA-Z.]/g, '')
                         .replace(/\./g, ' ');
            
            nome = capitalizarNome(nome);

            if (nome.trim().length === 0) {
                nome = 'UsuarioEmpresarial';
            }

            const registroDeUsuario = await admin.auth().createUser({ email: email, password: senha, displayName: nome });
            const { uid } = registroDeUsuario;

           const consultaSQL = `
              INSERT INTO usuario(email_usuario, cnpj_usuario, nome, tipo_usuario, firebase_uid)
              VALUES($1, $2, $3, 'juridica', $4)
              RETURNING *;
            `;
            const valores = [email, cnpjCriptografado, nome, uid]; 
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