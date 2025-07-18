"use client";

import React, { useState, useEffect } from "react";
import BreadCrump from "../../_components/reusable/BreadCrump"; // Assuming you have this component
import toast, { Toaster } from "react-hot-toast"; // Toast for notifications
import { useRouter } from "next/navigation"; // Next.js router for redirection

export default function ResetPasswordPage() {
  const [otp, setOtp] = useState<string>(""); // OTP state
  const [newPassword, setNewPassword] = useState<string>(""); // New password state
  const [isOtpFilled, setIsOtpFilled] = useState<boolean>(false); // Track OTP field fill status
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [userEmail, setUserEmail] = useState<string>(""); // User email state
  const router = useRouter();

  // Fetch the email of the logged-in user from localStorage (stored when forgot password is initiated)
  useEffect(() => {
    const storedEmail = localStorage.getItem("forgotEmail"); // Assuming you stored the email here
    if (storedEmail) {
      setUserEmail(storedEmail); // Set user email from localStorage
    }
  }, []);

  // Handle OTP input change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtp(value);
    setIsOtpFilled(value.length === 6); // Enable New Password field if OTP is 6 digits long
  };

  // Handle New Password input change
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      // Handle error: either OTP or new password is missing
      toast.error("Please fill in both OTP and New Password.");
      return;
    }

    try {
      setIsLoading(true);
      // toast.loading("Resetting password...");

      // Make API call for resetting the password
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
        method: "POST",
        body: JSON.stringify({
          email: userEmail, // Pass email from localStorage
          token: otp, // OTP entered by the user
          password: newPassword, // New password entered by the user
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Password reset successful!");

        // After successful password reset, remove email from localStorage
        localStorage.removeItem("forgotEmail");

        // Redirect to login page after success
        router.push("/login");
      } else {
        toast.error(data.message || "Failed to reset password.");
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
      <BreadCrump title="Reset Password" BreadCrump="Home > Reset Password" />
      <div className="max-w-[700px] mx-auto px-4 py-16">
        <h1 className="text-5xl font-semibold text-center mb-8">Reset Password</h1>
        <div className="border border-[#E9E9EA] rounded-2xl p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-base font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-color focus:border-transparent"
                value={otp}
                onChange={handleOtpChange}
                required
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-base font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-color focus:border-transparent"
                value={newPassword}
                onChange={handleNewPasswordChange}
                disabled={!isOtpFilled} // Disable until OTP is filled
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !isOtpFilled || !newPassword}
              className="w-full bg-primary-color text-white py-3 rounded-lg hover:bg-opacity-90 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
