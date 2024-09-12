"use client";
import React, { useState } from 'react';
import { useMemo } from 'react';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
import Table from '../../Components/Table/Table.jsx';
import '../../Components/Table/Table.jsx';

const Financeiro = () => {

    const [cliente, setCliente] = useState({ cpf: '', nome: '', endereco: '', celular: '', aniversario: '' });

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(cliente);
    };

        // Definição das colunas e dados da tabela
        const columns = useMemo(
            () => [
                {
                    Header: 'User ID',
                    accessor: 'userId',
                },
                {
                    Header: 'Username',
                    accessor: 'username',
                },
                {
                    Header: 'Role',
                    accessor: 'role',
                },
            ],
            []
        );
    
        const dataTable = useMemo(
            () => [
                { userId: 1, username: 'alice', role: 'Admin' },
                { userId: 2, username: 'bob', role: 'User' },
                // Adicione mais dados aqui
            ],
            []
        );

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
                        <select id="month" className="bg-pink-100 text-pink-800 py-2 px-4 rounded">
                            <option value="january">Janeiro</option>
                            <option value="february">Fevereiro</option>
                            <option value="march">Março</option>
                        </select>
                    </div>
                    <Table columns={columns} data={dataTable} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Financeiro;
