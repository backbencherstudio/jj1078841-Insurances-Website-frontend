"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/original-logo-removebg-preview.png";
import { Menu, X, User, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Assuming user is logged in
  const [isProfileViewActive, setIsProfileViewActive] = useState(false);
  const pathname = usePathname(); // Get current pathname

  // Effect to handle profile view active state based on route
  // This state primarily affects the right-hand side icons and mobile menu behavior on /profile
  useEffect(() => {
    if (pathname === "/profile") {
      setIsProfileViewActive(true);
      if (isMobileMenuOpen) { // If mobile menu is open when navigating to /profile, close it
        setIsMobileMenuOpen(false);
      }
    } else {
      setIsProfileViewActive(false);
    }
  }, [pathname, isMobileMenuOpen]); // Rerun effect if pathname or isMobileMenuOpen changes

  // Handles clicks on links that navigate to /profile, primarily to close mobile menu
  const handleProfileIconClick = () => {
    // Optimistically update isProfileViewActive for immediate UI change of right-side icons
    // if navigating to profile from another page. useEffect will confirm.
    if (pathname !== "/profile" && !isProfileViewActive) {
        setIsProfileViewActive(true);
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="container flex justify-between items-center py-6 relative p-5 mx-auto">
      {/* Logo */}
      <div>
        <Image src={logo} width={150} height={50} alt="logo" />
      </div>

      {/* Desktop Nav - Main navigation items. Now always visible on desktop when component renders. */}
      {/* The conditional rendering based on !isProfileViewActive has been removed here. */}
      <ul className="hidden md:flex gap-10">
        <Link href="/" className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">Home</Link>
        <Link href="/about" className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">About</Link>
        <Link href="/membership_plans" className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">Membership</Link>
        <Link href="/privacy-policy" className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">Privecy Policy</Link>
        <Link href="/faq" className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">FAQs</Link>
        <Link href="/contact" className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">Contact</Link>
      </ul>

      {/* Right side icons/buttons - hidden on mobile */}
      <div className="hidden md:flex justify-between gap-6 items-center">
        {isLoggedIn ? (
          isProfileViewActive ? (
            // Profile View Active (e.g., on /profile page): Show Profile and Notification Icons
            <div className="flex items-center gap-4">
              
                <Link href="/dashboard"
                  className="w-10 h-10 rounded-full bg-[var(--primary-dark)] text-white flex items-center justify-center hover:bg-opacity-90"
                  aria-label="Profile"
                >
                  <User size={24} />
                </Link>
            </div>
          ) : (
            // Standard Logged In View (not on /profile page): Profile Icon with Dropdown
            <div className="relative group">
              <button  
                onClick={handleProfileIconClick} // Handles mobile menu close & optimistic UI update for right-side icons
                className="w-10 h-10 rounded-full bg-[var(--primary-dark)] text-white flex items-center justify-center hover:bg-opacity-90"
                aria-label="Open profile menu"
              >
                <User size={24} />
              </button>
              <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg py-2 w-48 hidden group-hover:block">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={handleProfileIconClick}>Profile</Link>
                <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    // setIsProfileViewActive(false); // useEffect will handle this if logout redirects from /profile
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          )
        ) : (
          // Logged Out View: Login and Sign Up Buttons
          <>
            <Link href="/login" className="py-3.5 px-10 bg-[var(--primary-dark)] text-white rounded-lg border border-transparent hover:bg-transparent hover:text-[var(--primary-dark)] hover:border-[var(--primary-dark)]">
              Log in
            </Link>
            <Link href="/signUp" className="py-3.5 px-10 bg-[var(--primary-dark)] text-white rounded-lg border border-transparent hover:bg-transparent hover:text-[var(--primary-dark)] hover:border-[var(--primary-dark)]">
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Hamburger Icon (Mobile only) - Conditionally hide if profile view is active (on /profile page) */}
      <div className="md:hidden">
        {!(isLoggedIn && isProfileViewActive) && (
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
        {/* Mobile specific icons for profile view - shown on /profile page */}
        {isLoggedIn && isProfileViewActive && (
          <div className="flex items-center gap-3">
            <button  
              className="w-9 h-9 rounded-full bg-[var(--primary-dark)] text-white flex items-center justify-center hover:bg-opacity-90"
              aria-label="Profile"
            >
              <User size={20} />
            </button>
           
          </div>
        )}
      </div>

      {/* Mobile Menu - Conditionally Rendered Content. Still hidden if on /profile page (isProfileViewActive is true) */}
      {isMobileMenuOpen && !isProfileViewActive && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 space-y-4 md:hidden z-50">
          {/* Nav Links for Mobile */}
          <div className="flex flex-col gap-4 w-full">
            <Link href='/' className="hover:text-[var(--primary-dark)] font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href='/about' className="hover:text-[var(--primary-dark)] font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link href='/membership_plans' className="hover:text-[var(--primary-dark)] font-medium" onClick={() => setIsMobileMenuOpen(false)}>Membership</Link>
            <Link href='/privacy-policy' className="hover:text-[var(--primary-dark)] font-medium" onClick={() => setIsMobileMenuOpen(false)}>Privacy Policy</Link>
            <Link href='/faq' className="hover:text-[var(--primary-dark)] font-medium" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
            <Link href='/contact' className="hover:text-[var(--primary-dark)] font-medium" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          </div>

          {/* Auth Links for Mobile */}
          <div className="flex flex-col gap-3 w-full">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard"
                  onClick={() => {
                    handleProfileIconClick(); // Ensure mobile menu closes, handles profile view active state for right-side icons
                  }}
                  className="py-3.5 w-full text-center bg-[var(--primary-dark)] text-white rounded-lg border border-transparent hover:bg-transparent hover:text-[var(--primary-dark)] hover:border-[var(--primary-dark)]"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsMobileMenuOpen(false);
                  }}
                  className="py-3.5 w-full text-center bg-transparent text-red-600 rounded-lg border border-red-600 hover:bg-red-600 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="py-3.5 w-full text-center bg-[var(--primary-dark)] text-white rounded-lg border border-transparent hover:bg-transparent hover:text-[var(--primary-dark)] hover:border-[var(--primary-dark)]" onClick={() => setIsMobileMenuOpen(false)}>
                  Log in
                </Link>
                <Link href="/signUp" className="py-3.5 w-full text-center bg-[var(--primary-dark)] text-white rounded-lg border border-transparent hover:bg-transparent hover:text-[var(--primary-dark)] hover:border-[var(--primary-dark)]" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}