"use client"
import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { FiTrash2 } from 'react-icons/fi';

interface ClaimData {
  claimId: string;
  policyNumber: string;
  typeOfDamage: string;
  insuranceCompany: string;
  dateOfLoss: string;
  amount: string;
  status: 'Pending' | 'New' | 'Completed';
}

interface TableHeader {
  id: keyof ClaimData | 'action';
  label: string;
  width: string;
}

const tableHeaders: TableHeader[] = [
  { id: 'claimId', label: 'Claim ID', width: 'w-[12%]' },
  { id: 'policyNumber', label: 'Policy Number', width: 'w-[12%]' },
  { id: 'typeOfDamage', label: 'Type of Damage', width: 'w-[12%]' },
  { id: 'insuranceCompany', label: 'Insurance Company', width: 'w-[15%]' },
  { id: 'dateOfLoss', label: 'Date of Loss', width: 'w-[12%]' },
  { id: 'amount', label: 'Amount', width: 'w-[12%]' },
  { id: 'status', label: 'Status', width: 'w-[12%]' },
  { id: 'action', label: 'Action', width: 'w-[13%]' },
];

const mockData: ClaimData[] = [
  {
    claimId: "#1245",
    policyNumber: "#1523654",
    typeOfDamage: "Roof",
    insuranceCompany: "Company Name",
    dateOfLoss: "12 Jan, 2025",
    amount: "$2680.09",
    status: "Pending"
  },
  {
    claimId: "#1245",
    policyNumber: "#1523654",
    typeOfDamage: "Water",
    insuranceCompany: "Company Name",
    dateOfLoss: "12 Jan, 2025",
    amount: "$2680.09",
    status: "New"
  },
  {
    claimId: "#1245",
    policyNumber: "#1523654",
    typeOfDamage: "Water",
    insuranceCompany: "Company Name",
    dateOfLoss: "12 Jan, 2025",
    amount: "$2680.09",
    status: "New"
  },
  {
    claimId: "#1245",
    policyNumber: "#1523654",
    typeOfDamage: "Water",
    insuranceCompany: "Company Name",
    dateOfLoss: "12 Jan, 2025",
    amount: "$2680.09",
    status: "New"
  },
  {
    claimId: "#1245",
    policyNumber: "#1523654",
    typeOfDamage: "Water",
    insuranceCompany: "Company Name",
    dateOfLoss: "12 Jan, 2025",
    amount: "$2680.09",
    status: "New"
  },
  {
    claimId: "#1245",
    policyNumber: "#1523654",
    typeOfDamage: "Water",
    insuranceCompany: "Company Name",
    dateOfLoss: "12 Jan, 2025",
    amount: "$2680.09",
    status: "New"
  },
  {
    claimId: "#1245",
    policyNumber: "#1523654",
    typeOfDamage: "Water",
    insuranceCompany: "Company Name",
    dateOfLoss: "12 Jan, 2025",
    amount: "$2680.09",
    status: "New"
  },
  {
    claimId: "#1245",
    policyNumber: "#1523654",
    typeOfDamage: "Water",
    insuranceCompany: "Company Name",
    dateOfLoss: "12 Jan, 2025",
    amount: "$2680.09",
    status: "New"
  },
   
   
  {
    claimId: "#1245",
    policyNumber: "#1523654",
    typeOfDamage: "Water",
    insuranceCompany: "Company Name",
    dateOfLoss: "12 Jan, 2025",
    amount: "$2680.09",
    status: "New"
  },
  {
    claimId: "#1245",
    policyNumber: "#1523654",
    typeOfDamage: "Water",
    insuranceCompany: "Company Name",
    dateOfLoss: "12 Jan, 2025",
    amount: "$2680.09",
    status: "New"
  },
  {
    claimId: "#1245",
    policyNumber: "#1523654",
    typeOfDamage: "Water",
    insuranceCompany: "Company Name",
    dateOfLoss: "12 Jan, 2025",
    amount: "$2680.09",
    status: "New"
  },
  // ... Add more mock data as needed
];

export default function ClaimsHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter claims based on search term
  const filteredClaims = mockData.filter(claim =>
    Object.values(claim).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);
  const paginatedClaims = filteredClaims.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate page numbers array
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getStatusStyle = (status: ClaimData['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-[#FFF3E5] text-[#FF9C37]';
      case 'New':
        return 'bg-[#E5F5FF] text-[#37A9FF]';
      case 'Completed':
        return 'bg-[#E8FFE5] text-[#4CD440]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="">
      <h1 className="text-[40px] font-semibold text-primary-dark py-5 ">Claims History</h1>
      <div className=' bg-white p-6 rounded-lg mx-10 border border-border-light mb-8'>
     {/* Search Bar */}
     <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {/* Claims Table */}
      <div className=" rounded-xl overflow-x-scroll ">
        {/* Outer container with horizontal scroll for small screens */}
        <div className="w-full overflow-x-auto">
          {/* Inner container to ensure minimum width */}
          <div className="min-w-[1000px]">
            {/* Header */}
            <div className="bg-[#e6ecf2] flex">
              {tableHeaders.map((header) => (
                <div
                  key={header.id}
                  className={`text-xs font-semibold text-primary-dark p-3 sm:p-4 ${header.width}`}
                >
                  {header.label}
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="divide-y divide-gray-100">
              {paginatedClaims.map((claim, index) => (
                <div key={index} className="flex hover:bg-gray-50">
                  {tableHeaders.map((header) => (
                    <div
                      key={header.id}
                      className={`p-4 text-sm text-gray-600 ${header.width}`}
                    >
                      {header.id === 'action' ? (
                        <button className="text-red-500 hover:text-red-600">
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      ) : header.id === 'status' ? (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(claim.status)}`}>
                          {claim.status}
                        </span>
                      ) : (
                        claim[header.id as keyof ClaimData]
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
      </div>
     
    </div>
  );
}