import React, { useState, useEffect, useMemo } from 'react';
import Table from '../../Components/Table/Table.jsx';
import ServiceForm from './ServiceForm';

const ServicosDataTable = () => {
    const [servicos, setServicos] = useState([]);
    const [selectedServico, setSelectedServico] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchServicos = async () => {
            try {
                const response = await fetch('http://localhost:8080/servicos');
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status}`);
                }
                const data = await response.json();
                setServicos(data);
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            }
        };

        fetchServicos();
    }, []);

    const openEditModal = (servico) => {
        setSelectedServico(servico);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedServico(null);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log("Iniciando submissão de edição:", selectedServico);
    
        if (!selectedServico || !selectedServico.idServico) {
            console.error("Erro: serviço selecionado inválido ou ID ausente.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8080/servicos/${selectedServico.idServico}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedServico),
            });
    
            if (response.ok) {
                console.log("Serviço editado com sucesso");
                const updatedServico = await response.json();
    
                setServicos((prevServicos) =>
                    prevServicos.map((servico) =>
                        servico.idServico === updatedServico.idServico ? updatedServico : servico
                    )
                );
                closeEditModal();
            } else {
                console.error("Erro ao editar serviço, status:", response.status);
            }
        } catch (error) {
            console.error("Erro ao enviar os dados editados:", error);
        }
    };
    

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/servicos/${selectedServico.idServico}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setServicos((prevServicos) =>
                    prevServicos.filter((servico) => servico.idServico !== selectedServico.idServico)
                );
                closeEditModal();
            } else {
                console.error("Erro ao excluir serviço");
            }
        } catch (error) {
            console.error("Erro ao excluir serviço:", error);
        }
    };

    const columns = useMemo(
        () => [
            { Header: 'Nome', accessor: 'nome' },
            { Header: 'Duração', accessor: 'duracao' },
            { Header: 'Valor', accessor: 'valor' },
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
            <Table columns={columns} data={servicos} />
            {/* Modal de Edição */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="title text-center">Editar Serviço</h2>
                        <ServiceForm
                            handleSubmit={handleEditSubmit}
                            handleChange={(e) =>
                                setSelectedServico({
                                    ...selectedServico,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            formData={selectedServico}
                        />
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handleEditSubmit}
                                className="Action bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2"
                            >
                                Salvar Edição
                            </button>
                            <button onClick={closeEditModal} className="Action bg-gray-500 hover:bg-gray-600 text-white rounded px-4 py-2">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ServicosDataTable;
