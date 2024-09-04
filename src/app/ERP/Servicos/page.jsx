"use client";
import React, { useState } from 'react';
import { useMemo } from 'react';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
import Table from '../../Components/Table/Table.jsx';
import '../../Components/Table/Table.css';

const Servicos = () => {

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
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex-1 p-3">
                <div className="formcontainer">
                    <h1 className="title">Serviços</h1>
                    <p className="mb-4 text-pink-700">Cadastre ou edite os tipos de serviços oferecidos.</p>
                    <form className="space-y-4">
                        <div className="mb-4">
                            <label htmlFor="nome" className="formlabel">Nome do Serviço:</label>
                            <input type="text" id="nome" className="Custom-input" placeholder="Digite o nome do serviço" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="duracao" className="formlabel">Duração (min):</label>
                            <input type="number" id="duracao" className="Custom-input" placeholder="Digite a duração em minutos" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="valor" className="formlabel">Valor (R$):</label>
                            <input type="text" id="valor" className="Custom-input" placeholder="Digite o valor em reais" />
                        </div>
                        <button type="submit" className="save">Salvar Serviço</button>
                        <Table columns={columns} data={dataTable} />      
                    </form>
   
                </div>
            </div>
        </div>
    );
};

export default Servicos;
