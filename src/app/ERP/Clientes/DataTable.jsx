import React, { useState, useEffect, useMemo } from 'react';
import Table from '../../Components/Table/Table.jsx';
import ClienteForm from './ClientForm';

const DataTable = () => {
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isFormDirty, setIsFormDirty] = useState(false);

    // Buscar dados da API ao carregar o componente
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await fetch('http://localhost:8080/cliente');
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status}`);
                }
                const data = await response.json();
                setClientes(data);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };

        fetchClientes();
    }, []);

    const openEditModal = (cliente) => {
        setSelectedCliente(cliente);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedCliente(null);
    };

    const handleCancel = () => {
        if (isFormDirty) {
            // Se necessário, implemente a lógica para descartar alterações
            console.log("Alterações descartadas.");
        } else {
            closeEditModal();
        }
    };

    // Função para enviar dados editados para a API
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log("handleEditSubmit foi chamado com:", selectedCliente);
    
        try {
            const response = await fetch(`http://localhost:8080/cliente/${selectedCliente.id_cliente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedCliente),
            });
            if (response.ok) {
                console.log("Cliente editado com sucesso");
                const updatedCliente = await response.json();
                setClientes((prevClientes) =>
                    prevClientes.map((cliente) =>
                        cliente.id_cliente === updatedCliente.id_cliente ? updatedCliente : cliente
                    )
                );
                closeEditModal();
            } else {
                console.error("Erro ao editar cliente:", response.status);
            }
        } catch (error) {
            console.error("Erro ao enviar os dados editados:", error);
        }
    };
    

    // Função para deletar cliente
    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/cliente/${selectedCliente.id_cliente}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setClientes((prevClientes) =>
                    prevClientes.filter((cliente) => cliente.id_cliente !== selectedCliente.id_cliente)
                );
                closeEditModal();
            } else {
                console.error("Erro ao excluir cliente");
            }
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
        }
    };

    const formatTelefone = (telefone) => {
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    const formatCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatNascimento = (nascimento) => {
        const [year, month, day] = nascimento.split('-');
        return `${day}/${month}/${year}`;
    };

    const columns = useMemo(
        () => [
            { Header: 'Nome', accessor: 'nome' },
            {
                Header: 'Telefone',
                accessor: 'telefone',
                Cell: ({ value }) => formatTelefone(value),
            },
            { Header: 'Endereço', accessor: 'endereco' },
            {
                Header: 'CPF',
                accessor: 'cpf',
                Cell: ({ value }) => formatCPF(value),
            },
            { Header: 'Email', accessor: 'email' },
            {
                Header: 'Nascimento',
                accessor: 'nascimento',
                Cell: ({ value }) => formatNascimento(value),
            },
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
            <Table columns={columns} data={clientes} />
            {/* Modal de Edição */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="title text-center">Editar Cliente</h2>
                        <ClienteForm
                            handleSubmit={handleEditSubmit}
                            handleChange={(e) =>
                                setSelectedCliente({
                                    ...selectedCliente,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            formData={selectedCliente}
                        />
                            {/* Botões para editar e excluir */}
                            <div className="flex justify-between mt-4">
                            <button
                                onClick={handleEditSubmit}
                                className="Action bg-green-500 hover:bg-green-600 text-white rounded px-4 py-2"
                            >
                                Salvar Edição
                            </button>
                                <button onClick={handleCancel} className="Action bg-gray-500 hover:bg-gray-600 text-white rounded px-4 py-2">
                                    Cancelar
                                </button>
                            </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DataTable;
