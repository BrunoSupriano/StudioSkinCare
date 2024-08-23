"use client";

import React, { useState } from 'react';
import Sidebar from '../Components/SideBar/SideBar.jsx';

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

    return (
        <div className="flex" >
        <Sidebar />
        <div className="p-10 bg-white min-h-screen">
            
            <h1 className="text-2xl font-bold mb-6 text-pink-800">Clientes</h1>
            <section id="clientes" className="mt-10">
                <h2 className="text-xl font-bold mb-4">Clientes</h2>
                <p className="mb-4">Cadastre ou edite clientes (CPF, nome, endereço, celular, aniversário).</p>
                <div className="bg-pink-100 p-4 rounded">
                    {/* Componente de cadastro de clientes vai aqui */}
                    <p>Formulário de cadastro/edição de clientes.</p>
                </div>
            </section>

            {/* Formulário de Cadastro/Edição de Cliente */}
            <div className="bg-pink-100 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Cadastrar/Editar Cliente</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-pink-700">CPF</label>
                        <input type="text" name="cpf" value={cliente.cpf} onChange={handleChange} className="w-full p-2 border border-pink-300 rounded" placeholder="Digite o CPF" />
                    </div>
                    <div>
                        <label className="block text-pink-700">Nome</label>
                        <input type="text" name="nome" value={cliente.nome} onChange={handleChange} className="w-full p-2 border border-pink-300 rounded" placeholder="Digite o nome" />
                    </div>
                    <div>
                        <label className="block text-pink-700">Endereço</label>
                        <input type="text" name="endereco" value={cliente.endereco} onChange={handleChange} className="w-full p-2 border border-pink-300 rounded" placeholder="Digite o endereço" />
                    </div>
                    <div>
                        <label className="block text-pink-700">Celular</label>
                        <input type="text" name="celular" value={cliente.celular} onChange={handleChange} className="w-full p-2 border border-pink-300 rounded" placeholder="Digite o celular" />
                    </div>
                    <div>
                        <label className="block text-pink-700">Aniversário</label>
                        <input type="date" name="aniversario" value={cliente.aniversario} onChange={handleChange} className="w-full p-2 border border-pink-300 rounded" />
                    </div>
                    <button className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">
                        Salvar Cliente
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Clientes;
