import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const SalesChart = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55],
                fill: false,
                borderColor: '#f55381',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="ml-8 p-4 bg-white rounded-lg shadow-lg centers" style={{ width: '600px', height: '400px' }}>
            <h3 className="formlabel">Gráfico de Vendas</h3>
            <Line data={data} />
        </div>
    );
};

export default SalesChart;