"use client";

import React, { useState } from 'react';
import Sidebar from '../../Components/SideBar/SideBar.jsx';
import SearchBar from '../../Components/SearchBar/SearchBar.jsx';
import DataTable from './DataTable.jsx';
import ClienteForm from './ClientForm'; // Certifique-se de que o caminho está correto

const Clientes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        endereco: '',
        cpf: '',
        email: '',
        nascimento: ''
    });

    const openSuccessModal = () => {
        setIsSuccessModalOpen(true);
        closeModal(); // Fecha o modal de cadastro aqui
        setTimeout(() => {
            setIsSuccessModalOpen(false);
            window.location.reload(); // Adiciona um refresh na página
        }, 2000);
    };
    
    const validateForm = () => {
        const errors = {};
        if (!formData.nome.trim()) {
            errors.nome = 'Nome é obrigatório';
        }
        if (!formData.telefone.trim()) {
            errors.telefone = 'Telefone é obrigatório';
        }
        if (!formData.cpf.trim()) {
            errors.cpf = 'CPF é obrigatório';
        }
        
        // Adicionalmente, você pode adicionar validações mais específicas
        // Como formato de telefone ou CPF
        if (formData.telefone && !/^\d{10,11}$/.test(formData.telefone.replace(/\D/g, ''))) {
            errors.telefone = 'Telefone inválido';
        }
        
        if (formData.cpf && !/^\d{11}$/.test(formData.cpf.replace(/\D/g, ''))) {
            errors.cpf = 'CPF inválido';
        }
    
        return errors;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        console.log(formData);
        try {
            const response = await fetch('http://localhost:8080/cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                openSuccessModal();
                setFormData({
                    nome: '',
                    telefone: '',
                    endereco: '',
                    cpf: '',
                    email: '',
                    nascimento: ''
                });
                setFormErrors({});
            } else {
                console.error("Erro ao adicionar cliente");
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
        }
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
        setFormErrors({ ...formErrors, [e.target.name]: '' });
    };

    return (
        <div className="flex max-h-screen">
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
                    <DataTable  />
                </div>
            </div>

            {/* Modal de Cadastro */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="title text-center">Cadastrar Cliente</h2>
                        <ClienteForm handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} formErrors={formErrors} />
                        <div className="flex justify-between mt-4">
                            <button 
                                onClick={handleCancel} 
                                className="Action bg-gray-500 hover:bg-gray-600 text-white rounded px-4 py-2"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit"
                                form="clienteForm"
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
