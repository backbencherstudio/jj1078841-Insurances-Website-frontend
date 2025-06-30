"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/_components/reusable/header";
import Sidebar from "@/app/_components/reusable/sidebar";
import { useRouter } from "next/navigation";
import { RiDashboardLine, RiUserLine, RiSettingsLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { GrDocumentUpload } from "react-icons/gr";
import { GrDocumentText } from "react-icons/gr";
import { MdPayments } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import nookies from "nookies"; // Import nookies for cookie handling

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [userType, setUserType] = useState<string | null>(null); // Store user type (admin/user)
  const router = useRouter();

  // Admin menu items
  const adminMenu = [
    { title: "Dashboard", icon: RiDashboardLine, href: "/admin_dashboard" },
    { title: "Claims", icon: IoDocumentTextOutline, href: "/admin_dashboard/claims_history" },
    { title: "User Management", icon: GrDocumentText, href: "/admin_dashboard/user_management" },
    { title: "Membership Plan", icon: FaUsers, href: "/admin_dashboard/membership_plan" },
  ];

  useEffect(() => {
    const token = nookies.get(null).token || localStorage.getItem("token"); // Get token from cookies or localStorage

    if (!token) {
      // If no token is found, redirect to login
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

        // If the user type is not admin, redirect to login
        if (user.type !== "admin") {
          router.replace("/login");
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

  if (isCheckingAuth) return null; // Or add a loading spinner

  return (
    <div className="flex h-screen bg-disabled">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        menuItems={adminMenu} 
      />

      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out`}>
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Overlay with fade effect */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'opacity-50 z-30' : 'opacity-0 -z-10'}`}
        onClick={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}
