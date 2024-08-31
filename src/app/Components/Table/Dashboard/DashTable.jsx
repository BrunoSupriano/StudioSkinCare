import { useMemo } from 'react';
import Table from '../Table.jsx';
const DataTable = () => {
    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
        ],
        []
    );

    const dataTable = useMemo(
        () => [
            { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
        ],
        []
    );

    return (
        <div className="mb-8">
            <h2 className="formlabel">Proximos Agendamentos</h2>
            <Table columns={columns} data={dataTable} />
        </div>
    );
};

export default DataTable;
