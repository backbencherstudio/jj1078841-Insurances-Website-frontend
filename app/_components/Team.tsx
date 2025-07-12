"use client"

import React from "react";
import { Card } from "@/components/ui/card";
import { Facebook, Instagram, Linkedin, Share2, Twitter } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import aboutTeam1 from "@/public/about-team1.png"
import aboutTeam2 from "@/public/about-team2.png"
import aboutTeam3 from "@/public/about-team3.png"
import aboutTeam4 from "@/public/about-team4.png"

const teamMembers = [
  {
    name: "Eleanor Pena",

    role: "Ceo Founder",

    image:aboutTeam1,
  },

  {
    name: "Leslie Alexander",

    role: "Ceo Founder",

    image:aboutTeam2,
  },

  {
    name: "Cameron Williamson",

    role: "Ceo Founder",

    image: aboutTeam3,
  },

  {
    name: "Guy Hawkins",

    role: "Ceo Founder",

    image: aboutTeam4,
  },
  {
    name: "John Smith",
    role: "Ceo Founder",
    image: aboutTeam1,
  },
  {
    name: "Sarah Johnson",
    role: "Ceo Founder",
    image: aboutTeam2,
  }
];

export default function Team() {
  return (
    <section className="container mx-auto py-16">
        {/* section header */}
        <div className="text-center mb-16">
          <p className="text-cyan-500 mb-4">Our Expert</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Creative Experience Team
          </h2>
        </div>
        
        {/* main content */}
    <div>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: '.team-pagination',
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
            slidesPerView: 4,
          },
        }}
        className="team-swiper"
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index}>
            <Card className="group relative overflow-hidden bg-white rounded-none p-0">
              <div className="relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="w-full"
                />

                {/* Social icons (hidden initially) */}
                <div className="absolute left-4 bottom-2 flex flex-col   opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-[-75%] transition-all duration-500 ease-out">
                  
                </div>

                {/* Name and role section */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#003A78] group-hover:bg-[#2EB0E4] p-4 text-white transition-colors duration-300   ">
                  <h3 className="text-2xl font-medium py-4 text-center">{member.name}</h3>
                 
                </div>
                <div className=" absolute right-0 bottom-24     bg-white px-5 py-2">
                  <p>{member.role}</p>
                </div>
                <div className=" absolute bottom-20 left-4">
               
                </div>
              </div>

            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Pagination */}
      <div className="team-pagination flex justify-center mt-8"></div>
        </div>
    </section>
  );
}
