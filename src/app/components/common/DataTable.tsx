import React from 'react';

interface DataTableProps {
  /** Array of column headers */
  columns: { key: string; headerContent: string | React.ReactNode }[];
  /** Array of data rows */
  data: Array<{ [key: string]: string | number | React.ReactNode }>;
}

/**
 * DataTable component to display tabular data
 * @param columns - Array of column headers
 * @param data - Array of data rows
 * @returns A table displaying the provided data
 * @example
 * const columns = [
 *  { key: 'name', headerContent: 'Full Name'},
 *  { key: 'age', headerContent: 'Age'},
 *  { key: 'addr', headerContent: 'Street Address'}
 * ];
 * const data = [
 *   { name: 'John Doe', age: 30, addr: '123 Main St' },
 *   { name: 'Jane Smith', age: 25, addr: '456 Elm St' }
 * ];
 * <DataTable columns={columns} data={data} />;
 */
const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  return (
    <table className="min-w-full divide-y border-collapse">
      <thead className="bg-slate-300 dark:bg-gray-800">
        <tr>
          {columns.map(({ key, headerContent }) => (
            <th
              key={key}
              scope="col"
              className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-200/70 uppercase tracking-wider"
            >
              {headerContent}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-gray-300 dark:bg-slate-700 divide-y">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-zinc-500/10 dark:bg-gray-300/10' : 'bg-inherit'}>
            {columns.map(({ key }) => (
              <td
                key={key}
                className="px-6 py-3 whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-200/70"
              >
                {row[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
