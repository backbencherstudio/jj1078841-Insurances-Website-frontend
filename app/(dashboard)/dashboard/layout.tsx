"use client";
import React, { useState } from "react";
import Header from "./_components/header";
import Sidebar from "./_components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-disabled overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      <div className={`
        flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'md:ml-0' : 'md:ml-0'}
      `}>
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>

      {/* Overlay with fade effect */}
      <div 
        className={`
          fixed inset-0 bg-black transition-opacity duration-300 md:hidden
          ${isSidebarOpen ? 'opacity-50 z-30' : 'opacity-0 -z-10'}
        `}
        onClick={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}
