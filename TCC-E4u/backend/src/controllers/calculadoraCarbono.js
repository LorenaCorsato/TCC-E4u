const db = require('../config/database');

const FATORES = {
  combustivel: { 
    gasolina: 0.23,   // kg CO₂/km — Wikipedia, 2023 (2,3 kg/litro / 10 km/l)
    etanol: 0.10,     // kg CO₂/km — IPCC & MCTI, emissão líquida menor por renovabilidade
    diesel: 0.27,     // kg CO₂/km — EPA (2,7 kg/litro / 10 km/l)
    gnv: 0.18,        // kg CO₂/km — IPCC (2,75 kg/m³, consumo médio convertido p/ km)
    hibrido: 0.14,    // kg CO₂/km — média ponderada entre gasolina e elétrico
    eletrico: 0.038   // kg CO₂/km — MCTI, 2023 (0,0385 kg/kWh × 1 kWh/100 km)
  },

  motorMultiplicador: { 
    "1.0 a 1.5": 0.9, 
    "1.6 a 2.0": 1.0, 
    "maior que 2.0": 1.2, 
    "não possuo conhecimento": 1.0 
  },

  veiculosSimples: { 
    moto: 0.072,      // kg CO₂/km — Wikipedia, 2023
    caminhao: 0.90,   // kg CO₂/km — HBEFA, 2022 (carga pesada)
    onibus: 0.068,    // kg CO₂/km — Wikipedia, 2023
    bicicletaeletrica: 0.006, // kg CO₂/km — estimativa a partir de MCTI, 2023
    patineteeletrico: 0.004   // kg CO₂/km — estimativa a partir de MCTI, 2023
  },

  tempoParaKm: { 
    "-30 minutos": 10, 
    "30 minutos": 20, 
    "1-3 horas": 50, 
    "4-6 horas": 100, 
    "7-9 horas": 150, 
    "10+ horas": 200 
  },

  botijaoGasKgCO2: 33, // kg CO₂/botijão 13kg — IPCC 2006 Guidelines + ANP (1 kg GLP = 2,52 kg CO₂)

  eletricidadeKwhParaCO2: 0.0385, // kg CO₂/kWh — MCTI, 2023

  precoMedioKwh: 0.90, // R$/kWh — ANEEL média Brasil 2024

  viagemDistanciaParaCO2: { 
    "até 300km": 40,       // kg CO₂ — Our World in Data, 2024 (0,13 kg/km × 300 km)
    "300km a 1000km": 120, // kg CO₂ — OWID, 2024
    "1000km a 3000km": 360,// kg CO₂ — OWID, 2024
    "mais de 3000km": 900  // kg CO₂ — OWID, 2024
  }
};
// Função para normalizar strings (minuscula + sem acento + sem espaços extras)
const normalizar = (txt) => {
    return (txt || "")
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
        .replace(/\s+/g, ""); // remove espaços extras
};

exports.calcularPegada = async (req, res) => {
    try {
        const { uid } = req.usuario;
        const userResult = await db.query('SELECT id_usuario FROM usuario WHERE firebase_uid = $1', [uid]);
        if (userResult.rows.length === 0) {
            return res.status(404).send({ mensagem: "Usuário não encontrado." });
        }
        const id_usuario = userResult.rows[0].id_usuario;
        const r = req.body;

        // --- CÁLCULO DE VEÍCULOS ---
        let co2VeiculosMensal = 0;
        if (r.veiculosAdicionados && r.veiculosAdicionados.length > 0) {
            r.veiculosAdicionados.forEach(veiculo => {
                const tipo = normalizar(veiculo.tipo);
                const combustivel = normalizar(veiculo.combustivel);
                const motor = normalizar(veiculo.motor);

                if (tipo === 'outros/naoutilizonhum') return;

                const kmDiarios = FATORES.tempoParaKm[veiculo.tempo] || 0;
                let co2DiarioItem = 0;

                if (tipo === 'carro') {
                    const fatorCombustivel = FATORES.combustivel[combustivel] || 0;
                    const fatorMotor = FATORES.motorMultiplicador[veiculo.motor] || 1; // motorMantémCase pq é numérico
                    co2DiarioItem = kmDiarios * fatorCombustivel * fatorMotor;
                } else {
                    const fatorSimples = FATORES.veiculosSimples[tipo] || 0;
                    co2DiarioItem = kmDiarios * fatorSimples;
                }
                co2VeiculosMensal += co2DiarioItem * 30; // mensal
            });
        }

        // --- CÁLCULO DE CASA ---
        const co2GasAnual = (parseInt(r.botijoesGas, 10) || 0) * FATORES.botijaoGasKgCO2;
        let co2EletricidadeAnual = 0;

        if (normalizar(r.tipoEnergia) === "eletrica(hidreletrica)") {
            if (r.tipoConsumoEletricidade === 'R$/mês') {
                const kwhMensal = (parseFloat(r.consumoEletricidade) || 0) / FATORES.precoMedioKwh;
                co2EletricidadeAnual = kwhMensal * FATORES.eletricidadeKwhParaCO2 * 12;
            } else {
                co2EletricidadeAnual = (parseFloat(r.consumoEletricidade) || 0) * FATORES.eletricidadeKwhParaCO2 * 12;
            }
        }

        const pessoas = parseInt(r.pessoasResidencia, 10) || 1;
        const co2CasaAnual = (co2GasAnual + co2EletricidadeAnual) / pessoas;

        // --- CÁLCULO AÉREO ---
        let co2Aereo = 0;
        if (normalizar(r.viagemAerea) === "sim" && r.viagensAdicionadas && r.viagensAdicionadas.length > 0) {
            r.viagensAdicionadas.forEach(viagem => {
                const distancia = FATORES.viagemDistanciaParaCO2[viagem.distancia] || 0;
                const tipoMultiplicador = normalizar(viagem.tipo) === 'idaevolta' ? 1 : 0.5;
                co2Aereo += distancia * tipoMultiplicador;
            });
        }

        // --- TOTAL ---
        const co2VeiculosAnual = co2VeiculosMensal * 12;
        const co2TotalAnual = co2VeiculosAnual + co2CasaAnual + co2Aereo;

        await db.query(
            'INSERT INTO calculocarbono (id_usuario, resultado_carbono, data_carbono) VALUES ($1, $2, NOW())',
            [id_usuario, co2TotalAnual.toFixed(2)]
        );

        res.status(200).send({
            mensagem: "Cálculo realizado com sucesso!",
            resultado: { totalAnualKg: co2TotalAnual.toFixed(2) }
        });

    } catch (error) {
        console.error("Erro ao calcular pegada de carbono:", error);
        res.status(500).send({ mensagem: "Ocorreu um erro no servidor durante o cálculo." });
    }
};
