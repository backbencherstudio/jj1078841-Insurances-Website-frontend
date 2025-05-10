import React from 'react'
 
import Hero from '../_components/home-sections/Hero'
import About from '../_components/home-sections/About'
import ChooseUs from '../_components/home-sections/ChooseUs'
import Info from '../_components/home-sections/Info'
import Service from '../_components/home-sections/Service'
import Membership from '../_components/home-sections/Membership'
import Insurance from '../_components/home-sections/Insurance'
import Contact from '../_components/home-sections/Contact'
import Investor from '../_components/home-sections/Investor'
 
import AboutSlider from '../_components/reusable/Testimonial'

export default function Home() {
  return (
    <>
    
     
    <Hero/>
    <About/>
    <ChooseUs/>
    <Info/>
    <Service/>
    <Membership/>
    <Insurance/>
    <Contact/>
    <AboutSlider/>
    <Investor/>
    
    </>
  )
}
