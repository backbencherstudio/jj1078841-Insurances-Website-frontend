"use client"
import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { FiTrash2 } from 'react-icons/fi';

interface TableColumn<T> {
  id: keyof T | 'action';
  label: string;
  width: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  title?: string;
  data: T[];
  columns: TableColumn<T>[];
  itemsPerPage?: number;
  showSearch?: boolean;
  timeFilter?: boolean;
  onAction?: (item: T) => void;
  actionIcon?: React.ReactNode;
  getStatusStyle?: (status: string) => string;
  showViewAll?: boolean;
}

export default function DynamicTable<T extends { [key: string]: any,  }>({
  title,
  data,
  columns,
  itemsPerPage = 10,
  showSearch = true,
  timeFilter = false,
  onAction,
  actionIcon = <FiTrash2 className="w-5 h-5" />,
  getStatusStyle,
  showViewAll = false,
  
}: TableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [timeframe, setTimeframe] = useState('This Month');

  // Filter data based on search term
  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate page numbers array
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const defaultStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-[#FFF3E5] text-[#FF9C37]';
      case 'new':
        return 'bg-[#E5F5FF] text-[#37A9FF]';
      case 'completed':
      case 'active':
        return 'bg-[#E8FFE5] text-[#4CD440]';
      case 'unpaid':
        return 'bg-[#FFE5E5] text-[#FF3737]';
      case 'paid':
        return 'bg-[#E8FFE5] text-[#4CD440]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-border-light">
      {/* Header Section */}
      {(title || showSearch || timeFilter) && (
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {title && <h3 className="text-xl font-medium text-gray-bold">{title}</h3>}
          <div className="flex items-center gap-4">
            {showSearch && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full max-w-xs pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            )}
            {timeFilter && (
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
            )}
            {showViewAll && (
              <button className="text-gray-bold font-normal text-base hover:text-blue-600">
                View all
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Table Header */}
          <div className="bg-[#e6ecf2] flex">
            {columns.map((column) => (
              <div
                key={column.id.toString()}
                className={`text-xs font-semibold text-primary-dark p-3 sm:p-4 ${column.width}`}
              >
                {column.label}
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {paginatedData.map((item, index) => (
              <div key={index} className="flex hover:bg-gray-50">
                {columns.map((column) => (
                  <div
                    key={column.id.toString()}
                    className={`p-4 text-sm text-gray-600 ${column.width}`}
                  >
                    {column.render ? (
                      column.render(item)
                    ) : column.id === 'action' ? (
                      <button 
                        className="text-red-500 hover:text-red-600"
                        onClick={() => onAction?.(item)}
                      >
                        {actionIcon}
                      </button>
                    ) : column.id === 'status' ? (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        getStatusStyle 
                          ? getStatusStyle(item[column.id as keyof T]) 
                          : defaultStatusStyle(item[column.id as keyof T])
                      }`}>
                        {item[column.id as keyof T]}
                      </span>
                    ) : (
                      item[column.id as keyof T]
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm text-isecondary hover:text-isecondary disabled:text-gray-400"
          >
            Prev
          </button>
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 text-sm rounded-md ${
                currentPage === number
                  ? 'bg-isecondary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm text-isecondary hover:text-blue-800 disabled:text-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}