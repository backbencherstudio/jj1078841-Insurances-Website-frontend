"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { RevenueChart } from "./reusable/RevenueChart";
import { useAppSelector } from "@/src/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

  const getStatusStyle = (status: ClaimData["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-[#FFF3E5] text-[#FF9C37]";
      case "New":
        return "bg-[#E5F5FF] text-[#37A9FF]";
      case "Completed":
        return "bg-[#E8FFE5] text-[#4CD440]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

interface ClaimData {
  id:string;
  claimId: string;
  policyNumber: string;
  typeOfDamage: string;
  insuranceCompany: string;
  dateOfLoss: string;
  status: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [overviewData, setOverviewData] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any>([]);
  const [recentClaims, setRecentClaims] = useState<ClaimData[]>([]);

  useEffect(() => {
    // Only runs on client
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return; // wait for token to be available

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/dashboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Authorization failed, status code: " + response.status);
        }

        const data = await response.json();
        console.log("Dashboard Data ===>", data);

        // Update state with the API response data
        setOverviewData(data.overview);
        setRevenueData(data.revenueData);
        setRecentClaims(
          data.recentClaims.map((claim: any) => ({
            claimId: claim.id,
            policyNumber: claim.policy_number,
            typeOfDamage: claim.type_of_damage,
            insuranceCompany: claim.insurance_company,
            dateOfLoss: new Date(claim.date_of_loss).toLocaleDateString(),
            status: claim.status,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  // Overview cards data from API
  const overviewCards: OverviewCard[] = [
    { title: "Total Members", value: overviewData?.totalMembers || "Loading..." },
    { title: "Active Claims", value: overviewData?.totalClaims || "Loading..." },
    { title: "Pending Claims", value: overviewData?.pendingClaims || "Loading..." },
    { title: "Monthly Revenue", value: `$${overviewData?.monthlyRevenue || "Loading..."}` },
  ];

  // Add this interface and array before the AdminDashboard component
  interface TableHeader {
    id: string;
    label: string;
    width: string;
  }

  const tableHeaders: TableHeader[] = [
    { id: "claimId", label: "Claim ID", width: "w-1/6" },
    { id: "policyNumber", label: "Policy Number", width: "w-1/6" },
    { id: "typeOfDamage", label: "Type of Damage", width: "w-1/6" },
    { id: "insuranceCompany", label: "Insurance Company", width: "w-2/6" },
    { id: "dateOfLoss", label: "Date of Loss", width: "w-1/6" },
    { id: "status", label: "Status", width: "w-1/6" },
  ];


  const handleStatusManage = (id: string) => {
    router.push(`/admin_dashboard/dashboard/${id}`);
  };

  return (
    <div className="flex flex-col gap-6 p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 90px)' }}>
      {/* Overview Section */}
      <div>
        <h2 className="text-2xl font-semibold text-title-text mt-6 mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewCards.map((card, index) => (
            <div key={index} className="bg-white p-4 rounded-xl">
              <p className="text-text-light font-medium text-base mb-12">{card.title}</p>
              <p className="text-3xl font-semibold text-gray-bold">{card.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Chart */}
      <RevenueChart revenueData={revenueData} />

      {/* Recent Claims */}
      <div className="bg-white rounded-lg  mt-6 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-bold">Recent Claims</h3>
          <Link href="/admin_dashboard/claims_history" className="text-gray-bold font-normal text-base hover:text-blue-600">View all</Link>
        </div>

        {/* Outer container with horizontal scroll for small screens */}
        <div className="w-full overflow-x-auto rounded-t-2xl">
          <table className="min-w-[768px] sm:min-w-full">
            {/* Table Header */}
            <thead className="bg-[#e6ecf2] rounded-t-2xl">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className={`text-xs font-semibold text-primary-dark p-3 sm:p-4 text-left ${header.width}`}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {recentClaims.map((claim) => (
                <tr key={claim.claimId} className="hover:bg-gray-50">
                  {/* Claim ID */}
                  <td className="p-3 sm:p-4 whitespace-nowrap text-xs font-medium text-gray-bold w-1/6">
                    {claim.claimId}
                  </td>

                  {/* Policy Number */}
                  <td className="p-3 sm:p-4 whitespace-nowrap text-xs font-medium text-gray-bold w-1/6">
                    {claim.policyNumber}
                  </td>

                  {/* Type of Damage */}
                  <td className="p-3 sm:p-4 whitespace-nowrap text-xs font-medium text-gray-bold w-1/6">
                    {claim.typeOfDamage}
                  </td>

                  {/* Insurance Company */}
                  <td className="p-3 sm:p-4 whitespace-nowrap text-xs font-medium text-gray-bold w-2/6">
                    {claim.insuranceCompany}
                  </td>

                  {/* Date of Loss */}
                  <td className="p-3 sm:p-4 whitespace-nowrap text-xs font-medium text-gray-bold w-1/6">
                    {claim.dateOfLoss}
                  </td>

                  {/* Status */}
                  <td className="p-3 sm:p-4 whitespace-nowrap w-1/6">
                    <button
                      onClick={() => handleStatusManage(claim.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(claim.status)} cursor-pointer`}
                    >
                      {claim.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
