import React from 'react';
import { useTable } from 'react-table';
import '../../css/table.css'; // Certifique-se de que o CSS está no mesmo diretório ou ajuste o caminho

const Table = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <table {...getTableProps()} className="custom-table">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="custom-table-header">
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} className="custom-table-header-cell">
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} className={rowIndex % 2 === 0 ? 'custom-table-row-even' : 'custom-table-row-odd'}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()} className="custom-table-cell">
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;
