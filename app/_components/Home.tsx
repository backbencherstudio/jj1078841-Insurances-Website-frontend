import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import ChooseUs from './sections/ChooseUs'
import Info from './sections/Info'
import Service from './sections/Service'
import Membership from './sections/Membership'
import Insurance from './sections/Insurance'
import Contact from './sections/Contact'
import Investor from './sections/Investor'
 
import AboutSlider from './sections/AboutSlider'

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
