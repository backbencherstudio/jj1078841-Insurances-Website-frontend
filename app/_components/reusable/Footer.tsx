import React from 'react'
import Image from 'next/image'
import logo from "@/public/logo.png"
import Link from 'next/link'
import Mail from "../../../public/footerIcons/Mail"
import Phone from '@/public/footerIcons/Phone'

export default function Footer() {
  return (
    <section className="bg-disabled pt-16 pb-6 px-3">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-start justify-between border-b border-[#D2D2D5] py-10">
        <div>
          <Image src={logo} alt="logo" />
          <p className="text-base text-text-light font-normal mt-5">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-gray-bold text-lg font-semibold">Quick link</h3>
          <Link href="#" className="text-text-light text-base">Home</Link>
          <Link href="#" className="text-text-light text-base">About</Link>
          <Link href="#" className="text-text-light text-base">Membership</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-gray-bold text-lg font-semibold">Support</h3>
          <Link href="#" className="text-text-light text-base">Contact</Link>
          <Link href="#" className="text-text-light text-base">Privecy Policy</Link>
          <Link href="#" className="text-text-light text-base">FAQs</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-gray-bold text-lg font-semibold">Contact Us</h3>
          <div className="flex gap-2 items-center">
            <Mail />
            <p className="text-text-light text-base">info@insurancesally.com</p>
          </div>
          <div className="flex gap-2 items-center">
            <Phone />
            <p className="text-text-light text-base">(866) 330-6012</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        <p className="text-text-light text-base text-center sm:text-left">
          © 2025 All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link href="#" className="text-text-light text-base">Privacy Policy</Link>
          <Link href="#" className="text-text-light text-base">Terms of Service</Link>
        </div>
      </div>
    </section>
  );
}
