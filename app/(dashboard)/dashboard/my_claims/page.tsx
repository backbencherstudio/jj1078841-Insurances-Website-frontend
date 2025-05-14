import React from 'react';

interface ClaimItem {
  claimId: string;
  policyNumber: string;
  typeOfDamage: string;
  insuranceCompany: string;
  dateOfLoss: string;
  status: string;
  statusBgColor: string; // Tailwind class for status pill background
  statusTextColor: string; // Tailwind class for status pill text
}

const claimsData: ClaimItem[] = [
  {
    claimId: '#1245',
    policyNumber: '#1523654',
    typeOfDamage: 'Roof',
    insuranceCompany: 'Company Name',
    dateOfLoss: '12 Jan, 2025',
    status: 'Active',
    statusBgColor: 'bg-green-100',
    statusTextColor: 'text-green-700',
  },
  {
    claimId: '#1245',
    policyNumber: '#1523654',
    typeOfDamage: 'Water',
    insuranceCompany: 'Company Name',
    dateOfLoss: '12 Jan, 2025',
    status: 'Active',
    statusBgColor: 'bg-green-100',
    statusTextColor: 'text-green-700',
  },
  {
    claimId: '#1245',
    policyNumber: '#1523654',
    typeOfDamage: 'Hail',
    insuranceCompany: 'Company Name',
    dateOfLoss: '12 Jan, 2025',
    status: 'Active',
    statusBgColor: 'bg-green-100',
    statusTextColor: 'text-green-700',
  },
  {
    claimId: '#1245',
    policyNumber: '#1523654',
    typeOfDamage: 'Wind',
    insuranceCompany: 'Company Name',
    dateOfLoss: '12 Jan, 2025',
    status: 'Active',
    statusBgColor: 'bg-green-100',
    statusTextColor: 'text-green-700',
  },
  {
    claimId: '#1245',
    policyNumber: '#1523654',
    typeOfDamage: 'Wind',
    insuranceCompany: 'Company Name',
    dateOfLoss: '12 Jan, 2025',
    status: 'Active',
    statusBgColor: 'bg-green-100',
    statusTextColor: 'text-green-700',
  },
];

const tableHeaders = [
  { label: 'Claim ID', basis: 'basis-1/6' }, // Added basis for flex layout
  { label: 'Policy Number', basis: 'basis-1/6' },
  { label: 'Type of Damage', basis: 'basis-1/6' },
  { label: 'Insurance Company', basis: 'basis-2/6 sm:basis-1/6' }, // Adjusted for company name length
  { label: 'Date of Loss', basis: 'basis-1/6' },
  { label: 'Status', basis: 'basis-1/6' },
];

export default function MyClaims() {
  return (
    <div className="  min-h-screen">
      <h1 className="text-[40px] sm:text-3xl font-semibold text-primary-dark my-5">
        My Claim
      </h1>
      <div className="bg-white border border-border-light  p-6 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="min-w-full">
            <div className="flex bg-[#e6ecf2] rounded-t-xl border-b border-gray-200">
              {tableHeaders.map((header) => (
                <div
                  key={header.label}
                  className={`text-left text-[12px] p-4   font-semibold text-primary-dark uppercase tracking-wider ${header.basis}`}
                >
                  {header.label}
                </div>
              ))}
            </div>

            {/* Table Body */}
            <div className="bg-white">
              {claimsData.map((claim, index) => (
                <div
                  key={index}
                  className="flex border-b bg-disabled border-gray-200 hover:bg-gray-200 transition-colors duration-150"
                >
                  <div className={`px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-[12px] font-normal text-gray-bold ${tableHeaders[0].basis}`}>
                    {claim.claimId}
                  </div>
                  <div className={`px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-[12px] font-normal text-gray-bold ${tableHeaders[1].basis}`}>
                    {claim.policyNumber}
                  </div>
                  <div className={`px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-[12px] font-normal text-gray-bold ${tableHeaders[2].basis}`}>
                    {claim.typeOfDamage}
                  </div>
                  <div className={`px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-[12px] font-normal text-gray-bold ${tableHeaders[3].basis}`}>
                    {claim.insuranceCompany}
                  </div>
                  <div className={`px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-[12px] font-normal text-gray-bold ${tableHeaders[4].basis}`}>
                    {claim.dateOfLoss}
                  </div>
                  <div className={`px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap ${tableHeaders[5].basis}`}>
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${claim.statusBgColor} ${claim.statusTextColor}`}
                    >
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
