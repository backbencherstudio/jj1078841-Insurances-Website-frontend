'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
type ClaimStatus = 'Active' | 'Pending' | 'Closed' | string;

interface ClaimItem {
  claimId: string;
  policyNumber: string;
  typeOfDamage: string;
  insuranceCompany: string;
  dateOfLoss: string;
  status: ClaimStatus;
  statusBgColor: string;
  statusTextColor: string;
}

const tableHeaders = [
  { label: 'Claim ID', key: 'claimId', basis: 'basis-1/6' },
  { label: 'Policy Number', key: 'policyNumber', basis: 'basis-1/6' },
  { label: 'Type of Damage', key: 'typeOfDamage', basis: 'basis-1/6' },
  { label: 'Insurance Company', key: 'insuranceCompany', basis: 'basis-2/6 sm:basis-1/6' },
  { label: 'Date of Loss', key: 'dateOfLoss', basis: 'basis-1/6' },
  { label: 'Status', key: 'status', basis: 'basis-1/6' },
];

const getStatusStyles = (status: ClaimStatus) => {
  switch (status) {
    case 'Active':
      return { bg: 'bg-[#E8FFE5]', text: 'text-[#4CD440]' };
    case 'Pending':
      return { bg: 'bg-[#FFF3E5]', text: 'text-[#FF9C37]' };
    case 'Closed':
      return { bg: 'bg-gray-100', text: 'text-gray-600' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-600' };
  }
};

export default function MyClaims() {
  const router = useRouter();
  const [claims, setClaims] = useState<ClaimItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const handleDetailsClick=(id:string)=>{
    router.push(`/dashboard/${id}`)
  }

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) {
          throw new Error('Authorization failed: No token found');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/my-claims`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const mappedClaims = data.map((claim: any) => {
          const statusStyles = getStatusStyles(claim.status);
          return {
            claimId: claim.claim_number,
            policyNumber: claim.policy_number,
            typeOfDamage: claim.type_of_damage,
            insuranceCompany: claim.insurance_company,
            dateOfLoss: new Date(claim.date_of_loss).toLocaleDateString(),
            status: claim.status,
            statusBgColor: statusStyles.bg,
            statusTextColor: statusStyles.text,
          };
        });

        setClaims(mappedClaims);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load claims');
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 maxWidth">
      <h1 className="text-2xl sm:text-3xl md:text-[40px] font-semibold text-primary-dark my-5">My Claims</h1>
      <div className="bg-white border border-border-light p-4 sm:p-6 rounded-xl w-full">
        <div className="w-full overflow-x-auto">
          <table className='w-full'>
            <thead className="bg-gray-50 hidden sm:table-header-group">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header.label}
                    className={`px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-nowrap ${header.basis}`}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {claims.map((claim, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150 block sm:table-row mb-4 sm:mb-0 border border-gray-200 sm:border-none rounded-lg cursor-pointer"
                  onClick={()=>handleDetailsClick(claim.claimId)}
                >
                  {tableHeaders.map((header, headerIndex) => (
                    <td
                      key={headerIndex}
                      className={`px-3 py-3 whitespace-nowrap text-sm font-normal text-gray-900 ${header.basis} block sm:table-cell`}
                      data-label={header.label}
                    >
                      <div className="flex justify-between sm:block">
                        <span className="font-medium sm:hidden">{header.label}</span>
                        {headerIndex === 5 ? (
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md cursor-pointer ${claim.statusBgColor} ${claim.statusTextColor}`}>
                            {claim.status}
                          </span>
                        ) : (
                          <span>{claim[header.key as keyof ClaimItem]}</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
              {claims.length === 0 && (
                <tr>
                  <td colSpan={tableHeaders.length} className="p-4 text-center text-sm text-gray-500">
                    No claims found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}