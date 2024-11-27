"use client";

import React, { useState } from 'react';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
import SearchBar from '../../Components/SearchBar/SearchBar.jsx';
import DataTable from './DataTable.jsx';
import ServiceForm from './ServiceForm.jsx';

const Servicos = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [isFormDirty, setIsFormDirty] = useState(false);

    const openModal = () => {
        setFormData({ nome: '', duracao: '', valor: '' });
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const openSuccessModal = () => {
        setIsSuccessModalOpen(true);
        setTimeout(() => {
            setIsSuccessModalOpen(false);
        }, 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch('http://localhost:8080/servicos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData), 
            });
            if (response.ok) {
                const novoServico = await response.json();
                console.log('Serviço cadastrado:', novoServico);
    
                setFormData({ nome: '', duracao: '', valor: '' });
                setIsFormDirty(false);
                openSuccessModal();
            } else {
                console.error('Erro ao cadastrar o serviço');
                alert('Erro ao cadastrar o serviço. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            alert('Erro ao conectar com o servidor. Verifique sua conexão.');
        }
    
        closeModal(); 
    };
    

    const handleCancel = () => {
        if (isFormDirty) {
            setIsDiscardModalOpen(true);
        } else {
            closeModal();
        }
    };

    const handleDiscard = () => {
        setIsFormDirty(false);
        setIsDiscardModalOpen(false);
        closeModal();
    };

    const handleChange = (e) => {
        setIsFormDirty(true);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex max-h-screen">
            <Sidebar />
            <div className="flex-1 p-3">
                <div className="formcontainer">
                    <h1 className="title">Serviços</h1>
                    <div className="flex items-center justify-between">
                        <SearchBar placeholder="Pesquisar Serviço..." />
                        <button onClick={openModal} className="text-white bg-pink-500 hover:bg-pink-600 rounded px-2 py-1"> Novo Serviço </button>
                    </div>
                    <DataTable />
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="title text-center">Cadastrar Serviço</h2>
                        <ServiceForm handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} />
                        <div className="flex justify-between mt-4">
                            <button onClick={handleCancel} className="Action">Cancelar</button>
                            <button onClick={handleSubmit} className="Action">Cadastrar Serviço</button>
                        </div>
                    </div>
                </div>
            )}

            {isSuccessModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="text-lg font-semibold text-green-600 mb-4">Serviço cadastrado com sucesso!</h2>
                    </div>
                </div>
            )}

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

export default Servicos;
