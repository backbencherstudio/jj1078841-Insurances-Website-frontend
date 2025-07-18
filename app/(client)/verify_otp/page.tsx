"use client";

import React, { useState, useEffect } from "react";
import BreadCrump from "../../_components/reusable/BreadCrump";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OTPVerification() {
    const [otp, setOtp] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState<number>(59);
    const router = useRouter();

    useEffect(() => {
        const storedEmail = localStorage.getItem("forgotEmail");
        if (storedEmail) {
            setUserEmail(storedEmail);
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 6) {
            setOtp(value);
        }
    };

    const handleResendOtp = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-otp`, {
                method: "POST",
                body: JSON.stringify({ email: userEmail }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to resend OTP");
            }

            toast.success("OTP resent successfully!");
            setTimeLeft(59);
            setOtp("");
        } catch (error: any) {
            toast.error(error.message || "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast.error("Please enter a 6-digit OTP");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`, {
                method: "POST",
                body: JSON.stringify({
                    email: userEmail,
                    token: otp
                }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();

            if (response.ok) {
                throw new Error(data.message || "Invalid OTP");
            }

            toast.success("OTP verified successfully!");
            localStorage.removeItem("forgotEmail");
            router.push("/login");
        } catch (error: any) {
            let errorMessage = "Incorrect OTP";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <Toaster position="top-right" />
            <BreadCrump title="Verify OTP" BreadCrump="Home > Verify OTP" />
            <div className="max-w-[700px] mx-auto px-4 py-16">
                <h1 className="text-5xl font-semibold text-center mb-8">Verify OTP</h1>
                <div className="border border-[#E9E9EA] rounded-2xl p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="otp" className="block text-base font-medium text-gray-700 mb-1">
                                Enter 6-digit OTP sent to {userEmail}
                            </label>

                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                id="otp"
                                placeholder="Enter 6-digit OTP"
                                maxLength={6}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none"
                                value={otp}
                                onChange={handleOtpChange}
                                required
                            />

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-gray-600">
                                    {timeLeft > 0 ? `(00:${timeLeft.toString().padStart(2, '0')})` : '(00:00)'}
                                    <button
                                        type="button"
                                        onClick={handleResendOtp}
                                        disabled={timeLeft > 0 || isLoading}
                                        className={`ml-2 ${timeLeft > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-primary-color hover:underline'}`}
                                    >
                                        Resend OTP
                                    </button>
                                </span>
                                {/* <a href="#" className="text-primary-color hover:underline">Didn't receive code?</a> */}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || otp.length !== 6}
                            className="w-full bg-primary-color text-white py-3 rounded-lg hover:bg-opacity-90 transition-all cursor-pointer disabled:opacity-50"
                        >
                            {isLoading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}