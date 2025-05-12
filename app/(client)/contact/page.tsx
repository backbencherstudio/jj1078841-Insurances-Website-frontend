import React from 'react'
import BreadCrump from '../../_components/reusable/BreadCrump'
import ContactForm from '../../_components/reusable/ContactForm'
import Map from '../../_components/Map'

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
