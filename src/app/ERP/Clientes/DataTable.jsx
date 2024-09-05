import React, { useMemo } from 'react';
import Table from '../../Components/Table/Table.jsx';
import { useCliente } from './ClienteContext.jsx';

const DataTable = () => {
    const { openPopupForEdit } = useCliente();

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
                        className="text-white bg-pink-500 hover:bg-pink-600 rounded px-2 py-1"
                        onClick={() => openPopupForEdit(row.original)}
                    >
                        Editar
                    </button>
                ),
            },
        ],
        [openPopupForEdit]
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
                nome: 'Alice da Silda Figueiredo',
                endereco: 'Rua B, 456',
                celular: '(11) 98765-4321',
                aniversario: '01/01/2001',
            },
            // Adicione mais dados conforme necessário
        ],
        []
    );

    return (
        <Table columns={columns} data={data} />
    );
};

export default DataTable;
