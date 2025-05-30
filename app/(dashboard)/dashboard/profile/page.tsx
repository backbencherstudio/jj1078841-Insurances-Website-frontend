"use client";
import React from 'react';


// Icons (simple SVGs for demonstration)
const PlusIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5M12 12.75h.008v.008H12v-.008z" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// const EyeSlashIcon = ({ className }: { className?: string }) => ( ... ); // Add if needed for toggle

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  isSelect?: boolean;
  options?: string[];
  icon?: React.ReactNode;
  containerClassName?: string;
}



const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type = 'text',
  placeholder,
  defaultValue,
  isSelect = false,
  options = [],
  icon,
  containerClassName = '',
}) => {
  // const { data: user, error, isLoading } = useGetLoggedInUserQuery();
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error fetching user data</p>;
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="block text-xs font-medium text-slate-600 mb-1">
        {label}
      </label>
      <div className="relative">
        {isSelect ? (
          <>
            <select
              id={id}
              name={id}
              defaultValue={defaultValue}
              className="w-full appearance-none bg-white border border-slate-300 rounded-md px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
            >
              {placeholder && <option value="" disabled>{placeholder}</option>}
              {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </>
        ) : (
          <input
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className="w-full bg-white border border-slate-300 rounded-md px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
          />
        )}
        {icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};


export default function ProfilePage() {
  // State for password visibility can be added here
  // const [showPassword, setShowPassword] = React.useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          Profile
        </h1>

        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <div className="flex flex-col items-center sm:items-start mb-8">
            <div className="relative mb-2">
              <img
                src="https://via.placeholder.com/100/E0E7FF/4F46E5?text=User" // Replace with actual image or placeholder component
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-slate-200"
              />
              <button
                type="button"
                className="absolute -bottom-1 -right-1 bg-sky-500 hover:bg-sky-600 text-white rounded-full p-1.5 shadow-md"
                aria-label="Change profile picture"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <form action="#" method="POST">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <FormField label="Full Name" id="full_name" defaultValue="Jacob Jones" />
              <FormField label="Email" id="email" type="email" defaultValue="info@insurancesally.com" />
              <FormField label="Phone No" id="phone_no" defaultValue="+012 3456 789" />
              <FormField
                label="Date of Birth"
                id="date_of_birth"
                defaultValue="02 February 1997"
                icon={<CalendarIcon className="w-4 h-4 text-slate-400" />}
              />
              <FormField
                label="Country"
                id="country"
                isSelect
                defaultValue="USA"
                options={['USA', 'Canada', 'UK']}
              />
              <FormField
                label="State"
                id="state"
                isSelect
                defaultValue="New York"
                options={['New York', 'California', 'Texas']}
              />
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-6 mt-6 md:grid-cols-5">
              <FormField
                label="City"
                id="city"
                isSelect
                defaultValue="New York"
                options={['New York City', 'Los Angeles', 'Chicago']}
                containerClassName="md:col-span-1"
              />
              <FormField
                label="Address"
                id="address"
                defaultValue="4140 Parker Rd. Allentown, New Mexico"
                containerClassName="md:col-span-3"
              />
              <FormField
                label="Zip Code"
                id="zip_code"
                defaultValue="1234"
                containerClassName="md:col-span-1"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 mt-6 sm:grid-cols-2">
              <FormField
                label="Password"
                id="password"
                type="password" // Change to 'text' when showPassword is true
                defaultValue="**********"
                icon={
                  <button type="button" /* onClick={() => setShowPassword(!showPassword)} */ className="focus:outline-none p-1">
                    <EyeIcon className="w-4 h-4 text-slate-400 hover:text-slate-500" />
                    {/* {showPassword ? <EyeSlashIcon /> : <EyeIcon />} */}
                  </button>
                }
              />
              <FormField
                label="Confirm Password"
                id="confirm_password"
                type="password" // Change to 'text' when showConfirmPassword is true
                defaultValue="**********"
                icon={
                  <button type="button" /* onClick={() => setShowConfirmPassword(!showConfirmPassword)} */ className="focus:outline-none p-1">
                     <EyeIcon className="w-4 h-4 text-slate-400 hover:text-slate-500" />
                    {/* {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />} */}
                  </button>
                }
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="px-6 py-2.5 bg-sky-500 text-white text-sm font-medium rounded-md shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
