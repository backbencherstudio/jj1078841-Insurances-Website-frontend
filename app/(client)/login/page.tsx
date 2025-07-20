"use client";

import React, { useState, useEffect } from "react";
import BreadCrump from "../../_components/reusable/BreadCrump";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast"; // Import Toaster for toast notifications
import { useRouter } from "next/navigation";
import { UserService } from "@/service/user/user.service";
import { CookieHelper } from "@/helper/cookie.helper"; // Import CookieHelper

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
 
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

console.log(  new Date().getMonth())

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true,
      }));
    }

    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/");  // Redirect if user is already logged in
    }
  }, [router]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w.%+-]+@[\w.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      toast.loading("Logging in...");

      // Step 1: Login to get token
      const res = await UserService.login({
        email: formData.email,
        password: formData.password,
      });

      toast.dismiss();

      const token = res?.data?.authorization?.token;

      if (!token) {
        // Check if error exists in response and properly extract the message string
        toast.error(res?.data?.message || "Login failed");  // Only success messages in toast
        return;
      }

      // Step 2: Save token
      localStorage.setItem("token", token);
      CookieHelper.set({ key: "token", value: token, expires: 30 * 24 * 60 * 60 });

      // Step 3: Call /api/auth/me to get fresh user data
      const meResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!meResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const user = await meResponse.json();

      // Step 4: Store user in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Step 5: Handle "Remember Me"
      if (formData.rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Step 6: Show success message in toast
      toast.success(res?.data?.message || "Login successful!");

      // Redirect to home page or any other page after successful login
      router.push("/");

    } catch (error: any) {
      toast.dismiss();
    
      console.log(error.response.data.message.message);
      
      // const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong!";
      // toast.error(errorMessage); // Display error message from catch block
      toast.error(error?.response?.data.message?.message)
    } finally {
      setIsLoading(false); // Reset loading state after completing the login attempt
    }
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <BreadCrump title="Log in" BreadCrump="Home > Login" />
      <div className="max-w-[700px] mx-auto px-4 py-16">
        <h1 className="text-5xl font-semibold text-center mb-8">Login</h1>
        <div className="border border-[#E9E9EA] rounded-2xl p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-primary-color focus:border-transparent`}
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>} {/* Display error below input */}
            </div>

            <div>
              <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••••"
                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-primary-color focus:border-transparent`}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>} {/* Display error below input */}
              
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-primary-color rounded border-gray-300"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link href="/forgot_password" className="text-sm text-primary-color hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-color text-white py-3 rounded-lg hover:bg-opacity-90 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signUp" className="text-primary-color hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
