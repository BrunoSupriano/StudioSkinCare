"use client";

import React, { useState } from 'react';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
import SearchBar from '../../Components/SearchBar/SearchBar.jsx';
import DataTable from './DataTable.jsx';
import ClienteForm from './ClientForm'; // Certifique-se de que o caminho está correto

const Clientes = () => {
    // Estado para controlar a visibilidade do modal de cadastro e outros
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
    const [formData, setFormData] = useState({}); // Armazena os dados do formulário
    const [isFormDirty, setIsFormDirty] = useState(false); // Indica se o formulário foi alterado

    // Funções para abrir e fechar os modais
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Abrir o modal de sucesso temporariamente
    const openSuccessModal = () => {
        setIsSuccessModalOpen(true);
        setTimeout(() => {
            setIsSuccessModalOpen(false);
        }, 2000); // Modal de sucesso será fechado após 2 segundos
    };

    // Função para lidar com o submit do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de submissão do cliente aqui
        closeModal(); // Fecha o modal de cadastro
        openSuccessModal(); // Exibe o modal de sucesso
    };

    // Função para abrir o modal de descarte ao cancelar
    const handleCancel = () => {
        if (isFormDirty) {
            setIsDiscardModalOpen(true); // Abre o modal de confirmação de descarte
        } else {
            closeModal(); // Fecha o modal normalmente
        }
    };

    // Função para lidar com a confirmação de descarte do formulário
    const handleDiscard = () => {
        setIsFormDirty(false); // Reseta o estado do formulário
        setIsDiscardModalOpen(false); // Fecha o modal de confirmação de descarte
        closeModal(); // Fecha o modal de cadastro
    };

    // Função para lidar com mudanças no formulário
    const handleChange = (e) => {
        setIsFormDirty(true); // Marca o formulário como alterado
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-3">
                <div className="formcontainer">
                    <h1 className="title">Clientes</h1>
                    <div className="flex items-center justify-between">
                        <SearchBar placeholder="Pesquisar Cliente..." />
                        <button 
                            onClick={openModal} 
                            className="text-white bg-pink-500 hover:bg-pink-600 rounded px-2 py-1"
                        >
                            Novo Cliente
                        </button>
                    </div>
                    <DataTable />
                </div>
            </div>

            {/* Modal de Cadastro */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Cadastrar Cliente</h2>
                        <ClienteForm handleSubmit={handleSubmit} handleChange={handleChange} />
                        <div className="flex justify-end mt-4">
                            <button 
                                onClick={handleCancel} 
                                className="text-gray-600 hover:text-gray-800 mr-4"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleSubmit} 
                                className="text-white bg-pink-500 hover:bg-pink-600 rounded px-4 py-2"
                            >
                                Cadastrar Cliente
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Sucesso */}
            {isSuccessModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="text-lg font-semibold text-green-600 mb-4">Cliente cadastrado com sucesso!</h2>
                    </div>
                </div>
            )}

            {/* Modal de Confirmação de Descarte */}
            {isDiscardModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Descartar alterações?</h2>
                        <p>Tem certeza que deseja descartar os dados preenchidos?</p>
                        <div className="flex justify-end mt-4">
                            <button 
                                onClick={() => setIsDiscardModalOpen(false)} 
                                className="text-gray-600 hover:text-gray-800 mr-4"
                            >
                                Não
                            </button>
                            <button 
                                onClick={handleDiscard} 
                                className="text-white bg-red-500 hover:bg-red-600 rounded px-4 py-2"
                            >
                                Sim, descartar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Clientes;
