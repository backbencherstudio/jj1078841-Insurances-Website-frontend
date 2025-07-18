"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TfiTrash } from "react-icons/tfi";
import { IoSearchOutline } from "react-icons/io5";
import avatar1 from "@/public/avatar-1 (1).png";

// Types for user data and table headers
interface UserData {
  id: string;
  name: string;
  email: string;
  date: string;
  plan: string;
  status: string;
  avatar: any;
}

interface TableHeader {
  id: string;
  label: string;
}

const tableHeaders: TableHeader[] = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "date", label: "Date" },
  { id: "plan", label: "Plan" },
  { id: "status", label: "Status" },
  { id: "action", label: "Action" },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<"All" | "Active" | "Pending">("All");
  const [users, setUsers] = useState<UserData[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserData | null>(null);
  const itemsPerPage = 9;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return; // Wait for token to be available

    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/user-management`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
console.log("get data",response);

        if (!response.ok) {
          throw new Error("Authorization failed, status code: " + response.status);
        }

        const data = await response.json();
        console.log("User Management Data ===>", data);

        const mappedUsers = data.data.map((user: any) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          date: new Date(user.date).toLocaleDateString(),
          plan: user.plan || "No Plan",
          status: user.status,
          avatar: avatar1, // Placeholder avatar for now
        }));

        setUsers(mappedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  // Filter users based on search term and status filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch = Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = filter === "All" || user.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate page numbers array
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getStatusStyle = (status: UserData["status"]) => {
    switch (status) {
      case "Active":
        return "bg-[#E8FFE5] text-[#4CD440]";
      case "Pending":
        return "bg-[#FFF3E5] text-[#FF9C37]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteUser = async (userToDelete: UserData) => {
    // Set the user to be deleted and show the modal
    setUserToDelete(userToDelete);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/user-management/${userToDelete.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          
        });
console.log("response=============================================>",response);

        if (response.ok) {
          // If deletion is successful, remove the user from local state
          setUsers(users.filter((user) => user.id !== userToDelete.id));
          setShowModal(false); // Close the modal after successful deletion
        } else {
          throw new Error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const cancelDelete = () => {
    setShowModal(false); // Close the modal without deleting
  };

  return (
    <div className="max-w-[95%] mx-auto">
      {/* title */}
      <h1 className="text-[40px] font-semibold text-primary-dark my-5">User Management</h1>

      <div className="p-6 border border-border-light rounded-2xl bg-white">
        {/* Search and Filter Section */}
        <div className="mb-4 flex justify-between items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-[320px] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none"
            />
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-gray-600 appearance-none bg-white pr-10 cursor-pointer"
          >
            <option>All</option>
            <option>Active</option>
            <option>Pending</option>
          </select>
        </div>

        {/* Headers */}
        <div className="grid grid-cols-6 bg-[#e6ecf2] rounded-t-xl">
          {tableHeaders.map((header) => (
            <div key={header.id} className="text-xs font-semibold text-primary-dark p-3 sm:p-4">
              {header.label}
            </div>
          ))}
        </div>

        {/* User Rows */}
        <div className="divide-y divide-[#E2E8F0]">
          {paginatedUsers.map((user, index) => (
            <div key={index} className="grid grid-cols-6 px-6 py-4 hover:bg-gray-50 items-center">
              <div className="flex items-center gap-3">
                <Image src={user.avatar} alt={user.name} width={32} height={32} className="rounded-full" />
                <span className="text-sm font-medium text-[#0B1C39]">{user.name}</span>
              </div>
              <div className="text-sm font-medium text-[#0B1C39]">{user.email}</div>
              <div className="text-sm font-medium text-[#0B1C39]">{user.date}</div>
              <div className="text-sm font-medium text-[#0B1C39]">{user.plan}</div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(user.status)}`}>
                  {user.status}
                </span>
              </div>
              <div>
                <button className="text-white bg-[#EB3D4D] p-3 rounded-xl" onClick={() => handleDeleteUser(user)}>
                  <TfiTrash size={18} />
                </button>
              </div>
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
            className="px-3 py-1 text-base font-medium text-primary-dark hover:text-primary-dark disabled:text-gray-400"
          >
            Prev
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`text-base font-medium size-12 rounded-md ${
                currentPage === number
                  ? "bg-primary-dark text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-base font-medium text-primary-dark hover:text-primary-dark disabled:text-gray-400"
          >
            Next
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold">Are you sure you want to delete this user?</h3>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={confirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
