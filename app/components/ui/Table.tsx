'use client';

import { TableProps } from '../../types';

export default function Table({ columns, data, className = "", onRowClick }: TableProps) {
  // Create dynamic grid classes based on column count
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2', 
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  }[columns.length] || 'grid-cols-4';

  return (
    <div className={`bg-table-bg rounded-2xl shadow-2xl border border-foreground/20 overflow-hidden transform perspective-1000 rotate-x-2 ${className}`}>
      {/* Table Header */}
      <div className="bg-table-header-bg px-6 py-4 border-b border-foreground/20">
        <div className={`grid ${gridCols} gap-4 font-semibold text-foreground/80 text-sm md:text-base`}>
          {columns.map((column) => (
            <div key={column.key} className={column.className || ""}>
              {column.label}
            </div>
          ))}
        </div>
      </div>
      
      {/* Table Body */}
      <div className="divide-y divide-foreground/10">
        {data.map((row, index) => (
          <div 
            key={index} 
            className={`px-6 py-4 hover:bg-table-header-bg transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
            onClick={() => onRowClick?.(row)}
          >
            <div className={`grid ${gridCols} gap-4 text-sm md:text-base text-foreground`}>
              {columns.map((column) => (
                <div key={column.key} className={column.className || ""}>
                  {row[column.key]}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}