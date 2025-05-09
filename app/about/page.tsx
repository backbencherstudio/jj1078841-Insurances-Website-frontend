import React from 'react'
import Image from 'next/image'
import aboutCoverImg from "../../public/about-cover.png"
import { RiArrowRightSLine } from "react-icons/ri";
 
import { Button } from "@/components/ui/button";
import aboutImg from "../../public/about.jpg";
import About from '../_components/sections/About';
import AboutSlider from '../_components/sections/AboutSlider';


export default function page() {
  return (
 <section className='  min-h-screen w-full'>
  
  <div className='relative'>
    {/* header section */}
  <div className='absolute z-10 inset-0 ' >
   <Image src={aboutCoverImg} alt='about-img' className='w-full h-[480px] object-cover hidden md:block'/>
  </div>

    {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00378f] to-[#00378f00] z-20 h-[280px] lg:h-[480px]" ></div>
      {/* main content */}
      <div className='relative z-30 flex flex-col justify-center items-start h-full w-full px-4 sm:px-6 md:px-16 max-w-screen-xl mx-auto py-24 sm:py-32'>
        <h1 className=' text-5xl font-semibold text-white'>About</h1>
        <p className=' text-lg text-white font-medium flex flex-row items-center gap-2 justify-center mt-3'>Home <RiArrowRightSLine className=' text-lg '/>about us</p>
      </div>
  </div>
       <div className='py-24'>
       <About/>
       </div>

 <AboutSlider/>
   
 </section>
  )
}
