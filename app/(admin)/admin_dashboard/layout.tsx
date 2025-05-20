"use client";
import React, { useState } from "react";
 import Header from "@/app/_components/reusable/header";
import Sidebar from "@/app/_components/reusable/sidebar";
import { IoMdClose } from "react-icons/io";
import { RiDashboardLine, RiUserLine, RiSettingsLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { GrDocumentUpload } from "react-icons/gr";
import { GrDocumentText } from "react-icons/gr";
import { MdPayments } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const adminMenu = [
    { title: "Dashboard", icon: RiDashboardLine, href: "/admin_dashboard" },
    { title: "Claims", icon: IoDocumentTextOutline, href: "/admin_dashboard/claims_history" },
    { title: "User Management", icon:GrDocumentText, href: "/admin_dashboard/user_management" },
    // { title: "payment", icon:MdPayments, href:"/admin_dashboard/payment" },
    { title: "Membership Plan", icon:FaUsers, href:"/admin_dashboard/membership_plan" },
  

    
     
  ];

  return (
    <div className="flex h-screen bg-disabled ">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        menuItems={adminMenu}
      />

      <div className={`
        flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'md:ml-0' : 'md:ml-0'}
      `}>
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Overlay with fade effect */}
      <div 
        className={`
          fixed inset-0 bg-black transition-opacity duration-300 md:hidden
          ${isSidebarOpen ? 'opacity-50 z-30' : 'opacity-0 -z-10'}
        `}
        onClick={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}
