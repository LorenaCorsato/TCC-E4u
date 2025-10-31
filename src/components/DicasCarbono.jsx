// src/components/DicasCarbono.jsx
import React from 'react';
import '../styles/components/dicasCarbono.css';

const DICAS_DB = {
    fisica: {
        transporte: [
            "Para trajetos curtos, tente substituir o carro por uma caminhada ou bicicleta.",
            "Considere usar transporte público. Um ônibus pode tirar dezenas de carros da rua.",
            "Mantenha a calibragem dos pneus em dia; pneus murchos aumentam o consumo de combustível."
        ],
        casa: [
            "Troque lâmpadas incandescentes por LED, que consomem até 80% menos energia.",
            "Desligue aparelhos da tomada quando não estiverem em uso (modo stand-by também consome).",
            "Reduza o tempo no chuveiro elétrico, um dos maiores consumidores de energia da casa."
        ],
        viagens: [
            "Para viagens mais curtas, considere alternativas ao avião, como ônibus.",
            "Quando voar, escolha voos diretos. Decolagens e pousos são os que mais consomem combustível.",
            "Compense as emissões do seu voo através de programas de crédito de carbono."
        ]
    },
    juridica: {
        frota: [
            "Implemente um programa de manutenção preventiva para a frota. Veículos regulados emitem menos.",
            "Utilize software de roteirização para otimizar rotas de entrega e reduzir a quilometragem.",
            "Considere a transição gradual da frota para veículos elétricos, híbridos ou movidos a GNV."
        ],
        maquinario: [
            "Realize auditorias energéticas para identificar máquinas ineficientes ou com vazamentos.",
            "Substitua motores antigos por modelos mais novos e eficientes (selo Procel).",
            "Implemente um cronograma de desligamento de máquinas fora do horário de produção."
        ],
        consumo_geral: [
            "Substitua toda a iluminação da empresa por lâmpadas LED.",
            "Instale painéis solares no telhado para gerar sua própria energia limpa.",
            "Revise e melhore o isolamento térmico do prédio para reduzir a necessidade de ar-condicionado."
        ]
    }
};

export default function DicasCarbono({ breakdown, tipoUsuario }) {
    if (!breakdown || !tipoUsuario) return null;

    const rankingEmissoes = Object.entries(breakdown)
        .sort(([, a], [, b]) => parseFloat(b) - parseFloat(a));
    
    const categoriaPrincipal = rankingEmissoes[0][0];

    const dicasRelevantes = DICAS_DB[tipoUsuario]?.[categoriaPrincipal];

    if (!dicasRelevantes) {
        return <p>Não foi possível gerar dicas para esta categoria.</p>;
    }

    return (
        <div className="dicas-container">
            <h3>Como você pode melhorar?</h3>
            <p>Sua maior fonte de emissão é: <strong>{categoriaPrincipal.replace('_', ' ')}</strong>. Tente focar nestas ações:</p>
            <ul className="lista-dicas">
                {dicasRelevantes.map((dica, i) => (
                    <li key={i}>{dica}</li>
                ))}
            </ul>
        </div>
    );
}