"use client";

import React, { useState } from "react";
import BreadCrump from "../../_components/reusable/BreadCrump"; // Assuming you have this component
import { Toaster } from "react-hot-toast"; // For toast notifications
import { useRouter } from "next/navigation"; // Next router for redirection
import toast from "react-hot-toast"; // Toast notifications for success/error messages
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string>(""); // Email state
  const [errors, setErrors] = useState<{ email?: string }>({}); // Email error state
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const router = useRouter(); // Next.js router

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) setErrors({ email: undefined }); // Clear error when user starts typing
  };

  // Validate email
  const validateEmail = (): boolean => {
    const newErrors: { email?: string } = {};

    // Check if email is provided
    if (!email) {
      newErrors.email = "Email is required";
    }
    // Check if email format is valid
    else if (!/^[\w.%+-]+@[\w.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail()) return; // Stop if validation fails

    try {
      setIsLoading(true);
      // toast.loading("Sending reset link...");

      // Make API call for forgot password (replace with actual API endpoint)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log(data.otp); // Console log to verify OTP

      if (response.ok) {
        toast.success(data.message || "Password reset link sent!");
        router.push(`/verify_otp?otp=${data.otp}&email=${email}`); // Pass OTP and email as URL params
      } else {
        toast.error(data.message || "Failed to send reset link.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <BreadCrump title="Forgot Password" BreadCrump="Home > Forgot Password" />
      <div className="max-w-[700px] mx-auto px-4 py-16">
        <h1 className="text-5xl font-semibold text-center mb-8">Forgot Password</h1>
        <div className="border border-[#E9E9EA] rounded-2xl p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">
                Enter Your Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-primary-color focus:border-transparent`}
                value={email}
                onChange={handleEmailChange}
                required
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>} {/* Display error below input */}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-color text-white py-3 rounded-lg hover:bg-opacity-90 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button> 

            <p className="text-center text-sm text-gray-600">
              Remembered your password?{" "}
              <Link href="/login" className="text-primary-color hover:underline">
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
