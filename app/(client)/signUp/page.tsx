"use client";

import React, { useState } from "react";
import BreadCrump from "../../_components/reusable/BreadCrump";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserService } from "@/service/user/user.service";

interface SignupFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  rememberMe: boolean;
  agreeToTerms: boolean;
}

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    rememberMe: false,
    agreeToTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    agreeToTerms: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      agreeToTerms: "",
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      toast.error("First name is required");
      hasError = true;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      toast.error("Last name is required");
      hasError = true;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      toast.error("Phone number is required");
      hasError = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Valid email required";
      toast.error("Valid email required");
      hasError = true;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      toast.error("Password is required");
      hasError = true;
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Please accept the Terms and Conditions";
      toast.error("Please accept the Terms and Conditions");
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const userData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_number: formData.phone,
      email: formData.email,
      password: formData.password,
    };

    try {
      setIsLoading(true);
      toast.loading("Signing you up...");

      const response = await UserService.register(userData);
      const data = response?.data;
      console.log("Signup Response:", data);

      toast.dismiss();

      if (data?.success) {
        toast.success(data.message || "Signup successful!");
        localStorage.setItem("email", formData.email);
        router.push("/login");
      } else {
        toast.error(data?.message || "Signup failed");
      }
    } catch (error: any) {
      toast.dismiss();
      const errorMessage = error?.data?.message || "Something went wrong";
      toast.error(`Signup failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <BreadCrump title="Sign Up" BreadCrump="Home > Sign Up" />
      <div className="max-w-[700px] mx-auto px-4 py-16">
        <h1 className="text-5xl font-semibold text-center mb-8">Create account</h1>
        <div className="border border-[#E9E9EA] rounded-2xl p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-base font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" name="firstName" id="firstName" placeholder="Enter your first name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-color focus:border-transparent" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-base font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" name="lastName" id="lastName" placeholder="Enter your last name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-color focus:border-transparent" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" name="phone" id="phone" placeholder="Enter your number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-color focus:border-transparent" value={formData.phone} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" id="email" placeholder="Enter your email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-color focus:border-transparent" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••••" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-color focus:border-transparent" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" name="rememberMe" id="remember" className="h-4 w-4 text-primary-color rounded border-gray-300" checked={formData.rememberMe} onChange={handleChange} />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
              </div>
              <Link href="/forgot-password" className="text-sm text-primary-color hover:underline">Forgot Password?</Link>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="agreeToTerms" id="terms" className="h-4 w-4 text-primary-color rounded border-gray-300" checked={formData.agreeToTerms} onChange={handleChange} />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to all the <Link href="/terms" className="text-primary-color hover:underline">Terms</Link> and <Link href="/privacy-policy" className="text-primary-color hover:underline">Privacy policy</Link>
              </label>
            </div>
            <button disabled={isLoading} type="submit" className="w-full bg-primary-color text-white py-3 rounded-lg hover:bg-opacity-90 transition-all cursor-pointer">
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <div className=" flex justify-center mt-5">

          <Link href='/login'  >Don’t have an account? <span className=" text-primary-color hover:underline">Login</span> </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
