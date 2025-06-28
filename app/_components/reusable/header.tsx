'use client';

import React, { useState, useRef, useEffect } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import Image from 'next/image';
import profile from '@/public/profile-avatar.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import nookies from 'nookies'; // Import nookies to manage cookies

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Check if the user is logged in based on token from cookies
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = nookies.get(null).token; // Get token from cookies
    if (token) {
      setIsLoggedIn(true); // If token exists, user is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in if no token
    }
  }, []); // Only runs once when the component mounts

  // Logout functionality
  const handleLogout = () => {
    // Remove token from both cookies and localStorage
    nookies.destroy(null, 'token');
    localStorage.removeItem("token");

    // Redirect to login page after logout
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    router.push("/login"); // Redirect to login page
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
            onClick={onMenuClick}
          >
            <HiMenuAlt3 className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-4 px-3">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <IoNotificationsOutline className="w-6 h-6" />
          </button>
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center gap-3 p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <Image src={profile} alt="profile" className='rounded-full' width={32} height={32} />
              </div>
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
                {/* <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Profile</Link> */}
                {/* <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link> */}
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
