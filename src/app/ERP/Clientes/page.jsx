// src/pages/Clientes.jsx
"use client";

import React, { useState } from 'react';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
import ClienteForm from './ClientForm.jsx';
import DataTable from './DataTable.jsx';
import PopupForm from '../../Components/PopUp/PopUpForm.jsx';
import '../../css/table.css';
import SearchBar from '../../Components/SearchBar/SearchBar.jsx'

const Clientes = () => {
    const [cliente, setCliente] = useState({ cpf: '', nome: '', endereco: '', celular: '', aniversario: '' });
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(cliente);
        setIsPopupOpen(false); // Fecha o pop-up após salvar
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-3">
                <div className="formcontainer">
                    <h1 className="title">Clientes</h1>
                    <div className="flex items-center justify-between">
                        <SearchBar placeholder="Pesquisar Cliente..." />
                        <button className="save bg-pink-500 text-white px-4 py-2 rounded ml-4" onClick={() => setIsPopupOpen(true)}>
                            Novo Cliente
                        </button>
                    </div>
                    <DataTable />
                    <PopupForm isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                        <h2 className="formlabel">Cadastrar Cliente</h2>
                        <ClienteForm handleSubmit={handleSubmit} handleChange={handleChange} cliente={cliente} />
                    </PopupForm>
                </div>
            </div>
        </div>
    );
};

export default Clientes;
