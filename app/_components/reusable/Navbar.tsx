"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/original-logo-removebg-preview.png";
import { Menu, X, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import nookies from "nookies"; // Import nookies to manage cookies

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileViewActive, setIsProfileViewActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [userData, setUserData] = useState<any>(null); // To store user data
  const pathname = usePathname();
  const router = useRouter();

  // Check for the token in cookies and fetch user data
  useEffect(() => {
    const token = nookies.get(null).token; // Get token from cookies
    if (token) {
      setIsLoggedIn(true); // User is logged in if token exists
      fetchUserData(token); // Fetch user data if logged in
    } else {
      setIsLoggedIn(false); // User is not logged in if no token
    }
  }, []); // Only runs once when the component mounts

  // Fetch user data from the API using the token
  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        
        setUserData(data.data);
        
      } else {
        console.error("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (pathname === "/profile") {
      setIsProfileViewActive(true);
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    } else {
      setIsProfileViewActive(false);
    }
  }, [pathname, isMobileMenuOpen]);

  const handleProfileIconClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Remove token from cookies using nookies
    nookies.destroy(null, "token");
    // Remove token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberedEmail");
    setIsLoggedIn(false); // Update state to reflect logout
    setIsDropdownOpen(false);
    router.push("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-white sticky top-0 left-0 z-50 shadow-sm">
      <div className="container flex justify-between items-center py-6 p-5 mx-auto">
        <div>
          <Image src={logo} width={150} height={50} alt="logo" />
        </div>

        <ul className="hidden md:flex gap-4 lg:gap-5 md:text-[12px] lg:text-base">
          <Link href="/" className={`hover:text-[var(--primary-dark)] font-medium ${pathname === "/" ? "text-[var(--primary-dark)]" : ""}`}>Home</Link>
          <Link href="/about" className={`hover:text-[var(--primary-dark)] font-medium ${pathname === "/about" ? "text-[var(--primary-dark)]" : ""}`}>About</Link>
          <Link href="/membership_plans" className={`hover:text-[var(--primary-dark)] font-medium ${pathname === "/membership_plans" ? "text-[var(--primary-dark)]" : ""}`}>Membership</Link>
          <Link href="/privacy-policy" className={`hover:text-[var(--primary-dark)] font-medium text-nowrap ${pathname === "/privacy-policy" ? "text-[var(--primary-dark)]" : ""}`}>Privacy Policy</Link>
          <Link href="/faq" className={`hover:text-[var(--primary-dark)] font-medium ${pathname === "/faq" ? "text-[var(--primary-dark)]" : ""}`}>FAQs</Link>
          <Link href="/contact" className={`hover:text-[var(--primary-dark)] font-medium ${pathname === "/contact" ? "text-[var(--primary-dark)]" : ""}`}>Contact</Link>
        </ul>

        <div className="hidden md:flex gap-6 items-center">
          {isLoggedIn && userData ? (
            <div className="relative">
              <button
                onClick={handleProfileIconClick}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--primary-dark)] text-white hover:bg-opacity-90"
              >
                <User size={20} />
                <ChevronDown size={20} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg py-2 w-48">
                { userData.type === "user"
                ?
                <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                :
                <Link href="/admin_dashboard" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>

                 }
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Logout</button>
                </div>
              )}
              {/* Display email below profile avatar */}
              {userData.email && (
                <div className="text-sm text-center mt-2 text-gray-600">{userData.email}</div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="py-3.5 md:py-2 lg:py-3.5 px-10 lg:px-10 md:px-5 bg-[var(--primary-dark)] text-white rounded-lg hover:bg-transparent hover:text-[var(--primary-dark)] border border-transparent hover:border-[var(--primary-dark)] md:text-[12px]">Log in</Link>
              <Link href="/signUp" className="py-3.5 md:py-2 lg:py-3.5 px-10 lg:px-10 md:px-5 bg-[var(--primary-dark)] text-white rounded-lg hover:bg-transparent hover:text-[var(--primary-dark)] border border-transparent hover:border-[var(--primary-dark)] md:text-[12px]">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile view avatar + hamburger */}
        <div className="md:hidden flex items-center gap-4">
          {isLoggedIn && (
            <div className="relative">
              <button
                onClick={handleProfileIconClick}
                className="w-9 h-9 rounded-full bg-[var(--primary-dark)] text-white flex items-center justify-center hover:bg-opacity-90"
              >
                <User size={20} />
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg py-2 w-44">
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  {/* <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link> */}
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          )}

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col items-start px-6 py-4 z-50">
          <Link href="/" className="hover:text-[var(--primary-dark)] font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/about" className="hover:text-[var(--primary-dark)] font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link href="/membership_plans" className="hover:text-[var(--primary-dark)] font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Membership</Link>
          <Link href="/privacy-policy" className="hover:text-[var(--primary-dark)] font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Privacy Policy</Link>
          <Link href="/faq" className="hover:text-[var(--primary-dark)] font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>FAQs</Link>
          <Link href="/contact" className="hover:text-[var(--primary-dark)] font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>

          {!isLoggedIn && (
            <>
              <Link href="/login" className="w-full text-center py-3 mt-4 rounded-lg bg-[var(--primary-dark)] text-white" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
              <Link href="/signUp" className="w-full text-center py-3 mt-2 rounded-lg bg-[var(--primary-dark)] text-white" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
