import React from 'react'
import SettingsIcon from '@/public/insurance/SettingsIcon'
import Hand from '@/public/insurance/Hand'
import Like from '@/public/insurance/Like'

export default function Insurance() {
  const items = [
    {
      icon: <SettingsIcon />,
      title: "Why Join Us",
      details: "Offer your clients seamless claims assistance and earn their trust."
    },
    {
      icon: <Hand />,
      title: "Exclusive Broker Benefits",
      details: "Tools and resources to help you build lasting client relationships."
    },
    {
      icon: <Like />,
      title: "Referral Rewards",
      details: "Get rewarded for connecting clients with the expert support they need."
    }
  ]

  return (
    <section className='bg-disabled py-24'>
      <div className='container mx-auto px-4'>
        {/* section header */}
        <div className='text-center mb-14'>
          <p className='text-primary-color text-base'>For Insurance Brokers</p>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-semibold leading-normal'>
            Partner with Us to Better Serve <br /> Your Clients
          </h2>
        </div>

        {/* section cards */}
        <div className='flex flex-col lg:flex-row justify-center items-center gap-6'>
          {items.map((item, index) => (
            <div key={index} className='bg-white p-5 rounded-lg w-full sm:w-[80%] lg:w-auto'>
              <div className='bg-primary-color inline-block p-3 rounded-lg'>
                {item.icon}
              </div>
              <h3 className='mt-6 mb-3 text-base font-semibold text-[#1D1F2C]'>{item.title}</h3>
              <p className='text-base font-normal text-text-light'>{item.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
