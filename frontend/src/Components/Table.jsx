import React from "react";

const Table = ({ columns, data, title }) => {
  return (
    <div className="w-full px-4 py-6 bg-white">
      <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto text-left text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              {columns?.map((column, index) => (
                <th
                  key={index}
                  className="border px-4 py-2 text-sm text-royal font-semibold whitespace-nowrap"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                {columns?.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="border px-4 py-2"
                    dangerouslySetInnerHTML={{__html: row[column.field]}}
                  >
                    
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
