// src/Components/DataTable.jsx
import React, { useMemo } from 'react';
import Table from '../../Components/Table/Table.jsx';

const DataTable = () => {
    const columns = useMemo(
        () => [
            { Header: 'CPF', accessor: 'cpf' },
            { Header: 'Nome', accessor: 'nome' },
            { Header: 'Endereço', accessor: 'endereco' },
            { Header: 'Celular', accessor: 'celular' },
            { Header: 'Aniversário', accessor: 'aniversario' },
        ],
        []
    );

    const data = useMemo(
        () => [
            {
                cpf: '123.456.789-00',
                nome: 'Alice',
                endereco: 'Rua A, 123',
                celular: '(11) 91234-5678',
                aniversario: '01/01/2001',
            },
            {
                cpf: '987.654.321-00',
                nome: 'Bob',
                endereco: 'Rua B, 456',
                celular: '(11) 98765-4321',
                aniversario: '01/01/2001',
            },
            // Adicione mais dados conforme necessário
        ],
        []
    );

    return <Table columns={columns} data={data} />;
};

export default DataTable;
