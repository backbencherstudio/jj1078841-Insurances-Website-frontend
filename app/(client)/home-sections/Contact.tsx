
import React from 'react';
import PhoneIcon from '@/public/Contact/PhoneIcon';
import MessageIcon from '@/public/membershipIcons/MessageIcon';
import ContactForm from '@/app/_components/reusable/ContactForm';

export default function Contact() {
  return (
    <section className="container mx-auto px-4 py-12">
      
      <div className="flex flex-col lg:flex-row gap-12 justify-between items-start">
        {/* Left Section */}
        <div className="flex-1">
          <p className="text-primary-color text-base">Contact Us</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-normal mt-2">
            We’re Here to Help— <br /> Reach Out Anytime
          </h2>

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
          <form className="space-y-5">
            {/* Name Fields */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm mb-1 font-semibold text-white">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your fast name"
                  className="w-full p-3 rounded-md border border-[#E9E9EA] bg-transparent text-white placeholder-white"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm mb-1 font-semibold text-white">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full p-3 rounded-md border border-[#E9E9EA] bg-transparent text-white placeholder-white"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1 font-semibold text-white">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-md border border-[#E9E9EA] bg-transparent text-white placeholder-white"
              />
            </div>

            {/* Insurance Dropdown */}
            <div>
              <label className="block text-sm mb-1 font-semibold text-white">Insurance</label>
              <select
                className="w-full p-3 rounded-md border border-[#E9E9EA] bg-transparent text-white"
                defaultValue=""
              >
                <option value="" disabled>
                  Select typeof insurance
                </option>
                <option value="health">Health Insurance</option>
                <option value="car">Car Insurance</option>
                <option value="life">Life Insurance</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-white text-[#14b7e2] font-semibold py-3 rounded-md hover:opacity-90 transition"
            >
              Send Message
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
