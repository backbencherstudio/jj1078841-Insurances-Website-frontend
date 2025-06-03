"use client";
import { useSendContactEmailMutation } from "@/src/redux/features/contact/contactApi";
import React from "react";
// import PhoneIcon from '@/public/Contact/PhoneIcon';
// import MessageIcon from '@/public/membershipIcons/MessageIcon';
// import ContactForm from '@/app/_components/reusable/ContactForm';
import { toast } from "sonner";
import { SiGooglemaps } from "react-icons/si";

import { MapPin } from "lucide-react";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  insurance: string;
}

export default function Contact() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    insurance: "",
  });

  const [sendEmail, { isLoading, isSuccess, error }] =
    useSendContactEmailMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendEmail(formData).unwrap();
      toast.success("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        insurance: "",
      });
      console.log("Message sent successfully!", formData);
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
      console.error("Failed to send message:", err);
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12 justify-between items-start">
        {/* Left Section */}
        <div className="flex-1">
          <p className="text-primary-color text-base">Contact Us</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-normal mt-2">
            We’re Here to Help— <br /> Reach Out Anytime
          </h2>
          <div className=" flex items-center   gap-3 ">
            <div>
              <SiGooglemaps
                className=" bg-primary-color text-white p-1.5 rounded-full"
                size={35}
              />
            </div>

            <div>
              <p className=" text-lg text-text-light mt-8">
                Office Address: 9375 East Shea Boulevard, <br /> Scottsdale,
                Arizona 85260, United States
              </p>
            </div>
          </div>

          {/* Optional Icon Row */}
          {/* <div className="flex gap-4 mt-6">
            <div className="bg-red-600 p-2 rounded-full">
              <PhoneIcon />
            </div>
            <div className="bg-red-600 p-2 rounded-full">
              <MessageIcon />
            </div>
          </div> */}
        </div>

        {/* Right Section: Form */}
        <div className="bg-primary-color p-6 sm:p-8 w-full max-w-xl rounded-2xl">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm mb-1 font-semibold text-white">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full p-3 rounded-md border border-[#E9E9EA] bg-transparent text-white placeholder-white"
                  required
                />
              </div>
              <div className="w-full">
                <label className="block text-sm mb-1 font-semibold text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full p-3 rounded-md border border-[#E9E9EA] bg-transparent text-white placeholder-white"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1 font-semibold text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 rounded-md border border-[#E9E9EA] bg-transparent text-white placeholder-white"
                required
              />
            </div>

            {/* Insurance Dropdown */}
            <div>
              <label className="block text-sm mb-1 font-semibold text-white">
                Insurance
              </label>
              <select
                name="insurance"
                value={formData.insurance}
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-[#E9E9EA] bg-transparent text-white"
                required
              >
                <option value="" disabled>
                  Select type of insurance
                </option>
                <option value="health">Health Insurance</option>
                <option value="car">Car Insurance</option>
                <option value="life">Life Insurance</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-[#14b7e2] font-semibold py-3 rounded-md hover:opacity-90 transition disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// import React from 'react'
// import PhoneIcon from '@/public/Contact/PhoneIcon'
// import MessageIcon from '@/public/membershipIcons/MessageIcon'

// export default function Contact() {
//   return (
//     <section className=" container mx-auto py-12">
//       <div className=' flex gap-[74px] justify-between  '>
//         <div>
//           <p className=" text-primary-color text-base">Contact Us</p>
//           <h2 className="  text-3xl sm:text-4xl lg:text-5xl font-semibold leading-normal">
//             We’re Here to Help— <br /> Reach Out Anytime
//           </h2>
//           {/* <div className=''>
//             <div className=" bg-red-600 inline-block">
//               <PhoneIcon />
//             </div>
//             <div className=" bg-red-600 inline-block">
//               <MessageIcon />
//             </div>
//           </div> */}
//         </div>
//         <div className=' bg-primary-color p-12  w-[682px] h-[469px] rounded-2xl'  >
//         <form className="space-y-5">
//         {/* Name Fields */}
//         <div className="flex gap-4">
//           <div className="w-1/2">
//             <label className="block text-sm mb-1 font-semibold text-white">Fast Name</label>
//             <input
//               type="text"
//               placeholder="Enter your fast name"
//               className="w-full p-2 rounded-md border border-[#E9E9EA] text-white"
//             />
//           </div>
//           <div className="w-1/2">
//             <label className="block text-sm mb-1 font-semibold text-white">Last Name</label>
//             <input
//               type="text"
//               placeholder="Enter your last name"
//               className="w-full p-2 rounded-md border border-[#E9E9EA] text-white"
//             />
//           </div>
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm mb-1 font-semibold text-white">Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full p-2 rounded-md border border-[#E9E9EA] text-white"
//           />
//         </div>

//         {/* Insurance Dropdown */}
//         <div>
//           <label className="block text-sm mb-1 font-semibold text-white">Insurance</label>
//           <select
//             className="w-full p-2 rounded-md border border-[#E9E9EA] text-white"
//             defaultValue=""
//           >
//             <option value="" disabled>
//               Select typeof insurance
//             </option>
//             <option value="health">Health Insurance</option>
//             <option value="car">Car Insurance</option>
//             <option value="life">Life Insurance</option>
//           </select>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-white text-[#14b7e2] font-semibold py-2 rounded-md hover:opacity-90 transition"
//         >
//           Send Message
//         </button>
//       </form>
//         </div>
//       </div>
//     </section>
//   );
// }
