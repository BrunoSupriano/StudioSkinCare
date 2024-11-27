"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
import Table from '../../Components/Table/Table.jsx';
import './financeiro.css'

const Financeiro = () => {
    const [selectedMonth, setSelectedMonth] = useState('Novembro');
    const [financeiros, setFinanceiros] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/financeiro')
            .then(response => response.json())
            .then(data => {
                const mappedData = data.map(item => ({
                    ...item.financeiro,
                    nomeCliente: item.nomeCliente
                }));
                setFinanceiros(mappedData);
            });
    }, []);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'idFinanceiro',
            },
            {
                Header: 'ID Agenda',
                accessor: 'idAgenda',
            },
            {
                Header: 'Nome Cliente',
                accessor: 'nomeCliente',
            },
            {
                Header: 'Valor',
                accessor: 'valor',
                Cell: ({ value }) => `R$ ${value.toFixed(2)}`
            },
            {
                Header: 'Data Serviço',
                accessor: 'dataPagamento',
                Cell: ({ value }) => new Date(value).toLocaleDateString()
            },
            {
                Header: 'Forma Pagamento',
                accessor: 'formaPagamento',
            },
            {
                Header: 'Status',
                accessor: 'status',
            }
        ],
        []
    );

    // Filtrar por mês da data
    const filteredData = financeiros.filter(item => {
        const dataItem = new Date(item.data);
        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 
            'Maio', 'Junho', 'Julho', 'Agosto', 
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return monthNames[dataItem.getMonth()] === selectedMonth;
    });

    const totalValue = filteredData.reduce((total, item) => total + item.valor, 0);

    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex-1 p-3">
                <div className="formcontainer">
                    <div className="flex justify-between items-center">
                        <div role='texto explicativo'>
                            <h1 className="title">Financeiro</h1>
                            <p className="mb-4 text-pink-700">Selecione um mês para visualizar os lucros diários e obter insights financeiros.</p>
                        </div>
                        <div className="bg-gray-50 w-48 p-4 rounded-lg shadow-sm text-center ml-auto whitespace-nowrap" role='seletor de mês'>
                            <label htmlFor="month" className="formlabel block mb-2 font-semibold">Selecione o Mês:</label>
                            <select id="month" className="text-zinc-100 bg-pink-600 py-2 px-4 rounded" value={selectedMonth} onChange={handleMonthChange}>
                                <option value="Janeiro">Janeiro</option>
                                <option value="Fevereiro">Fevereiro</option>
                                <option value="Março">Março</option>
                                <option value="Abril">Abril</option>
                                <option value="Maio">Maio</option>
                                <option value="Junho">Junho</option>
                                <option value="Julho">Julho</option>
                                <option value="Agosto">Agosto</option>
                                <option value="Setembro">Setembro</option>
                                <option value="Outubro">Outubro</option>
                                <option value="Novembro">Novembro</option>
                                <option value="Dezembro">Dezembro</option>
                            </select>
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <Table className="table" columns={columns} data={filteredData} />
                        <div className="bg-gray-50 w-48 p-4 rounded-lg shadow-sm text-center ml-auto whitespace-nowrap">
                            <p className='text-gray-700 font-medium'>Valor total: <span className="formlabel">R$ {totalValue.toFixed(2)}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Financeiro;