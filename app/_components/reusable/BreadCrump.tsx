import React from 'react'
import Image from 'next/image'
import aboutCoverImg from "../../../public/about-cover.png"
import { RiArrowRightSLine } from "react-icons/ri";

interface BreadCrumpProps {
  title: string,
  BreadCrump: any
}

export default function BreadCrump({title, BreadCrump}: BreadCrumpProps) {
  return (
    <div className="relative w-full min-h-[200px] md:min-h-[480px]">
      {/* header section */}
      <div className="absolute z-10 inset-0">
        <Image
          src={aboutCoverImg}
          alt="about-img"
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00378f] to-[#00378f00] z-20"></div>

      {/* main content */}
      <div className="relative z-30 flex items-center h-full w-full max-w-screen-xl mx-auto py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-16">
        <div className="w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight">{title}</h1>
          <div className="text-base sm:text-lg text-white font-medium flex flex-row items-center gap-2 mt-3 sm:mt-4">
            {BreadCrump}
          </div>
        </div>
      </div>
    </div>
  )
}
