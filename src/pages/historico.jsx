import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

import NavBar from '../components/navegacao';
import Footer from '../components/rodape';
import '../styles/pages/historico.css';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
);

export default function Historico() {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchHistory = async () => {
            if (!token) return;
            try {
                const resposta = await axios.get(
                    'http://localhost:3001/api/historico/footprint',
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );

                const historico = resposta.data;

                if (historico.length === 0) {
                    setLoading(false);
                    return;
                }

              
                let labels = [];
                let dataPoints = [];
                let chartLabel = '';

                const firstYear = new Date(historico[0].data_carbono).getFullYear();
                const allSameYear = historico.every(item => new Date(item.data_carbono).getFullYear() === firstYear);

                if (allSameYear) {
                    chartLabel = `Evolução Mensal (${firstYear}) (em toneladas)`;
                    
                    historico.sort((a, b) => new Date(a.data_carbono) - new Date(b.data_carbono));

                    labels = historico.map(item => 
                        new Date(item.data_carbono).toLocaleDateString('pt-BR', { month: 'short', day: '2-digit' }) // Ex: "20/set"
                    );
                    dataPoints = historico.map(item => 
                        (parseFloat(item.resultado_carbono) / 1000).toFixed(2) 
                    );

                } else {
                    chartLabel = 'Média Anual da Pegada (em toneladas)';

                    const yearSummary = {};
                    historico.forEach(item => {
                        const year = new Date(item.data_carbono).getFullYear();
                        const valueInKg = parseFloat(item.resultado_carbono);
                        if (!yearSummary[year]) {
                            yearSummary[year] = { sum: 0, count: 0 };
                        }
                        yearSummary[year].sum += valueInKg;
                        yearSummary[year].count += 1;
                    });

                    labels = Object.keys(yearSummary).sort((a, b) => a - b); 
                    dataPoints = labels.map(year => {
                        const averageInKg = yearSummary[year].sum / yearSummary[year].count;
                        return (averageInKg / 1000).toFixed(2); 
                    });
                }

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: chartLabel,
                            data: dataPoints,
                            fill: true,
                            backgroundColor: 'rgba(35, 79, 30, 0.2)',
                            borderColor: '#234F1E',
                            tension: 0.1
                        }
                    ]
                });
                setLoading(false);

            } catch (error) {
                console.error("Erro ao buscar histórico:", error);
                setLoading(false);
            }
        };

        fetchHistory();
    }, [token]);

    const renderContent = () => {
        if (loading) {
            return <p>Carregando histórico...</p>;
        }
        if (!chartData) {
            return <p>Você ainda não tem nenhum cálculo no seu histórico.</p>;
        }
        if (chartData.labels.length === 1) {
            return (
                <div>
                    <p>Você só tem 1 registro. Continue calculando para ver sua evolução!</p>
                    <Line data={chartData} />
                </div>
            );
        }
        return <Line data={chartData} />;
    };

    return (
        <>
            <NavBar />
            <div className="historico-container">
                <h1>Evolução da sua pegada de carbono</h1>
                <div className="chart-wrapper">
                    {renderContent()}
                </div>
            </div>
            <Footer />
        </>
    );
}