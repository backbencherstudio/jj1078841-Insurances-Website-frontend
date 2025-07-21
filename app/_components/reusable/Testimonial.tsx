"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image, { StaticImageData } from "next/image";
import aboutQoute from "../../../public/about-qoute.png";
import carlosd from "@/public/carlosD.png"
import tiffanyl from "@/public/tiffanyL.png"
import sarahm from "@/public/sarahM.png"
import davidr from "@/public/davidReynolds.png"
import jeromek from "@/public/jeromeK.png"
import review from "@/public/review.png"
import { FaStar } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  id: number;
  name: string;
  // role: string;
  image: StaticImageData;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carlos D.",
    // role: "Insurance Broker",
    image: carlosd,

    content:
      "My insurance company gave me the runaround for months. The moment Insurance Ally stpped in, everything changed. I had a fair settlement in just a month.",
  },
  {
    id: 2,
    name: "Tiffany L.",
    // role: "Insurance Broker",
    image: tiffanyl,
    content:
      "They trated me like family, not just another claim. Walked me through every step, answered all my questions, and got my roof fully covered. Zero stress. ",
  },
  {
    id: 3,
    name: "Sarah M.",
    // role: "Insurance Broker",
    image: sarahm,
    content:
      "It took less then 30 minutes to get my claim reviewed and assigned to a rep. They explained everything so clearly, I actually understood my policy for the first time.",
  },
  {
    id: 4,
    name: "Jerome K.",
    // role: "Insurance Broker",
    image: jeromek,
    content:
      "They helped me fight back against an underpaid roof claim. Within weeks, I had a new check in hand and repairs underway. These guys know insurance inside and out.",
  },
  {
    id: 5,
    name: "David Reynolds",
    // role: "Insurance Broker",
    image: davidr,
    content:
      "Super responsive, professional, and on my side from day one. Insurance Ally got me more than double the original estimate. I didn't even know I had options until they showed me.",
  },

];

export default function Testimonial() {
  return (
    <section className="  bg-disabled  relative z-30 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-cyan-500 mb-4">From customers</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            See the Difference We've Made
          </h2>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active bg-cyan-500",

          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper pt-9"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="relative overflow-hidden h-full">
                <div className=" absolute  z-50  left-0 top-0">
                  <Image src={aboutQoute} alt="qoute" />
                </div>
                <div className="bg-white p-8 rounded-lg h-[200px]">
                  <div className="mb-6">
                    {" "}
                    {/* <span className="text-cyan-500 text-6xl">"</span> */}
                    <p className="text-gray-600 mt-2">{testimonial.content}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4  p-7">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    {/* <p className="text-gray-500 text-sm">{testimonial.role}</p> */}
                    <div className="flex gap-[2px] text-yellow-300">
                      {
                        [1, 2, 3, 4, 5].map(star => (
                          <FaStar />
                        ))
                      }
                    </div>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
