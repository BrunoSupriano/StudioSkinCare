"use client";
import Sidebar from './Components/SideBar/SideBar.jsx';
import Calendar from 'react-calendar';
import { Line } from 'react-chartjs-2';
import { useTable } from 'react-table';
import { useMemo } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';

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

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: dataTable });

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-10 bg-white">
                <section id="dashboard" className="mt-10">
                    <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                    <div className="bg-pink-100 p-4 rounded">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Tabela de Dados</h3>
                            <table {...getTableProps()} className="w-full border border-gray-300">
                                <thead>
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                <th {...column.getHeaderProps()} className="border-b px-4 py-2 text-left">{column.render('Header')}</th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {rows.map(row => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map(cell => (
                                                    <td {...cell.getCellProps()} className="border-b px-4 py-2">{cell.render('Cell')}</td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Calendário</h3>
                            <Calendar className="bg-white rounded shadow" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Gráfico de Vendas</h3>
                            <div className="bg-white rounded shadow p-4">
                                <Line data={data} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
