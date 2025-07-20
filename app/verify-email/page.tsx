'use client'

import { Suspense } from 'react'
import { UserService } from "@/service/user/user.service";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function EmailVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || !email) {
        setError('Invalid verification link - missing token or email');
        toast.error('Invalid verification link');
        router.push('/');
        return;
      }

      try {
        setLoading(true);
        const response = await UserService.verifyEmail({ token, email });
        
        if (!response.data) {
          throw new Error('No response data received');
        }

        if (response.data.success) {
          toast.success('Email verified successfully!');
          setIsSuccess(true);
          setTimeout(() => router.push('/login'), 3000);
        } else {
          throw new Error(response.data.message || 'Verification failed');
        }
      } catch (error: any) {
        console.error('Verification error:', error);
        const errorMessage = error.response?.data?.message || 
                           error.message || 
                           'Email verification failed';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, email, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Verifying your email...</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Email Verified!</h1>
        <p className="text-gray-600 mb-6">You'll be redirected to login shortly.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
      <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
      {error && <p className="text-gray-600 mb-4 max-w-md text-center">{error}</p>}
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/signup')}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Sign Up Again
        </button>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Loading verification...</p>
      </div>
    }>
      <EmailVerificationContent />
    </Suspense>
  )
}