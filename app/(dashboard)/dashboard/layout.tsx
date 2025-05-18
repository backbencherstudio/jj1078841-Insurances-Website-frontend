"use client";
import React, { useState } from "react";
import Header from "../../_components/reusable/header";
import Sidebar from "../../_components/reusable/sidebar";
import { IoMdClose } from "react-icons/io";
import { RiDashboardLine, RiUserLine, RiSettingsLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { GrDocumentUpload } from "react-icons/gr";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { title: "Dashboard", icon: RiDashboardLine, href: "/dashboard" },
    { title: "My Claims", icon: IoDocumentTextOutline, href: "/dashboard/my_claims" },
    // { title: "Upload Documents", icon: GrDocumentUpload, href: "/dashboard/upload_documents" },
    { title: "Messages", icon: AiOutlineMessage, href: "/dashboard/messages" },
    { title: "Profile", icon: RiUserLine, href: "/dashboard/profile" },
     
  ];

  return (
    <div className="flex h-screen bg-disabled overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        menuItems={menuItems}
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
