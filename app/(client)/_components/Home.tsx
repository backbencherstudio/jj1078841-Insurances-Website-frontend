import React from 'react'
 
import Hero from '../home-sections/Hero'
import About from '../../_components/reusable/About'
import ChooseUs from '../home-sections/ChooseUs'
import Info from '../home-sections/Info'
import Service from '../home-sections/Service'
import Membership from '../home-sections/Membership'
import Insurance from '../home-sections/Insurance'
import Contact from '../home-sections/Contact'
import Investor from '../home-sections/Investor'
 
import AboutSlider from '../../_components/reusable/Testimonial'

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
