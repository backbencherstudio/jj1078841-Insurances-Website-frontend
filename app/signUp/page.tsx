"use client"

import React, { useState } from 'react'
import BreadCrump from '../_components/reusable/BreadCrump'
import Link from 'next/link'

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
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    rememberMe: false,
    agreeToTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className='min-h-screen'>
      <BreadCrump title="Sign Up" BreadCrump="Home > Sign Up"/>
      
      <div className="max-w-[700px] mx-auto px-4 py-16">
        <h1 className="text-5xl font-semibold text-center mb-8">Create account</h1>
        <div className='border border-[#E9E9EA] rounded-2xl p-10'>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-base font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter your fast name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-color focus:border-transparent"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-base font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-color focus:border-transparent"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-color focus:border-transparent"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-color focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-color focus:border-transparent"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-primary-color rounded border-gray-300"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-primary-color hover:underline">
                Forgot Password?
              </Link>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-primary-color rounded border-gray-300"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to all the{' '}
                <Link href="/terms" className="text-primary-color hover:underline">Terms</Link>
                {' '}and{' '}
                <Link href="/privacy-policy" className="text-primary-color hover:underline">Privacy policy</Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-color text-white py-3 rounded-lg hover:bg-opacity-90 transition-all cursor-pointer"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/login" className="text-primary-color hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
