"use client";

import React, { useEffect, useState } from "react";
import BreadCrump from "../../_components/reusable/BreadCrump";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useSigninUserMutation } from "@/src/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setToken } from "@/src/redux/features/auth/authSlice";

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
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signinUser, { isLoading }] = useSigninUserMutation();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token, router]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
      toast.error("Email is required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address";
      toast.error("Invalid email address");
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      toast.error("Password is required");
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      toast.error("Password must be at least 8 characters");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   try {
  //     toast.loading("Logging in...");

  //     const response = await signinUser({
  //       email: formData.email,
  //       password: formData.password,
  //     }).unwrap();

 

  //     const token = response?.authorization?.token;

  //     if (token) {
  //       localStorage.setItem("accessToken", token);
  //       document.cookie = `accessToken=${token}; path=/; secure; samesite=strict`;
  //       dispatch(setToken(token));

  //       if (formData.rememberMe) {
  //         localStorage.setItem("rememberedEmail", formData.email);
  //       } else {
  //         localStorage.removeItem("rememberedEmail");
  //       }

  //       toast.success("Login successful!");
  //       router.push("/");
  //     } else {
  //       // throw new Error("No token received");
  //       toast.error( response?.message || "Login failed");
  //     }

  //     setFormData({ email: "", password: "", rememberMe: false });
  //     setErrors({});
  //   } catch (error: any) {
  //     // toast.dismiss();
  //     const errorMessage = error?.data?.message || "Login failed";
  //     toast.error(errorMessage);
  //     setErrors({
  //       ...errors,
  //       password: "Invalid email or password",
  //     });
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      // toast.loading("Logging in...");
  
      const response = await signinUser({
        email: formData.email,
        password: formData.password,
      }).unwrap();
  
      // toast.dismiss();
  
      const token = response?.authorization?.token;
  
      if (token) {
        localStorage.setItem("accessToken", token);
        document.cookie = `accessToken=${token}; path=/; secure; samesite=strict`;
        dispatch(setToken(token));
  
        if (formData.rememberMe) {
          localStorage.setItem("rememberedEmail", formData.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
  
        toast.success(response?.message );
        router.push("/");
      } else {
        // const msg = typeof response?.message === "string" ? response.message : "Login failed";
        toast.error( response?.message );
      }
  
      setFormData({ email: "", password: "", rememberMe: false });
      setErrors({});
    } catch (error: any) {
      toast.error( error?.message);
      // toast.dismiss();
  
      // let errorMessage = "Login failed";
      // if (typeof error?.data?.message === "string") {
      //   errorMessage = error.data.message;
      // } else if (typeof error?.message === "string") {
      //   errorMessage = error.message;
      // }
  
      // toast.error(errorMessage);
      // setErrors({
      //   ...errors,
      //   password: "Invalid email or password",
      // });
    }
  };
  

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail, rememberMe: true }));
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <BreadCrump title="Log in" BreadCrump="Home > Login" />
      <div className="max-w-[700px] mx-auto px-4 py-16">
        <h1 className="text-5xl font-semibold text-center mb-8">Login</h1>
        <div className="border border-[#E9E9EA] rounded-2xl p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">Email</label>
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
            </div>

            <div>
              <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">Password</label>
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
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
              </div>
              <Link href="/forgot-password" className="text-sm text-primary-color hover:underline">
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
              <Link href="/signup" className="text-primary-color hover:underline">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
