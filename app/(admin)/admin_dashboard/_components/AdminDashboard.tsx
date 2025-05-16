"use client"
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { RevenueChart } from './reusable/RevenueChart';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

// Types for our data
interface OverviewCard {
  title: string;
  value: string | number;
}

interface ClaimData {
  claimId: string;
  policyNumber: string;
  typeOfDamage: string;
  insuranceCompany: string;
  dateOfLoss: string;
  status: string;
}

export default function AdminDashboard() {
  // Overview cards data
  const overviewCards: OverviewCard[] = [
    { title: "Total Member", value: "1245" },
    { title: "Active Claims", value: "82" },
    { title: "Pending Claims", value: "24" },
    { title: "Monthly Revenue", value: "$8356" },
  ];

  // Chart data
  

  // Add this interface and array before the AdminDashboard component
  interface TableHeader {
    id: string;
    label: string;
    width: string;
  }
  
  const tableHeaders: TableHeader[] = [
    { id: 'claimId', label: 'Claim ID', width: 'w-1/6' },
    { id: 'policyNumber', label: 'Policy Number', width: 'w-1/6' },
    { id: 'typeOfDamage', label: 'Type of Damage', width: 'w-1/6' },
    { id: 'insuranceCompany', label: 'Insurance Company', width: 'w-2/6' },
    { id: 'dateOfLoss', label: 'Date of Loss', width: 'w-1/6' },
    { id: 'status', label: 'Status', width: 'w-1/6' },
  ];

  // Recent claims data
  const recentClaims: ClaimData[] = [
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Roof",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      status: "Pending"
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Water",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      status: "Completed"
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Hail",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      status: "Completed"
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Wind",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      status: "Completed"
    },
  ];

  return (
    <div className=" flex flex-col  r gap-6">
      {/* Overview Section */}
      <div>
        <h2 className="text-2xl font-semibold text-title-text mt-6 mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewCards.map((card, index) => (
            <div key={index} className="bg-white p-4   rounded-xl  ">
              <p className=" text-text-light font-medium text-base mb-12 ">{card.title}</p>
              <p className="text-3xl font-semibold text-gray-bold">{card.value}</p>
            </div>
          ))}
        </div>
      </div>

      <RevenueChart/>

     
      <div className="bg-white rounded-lg overflow-hidden mt-6 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-bold">Recent Claims</h3>
          <button className="text-gray-bold font-normal text-base hover:text-blue-600">View all</button>
        </div>
        
        {/* Outer container with horizontal scroll for small screens */}
        <div className="w-full -mx-4 sm:mx-0 overflow-x-auto">
          {/* Inner container to ensure minimum width */}
          <div className="min-w-[768px] sm:min-w-full px-4 sm:px-0">
            {/* Header */}
            <div className="bg-[#e6ecf2] rounded-t-2xl flex">
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
            <div className="bg-white divide-y divide-gray-200">
              {recentClaims.map((claim, index) => (
                <div key={index} className="flex hover:bg-gray-50">
                  <div className="p-3 sm:p-4 whitespace-nowrap text-xs font-medium text-gray-bold w-1/6">{claim.claimId}</div>
                  <div className="p-3 sm:p-4 whitespace-nowrap text-xs font-medium text-gray-bold w-1/6">{claim.policyNumber}</div>
                  <div className="p-3 sm:p-4 whitespace-nowrap text-xs font-medium text-gray-bold w-1/6">{claim.typeOfDamage}</div>
                  <div className="p-3 sm:p-4 whitespace-nowrap text-xs font-medium text-gray-bold w-2/6">{claim.insuranceCompany}</div>
                  <div className="p-3 sm:p-4 whitespace-nowrap text-xs font-medium text-gray-bold w-1/6">{claim.dateOfLoss}</div>
                  <div className="p-3 sm:p-4 whitespace-nowrap w-1/6">
                    <span className={`px-2 sm:px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-xs ${
                      claim.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {claim.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
