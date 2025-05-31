"use client"

import React, { useState, FormEvent } from 'react';
import { Phone, Mail } from 'lucide-react';


export default function ContactForm() {
 



  return (
    <section className=" px-4 py-24   bg-disabled">
      <div className="flex flex-col lg:flex-row gap-12 items-start container mx-auto">
        {/* Left Section */}
        <div className="flex-1">
          <p className="text-[#2EB0E4] text-base">Contact Us</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mt-2">
            We're Here to Help—<br />
            Reach Out Anytime
          </h2>
          
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#2EB0E4] p-2 rounded-full">
                <Phone className="text-white" size={20} />
              </div>
              <span className="text-gray-600">(866) 330-6012</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#2EB0E4] p-2 rounded-full">
                <Mail className="text-white" size={20} />
              </div>
              <span className="text-gray-600">info@insurancesally.com</span>
            </div>
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
          <form   className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  // value={formData.firstName}
                  // onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#2EB0E4]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  // value={formData.lastName}
                  // onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#2EB0E4]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                // value={formData.phone}
                // onChange={handleChange}
                placeholder="Enter your number"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#2EB0E4]"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                name="email"
                // value={formData.email}
                // onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#2EB0E4]"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Message</label>
              <textarea
                name="message"
                // value={formData.message}
                // onChange={handleChange}
                placeholder="Type your message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-[#2EB0E4]"
                required
              />
            </div>

            <button
            
              type="submit"
              // disabled={isLoading}
              className="w-full bg-[#2EB0E4] text-white py-3 rounded-md hover:bg-[#2690bb] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* {isLoading ? 'Sending...' : 'Send Message'} */} Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}