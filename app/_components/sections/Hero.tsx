import React from 'react';
import heroImg from "../../../public/hero.png";
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0 z-10">
        <Image
          src={heroImg}
          alt="hero-img"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00378f] to-[#00378f00] z-20" />

      {/* Hero Content */}
      <div className="relative z-30 flex flex-col justify-center items-start h-full w-full px-4 sm:px-6 md:px-16 max-w-screen-xl mx-auto py-24 sm:py-32">
        <h1 className="text-white font-bold leading-normal text-3xl md:text-5xl lg:text-7xl">
          Covered by public <br /> insurance adjusters
        </h1>

        <p className="text-white font-medium mt-6 md:mt-8 mb-6 md:mb-12 text-lg md:text-2xl lg:text-3xl">
          Doesn’t have to deal with her insurance company
        </p>

        <button className="py-3 px-6 md:py-4 md:px-10 bg-white rounded-lg text-[var(--primary-dark)] text-sm md:text-base">
          Become a Member
        </button>

        <p className="text-white font-normal mt-4 md:mt-5 text-base md:text-xl lg:text-2xl">
          Join a movement to reform insurance
        </p>
      </div>
    </section>
  );
}



// import React from 'react'
// import heroImg from "../../public/hero.png"
// import Image  from 'next/image'

// export default function Hero() {
//   return (
//    <section className=' relative   '>
   

//         <Image src={heroImg} alt='hero-img' className=' w-full h-full z-20'/>
//      <div className=' absolute  top-0 left-0 bg-gradient-to-r from-[#00378f] to-[#00378f00]   z-30 w-full h-full'>
//      </div>
      
//      <div className=' absolute top-40  left-44 z-40'>
//      <h1 className=' text-7xl font-bold text-white leading-normal '>Covered by public <br /> insurance adjusters</h1>
//         <p className=' text-3xl font-medium text-white mt-8 mb-12'>Doesn’t have to deal with her insurance company</p>
//         <button className=' py-5 px-10 bg-white rounded-lg text-[var(--primary-dark)]'>Become a Member</button>
//         <p className=' text-white text-2xl font-normal mt-5'>Join a movement to reform insurance</p>
//      </div>
//    </section>
//   )
// }
