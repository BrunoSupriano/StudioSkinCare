"use client";

import Sidebar from './Components/SideBar/SideBar.jsx';
import Calendar from 'react-calendar';
import { Line } from 'react-chartjs-2';
import { useMemo } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';
import Table from './Components/Table/Table.jsx';
import './Components/Table/Table.jsx';

// Registro dos elementos necessários para o Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const HomePage = () => {
    // Dados do gráfico
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    // Definição das colunas e dados da tabela
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
        ],
        []
    );

    const dataTable = useMemo(
        () => [
            { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
            // Adicione mais dados aqui
        ],
        []
    );

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-3">
                <div className='formcontainer'>
                    <h2 className="title">Dashboard</h2>
                    <p className="mb-4 text-pink-700">Visualize os indicadores dos agendamentos.</p>
                    <section id="dashboard" className="">
                        <div className="mb-8">
                            <h2 className="formlabel">Tabela de Dados</h2>
                            <Table columns={columns} data={dataTable} />
                        </div>
                        <div className='flex '>
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4 text-pink-800">Calendário</h3>
                                <Calendar className="bg-white rounded shadow-md" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-pink-800">Gráfico de Vendas</h3>
                                <div className="bg-white rounded-lg shadow-md p-4">
                                    <Line data={data} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
