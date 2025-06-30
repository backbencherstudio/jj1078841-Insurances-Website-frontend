"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../_components/reusable/Navbar";
import Footer from "../_components/reusable/Footer";
import { useAppDispatch } from "@/src/redux/hooks";
import { setToken } from "@/src/redux/features/auth/authSlice";
import toast, { Toaster } from "react-hot-toast";  // Import Toaster for toast notifications

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [hydrated, setHydrated] = useState(false); // to prevent mismatch

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(setToken(token));
    }
    setHydrated(true);
  }, [dispatch]);

  if (!hydrated) return null; // or loading spinner

  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
            {/* Toast Notification Container */}
            <Toaster position="top-right" />   
    </div>
  );
}