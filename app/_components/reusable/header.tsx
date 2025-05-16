import React, { useState, useRef, useEffect } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
// import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
// import { RiUserLine } from "react-icons/ri";
// import logo from "@/public/logo.png"
import Image from 'next/image';
import profile from '@/public/profile-avatar.png'

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  // Removed: const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Removed: const dropdownRef = useRef<HTMLDivElement>(null);

  // Removed: useEffect for handleClickOutside

  return (
    <header className="bg-white  ">
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
          <button className="p-2  rounded-lg   hover:bg-gray-100 transition-colors duration-200">
            <IoNotificationsOutline className="w-6 h-6" />
          </button>
          <div className="relative"> {/* Removed ref={dropdownRef} */}
            <div 
              className="flex items-center gap-3 p-2  rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              // Removed: onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-8 h-8     flex items-center justify-center">
                 <Image src={profile} alt="profile" className=' rounded-full'  />
              </div>
              {/* Removed: <span className="hidden md:block">Katie Sims</span> */}
            </div>

            {/* Removed: Dropdown Menu JSX */}
          </div>
        </div>
      </div>
    </header>
  );
}
