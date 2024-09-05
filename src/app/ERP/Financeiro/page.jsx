"use client";
import React, { useState } from 'react';
import { useMemo } from 'react';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
import Table from '../../Components/Table/Table.jsx';
import '../../css/table.css';
import './financeiro.css'

const Financeiro = () => {

    const [cliente, setCliente] = useState({ cpf: '', nome: '', endereco: '', celular: '', aniversario: '' });
    const [selectedMonth, setSelectedMonth] = useState('january');

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
                { id: 1, nome: 'Alice', telefone: '123-456-7890', servico: 'Extensão de cílios', valor: 200.00, situacao: 'Pago', mes: 'january' },
                { id: 2, nome: 'Maria', telefone: '987-654-3210', servico: 'Limpeza de pele', valor: 150.00, situacao: 'Pendente', mes: 'february' },
                { id: 3, nome: 'João', telefone: '111-222-3333', servico: 'Lash lifting', valor: 100.00, situacao: 'Pago', mes: 'january' },
                { id: 4, nome: 'Carla', telefone: '444-555-6666', servico: 'Dermaplaning', valor: 50.00, situacao: 'Pago', mes: 'march' }
            ],
            []
        );


        const filteredData = dataTable.filter(item => item.mes === selectedMonth);

        const totalValue = filteredData.reduce((total, item) => total + item.valor, 0);

    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex-1 p-3">
                <div className="formcontainer">
                    <h1 className="title">Financeiro</h1>
                    <p className="mb-4 text-pink-700">Selecione um mês para visualizar os lucros diários e obter insights financeiros.</p>
                    <div className='space-y-4'>
                    <div className="bg-white p-6 rounded shadow-md">
                        <label htmlFor="month" className="block text-pink-800 mb-2 font-semibold">Selecione o Mês:</label>
                            <select 
                                id="month" 
                                className="bg-pink-100 text-pink-800 py-2 px-4 rounded"
                                value={selectedMonth} 
                                onChange={handleMonthChange} 
                            >
                            <option value="january">Janeiro</option>
                            <option value="february">Fevereiro</option>
                            <option value="march">Março</option>
                            <option value="april">Abril</option>
                            <option value="may">Maio</option>
                            <option value="june">Junho</option>
                            <option value="july">Julho</option>
                            <option value="august">Agosto</option>
                            <option value="september">Setembro</option>
                            <option value="october">Outubro</option>
                            <option value="november">Novembro</option>
                            <option value="december">Dezembro</option>
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
