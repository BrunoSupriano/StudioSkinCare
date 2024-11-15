import React from 'react';
import { useTable } from 'react-table';
import '../Table/table.css';

const Table = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <div className="table-container">
            <table {...getTableProps()} className="custom-table">
                <thead>
                    {headerGroups.map((headerGroup) => {
                        const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
                        return (
                            <tr key={key} {...headerGroupProps} className="custom-table-header">
                                {headerGroup.headers.map((column) => {
                                    const { key, ...columnProps } = column.getHeaderProps();
                                    return (
                                        <th key={key} {...columnProps} className="custom-table-header-cell">
                                            {column.render('Header')}
                                        </th>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        const { key, ...rowProps } = row.getRowProps();
                        return (
                            <tr key={key} {...rowProps} className={row.index % 2 === 0 ? 'custom-table-row-even' : 'custom-table-row-odd'}>
                                {row.cells.map((cell) => {
                                    const { key, ...cellProps } = cell.getCellProps();
                                    return (
                                        <td key={key} {...cellProps} className="custom-table-cell">
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
