"use client";
import React, { useState, useMemo } from 'react';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
import Table from '../../Components/Table/Table.jsx';
import SearchBar from '../../Components/SearchBar/SearchBar.jsx';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../../css/table.css';
import './financeiro.css'


const Financeiro = () => {
    const [cliente, setCliente] = useState({ cpf: '', nome: '', endereco: '', celular: '', aniversario: '' });

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(cliente);
    };


    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };
        
        const columns = useMemo(
            () => [
                {
                    Header: 'ID',
                    accessor: 'id',
                },
                {
                    Header: 'Nome',
                    accessor: 'nome',
                },
                {
                    Header: 'Telefone',
                    accessor: 'telefone',
                },
                {
                    Header: 'Serviço',
                    accessor: 'servico',
                },
                {
                    Header: 'Valor',
                    accessor: 'valor',
                },
                {
                    Header: 'Situação',
                    accessor: 'situacao',
                },
                {
                    Header: 'Mês', 
                    accessor: 'mes',
                },
            ],
            []
        );
    
        const dataTable = useMemo(
            () => [
                { id: 1, nome: 'Alice', telefone: '123-456-7890', servico: 'Extensão de cílios', valor: 200.00, situacao: 'Pago', mes: 'Janeiro' },
                { id: 2, nome: 'Maria', telefone: '987-654-3210', servico: 'Limpeza de pele', valor: 150.00, situacao: 'Pendente', mes: 'Fevereiro' },
                { id: 3, nome: 'Joana', telefone: '111-222-3333', servico: 'Lash lifting', valor: 100.00, situacao: 'Pago', mes: 'Janeiro' },
                { id: 4, nome: 'Carla', telefone: '444-555-6666', servico: 'Dermaplaning', valor: 50.00, situacao: 'Pago', mes: 'Março' }
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


        const filteredData = dataTable.filter(item => item.mes === selectedMonth);

        const totalValue = filteredData.reduce((total, item) => total + item.valor, 0);

    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex-1 p-3">
                <div className="formcontainer">
                    <h1 className="title">Financeiro</h1>
                    <div className='space-y-4'>
                    <div className="bg-white p-6 rounded shadow-md">
                        <label htmlFor="month" className="block text-pink-800 mb-2 font-semibold">Selecione o Mês:</label>
                            <select 
                                id="month" 
                                className="bg-pink-100 text-pink-800 py-2 px-4 rounded"
                                value={selectedMonth} 
                                onChange={handleMonthChange} 
                            >
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
                    <Table className="table" columns={columns}  
                    data={filteredData}/>

                    <div>
                        <p className='background-gray'>Valor total: R$ {totalValue.toFixed(2)}</p>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Financeiro;
