"use client";

import React from 'react';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
import DataTable from './DataTable.jsx';
import SearchBar from '../../Components/SearchBar/SearchBar.jsx';
import CreateCliente from './PopUps/CreateCliente.jsx';
import EditCliente from './PopUps/EditCliente.jsx';
import { ClienteProvider } from './ClienteContext.jsx'; // Certifique-se de importar ClienteProvider


const Clientes = () => {
    return (
        <ClienteProvider>
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 p-3">
                    <div className="formcontainer">
                        <h1 className="title">Clientes</h1>
                        <div className="flex items-center justify-between">
                            <SearchBar placeholder="Pesquisar Cliente..." />
                            <button 
                                className="save bg-pink-500 text-white px-4 py-2 rounded ml-4"
                                onClick={() => {
                                    // Abrir pop-up para criar cliente
                                    // Add your logic here or remove the reference to openCreatePopup if not needed
                                }}
                            >
                                Novo Cliente
                            </button>
                        </div>
                        <DataTable />
                        <CreateCliente />
                        <EditCliente />
                    </div>
                </div>
            </div>
        </ClienteProvider>
    );
};

export default Clientes;