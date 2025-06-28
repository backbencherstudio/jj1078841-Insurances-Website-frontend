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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve token from localStorage
    const storedToken = localStorage.getItem('accessToken');
    setToken(storedToken);

    // If no token, return early
    if (!storedToken) {
      setError('Authorization failed');
      setLoading(false);
      return;
    }

    // Fetch claims data
   const fetchClaims = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/my-claims`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storedToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching claims: ${response.statusText}`);
    }

    const data = await response.json();
    // Map data to match ClaimItem structure
    const mappedClaims = data.map((claim: any) => ({
      claimId: claim.claimId,
      policyNumber: claim.policyNumber,
      typeOfDamage: claim.typeOfDamage,
      insuranceCompany: claim.insuranceCompany,
      dateOfLoss: new Date(claim.dateOfLoss).toLocaleDateString(),
      status: claim.status,
      statusBgColor: claim.status === 'Active' ? 'bg-[#E8FFE5]' : 'bg-[#FFF3E5]',
      statusTextColor: claim.status === 'Active' ? 'text-[#4CD440]' : 'text-[#FF9C37]',
    }));

    setClaims(mappedClaims);
  } catch (error) {
    setError('Failed to load claims');
    console.error('Error fetching claims:', error);
  } finally {
    setLoading(false);
  }
};


    fetchClaims();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-[40px] sm:text-3xl font-semibold text-primary-dark my-5">My Claim</h1>
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
