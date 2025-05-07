
"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import { Menu, X } from "lucide-react"; // Install lucide-react or use any icon lib

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="container flex justify-between items-center py-6 relative p-5 ">
      {/* Logo */}
      <div>
        <Image src={logo} alt="logo" />
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-10">
        <li className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">Home</li>
        <li className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">About</li>
        <li className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">Membership</li>
        <li className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">Privecy Policy</li>
        <li className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">FAQ</li>
        <li className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">Contact</li>
      </ul>

      {/* Buttons - hidden on mobile */}
      <div className="hidden md:flex justify-between gap-6">
        <button className="py-3.5 px-10 bg-[var(--primary-dark)] text-white rounded-lg border border-transparent hover:bg-transparent hover:text-[var(--primary-dark)] hover:border-[var(--primary-dark)]">
          Log in
        </button>
        <button className="py-3.5 px-10 bg-[var(--primary-dark)] text-white rounded-lg border border-transparent hover:bg-transparent hover:text-[var(--primary-dark)] hover:border-[var(--primary-dark)]">
          Sign Up
        </button>
      </div>

      {/* Hamburger Icon (Mobile only) */}
      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md   flex flex-col items-start px-6 py-4 space-y-4 md:hidden z-50">
          <ul className="flex flex-col gap-4 w-full">
            <li className="hover:text-[var(--primary-dark)] font-medium">Home</li>
            <li className="hover:text-[var(--primary-dark)] font-medium">About</li>
            <li className="hover:text-[var(--primary-dark)] font-medium">Membership</li>
            <li className="hover:text-[var(--primary-dark)] font-medium">Privecy Policy</li>
            <li className="hover:text-[var(--primary-dark)] font-medium">FAQ</li>
            <li className="hover:text-[var(--primary-dark)] font-medium">Contact</li>
          </ul>
          <div className="flex flex-col gap-3 w-full">
            <button className="py-3.5 w-full bg-[var(--primary-dark)] text-white rounded-lg border border-transparent hover:bg-transparent hover:text-[var(--primary-dark)] hover:border-[var(--primary-dark)]">
              Log in
            </button>
            <button className="py-3.5 w-full bg-[var(--primary-dark)] text-white rounded-lg border border-transparent hover:bg-transparent hover:text-[var(--primary-dark)] hover:border-[var(--primary-dark)]">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}




// import Image from "next/image"
// import logo from "../../public/logo.png"

// export default function Navbar(){   
//         return(
//           <nav className="container flex justify-between items-center py-6">
//                   <div>
//                    <Image src={logo} alt="logo"/>
//                   </div>
//                   <ul className="flex gap-10">
//                     <li className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">Home</li>
//                     <li className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">About</li>
//                     <li className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">Membership</li>
//                     <li className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">Privecy Policy</li>
//                     <li className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">FAQ</li>
//                     <li className="hover:text-[var(--primary-dark)] cursor-pointer font-medium text-base">Contact</li>
//                   </ul>
//                   <div className=" flex justify-between gap-6">
//                     <button className=" py-3.5 px-10 bg-[var(--primary-dark)] text-white rounded-lg border border-transparent hover:bg-transparent  hover:text-[var(--primary-dark)] hover:border-[var(--primary-dark)]
//                     " >Log in</button>
//                    <button className=" py-3.5 px-10 bg-[var(--primary-dark)] text-white rounded-lg border border-transparent hover:bg-transparent  hover:text-[var(--primary-dark)] hover:border-[var(--primary-dark)]
//                     " >Sign Up</button>
//                   </div>
                    
//           </nav>
//         )
// }