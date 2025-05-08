'use client'
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import DocumentIcon from "@/public/services/DocumentIcon";
import HandIcon from '@/public/services/HandIcon';
import PageIcon from '@/public/services/PageIcon';
import ReviewIcon from '@/public/services/ReviewIcon';

export default function Service() {
  const paginationRef = useRef(null);

  const services = [
    {
      icon: <DocumentIcon />,
      title: "End-to-End Claim Management",
      details: "From filing to final settlement, we’ll handle your claim while you focus on what matters."
    },
    {
      icon: <HandIcon />,
      title: "Negotiation Experts",
      details: "We fight to ensure you receive the fair value for your property damage."
    },
    {
      icon: <ReviewIcon />,
      title: "Policy Reviews",
      details: "We simplify your policy, so you know exactly what’s covered."
    },
    {
      icon: <PageIcon />,
      title: "Professional Damage Documentation",
      details: "Thorough records to strengthen your claim and avoid disputes"
    },
    {
      icon: <PageIcon />,
      title: "Professional Damage Documentation",
      details: "Thorough records to strengthen your claim and avoid disputes"
    },
    {
      icon: <PageIcon />,
      title: "Professional Damage Documentation",
      details: "Thorough records to strengthen your claim and avoid disputes"
    },
    {
      icon: <PageIcon />,
      title: "Professional Damage Documentation",
      details: "Thorough records to strengthen your claim and avoid disputes"
    },
  ];

  return (
    <section className='bg-disabled py-24'>
      <div className='container mx-auto'>
        {/* section header */}
        <div className='text-center'>
          <p className='text-primary-color text-base'>Our Service</p>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-semibold leading-normal'>
            A Comprehensive Claim Handling <br /> for Every Step of Your Claim
          </h2>
        </div>

        {/* section main content slider */}
        <div className="w-full flex flex-col items-center my-14">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              0: { slidesPerView: 1 },          // phones
              640: { slidesPerView: 1.5 },      // small tablets
              768: { slidesPerView: 2 },        // tablets
              1024: { slidesPerView: 3 },       // small desktops
              1280: { slidesPerView: 4 },       // large desktops
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true,
            }}
            onSwiper={(swiper) => {
              if (swiper.params.pagination && typeof swiper.params.pagination !== 'boolean') {
                swiper.params.pagination.el = paginationRef.current;
                swiper.pagination.init();
                swiper.pagination.render();
                swiper.pagination.update();
              }
            }}
            className="w-full"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index}>
                <div className="bg-primary-color rounded-[8px] text-white p-5 min-h-[235px]">
                  <div className='bg-white inline-block p-3 rounded-lg'>
                    {service.icon}
                  </div>
                  <h4 className='text-base font-semibold mt-6 mb-3'>{service.title}</h4>
                  <p className='text-base'>{service.details}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Uncomment if you want pagination dots */}
          {/* <div ref={paginationRef} className="swiper-pagination mt-6" /> */}
        </div>
      </div>
    </section>
  );
}
