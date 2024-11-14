import React, { useState, useMemo, useEffect } from 'react';
import Table from '../../Components/Table/Table.jsx';
import ServiceForm from './ServiceForm.jsx';  

const DataTable = () => {
    const [selectedServico, setSelectedServico] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/servicos')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const openEditModal = (servico) => {
        setSelectedServico(servico);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedServico(null);
    };

    const openConfirmModal = () => {
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
    };

    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        openConfirmModal();
    };

    const confirmEdit = () => {
        closeConfirmModal();
        closeEditModal();
    };

    const handleEditChange = (e) => {
        setSelectedServico({ ...selectedServico, [e.target.name]: e.target.value });
    };

    const confirmDelete = () => {
        closeDeleteModal();
        closeEditModal();
    };

    const columns = useMemo(
        () => [
            { Header: 'Nome', accessor: 'nome' },
            { Header: 'Duração', accessor: 'duracao' },
            { Header: 'Valor (R$)', accessor: 'valor' },
            {
                Header: 'Ações',
                accessor: 'acoes',
                Cell: ({ row }) => (
                    <button 
                        onClick={() => openEditModal(row.original)} 
                        className="text-white bg-pink-500 hover:bg-pink-600 rounded px-2 py-1"
                    >
                        Editar
                    </button>
                ),
            },
        ],
        []
    );

    return (
        <>
            <Table columns={columns} data={data} />

            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Editar Serviço</h2>
                        <ServiceForm 
                            handleSubmit={handleEditSubmit} 
                            handleChange={handleEditChange} 
                            servico={selectedServico} 
                        />
                        <div className="flex justify-between mt-4">
                            <button 
                                onClick={openDeleteModal} 
                                className="text-red-600 hover:text-red-800"
                            >
                                Excluir Serviço
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

            {isConfirmModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Confirmar Alterações</h2>
                        <p>Tem certeza que deseja salvar as alterações feitas no serviço?</p>
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

            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Confirmar Exclusão</h2>
                        <p>Tem certeza que deseja excluir o serviço?</p>
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
