"use client";

import React, { useState } from 'react';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
import DataTable from './DataTable.jsx';
import SearchBar from '../../Components/SearchBar/SearchBar.jsx';
import CreateCliente from './PopUps/CreateCliente.jsx';
import EditCliente from './PopUps/EditCliente.jsx';
import { ClienteProvider } from './ClienteContext.jsx'; // Certifique-se de importar ClienteProvider

const Clientes = () => {
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const openPopupForEdit = (client) => {
        setSelectedClient(client);
        setIsEditPopupOpen(true);
    };

    const closePopup = () => {
        setIsEditPopupOpen(false);
        setSelectedClient(null);
    };

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
                                className="text-white bg-pink-500 hover:bg-pink-600 rounded px-2 py-1"
                                onClick={() => openPopupForEdit(/* Pass the client data here if needed */)}
                            >
                                Novo Cliente
                            </button>
                        </div>
                        <DataTable openPopupForEdit={openPopupForEdit} />
                        {isEditPopupOpen && <EditCliente client={selectedClient} onClose={closePopup} />}
                        <CreateCliente />
                    </div>
                </div>
            </div>
        </ClienteProvider>
    );
};

export default Clientes;
