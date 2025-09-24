// backend/src/controllers/placaSolarControlador.js
const db = require('../config/database');
const axios = require('axios');
const placasData = require('../data/placas.json'); // Importa o seu JSON de placas

// Função para buscar latitude e longitude de um CEP
async function getCoordsFromCep(cep) {
    try {
        // Usaremos a rota /cep/v2 da BrasilAPI, que é mais completa
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
        // Verifica se o erro é 404 (CEP não encontrado)
        if (error.response && error.response.status === 404) {
            throw new Error('CEP não encontrado ou inválido.');
        }
        throw new Error('Não foi possível obter a localização do CEP.');
    }
}

// Função principal do cálculo
exports.calcularPlacas = async (req, res) => {
    try {
        const { mediaConsumoKwh, espacoDisponivelM2, cep } = req.body;

        // --- 1. Obter Coordenadas e Irradiação Solar (continua o mesmo) ---
        const { latitude, longitude } = await getCoordsFromCep(cep);
        const irradiacaoQuery = `SELECT irradiacao_anual FROM irradiacao_solar ORDER BY (lat - $1)^2 + (lon - $2)^2 LIMIT 1;`;
        const irradiacaoResult = await db.query(irradiacaoQuery, [latitude, longitude]);
        if (irradiacaoResult.rows.length === 0) {
            return res.status(404).send({ mensagem: "Não foi possível encontrar dados de irradiação para esta localidade." });
        }
        const irradiacaoAnual = irradiacaoResult.rows[0].irradiacao_anual;

        // --- 2. Calcular a Energia Necessária (continua o mesmo) ---
        const consumoAnualKwh = mediaConsumoKwh * 12;
        const HSP = irradiacaoAnual / 365;
        const eficienciaSistema = 0.80;
        const potenciaNecessariaWp = (consumoAnualKwh / 365) * 1000 / (HSP * eficienciaSistema);

        // --- 3. NOVA LÓGICA: Calcular para TODAS as placas e depois filtrar ---
        const todosOsResultados = placasData.placas_solares.map(placa => {
            const numeroDePlacas = Math.ceil(potenciaNecessariaWp / placa.potencia_pico);
            const areaTotalPlacas = (placa.dimensoes.altura_mm / 1000) * (placa.dimensoes.largura_mm / 1000) * numeroDePlacas;
            const custoTotal = numeroDePlacas * placa.preco_medio;
            const pesoTotal = numeroDePlacas * placa.peso_kg;

            return {
                ...placa,
                quantidade_necessaria: numeroDePlacas,
                area_total_m2: areaTotalPlacas.toFixed(2),
                custo_total: custoTotal, // Deixa como número para ordenar
                peso_total_kg: pesoTotal.toFixed(2),
                cabe_no_espaco: areaTotalPlacas <= espacoDisponivelM2,
            };
        });

        // 4. Identificar as placas recomendadas
        const opcoesViaveis = todosOsResultados
            .filter(placa => placa.cabe_no_espaco) // Pega só as que cabem no espaço
            .sort((a, b) => a.custo_total - b.custo_total); // Ordena pelo menor custo

        // Marca as 3 mais baratas como "recomendadas"
        const recomendacoesIds = opcoesViaveis.slice(0, 3).map(p => p.id);
        
        const resultadosFinais = todosOsResultados.map(placa => ({
            ...placa,
            custo_total: placa.custo_total.toFixed(2), // Agora formata para string
            recomendado: recomendacoesIds.includes(placa.id)
        }));

        res.status(200).send({
            mensagem: "Cálculo realizado com sucesso!",
            potenciaNecessariaWp: potenciaNecessariaWp.toFixed(2),
            recomendacoes: resultadosFinais // Envia TODOS os resultados para o frontend
        });

    } catch (error) {
        console.error("Erro no cálculo de placas solares:", error.message);
        res.status(500).send({ mensagem: error.message || "Ocorreu um erro no servidor." });
    }
};