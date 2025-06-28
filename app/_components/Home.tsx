import React from 'react'
// import Navbar from './sections/Navbar'
import Hero from '../(client)/home-sections/Hero'
 
import ChooseUs from '../(client)/home-sections/ChooseUs'
import Info from '../(client)/home-sections/Info'
import Service from '../(client)/home-sections/Service'
import Membership from '../(client)/home-sections/Membership'
import Insurance from '../(client)/home-sections/Insurance'
import Contact from './sections/Contact'
import Investor from '../(client)/home-sections/Investor'
import Footer from '../_components/reusable/Footer'
import Navbar from './reusable/Navbar'
import About from './reusable/About'

export default function Home() {
  return (
    <>
    
     <Navbar/>
    <Hero/>
    {/* <About/> */}
    <About/>
    <ChooseUs/>
    <Info/>
    <Service/>
    <Membership/>
    <Insurance/>
    {/* <Contact/> */}
    <Investor/>
    <Footer/>
    </>
  )
}
