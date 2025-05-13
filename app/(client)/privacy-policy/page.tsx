"use client"

import React from 'react';
import BreadCrump from '../../_components/reusable/BreadCrump';
import { FaCheckCircle } from "react-icons/fa";

interface PolicySection {
  title: string;
  content: string | string[];
}

const policyData: PolicySection[] = [
  {
    title: "Privacy Policy",
    content: "At InsuranceSally, your privacy is important to us. This Privacy Policy outlines how we collect, use, store, and protect your personal information when you interact with our website, services, or membership plans."
  },
  {
    title: "How We Use Your Information",
    content: [
      "Provide and improve our services",
      "Process your membership and payments",
      "Assist with your insurance claims",
      "Communicate with you about your account, services, or promotions",
      "Ensure site security and prevent fraud"
    ]
  },
  {
    title: "Sharing of Information",
    content: [
      "Trusted service providers (e.g., payment processors, IT support)",
      "Contractors and adjusters assisting in your claim",
      "Legal or regulatory authorities, when required by law"
    ]
  },
  {
    title: "Cookies and Tracking Technologies",
    content: "We use cookies and similar tools to improve your browsing experience and analyze site traffic. You can control cookie settings in your browser."
  },
  {
    title: "Data Security",
    content: "We implement strict security measures including encryption, firewalls, and secure servers to protect your personal information from unauthorized access or disclosure."
  }
];

export default function PrivacyPolicy() {
  return (

    <div>
     <BreadCrump title='Privacy Policy' BreadCrump="Home > Privacy Policy"/>
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4/5 mx-auto bg-white rounded-3xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="bg-[#2EB0E4] text-white p-8">
          <h1 className="text-3xl font-semibold">{policyData[0].title}</h1>
          <p className="text-base font-normal mt-2">Last Updated: April 20, 2024</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-text-light text-base font-normal mb-8">{policyData[0].content}</p>

          {/* Policy Sections */}
          {policyData.slice(1).map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-4xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>
              {Array.isArray(section.content) ? (
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-3">
                      <FaCheckCircle  className=' text-text-light'/>
                      <span className="text-text-light text-base font-normal">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}