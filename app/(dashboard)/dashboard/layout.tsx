"use client";

import React, { useState, useEffect } from "react";
import Header from "../../_components/reusable/header";
import Sidebar from "../../_components/reusable/sidebar";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/src/redux/hooks";
import { RiDashboardLine, RiUserLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaHandsHelping } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import nookies from "nookies"; // Import nookies for cookie handling

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [userType, setUserType] = useState<string | null>(null); // Store user type (e.g., "user", "admin")
  const router = useRouter();

  // Auth check
  useEffect(() => {
    const token = nookies.get(null).token || localStorage.getItem("token"); // Get token from cookies or localStorage
    
    if (!token) {
      // If no token, redirect to login page
      router.replace("/login");
      return;
    }

    // Fetch user data after token is found
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        const user = data.data; // Assuming the user data is in `data.data`
        
        // Set user type
        setUserType(user.type);

        // Check if the user type is not "user"
        if (user.type !== "user") {
          router.replace("/login"); // Redirect to login if not a "user"
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.replace("/login"); // Redirect if there's an error
      } finally {
        setIsCheckingAuth(false); // Set loading to false once the check is done
      }
    };

    fetchUserData();
  }, [router]);

  const menuItems = [
    { title: "Dashboard", icon: RiDashboardLine, href: "/dashboard" },
    { title: "My Claims", icon: IoDocumentTextOutline, href: "/dashboard/my_claims" },
    // { title: "Messages", icon: AiOutlineMessage, href: "/dashboard/messages" },
    { title: "Profile", icon: RiUserLine, href: "/dashboard/profile" },
    // { title: "Claim Support", icon: FaHandsHelping, href: "/dashboard/claim_support" },
  ];

  if (isCheckingAuth) return null; // Or add a loader if you prefer

  return (
    <div className="flex h-screen bg-disabled overflow-hidden w-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        menuItems={menuItems}
      />

      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out`}>
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1" style={{maxWidth:'calc(100vw - 167px)'}}>
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
