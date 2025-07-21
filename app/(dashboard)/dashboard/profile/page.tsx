'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import nookies from 'nookies'
import { UserService } from '@/service/user/user.service';
import Image from 'next/image';
import defaultAvatar from "@/public/avatar.png";
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

type User = {
  address: string
  approved_at: string
  availability: string
  avatar: string
  avatar_url: string
  billing_id: string
  city: string
  country: string
  created_at: string
  date_of_birth: string
  deleted_at: string
  domain: string,
  email: string,
  email_verified_at: string
  first_name: string
  gender: string
  id: string
  is_two_factor_enabled: string
  last_name: string
  name: string
  password: string
  phone_number: string
  state: string
  status: string
  two_factor_secret: string
  type: string
  updated_at: string
  username: string
  zip_code: string
}


const MAX_FILE_SIZE = 1 * 1024 * 1024;


// Define form schema using Zod - no fields are required
const profileSchema = z.object({
  fullName: z.string().optional(),
  phoneNo: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
  dateOfBirth: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.password) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const PlusIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const [user, setUser] = useState<User>();
  const [isInitialized, setIsInitialized] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState<File | null>();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      phoneNo: '',
      country: '',
      city: '',
      address: '',
      email: '',
      dateOfBirth: '',
      state: '',
      zipCode: '',
      password: '',
      confirmPassword: ''
    }
  });


  useEffect(() => {
    const initializeAuth = async () => {
      const token = nookies.get(null).token
      if (token) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const data = await response.json()
            setUser(data.data)
          }
        } catch (error) {
          console.error('Failed to validate token', error)
        }
      }
      setLoading(false)
    }

    initializeAuth()
  }, [])


  // Initialize form with user data when available
  useEffect(() => {
    if (user) {
      setAvatarPreview(user.avatar_url || null);
      form.reset({
        fullName: user?.first_name || '',
        phoneNo: user.phone_number || '',
        country: user.country || '',
        city: user.city || '',
        address: user.address || '',
        email: user.email || '',
        dateOfBirth: user.date_of_birth?.split("T")[0] || '',
        state: user.state || '',
        zipCode: user.zip_code || '',
        password: '',
        confirmPassword: ''
      });
      setIsInitialized(true);
    }
  }, [user]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const fd = new FormData();

      // primitive fields
      if (data.fullName) fd.append('full_name', data.fullName);
      if (data.email) fd.append('email', data.email);
      if (data.phoneNo) fd.append('phone_number', data.phoneNo);
      if (data.dateOfBirth) fd.append('date_of_birth', data.dateOfBirth);
      if (data.country) fd.append('country', data.country);
      if (data.state) fd.append('state', data.state);
      if (data.city) fd.append('city', data.city);
      if (data.address) fd.append('address', data.address);
      if (data.zipCode) fd.append('zip_code', data.zipCode);
      if (data.password) fd.append('password', data.password);
      if (data.confirmPassword) fd.append('confirm_password', data.confirmPassword);

      // file part
      if (avatar) fd.append('avatar', avatar);

      await UserService.updateProfile(fd);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  if (!user) {
    return <div className="max-w-2xl mx-auto p-6">Loading user data...</div>;
  }


  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error('Only JPG, PNG, and WEBP formats are supported');
      e.target.value = ''; // Clear the input
      return;
    }

    // Validate file size (1MB limit)
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max 1MB allowed.`);
      e.target.value = ''; // Clear the input
      return;
    }

    // If validations pass
    setAvatar(file);
    const imageURL = URL.createObjectURL(file);
    setAvatarPreview(imageURL);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="relative mb-6 w-fit">
            <Image
              src={avatarPreview || defaultAvatar}
              alt="Profile"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full object-cover border-2 border-slate-200"
            />
            <label className="absolute bottom-1 right-1 bg-sky-500 hover:bg-sky-600 text-white rounded-full p-1.5 shadow-md cursor-pointer">
              <PlusIcon className="w-4 h-4" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={(e) => handleAvatarChange(e)}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                {...form.register('fullName')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phoneNo"
                {...form.register('phoneNo')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                id="country"
                {...form.register('country')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter country"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                id="city"
                {...form.register('city')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                id="address"
                {...form.register('address')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter address"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...form.register('email')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.email.message}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                type="date"
                {...form.register('dateOfBirth')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                id="state"
                {...form.register('state')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter state"
              />
            </div>

            {/* Zip Code */}
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code
              </label>
              <input
                id="zipCode"
                {...form.register('zipCode')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter zip code"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                id="password"
                type="password"
                {...form.register('password')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Leave blank to keep current"
              />
              {form.formState.errors.password && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...form.register('confirmPassword')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
              />
              {form.formState.errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}