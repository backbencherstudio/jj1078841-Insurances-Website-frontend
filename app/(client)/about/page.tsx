import React from 'react'
import Image from 'next/image'
import About from '../../_components/reusable/About';
import BreadCrump from '../../_components/reusable/BreadCrump';
import Team from '../../_components/Team';
import Testimonial from '../../_components/reusable/Testimonial';


export default function page() {
  return (
    <section className="  min-h-screen w-full">
       
     <BreadCrump title="About Us" BreadCrump="Home > About"/>
      <div  >
        <About />
      </div>

      <Testimonial/>
      <Team/>
    </section>
  );
}


 