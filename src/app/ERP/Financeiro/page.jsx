"use client";
import React, { useState, useMemo } from 'react';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
import Table from '../../Components/Table/Table.jsx';
import SearchBar from '../../Components/SearchBar/SearchBar.jsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../../Components/Table/Table.jsx';

const Financeiro = () => {
    const [cliente, setCliente] = useState({ cpf: '', nome: '', endereco: '', celular: '', aniversario: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(cliente);
    };

    const columns = useMemo(
        () => [
            { Header: 'ID da Receita', accessor: 'id' },
            { Header: 'Data', accessor: 'data' },
            { Header: 'Valor', accessor: 'valor' },
            { Header: 'Cliente', accessor: 'cliente' },
            { Header: 'Serviço', accessor: 'servico' },
        ],
        []
    );

    const dataTable = useMemo(
        () => [
            { id: 1, data: '2024-09-01', valor: 100, cliente: 'Alice', servico: 'Facial' },
            { id: 2, data: '2024-09-02', valor: 150, cliente: 'Bob', servico: 'Limpeza de Pele' },
        ],
        []
    );

    const clearDateFilter = () => {
        setSelectedDate(null);
    };

    const filteredData = dataTable.filter(item => {
        const itemDate = new Date(item.data);
        if (selectedDate) {
            const selectedMonth = new Date(selectedDate);
            return (
                itemDate.getMonth() === selectedMonth.getMonth() &&
                itemDate.getFullYear() === selectedMonth.getFullYear() &&
                (item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.servico.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        return (
            item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.servico.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex-1 p-3">
                <div className="formcontainer">
                    <h1 className="title">Financeiro</h1>
                    <div className='space-y-4'>
                        <div className="flex items-center justify-between mb-4">
                            <SearchBar placeholder="Pesquisar Receita..." setSearchTerm={setSearchTerm} />
                            <div className="flex items-center justify-end w-full"> {/* Alinhando à direita */}
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={date => setSelectedDate(date)}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                    className="border-2 border-pink-500 rounded-lg py-2 px-4 text-pink-800"
                                    placeholderText="Selecione o Mês"
                                />
                                <button
                                    onClick={clearDateFilter}
                                    className="text-white bg-pink-500 hover:bg-pink-600 ml-2 rounded px-2 py-1"
                                >
                                    Limpar Filtro
                                </button>
                            </div>
                        </div>
                        <Table columns={columns} data={filteredData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Financeiro;
