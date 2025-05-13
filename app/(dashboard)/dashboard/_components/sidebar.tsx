import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { IoMdClose } from "react-icons/io";
import { RiDashboardLine, RiUserLine, RiSettingsLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { GrDocumentUpload } from "react-icons/gr";
import logo from "@/public/logo.png"
import Image from 'next/image';

const menuItems = [
  { title: "Dashboard", icon: RiDashboardLine, href: "/dashboard" },
  { title: "My Claims", icon: IoDocumentTextOutline, href: "/dashboard/my_claims" },
  { title: "Upload Documents", icon: GrDocumentUpload, href: "/dashboard/upload_documents" },
  { title: "Messages", icon: AiOutlineMessage, href: "/dashboard/messages" },
  { title: "Profile", icon: RiUserLine, href: "/dashboard/profile" },
   
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
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
        <div className="flex items-center gap-3 pl-5 ">
          <Image src={logo} alt='logo'/>
        </div>
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
                flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className={`${isActive ? 'font-medium' : ''}`}>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
