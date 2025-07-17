import React from 'react'
import BreadCrump from '../../_components/reusable/BreadCrump'
import ContactForm from '../../_components/reusable/ContactForm'
import Map from '../../_components/Map'

//9375 East Shea Boulevard Scottsdale, Arizona 85260United States

export default function page() {
  return (
    <section className=' min-h-screen w-full'>
 
    <div>
        <BreadCrump title='Contact Us' BreadCrump="Home > Contact Us"/>
    </div>
    <ContactForm/>
    <Map/>
    </section>
  )
}
