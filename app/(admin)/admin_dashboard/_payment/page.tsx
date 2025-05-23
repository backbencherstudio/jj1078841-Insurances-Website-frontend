"use client";
import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

interface PaymentData {
  claimId: string;
  policyNumber: string;
  typeOfDamage: string;
  insuranceCompany: string;
  dateOfLoss: string;
  payment: string;
  status: "Paid" | "Unpaid";
}

interface TableHeader{
  id:string;
  label:string;
}

const tableHeaders: TableHeader[] = [
  { id: "claimId", label: "Claim ID" },
  { id: "policyNo", label: "Policy Number" },
  { id: "typeOfDamage", label: "Type of Damage" },
  { id: "insuranceCompany", label: "Insurance Company" },
  { id: "dateOfLoss", label: "Date of Loss" },
  { id: "payment", label: "Payment" },
  { id: "status", label: "Status" },
];


export default function PaymentHistory() {
  const [timeframe, setTimeframe] = useState("This Month");

  const paymentData: PaymentData[] = [
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Roof",
      insuranceCompany: "Company Name",
      dateOfLoss: "-",
      payment: "$2680.09",
      status: "Unpaid",
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Water",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid",
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Hail",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid",
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Wind",
      insuranceCompany: "Company Name",
      dateOfLoss: "-",
      payment: "$2680.09",
      status: "Unpaid",
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Wind",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid",
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Roof",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid",
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Water",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid",
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Hail",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid",
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Wind",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid",
    },
    {
      claimId: "#1245",
      policyNumber: "#1523654",
      typeOfDamage: "Wind",
      insuranceCompany: "Company Name",
      dateOfLoss: "12 Jan, 2025",
      payment: "$2680.09",
      status: "Paid",
    },
  ];

  const getStatusStyle = (status: PaymentData["status"]) => {
    switch (status) {
      case "Paid":
        return "bg-[#E8FFE5] text-[#4CD440]";
      case "Unpaid":
        return "bg-[#FFF3E5] text-[#FF9C37]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className=" max-w-[95%] mx-auto">
      {/* title */}
      <h1 className="text-[40px] font-semibold text-primary-dark my-5">
        Payment
      </h1>

     
<div className="  p-6 border border-border-light rounded-2xl bg-white">
<div className=" flex justify-between items-center mb-5">
          <h2 className="text-lg font-medium text-[#0B1C39]">
            Payments History
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-gray-600 bg-white ">
            This Month
            <IoChevronDownOutline className="w-4 h-4" />
          </button>
        </div>

        
         {/* Headers */}
         <div className="grid grid-cols-7 bg-[#e6ecf2] rounded-t-xl">
          {tableHeaders.map((header) => (
            <div
              key={header.id}
              className="text-xs font-semibold text-primary-dark p-3 sm:p-4"
            >
              {header.label}
            </div>
          ))}
        </div>

        {/* Payment Rows */}
        <div className="divide-y divide-[#E2E8F0]">
          {paymentData.map((payment, index) => (
            <div
              key={index}
              className="grid grid-cols-7 px-6 py-4 hover:bg-gray-50 items-center"
            >
              <div className="text-sm text-[#64748B]">{payment.claimId}</div>
              <div className="text-sm text-[#64748B]">
                {payment.policyNumber}
              </div>
              <div className="text-sm text-[#64748B]">
                {payment.typeOfDamage}
              </div>
              <div className="text-sm text-[#64748B]">
                {payment.insuranceCompany}
              </div>
              <div className="text-sm text-[#64748B]">{payment.dateOfLoss}</div>
              <div className="text-sm text-[#64748B]">{payment.payment}</div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                    payment.status
                  )}`}
                >
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
