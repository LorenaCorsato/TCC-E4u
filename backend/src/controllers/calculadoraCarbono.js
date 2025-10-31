const db = require('../config/database');

//  Fatores de Emissão (Estimativas) 
const FATORES = {

    //  GERAL 
    botijaoGasKgCO2: 15,
    eletricidadeKwhParaCO2: 0.072,
    precoMedioKwh: 0.90,
    tempoParaKm: { "-30 minutos": 10, "30 minutos": 20, "1-3 horas": 50, "4-6 horas": 100, "7-9 horas": 150, "10+ horas": 200 },
    
    //  PESSOA FÍSICA 
    veiculosPF: { "Carro": 0.122, "Moto": 0.060, "Ônibus": 0.030, "Bicicleta elétrica": 0.002, "Patinete elétrico": 0.002 },
    combustivelPF: { "Gasolina": 1.0, "Etanol": 0.46, "Diesel": 1.35, "GNV": 0.74, "Híbrido": 0.61, "Elétrico": 0.07 },
    motorPF: { "1.0 a 1.5": 0.9, "1.6 a 2.0": 1.0, "maior que 2.0": 1.2, "não possuo conhecimento": 1.0 },
    viagemDistanciaParaCO2: { "Até 300km": 30, "300km a 1000km": 100, "1000km a 3000km": 300, "Mais de 3000km": 700 }, // <-- Nome correto

    //  PESSOA JURÍDICA 
    veiculosPJ: { "Carro": 0.122, "Moto": 0.060, "Caminhão": 1.5, "Ônibus": 0.8 },
    combustivelPJ: { "Gasolina": 1.0, "Etanol": 0.46, "Diesel": 1.35, "GNV": 0.74, "Híbrido": 0.61, "Elétrico": 0.07 },
    motorPJ: { "1.0 a 1.5": 0.9, "1.6 a 2.0": 1.0, "Maior que 2.0": 1.2, "Não possuo conhecimento": 1.0 },
    maquinarioCombustivel: { "Diesel": 2.68, "Etanol": 1.51, "Gasolina": 2.3, "Carvão": 2.86, "Elétrico": 0.072 }
};


exports.calcularPegadaFisica = async (req, res) => {
    try {
        const { uid } = req.usuario;
        const userResult = await db.query('SELECT id_usuario FROM usuario WHERE firebase_uid = $1', [uid]);
        if (userResult.rows.length === 0) return res.status(404).send({ mensagem: "Usuário não encontrado." });
        
        const id_usuario = userResult.rows[0].id_usuario;
        const r = req.body;

        // 1. Veículos (Mensal)
        let co2VeiculosMensal = 0;
        if (r.veiculosAdicionados && r.veiculosAdicionados.length > 0) {
            r.veiculosAdicionados.forEach(veiculo => {
                if (veiculo.tipo === 'outros/não utilizo nenhum') return;
                const kmDiarios = FATORES.tempoParaKm[veiculo.tempo] || 0;
                let co2DiarioItem = 0;
                if (veiculo.tipo === 'carro') {
                    const fatorCombustivel = FATORES.combustivelPF[veiculo.combustivel] || 1.0;
                    const fatorMotor = FATORES.motorPF[veiculo.motor] || 1.0;
                    co2DiarioItem = kmDiarios * (FATORES.veiculosPF['carro'] * fatorCombustivel * fatorMotor);
                } else {
                    co2DiarioItem = kmDiarios * (FATORES.veiculosPF[veiculo.tipo] || 0); // Corrigido para 'veiculosPF'
                }
                co2VeiculosMensal += co2DiarioItem * 30;
            });
        }
        const co2VeiculosAnual = co2VeiculosMensal * 12;

        // 2. Casa (Anual)
        const co2GasAnual = (parseInt(r.botijoesGas, 10) || 0) * FATORES.botijaoGasKgCO2;
        let co2EletricidadeAnual = 0;
        if (r.tipoEnergia === "elétrica (hidrelétrica)") {
            if (r.tipoConsumoEletricidade === 'R$/mês') {
                const kwhMensal = (parseFloat(r.consumoEletricidade) || 0) / FATORES.precoMedioKwh;
                co2EletricidadeAnual = kwhMensal * FATORES.eletricidadeKwhParaCO2 * 12;
            } else {
                co2EletricidadeAnual = (parseFloat(r.consumoEletricidade) || 0) * FATORES.eletricidadeKwhParaCO2 * 12;
            }
        }
        const pessoas = parseInt(r.pessoasResidencia, 10) || 1;
        const co2CasaAnual = (co2GasAnual + co2EletricidadeAnual) / pessoas;

        // 3. Viagens Aéreas (Pontual/Anual)
        let co2Aereo = 0;
        if (r.viagemAerea === "sim" && r.viagensAdicionadas && r.viagensAdicionadas.length > 0) {
            r.viagensAdicionadas.forEach(viagem => {
                const fatorDistancia = FATORES.viagemDistanciaParaCO2[viagem.distancia] || 0;
                const tipoMultiplicador = viagem.tipo === 'ida e volta' ? 1 : 0.5;
                co2Aereo += (fatorDistancia * tipoMultiplicador);
            });
        }
        
        // 4. Total
        const co2TotalAnual = co2VeiculosAnual + co2CasaAnual + co2Aereo;

        await db.query('INSERT INTO calculocarbono (id_usuario, resultado_carbono, data_carbono) VALUES ($1, $2, NOW())', [id_usuario, co2TotalAnual.toFixed(2)]);
        res.status(200).send({
            mensagem: "Cálculo realizado com sucesso!",
            resultado: { 
                totalAnualKg: co2TotalAnual.toFixed(2),
                breakdown: {
                    transporte: co2VeiculosAnual.toFixed(2),
                    casa: co2CasaAnual.toFixed(2),
                    viagens: co2Aereo.toFixed(2)
                }
            }
        });

    } catch (error) {
        console.error("Erro no cálculo (Física):", error);
        res.status(500).send({ mensagem: "Ocorreu um erro no servidor." });
    }
};


exports.calcularPegadaJuridica = async (req, res) => {
    try {
        const { uid } = req.usuario;
        const userResult = await db.query('SELECT id_usuario FROM usuario WHERE firebase_uid = $1', [uid]);
        if (userResult.rows.length === 0) return res.status(404).send({ mensagem: "Usuário não encontrado." });
        
        const id_usuario = userResult.rows[0].id_usuario;
        const r = req.body;

        // 1. Veículos (Frota)
        let co2VeiculosMensal = 0;
        if (r.veiculosAdicionados && r.veiculosAdicionados.length > 0) {
            r.veiculosAdicionados.forEach(veiculo => {
                const kmDiarios = FATORES.tempoParaKm[veiculo.tempo] || 0;
                let co2DiarioItem = 0;
                if (veiculo.tipo === 'Carro') {
                    const fatorCombustivel = FATORES.combustivelPJ[veiculo.combustivel] || 1.0;
                    const fatorMotor = FATORES.motorPJ[veiculo.motor] || 1.0;
                    co2DiarioItem = kmDiarios * (FATORES.veiculosPJ['Carro'] * fatorCombustivel * fatorMotor);
                } else {
                    co2DiarioItem = kmDiarios * (FATORES.veiculosPJ[veiculo.tipo] || 0);
                }
                co2VeiculosMensal += co2DiarioItem * 30;
            });
        }
        const co2VeiculosAnual = co2VeiculosMensal * 12;

        // 2. Maquinário
        let co2MaquinasMensal = 0;
        if (r.maquinasAdicionadas && r.maquinasAdicionadas.length > 0) {
            r.maquinasAdicionadas.forEach(maquina => {
                const consumo = parseFloat(maquina.consumo) || 0;
                const fatorCombustivel = FATORES.maquinarioCombustivel[maquina.combustivel] || 0;
                co2MaquinasMensal += consumo * fatorCombustivel;
            });
        }
        const co2MaquinasAnual = co2MaquinasMensal * 12;

        // 3. Consumo Geral
        const co2GasAnual = (parseInt(r.botijoesGas, 10) || 0) * FATORES.botijaoGasKgCO2;
        let co2EletricidadeAnual = 0;
        if (r.tipoEnergia === "Elétrica (hidrelétrica)") {
            if (r.tipoConsumoEletricidade === 'R$/mês') {
                const kwhMensal = (parseFloat(r.consumoEletricidade) || 0) / FATORES.precoMedioKwh;
                co2EletricidadeAnual = kwhMensal * FATORES.eletricidadeKwhParaCO2 * 12;
            } else {
                co2EletricidadeAnual = (parseFloat(r.consumoEletricidade) || 0) * FATORES.eletricidadeKwhParaCO2 * 12;
            }
        }
        const co2ConsumoGeralAnual = co2GasAnual + co2EletricidadeAnual;
        
        // 4. Total
        const co2TotalAnual = co2VeiculosAnual + co2MaquinasAnual + co2ConsumoGeralAnual;

        await db.query('INSERT INTO calculocarbono (id_usuario, resultado_carbono, data_carbono) VALUES ($1, $2, NOW())', [id_usuario, co2TotalAnual.toFixed(2)]);
        
        res.status(200).send({
            mensagem: "Cálculo realizado com sucesso!",
            resultado: { 
                totalAnualKg: co2TotalAnual.toFixed(2),
                breakdown: {
                    frota: co2VeiculosAnual.toFixed(2),
                    maquinario: co2MaquinasAnual.toFixed(2),
                    consumo_geral: co2ConsumoGeralAnual.toFixed(2)
                }
            }
        });

    } catch (error) {
        console.error("Erro no cálculo (Jurídica):", error);
        res.status(500).send({ mensagem: "Ocorreu um erro no servidor." });
    }
};