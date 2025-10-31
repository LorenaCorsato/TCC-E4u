const db = require('../config/database');

 
const censurarTexto = (texto) => {
  
const listaDePalavroes = [
  'idiota', 'burro', 'estúpido', 'imbecil', 'otário', 'vagabundo', 'canalha',
  'cretino', 'miserável', 'nojento', 'escroto', 'chato', 'fracassado',
  'feio', 'asno', 'patético', 'babaca', 'pilantra', 'corno',
  'pqp', 'fdp', 'merda', 'droga', 'caramba', 'inferno', 'cacete', 'bosta',
  'krl', 'vai tomar no cu', 'filho da puta', 'arrombado', 'desgraçado',
  'racismo', 'machismo', 'homofobia', 'xenofobia', 'nazismo', 'fascismo',
  'hitler', 'nazista', 'fascista', 'terrorista', 'genocida',
  'seu inútil', 'vai se ferrar', 'te odeio', 'morra', 'se mata', 'smt',
  'viado', 'viadozinho', 'traveco'
];

    if (listaDePalavroes.length === 0) {
        return texto;
    }


    const regex = new RegExp(listaDePalavroes.join('|'), 'gi');

    return texto.replace(regex, (match) => '*'.repeat(match.length));
};

exports.getAvaliacoesPorProduto = async (req, res) => {
    try {
        const { id_produto } = req.params;

        const consultaSQL = `
            SELECT 
                a.nota, 
                a.opiniao, 
                a.data_avaliacao, 
                u.nome AS nome_usuario
            FROM avaliacao a
            JOIN usuario u ON a.id_usuario = u.id_usuario
            WHERE a.id_produto = $1
            ORDER BY a.data_avaliacao DESC;
        `;
        
        const { rows } = await db.query(consultaSQL, [id_produto]);
        
        res.status(200).send(rows);

    } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
        res.status(500).send({ mensagem: "Erro no servidor ao buscar avaliações." });
    }
};

exports.postAvaliacao = async (req, res) => {
    try {
        const { uid } = req.usuario; 
        const { id_produto } = req.params; 
        let { nota, opiniao } = req.body;

        if (!nota || !opiniao) {
            return res.status(400).send({ mensagem: 'Nota e opinião são obrigatórias.' });
        }

        const opiniaoCensurada = censurarTexto(opiniao);

        const userResult = await db.query('SELECT id_usuario FROM usuario WHERE firebase_uid = $1', [uid]);
        if (userResult.rows.length === 0) {
            return res.status(404).send({ mensagem: "Usuário não encontrado." });
        }
        const id_usuario = userResult.rows[0].id_usuario;
       const upsertQuery = `
        INSERT INTO avaliacao (id_usuario, id_produto, opiniao, nota)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id_usuario, id_produto) 
        DO UPDATE SET
        opiniao = EXCLUDED.opiniao,
        nota = EXCLUDED.nota,
        data_avaliacao = NOW();
        `;
        
        await db.query(upsertQuery, [id_usuario, id_produto, opiniaoCensurada, nota]);
        res.status(201).send({ mensagem: 'Avaliação registrada com sucesso!' });

    } catch (error) {
        console.error("Erro ao registrar avaliação:", error);
        res.status(500).send({ mensagem: 'Erro no servidor ao registrar avaliação.' });
    }
};