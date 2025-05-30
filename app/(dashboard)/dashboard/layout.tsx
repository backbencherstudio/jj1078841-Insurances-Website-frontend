"use client";

import React, { useState, useEffect } from "react";
import Header from "../../_components/reusable/header";
import Sidebar from "../../_components/reusable/sidebar";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/src/redux/hooks";
import { RiDashboardLine, RiUserLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();

  // Auth check
  useEffect(() => {
    const localToken = localStorage.getItem("accessToken");

    if (!token && !localToken) {
      router.replace("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, [token, router]);

  const menuItems = [
    { title: "Dashboard", icon: RiDashboardLine, href: "/dashboard" },
    { title: "My Claims", icon: IoDocumentTextOutline, href: "/dashboard/my_claims" },
    { title: "Messages", icon: AiOutlineMessage, href: "/dashboard/messages" },
    { title: "Profile", icon: RiUserLine, href: "/dashboard/profile" },
  ];

  if (isCheckingAuth) return null; // Or add a loader if you prefer

  return (
    <div className="flex h-screen bg-disabled overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        menuItems={menuItems}
      />

      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out`}>
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'opacity-50 z-30' : 'opacity-0 -z-10'}`}
        onClick={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}
