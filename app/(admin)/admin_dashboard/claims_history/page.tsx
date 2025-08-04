"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { TfiTrash } from "react-icons/tfi";

interface ClaimData {
  id: string;
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
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchClaims = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/claims-history`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
      } finally {
        setIsLoading(false);
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

  const handleStatusManage = (id: string) => {
    router.push(`/admin_dashboard/dashboard/${id}`);
  };

  const handleDeleteClaim = async (id: string) => {
    if (!confirm("Are you sure you want to delete this claim?")) return;
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/claims/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete claim");
      }

      setClaims(claims.filter(claim => claim.id !== id));
    } catch (error) {
      console.error("Error deleting claim:", error);
    }
  };

  return (
    <div className="mx-auto p-6 w-full overflow-y-auto maxWidth" style={{maxHeight:'calc(100vh - 90px)'}}>
      <h1 className="text-[40px] font-semibold text-primary-dark my-5">Claims History</h1>
      
      <div className="p-6 border border-border-light rounded-2xl bg-white">
        {/* Search Bar */}
        <div className="mb-4 relative">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search claims..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xs pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#e6ecf2]">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className={`px-4 py-3 text-left text-xs font-semibold text-primary-dark uppercase tracking-wider ${header.width}`}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={tableHeaders.length} className="px-4 py-6 text-center">
                    Loading claims...
                  </td>
                </tr>
              ) : paginatedClaims.length === 0 ? (
                <tr>
                  <td colSpan={tableHeaders.length} className="px-4 py-6 text-center">
                    {searchTerm ? "No matching claims found" : "No claims available"}
                  </td>
                </tr>
              ) : (
                paginatedClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    {tableHeaders.map((header) => (
                      <td
                        key={`${claim.id}-${header.id}`}
                        className={`px-4 py-4 whitespace-nowrap text-sm text-gray-600 ${header.width}`}
                      >
                        {header.id === "action" ? (
                          <button
                            onClick={() => handleDeleteClaim(claim.id)}
                            className="text-white bg-[#EB3D4D] p-2 rounded-xl hover:bg-red-600 transition-colors"
                            aria-label="Delete claim"
                          >
                            <TfiTrash size={18} />
                          </button>
                        ) : header.id === "status" ? (
                          <button
                            onClick={() => handleStatusManage(claim.id)}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(claim.status)} cursor-pointer`}
                          >
                            {claim.status}
                          </button>
                        ) : (
                          claim[header.id as keyof ClaimData]
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 mt-4">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredClaims.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredClaims.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Previous</span>
                    &larr;
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNum
                            ? "z-10 bg-isecondary border-isecondary text-white"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="sr-only">Next</span>
                    &rarr;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}