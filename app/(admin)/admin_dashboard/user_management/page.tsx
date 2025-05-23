"use client";
import React, { useState } from "react";
import Image from "next/image";
import { TfiTrash } from "react-icons/tfi";
import { IoSearchOutline, IoChevronDownOutline } from "react-icons/io5";
import avatar1 from "@/public/avatar-1 (1).png";
import avatar2 from "@/public/avatar-1 (2).png";
import avatar3 from "@/public/avatar-1 (3).png";
import avatar4 from "@/public/avatar-1 (4).png";
import avatar5 from "@/public/avatar-1 (5).png";
import avatar6 from "@/public/avatar-1 (6).png";
import avatar7 from "@/public/avatar-1 (7).png";
import avatar8 from "@/public/avatar-1 (8).png";
import avatar9 from "@/public/avatar-1 (9).png";

interface UserData {
  name: string;
  email: string;
  date: string;
  plan: "Business" | "Vehicle" | "Property";
  status: "Active" | "Pending";
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

const userData: UserData[] = [
  {
    name: "Jane Cooper",
    email: "curtis.weaver@example.com",
    date: "12 Jan, 2025",
    plan: "Business",
    status: "Pending",
    avatar: avatar1,
  },
  {
    name: "Floyd Miles",
    email: "michelle.rivera@example.com",
    date: "12 Jan, 2025",
    plan: "Vehicle",
    status: "Active",
    avatar: avatar2,
  },
  {
    name: "Courtney Henry",
    email: "michael.mitc@example.com",
    date: "12 Jan, 2025",
    plan: "Business",
    status: "Active",
    avatar: avatar3,
  },
  {
    name: "Theresa Webb",
    email: "sara.cruz@example.com",
    date: "12 Jan, 2025",
    plan: "Property",
    status: "Pending",
    avatar: avatar4,
  },
  {
    name: "Annette Black",
    email: "dolores.chambers@example.com",
    date: "12 Jan, 2025",
    plan: "Vehicle",
    status: "Active",
    avatar: avatar5,
  },
  {
    name: "Annette Black",
    email: "dolores.chambers@example.com",
    date: "12 Jan, 2025",
    plan: "Vehicle",
    status: "Active",
    avatar: avatar5,
  },
  {
    name: "Annette Black",
    email: "dolores.chambers@example.com",
    date: "12 Jan, 2025",
    plan: "Vehicle",
    status: "Active",
    avatar: avatar5,
  },
  {
    name: "Annette Black",
    email: "dolores.chambers@example.com",
    date: "12 Jan, 2025",
    plan: "Vehicle",
    status: "Active",
    avatar: avatar5,
  },
  {
    name: "Annette Black",
    email: "dolores.chambers@example.com",
    date: "12 Jan, 2025",
    plan: "Vehicle",
    status: "Active",
    avatar: avatar5,
  },
  {
    name: "Marvin McKinney",
    email: "jackson.graham@example.com",
    date: "12 Jan, 2025",
    plan: "Business",
    status: "Active",
    avatar: avatar6,
  },
  {
    name: "Dianne Russell",
    email: "kenzi.lawson@example.com",
    date: "12 Jan, 2025",
    plan: "Property",
    status: "Active",
    avatar: avatar7,
  },
  {
    name: "Dianne Russell",
    email: "kenzi.lawson@example.com",
    date: "12 Jan, 2025",
    plan: "Property",
    status: "Active",
    avatar: avatar7,
  },
  {
    name: "Dianne Russell",
    email: "kenzi.lawson@example.com",
    date: "12 Jan, 2025",
    plan: "Property",
    status: "Active",
    avatar: avatar7,
  },
  {
    name: "Dianne Russell",
    email: "kenzi.lawson@example.com",
    date: "12 Jan, 2025",
    plan: "Property",
    status: "Active",
    avatar: avatar7,
  },
  {
    name: "Dianne Russell",
    email: "kenzi.lawson@example.com",
    date: "12 Jan, 2025",
    plan: "Property",
    status: "Active",
    avatar: avatar7,
  },
  {
    name: "Kathryn Murphy",
    email: "willie.jennings@example.com",
    date: "12 Jan, 2025",
    plan: "Business",
    status: "Active",
    avatar: avatar8,
  },
  {
    name: "Darlene Robertson",
    email: "bill.sanders@example.com",
    date: "12 Jan, 2025",
    plan: "Business",
    status: "Active",
    avatar: avatar9,
  },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<"All" | "Active" | "Pending">("All");
  const itemsPerPage = 9;

  const [users, setUsers] = useState<UserData[]>(userData);

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

  const handleDeleteUser = (userToDelete: UserData) => {
    setUsers(users.filter((user) => user.email !== userToDelete.email));
  };

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

  return (
    <div className=" max-w-[95%] mx-auto">
      {/* title */}
      <h1 className="text-[40px] font-semibold text-primary-dark my-5">
        User Management
      </h1>

      <div className=" p-6 border border-border-light rounded-2xl bg-white">
        {/* Search and Filter Section */}
        <div className=" mb-4  flex justify-between items-center">
          <div className=" ">
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
            <div
              key={header.id}
              className="text-xs font-semibold text-primary-dark p-3 sm:p-4"
            >
              {header.label}
            </div>
          ))}
        </div>
        {/* User Rows */}
        <div className="divide-y divide-[#E2E8F0]">
          {paginatedUsers.map((user, index) => (
            <div
              key={index}
              className="grid grid-cols-6 px-6 py-4 hover:bg-gray-50 items-center"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-sm font-medium text-[#0B1C39]">
                  {user.name}
                </span>
              </div>
              <div className="text-sm font-medium text-[#0B1C39]">{user.email}</div>
              <div className="text-sm font-medium text-[#0B1C39]">{user.date}</div>
              <div className="text-sm font-medium text-[#0B1C39]">{user.plan}</div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                    user.status
                  )}`}
                >
                  {user.status}
                </span>
              </div>
              <div>
                <button
                  className="text-white bg-[#EB3D4D] p-3 rounded-xl"
                  onClick={() => handleDeleteUser(user)}
                >
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
      {/* </div> */}
    </div>
  );
}
