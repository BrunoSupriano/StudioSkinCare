"use client";

import React, { useState } from 'react';
import { useMemo } from 'react';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
import Table from '../../Components/Table/Table.jsx';
import '../../Components/Table/table.css';

const Clientes = () => {
    const [cliente, setCliente] = useState({ cpf: '', nome: '', endereco: '', celular: '', aniversario: '' });

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para salvar o cliente
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
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-3">
                <div className="formcontainer">
                    <h1 className="title">Cliente</h1>
                    <p className="mb-4 text-pink-700">Selecione um mês para visualizar os lucros diários e obter insights financeiros.</p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="formlabel">CPF</label>
                            <input type="text" name="cpf" value={cliente.cpf} onChange={handleChange} className="Custom-input" placeholder="Digite o CPF" />
                        </div>
                        <div>
                            <label className="formlabel">Nome</label>
                            <input type="text" name="nome" value={cliente.nome} onChange={handleChange} className="Custom-input" placeholder="Digite o nome" />
                        </div>
                        <div>
                            <label className="formlabel">Endereço</label>
                            <input type="text" name="endereco" value={cliente.endereco} onChange={handleChange} className="Custom-input" placeholder="Digite o endereço" />
                        </div>
                        <div>
                            <label className="formlabel">Celular</label>
                            <input type="text" name="celular" value={cliente.celular} onChange={handleChange} className="Custom-input" placeholder="Digite o celular" />
                        </div>
                        <div>
                            <label className="formlabel">Aniversário</label>
                            <input type="date" name="aniversario" value={cliente.aniversario} onChange={handleChange} className="Custom-input" />
                        </div>
                        <button className="save">
                            Salvar Cliente
                        </button>
                        <Table columns={columns} data={dataTable} />                    
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Clientes;
