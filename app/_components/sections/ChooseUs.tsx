
import React from 'react';
import Headphone from "../../../public/choose-us/Headphone";
import Document from "../../../public/choose-us/Documents";
import Like from "../../../public/choose-us/Like";
import Customer from "../../../public/choose-us/Customer";

export default function ChooseUs() {

 

  return (
    <section className="bg-[#F8FAFB] px-4 sm:px-6 md:px-12 py-16 md:py-24 mb-24">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-8 items-start">
        {/* Left Content */}
        <div className="md:w-1/2">
          <p className="text-[var(--primary-color)] text-sm sm:text-base font-medium mb-1">Why Choose Us</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--gray-black-500)] leading-snug lg:leading-normal">
            Why Homeowners Trust InsuranceSally
          </h2>
          <p className="text-[var(--gray-black-400)] text-base sm:text-lg font-normal mb-10">
            We’re more than a claims service—we’re your dedicated partner
            through the entire process.
          </p>
        </div>

        {/* Right Content */}
        <div className="flex flex-col sm:flex-row md:w-1/2">
          {/* Left Group */}
          <div className="sm:pr-6 md:pr-12 sm:border-r md:border-r border-[var(--primary-color)]  mt-16 ">
            <div className="border-b border-[var(--primary-color)] py-5">
              <Headphone />
              <h4 className="text-base font-semibold mt-6 mb-3">
                Consultation on Any Property Claim   (Limited to Car Claims)
              </h4>
              <p className="text-base font-normal text-[var(--gray-black-400)]">
                Get expert advice on property  
                claims, including limited consultation for car claims, to ensure the best outcomes.
              </p>
            </div>
            <div className="py-5">
              <Document />
              <h4 className="text-base font-semibold mt-6 mb-3">
                Request and Review of Property Damage Documents
              </h4>
              <p className="text-base font-normal text-text-light">
                Strengthen your claims with a comprehensive evaluation of your damage documentation.
              </p>
            </div>
          </div>

          {/* Right Group */}
          <div className="sm:pl-6 md:pl-12   ">
            <div className="border-b border-[var(--primary-color)] py-5">
              <Like />
              <h4 className="text-base font-semibold mt-6 mb-3">Request for a Policy Review</h4>
              <p className="text-base font-normal text-text-light">
                Gain a clear understanding of your coverage with a thorough analysis of your policy by our experts.
              </p>
            </div>
            <div className="py-5">
              <Customer />
              <h4 className="text-base font-semibold mt-6 mb-3">24/7/365 Emergency Access</h4>
              <p className="text-base font-normal text-text-light">
                Access immediate and reliable support whenever you need it, any time of the day or year.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// import React from 'react'
// import Headphone from "../../../public/choose-us/Headphone"
// import Document from "../../../public/choose-us/Documents"
// import Like from "../../../public/choose-us/Like"
// import Customer from "../../../public/choose-us/Customer"

// export default function ChooseUs() {
//   return (
//     <section className="  bg-[#F8FAFB] p-12 mb-24 py-24">
//       <div className='container flex justify-between gap-8
//       '>
//         <div>
//           <p className=' text-[var(--primary-color)] text-sm sm:text-base font-medium mb-1'>Why Choose Us </p>
//           <h2 className=' "text-3xl sm:text-4xl lg:text-5xl font-semibold text-[var(--gray-black-500)] leading-snug lg:leading-normal  '>Why Homeowners Trust InsuranceSally</h2>
//           <p className='  text-[var(--gray-black-400)] text-base sm:text-lg font-normal mb-10'>
//             We’re more than a claims service—we’re your dedicated partner
//             through the entire process.
//           </p>
//         </div>
//         <div className=' flex'>
//           <div className=' pr-12 border-r border-primary-color mt-16'>
//             <div className=' border-b border-primary-color py-5'>
// <Headphone/>
//               <h4 className='text-base font-semibold mt-6 mb-3'>Consultation on Any Property Claim <br /> (Limited to Car Claims)</h4>
//               <p className=' text-base font-normal text-[var(--gray-black-400)] '>Get expert advice on property <br />claims, including limited consultation for car claims, to ensure the best outcomes.</p>
//             </div>
//             <div className=' py-5'>
//               <Document/>
//               <h4 className=' text-base font-semibold mt-6 mb-3'>Request and Review of Property Damage Documents</h4>
//               <p className='  text-base font-normal text-text-light '>Strengthen your claims with a comprehensive evaluation of your damage documentation.</p>
//             </div>
             
//           </div>
//           <div className=' pl-12'>
//             <div className=' border-b border-primary-color py-5'>
//               <Like/>
//               <h4 className='text-base font-semibold mt-6 mb-3'>Request for a Policy Review</h4>
//               <p className='  text-base font-normal text-text-light'>Gain a clear understanding of your coverage with a thorough analysis of your policy by our experts.</p>
//             </div>
//             <div className=' py-5'>
//               <Customer/>
//               <h4 className='text-base font-semibold mt-6 mb-3'>24/7/365 Emergency Access</h4>
//               <p className='  text-base font-normal text-text-light'>Access immediate and reliable support whenever you need it, any time of the day or year.</p>
//             </div>
//           </div>
           
//         </div>
//       </div>
//     </section>
//   );
// }
