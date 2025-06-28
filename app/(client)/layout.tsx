"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../_components/reusable/Navbar";
import Footer from "../_components/reusable/Footer";
import { useAppDispatch } from "@/src/redux/hooks";
import { setToken } from "@/src/redux/features/auth/authSlice";

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
    </div>
  );
}