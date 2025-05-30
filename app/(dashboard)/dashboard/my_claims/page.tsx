'use client';

import React, { useEffect, useState } from 'react';

interface ClaimItem {
  claimId: string;
  policyNumber: string;
  typeOfDamage: string;
  insuranceCompany: string;
  dateOfLoss: string;
  status: string;
  statusBgColor: string;
  statusTextColor: string;
}

const tableHeaders = [
  { label: 'Claim ID', basis: 'basis-1/6' },
  { label: 'Policy Number', basis: 'basis-1/6' },
  { label: 'Type of Damage', basis: 'basis-1/6' },
  { label: 'Insurance Company', basis: 'basis-2/6 sm:basis-1/6' },
  { label: 'Date of Loss', basis: 'basis-1/6' },
  { label: 'Status', basis: 'basis-1/6' },
];

export default function MyClaims() {
  const [claims, setClaims] = useState<ClaimItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/dashboard/my-claims', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch claims');

        const data = await res.json();

        // Optional: map status to Tailwind colors if not provided by API
        const enrichedData = data.map((item: any) => ({
          ...item,
          statusBgColor: item.status === 'Active' ? 'bg-green-100' : 'bg-gray-100',
          statusTextColor: item.status === 'Active' ? 'text-green-700' : 'text-gray-700',
        }));

        setClaims(enrichedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen">
      <h1 className="text-[40px] sm:text-3xl font-semibold text-primary-dark my-5">
        My Claim
      </h1>
      <div className="bg-white border border-border-light p-6 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="flex bg-[#e6ecf2] rounded-t-xl border-b border-gray-200">
              {tableHeaders.map((header) => (
                <div
                  key={header.label}
                  className={`text-left text-[12px] p-4 font-semibold text-primary-dark uppercase tracking-wider ${header.basis}`}
                >
                  {header.label}
                </div>
              ))}
            </div>

            <div className="bg-white">
              {claims.map((claim, index) => (
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
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${claim.statusBgColor} ${claim.statusTextColor}`}>
                      {claim.status}
                    </span>
                  </div>
                </div>
              ))}
              {claims.length === 0 && (
                <div className="p-4 text-center text-sm text-gray-500">No claims found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
