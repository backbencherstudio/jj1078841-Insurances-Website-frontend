import React, { useEffect } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { IoMdClose } from "react-icons/io";
import Image from 'next/image';
import logo from "@/public/logo.png";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[]; // Added menuItems as a prop
}

export default function Sidebar({ isOpen, onClose, menuItems }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside 
      className={`
        fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
        w-64 bg-white  
      `}
    >
      <div className="flex items-center justify-between p-4 pb-9 ">
        <Link href='/' className="flex items-center gap-3 pl-5 ">
          <Image src={logo} alt='logo'/>
        </Link>
        <button 
          className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
          onClick={onClose}
        >
          <IoMdClose className="w-6 h-6" />
        </button>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`
                flex items-center text-nowrap gap-3 p-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-[#ebf8fd] text-primary-color' 
                  : 'text-text-light hover:bg-gray-100'}
              `}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-color' : 'text-gray-500'}`} />
              <span className={`${isActive ? '' : ''}`}>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
