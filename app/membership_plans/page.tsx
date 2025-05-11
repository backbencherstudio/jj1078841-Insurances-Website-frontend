import React from 'react'
import BreadCrump from '../_components/reusable/BreadCrump'
import { FaCheckCircle } from "react-icons/fa";
import Image, { StaticImageData } from 'next/image';
import BusinessPlan from "@/public/business_plan.png";
import VehiclePlan from "@/public/vehicle_plan.png";
import PropertyPlan from "@/public/property_plan.png";



interface PlanFeature {
  text: string;
}

interface Plan {
  icon: StaticImageData;
  name: string;
  price: string;
  features: string[];
}

const plans: Plan[] = [
  {
    icon: BusinessPlan,
    name: "Business Plan",
    price: "14.99",
    features: [
      "Invoices/Estimates",
      "Online Payments",
      "No Hidden Fees",
      "Cancel Anytime",
      "100% Secure"
    ]
  },
  {
    icon: VehiclePlan,
    name: "Vehicle Plan",
    price: "14.99",
    features: [
      "Invoices/Estimates",
      "Online Payments",
      "No Hidden Fees",
      "Cancel Anytime",
      "100% Secure"
    ]
  },
  {
    icon: PropertyPlan,
    name: "Property Plan",
    price: "14.99",
    features: [
      "Invoices/Estimates",
      "Online Payments",
      "No Hidden Fees",
      "Cancel Anytime",
      "100% Secure"
    ]
  }
];

export default function page() {
  return (
    <section className=' min-h-screen '>
    <BreadCrump title='Membership Plans' BreadCrump="Home > Membership"/>
  
      <div className="py-24 px-4  container mx-auto" >
        <div className="text-center mb-16">
          <p className="text-primary-color text-base mb-4">Membership Plain</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
            Choose the best plans for<br />your self
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 p-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="group rounded-2xl p-8 border transition-all duration-300 text-[#1D1F2C] border-[#E9E9EA] hover:bg-[#2EB0E4] hover:text-white hover:border-transparent"
            >
              <div className=' bg-[#EBF8FD] group-hover:bg-white rounded-lg p-3 inline-block'>
              <div className="  relative w-8 h-8  ">
                <Image
                  src={plan.icon}
                  alt={plan.name}
                  fill
                  className="object-contain"
                />
              </div>

              </div>
              
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              
              <div className="mb-8 pb-8 border-b border-[#E9E9EA] group-hover:border-white">
                <span className="text-3xl font-semibold">${plan.price}</span>
                <span className="text-base ml-1 text-text-light group-hover:text-white">/Monthly</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <FaCheckCircle className="text-text-light group-hover:text-white text-lg transition-colors duration-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded-full transition-all duration-300 border bg-[#2EB0E4] text-white hover:bg-white hover:text-[#2EB0E4] hover:border-[#2EB0E4]"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
   
    </section>
  )
}
