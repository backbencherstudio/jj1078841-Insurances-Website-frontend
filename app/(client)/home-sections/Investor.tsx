import React from 'react'
import SettingsIcon from '@/public/insurance/SettingsIcon'
import Hand from '@/public/insurance/Hand'
import Like from '@/public/insurance/Like'
import CustomCard from '../../_components/reusable/CustomCard'

export default function Investor() {
  const items = [
    {
      icon: SettingsIcon,
      title: "Why Partner with Us",
      details: "Capitalize on a Growing Industry"
    },
    {
      icon: Hand,
      title: "Strategic Investment Advantage",
      details: "Expanding partner network "
    },
    {
      icon: Like,
      title: "Investor Inccentives",
      details: "Early access to Emerging Markets"
    }
  ]

  return (
    <section className=' py-24'>
      <div className='container mx-auto px-4'>
        {/* section header */}
        <div className='text-center mb-14'>
          <p className='text-primary-color text-base'>Investor Relation</p>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-semibold leading-normal'>
          Invest in a Smarter,Scalable <br /> Claims Solution
          </h2>
        </div>

        {/* section cards */}
        <div className='flex flex-col lg:flex-row justify-center items-center gap-6'>
          {items.map((item, index) => (
            <CustomCard key={index} bgColor2="bg-primary-color" title={item.title} Component={item.icon} description={item.details} bgColor='bg-primary-color' textColor="text-white"/>
            // <div key={index} className='bg-primary-color p-5 rounded-lg w-full sm:w-[80%] lg:w-auto'>
            //   <div className='bg-primary-color inline-block p-3 rounded-lg'>
            //     {item.icon}
            //   </div>
            //   <h3 className='mt-6 mb-3 text-base font-semibold text-white'>{item.title}</h3>
            //   <p className='text-base font-normal text-white'>{item.details}</p>
            // </div>
          ))}
        </div>
      </div>
    </section>
  )
}
