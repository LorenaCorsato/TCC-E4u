const db = require('../config/database');
const axios = require('axios');
const placasData = require('../data/placas.json'); 

async function getCoordsFromCep(cep) {
    try {
        const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`);
        if (!response.data.location || !response.data.location.coordinates) {
            throw new Error('Coordenadas não encontradas para este CEP.');
        }
        return {
            latitude: response.data.location.coordinates.latitude,
            longitude: response.data.location.coordinates.longitude
        };
    } catch (error) {
        console.error("Erro ao buscar coordenadas do CEP:", error.message);
        if (error.response && error.response.status === 404) {
            throw new Error('CEP não encontrado ou inválido.');
        }
        throw new Error('Não foi possível obter a localização do CEP.');
    }
}

exports.calcularPlacas = async (req, res) => {
    try {
        const { mediaConsumoKwh, espacoDisponivelM2, cep } = req.body;

        const { latitude, longitude } = await getCoordsFromCep(cep);
        const irradiacaoQuery = `SELECT irradiacao_anual FROM irradiacao_solar ORDER BY (lat - $1)^2 + (lon - $2)^2 LIMIT 1;`;
        const irradiacaoResult = await db.query(irradiacaoQuery, [latitude, longitude]);
        if (irradiacaoResult.rows.length === 0) {
            return res.status(404).send({ mensagem: "Não foi possível encontrar dados de irradiação para esta localidade." });
        }
        const irradiacaoAnual = irradiacaoResult.rows[0].irradiacao_anual;

        const consumoAnualKwh = mediaConsumoKwh * 12;
        const HSP = irradiacaoAnual / 365;
        const eficienciaSistema = 0.80;
        const potenciaNecessariaWp = (consumoAnualKwh / 365) * 1000 / (HSP * eficienciaSistema);

        const todosOsResultados = await Promise.all(placasData.placas_solares.map(async (placa) => {
            const numeroDePlacas = Math.ceil(potenciaNecessariaWp / placa.potencia_pico);
            const areaTotalPlacas = (placa.dimensoes.altura_mm / 1000) * (placa.dimensoes.largura_mm / 1000) * numeroDePlacas;
            const custoTotal = numeroDePlacas * placa.preco_medio;

            
            let pesoTotal = null;
            if (typeof placa.peso_kg === 'number') {
                pesoTotal = numeroDePlacas * placa.peso_kg;
            }

            const avaliacaoQuery = `
                SELECT 
                    COALESCE(AVG(nota), 0) as media_nota, 
                    COUNT(id_avaliacao) as total_avaliacoes
                FROM avaliacao 
                WHERE id_produto = $1
            `;
            const avaliacaoResult = await db.query(avaliacaoQuery, [placa.id]);
            const { media_nota, total_avaliacoes } = avaliacaoResult.rows[0];

            return {
                ...placa,
                quantidade_necessaria: numeroDePlacas,
                area_total_m2: areaTotalPlacas.toFixed(2),
                custo_total: custoTotal,
                peso_total_kg: pesoTotal !== null ? pesoTotal.toFixed(2) : null,
                cabe_no_espaco: areaTotalPlacas <= espacoDisponivelM2,
                media_nota: parseFloat(media_nota).toFixed(1),
                total_avaliacoes: parseInt(total_avaliacoes, 10)
            };
        }));

        const opcoesViaveis = todosOsResultados
            .filter(placa => placa.cabe_no_espaco)
            .sort((a, b) => a.custo_total - b.custo_total);

        const recomendacoesIds = opcoesViaveis.slice(0, 3).map(p => p.id);
        
        const resultadosFinais = todosOsResultados.map(placa => ({
            ...placa,
            custo_total: placa.custo_total.toFixed(2),
            recomendado: recomendacoesIds.includes(placa.id)
        }));

        res.status(200).send({
            mensagem: "Cálculo realizado com sucesso!",
            potenciaNecessariaWp: potenciaNecessariaWp.toFixed(2),
            recomendacoes: resultadosFinais
        });

    } catch (error) {
        console.error("Erro no cálculo de placas solares:", error.message);
        res.status(500).send({ mensagem: error.message || "Ocorreu um erro no servidor." });
    }
};