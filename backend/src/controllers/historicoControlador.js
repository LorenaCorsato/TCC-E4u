const db = require('../config/database');

exports.getFootprintHistory = async (req, res) => {
    try {
        const { uid } = req.usuario;

        const userResult = await db.query('SELECT id_usuario FROM usuario WHERE firebase_uid = $1', [uid]);
        if (userResult.rows.length === 0) {
            return res.status(404).send({ mensagem: "Usuário não encontrado." });
        }
        const id_usuario = userResult.rows[0].id_usuario;

        const consultaSQL = `
            SELECT resultado_carbono, data_carbono 
            FROM calculocarbono 
            WHERE id_usuario = $1
            ORDER BY data_carbono ASC;
        `;
        const { rows } = await db.query(consultaSQL, [id_usuario]);

        res.status(200).send(rows);

    } catch (error) {
        console.error("Erro ao buscar histórico:", error);
        res.status(500).send({ mensagem: "Erro no servidor ao buscar histórico." });
    }
};