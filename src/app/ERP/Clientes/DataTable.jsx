import React, { useState, useEffect, useMemo } from 'react';
import Table from '../../Components/Table/Table.jsx';
import ClienteForm from './ClientForm';

const DataTable = () => {
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Buscar dados da API ao carregar o componente
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await fetch('http://localhost:8080/cliente');
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

    // Função para enviar dados editados para a API
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/cliente/${selectedCliente.id_cliente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedCliente),
            });
            if (response.ok) {
                const updatedCliente = await response.json();
                setClientes((prevClientes) =>
                    prevClientes.map((cliente) =>
                        cliente.id_cliente === updatedCliente.id_cliente ? updatedCliente : cliente
                    )
                );
                closeEditModal();
            } else {
                console.error("Erro ao editar cliente");
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

    const columns = useMemo(
        () => [
            { Header: 'Nome', accessor: 'nome' },
            { Header: 'Telefone', accessor: 'telefone' },
            { Header: 'Endereço', accessor: 'endereco' },
            { Header: 'CPF', accessor: 'cpf' },
            { Header: 'Email', accessor: 'email' },
            { Header: 'Nascimento', accessor: 'nascimento' },
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
                        <h2 className="text-lg font-semibold mb-4">Editar Cliente</h2>
                        <ClienteForm
                            handleSubmit={handleEditSubmit}
                            handleChange={(e) => setSelectedCliente({
                                ...selectedCliente,
                                [e.target.name]: e.target.value,
                            })}
                            cliente={selectedCliente}
                        />
                        {/* Botões para editar e excluir */}
                        <button onClick={confirmDelete} className="text-red-600 hover:text-red-800">Excluir</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DataTable;
