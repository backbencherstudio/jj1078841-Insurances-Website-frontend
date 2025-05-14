 
import React from "react";
import Navbar from "../_components/reusable/Navbar";
import Footer from "../_components/reusable/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    console.log("client");
    
  return (
    <div>
      <Navbar />
 
        
      <div  >
        {children}
        </div>
        
        <Footer/>
    </div>
  );
}
