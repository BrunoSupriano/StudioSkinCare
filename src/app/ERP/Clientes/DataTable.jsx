import React, { useState, useMemo } from 'react';
import Table from '../../Components/Table/Table.jsx';
import ClienteForm from './ClientForm'; // Certifique-se do caminho correto

const DataTable = () => {
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Estado para o modal de exclusão

    // Função para abrir o modal de edição e capturar o cliente selecionado
    const openEditModal = (cliente) => {
        setSelectedCliente(cliente);
        setIsEditModalOpen(true);
    };

    // Função para fechar o modal de edição
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedCliente(null);
    };

    // Função para abrir o modal de confirmação de alteração
    const openConfirmModal = () => {
        setIsConfirmModalOpen(true);
    };

    // Função para fechar o modal de confirmação de alteração
    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
    };

    // Função para abrir o modal de exclusão
    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    // Função para fechar o modal de exclusão
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    // Função para lidar com a submissão do formulário de edição
    const handleEditSubmit = (e) => {
        e.preventDefault();
        openConfirmModal();
    };

    // Função para confirmar a alteração
    const confirmEdit = () => {
        // Lógica para salvar as alterações
        closeConfirmModal();
        closeEditModal();
    };

    // Função para lidar com mudanças no formulário de edição
    const handleEditChange = (e) => {
        setSelectedCliente({ ...selectedCliente, [e.target.name]: e.target.value });
    };

    // Função para confirmar a exclusão
    const confirmDelete = () => {
        // Lógica para excluir o cliente
        closeDeleteModal();
        closeEditModal();
        // Aqui você pode adicionar a lógica para remover o cliente do dataset
    };

    const columns = useMemo(
        () => [
            { Header: 'Nome', accessor: 'nome' },
            { Header: 'Celular', accessor: 'celular' },
            { Header: 'Endereço', accessor: 'endereco' },
            { Header: 'CPF', accessor: 'cpf' },
            { Header: 'Aniversário', accessor: 'aniversario' },
            {
                Header: 'Ações',
                accessor: 'acoes',
                Cell: ({ row }) => (
                    <button 
                        onClick={() => openEditModal(row.original)} // Abrir modal com o cliente selecionado
                        className="text-white bg-pink-500 hover:bg-pink-600 rounded px-2 py-1"
                    >
                        Editar
                    </button>
                ),
            },
        ],
        []
    );

    const data = useMemo(
        () => [
            {
                cpf: '123.456.789-00',
                nome: 'Alice da Silda Figueiredo',
                endereco: 'Rua A, 123',
                celular: '(11) 91234-5678',
                aniversario: '01/01/2001',
            },
            {
                cpf: '987.654.321-00',
                nome: 'João da Silva',
                endereco: 'Rua B, 456',
                celular: '(11) 98765-4321',
                aniversario: '05/05/1995',
            },
        ],
        []
    );

    return (
        <>
            <Table columns={columns} data={data} />

            {/* Modal de Edição */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Editar Cliente</h2>
                        <ClienteForm 
                            handleSubmit={handleEditSubmit} 
                            handleChange={handleEditChange} 
                            cliente={selectedCliente} 
                        />
                        <div className="flex justify-between mt-4">
                            <button 
                                onClick={openDeleteModal} 
                                className="text-red-600 hover:text-red-800"
                            >
                                Excluir Cliente
                            </button>
                            <div>
                                <button 
                                    onClick={closeEditModal} 
                                    className="text-gray-600 hover:text-gray-800 mr-4"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleEditSubmit} 
                                    className="text-white bg-pink-500 hover:bg-pink-600 rounded px-4 py-2"
                                >
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Confirmação de Alteração */}
            {isConfirmModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Confirmar Alterações</h2>
                        <p>Tem certeza que deseja salvar as alterações feitas no cliente?</p>
                        <div className="flex justify-end mt-4">
                            <button 
                                onClick={closeConfirmModal} 
                                className="text-gray-600 hover:text-gray-800 mr-4"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={confirmEdit} 
                                className="text-white bg-pink-500 hover:bg-pink-600 rounded px-4 py-2"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Confirmação de Exclusão */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Confirmar Exclusão</h2>
                        <p>Tem certeza que deseja excluir o cliente?</p>
                        <div className="flex justify-end mt-4">
                            <button 
                                onClick={closeDeleteModal} 
                                className="text-gray-600 hover:text-gray-800 mr-4"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={confirmDelete} 
                                className="text-white bg-red-500 hover:bg-red-600 rounded px-4 py-2"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DataTable;
