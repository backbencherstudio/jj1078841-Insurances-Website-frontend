import React from 'react'
import Image from 'next/image'
import About from '../_components/home-sections/About';
import AboutSlider from '../_components/reusable/Testimonial';
import BreadCrump from '../_components/reusable/BreadCrump';
import Team from '../_components/sections/Team';


export default function page() {
  return (
    <section className="  min-h-screen w-full">
       
     <BreadCrump title="About Us" BreadCrump="Home > About"/>
      <div  >
        <About />
      </div>

      <AboutSlider />
      <Team/>
    </section>
  );
}


 