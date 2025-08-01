"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { TfiTrash } from "react-icons/tfi";

interface ClaimData {
  id:string;
  claimId: string;
  policyNumber: string;
  typeOfDamage: string;
  insuranceCompany: string;
  dateOfLoss: string;
  status: "Pending" | "New" | "Completed";
}

interface TableHeader {
  id: keyof ClaimData | "action";
  label: string;
  width: string;
}

const tableHeaders: TableHeader[] = [
  { id: "claimId", label: "Claim ID", width: "w-[13%]" },
  { id: "policyNumber", label: "Policy Number", width: "w-[13%]" },
  { id: "typeOfDamage", label: "Type of Damage", width: "w-[13%]" },
  { id: "insuranceCompany", label: "Insurance Company", width: "w-[18%]" },
  { id: "dateOfLoss", label: "Date of Loss", width: "w-[15%]" },
  { id: "status", label: "Status", width: "w-[13%]" },
  { id: "action", label: "Action", width: "w-[14%]" },
];

export default function ClaimsHistory() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [claims, setClaims] = useState<ClaimData[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return; // Wait for token to be available

    const fetchClaims = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/claims-history`, {
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
        console.log("Claims History Data ===>", data);

        const mappedClaims = data.data.map((claim: any) => ({
          id: claim.id,
          claimId: claim.claim_number,
          policyNumber: claim.policy_number,
          typeOfDamage: claim.type_of_damage,
          insuranceCompany: claim.insurance_company,
          dateOfLoss: new Date(claim.date_of_loss).toLocaleDateString(),
          status: claim.status,
        }));

        setClaims(mappedClaims);
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };

    fetchClaims();
  }, [token]);

  // Filter claims based on search term
  const filteredClaims = claims.filter((claim) =>
    Object.values(claim).some((value) =>
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

  const handleStatusManage=(id:string)=>{
    console.log(id);
    router.push(`/admin_dashboard/dashboard/${id}`)
  }

  return (
    <div className="mx-auto w-[95%]">
      {/* title */}
      <h1 className="text-[40px] font-semibold text-primary-dark my-5">Claims History</h1>
      <div className="p-6 border border-border-light rounded-2xl bg-white">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xs pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Header */}
        <div className="bg-[#e6ecf2] flex rounded-t-2xl">
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
                  {header.id === "action" ? (
                    <button className="text-white bg-[#EB3D4D] p-3 rounded-xl">
                      <TfiTrash size={18} />
                    </button>
                  ) : header.id === "status" ? (
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        claim.status
                      )}`}
                      onClick={()=>handleStatusManage(claim.id)}
                    >
                      {claim.status}
                    </div>
                  ) : (
                    claim[header.id as keyof ClaimData]
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end px-4 py-3 sm:px-6 mt-8">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-base font-medium text-isecondary hover:text-isecondary disabled:text-gray-400"
          >
            Prev
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`  text-base font-medium size-12 rounded-md ${
                currentPage === number
                  ? "bg-isecondary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-base font-medium text-isecondary hover:text-isecondary disabled:text-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
