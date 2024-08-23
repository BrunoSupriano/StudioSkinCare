import React from 'react';
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
} from 'chart.js';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MyChart = () => {
    const data = {
        labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
        datasets: [
            {
                label: 'Vendas Semanais',
                data: [150, 200, 300, 250, 400],
                borderColor: '#ff6fa3', // Cor rosa para a linha
                backgroundColor: 'rgba(255, 175, 204, 0.2)', // Cor de preenchimento rosa claro
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: '#ffc1e3', // Grade rosa claro
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: '#ffccdd', // Cor rosa claro para o texto da legenda
                },
            },
            title: {
                display: true,
                text: 'Vendas Semanais',
                color: '#ffb6c1', // Cor rosa para o título
                font: {
                    size: 16,
                    family: "'Comic Sans MS', cursive, sans-serif", // Fonte divertida para um visual fofo
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="w-full max-w-xs mx-auto">
            <Line data={data} options={options} />
        </div>
    );
};

export default MyChart;
