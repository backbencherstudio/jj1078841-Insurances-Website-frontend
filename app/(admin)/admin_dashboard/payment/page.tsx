"use client"
import React, { useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';

interface PaymentData {
  claimId: string;
  policyNumber: string;
  typeOfDamage: string;
  insuranceCompany: string;
  dateOfLoss: string;
  payment: string;
  status: 'Paid' | 'Unpaid';
}

export default function PaymentHistory() {
  const [timeframe, setTimeframe] = useState('This Month');

  const paymentData: PaymentData[] = [
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Roof",
      insuranceCompany: "Company Name",
      dateOfLoss: "-",
      payment: "$2680.09",
      status: "Unpaid"
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Water",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid"
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Hail",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid"
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Wind",
      insuranceCompany: "Company Name",
      dateOfLoss: "-",
      payment: "$2680.09",
      status: "Unpaid"
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Wind",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid"
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Roof",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid"
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Water",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid"
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Hail",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid"
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Wind",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid"
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Wind",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid"
    }
  ];

  const getStatusStyle = (status: PaymentData['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-[#E8FFE5] text-[#4CD440]';
      case 'Unpaid':
        return 'bg-[#FFF3E5] text-[#FF9C37]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
     
        <h1 className="text-[40px] font-semibold text-primary-dark py-5">Payment</h1>
       
       

      <div className="bg-white rounded-xl overflow-x-scroll p-6 mx-10   border border-border-light">
        <div className=' flex justify-between items-center '>
        <h2 className="text-lg font-medium text-[#0B1C39] p-4">Payments History</h2>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-gray-600 bg-white ">
          This Month
          <IoChevronDownOutline className="w-4 h-4" />
        </button>
        </div>

        {/* Headers */}
        <div className="grid grid-cols-7 bg-[#e6ecf2] px-6 py-4 rounded-t-xl">
          <div className="text-xs font-semibold text-primary-dark">Claim ID</div>
          <div className="text-xs font-semibold text-primary-dark">Policy Number</div>
          <div className="text-xs font-semibold text-primary-dark">Type of Damage</div>
          <div className="text-xs font-semibold text-primary-dark">Insurance Company</div>
          <div className="text-xs font-semibold text-primary-dark">Date of Loss</div>
          <div className="text-xs font-semibold text-primary-dark">Payment</div>
          <div className="text-xs font-semibold text-primary-dark">Status</div>
        </div>

        {/* Payment Rows */}
        <div className="divide-y divide-[#E2E8F0]">
          {paymentData.map((payment, index) => (
            <div key={index} className="grid grid-cols-7 px-6 py-4 hover:bg-gray-50 items-center">
              <div className="text-sm text-[#64748B]">{payment.claimId}</div>
              <div className="text-sm text-[#64748B]">{payment.policyNumber}</div>
              <div className="text-sm text-[#64748B]">{payment.typeOfDamage}</div>
              <div className="text-sm text-[#64748B]">{payment.insuranceCompany}</div>
              <div className="text-sm text-[#64748B]">{payment.dateOfLoss}</div>
              <div className="text-sm text-[#64748B]">{payment.payment}</div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(payment.status)}`}>
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
