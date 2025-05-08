import React from 'react'
import PhoneIcon from '@/public/Contact/PhoneIcon'
import MessageIcon from '@/public/membershipIcons/MessageIcon'

export default function Contact() {
  return (
    <section className=" container mx-auto">
      <div>
        <div>
          <p className=" text-primary-color text-base">Contact Us</p>
          <h2 className="  text-3xl sm:text-4xl lg:text-5xl font-semibold leading-normal">
            We’re Here to Help— <br /> Reach Out Anytime
          </h2>
          {/* <div className=''>
            <div className=" bg-red-600 inline-block">
              <PhoneIcon />
            </div>
            <div className=" bg-red-600 inline-block">
              <MessageIcon />
            </div>
          </div> */}
        </div>
        <div></div>
      </div>
    </section>
  );
}
