import React from "react";
import BreadCrump from "../../_components/reusable/BreadCrump";
import { FaCheckCircle } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";
import BusinessPlan from "@/public/business_plan.png";
import VehiclePlan from "@/public/vehicle_plan.png";
import PropertyPlan from "@/public/property_plan.png";
import Link from "next/link";

interface Plan {
  icon: StaticImageData;
  name: string;
  price: string;
  monthlyPrice: string;
  description?: string;
  achiPrice: string;
  features: string[];
}

const plans: Plan[] = [
  {
    icon: BusinessPlan,
    name: "Renter",
    price: "9.99",
    monthlyPrice: "Monthly",
    achiPrice: "4.99/month with ACH Auto-Pay",
    features: [
      "24/7 Support",
      "Online Claim Portals",
      "No Hidden Fees",
      "Cancel Anytime",
      "Unlimited Policy Reviews",
    ],
  },
  {
    icon: VehiclePlan,
    name: "Residential",
    price: "19.99",
    monthlyPrice: "Monthly",
    achiPrice: "14.99/month with ACH Auto-Pay",
    features: [
      "24/7 Support",
      "Online Claim Portals",
      "No Hidden Fees",
      "Cancel Anytime",
      "Unlimited Policy Reviews",
    ],
  },
  {
    icon: PropertyPlan,
    name: "Commercial",
    price: "29.99",
    monthlyPrice: "Monthly",
    description: "Small to Medium-Sized Business Property Owners",
    achiPrice: "29.99/month with ACH Auto-Pay",
    features: [
      "24/7 Support",
      "Online Claim Portals",
      "No Hidden Fees",
      "Cancel Anytime",
      "Unlimited Policy Reviews",
    ],
  },
  {
    icon: PropertyPlan,
    name: "Enterprise",
    price: "49.99",
    monthlyPrice: "Monthly",
    description: "Apartments, Condos, HOAs and Large Commercial Buildings",
    achiPrice: "49.99/month with ACH Auto-Pay",
    features: [
      "24/7 Support",
      "Online Claim Portals",
      "No Hidden Fees",
      "Cancel Anytime",
      "Unlimited Policy Reviews",
    ],
  },
];

export default function page() {
  return (
    <section className="min-h-screen">
      <BreadCrump title="Membership Plans" BreadCrump="Home > Membership" />

      <div className="py-24 px-4 container mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary-color text-base mb-4">Membership Plans</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
            Choose the best plans for
            <br />
            your self
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 p-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="group rounded-2xl p-8 border transition-all duration-300 text-[#1D1F2C] border-[#E9E9EA] hover:bg-[#2EB0E4] hover:text-white hover:border-transparent flex flex-col"
            >
              <div className="bg-[#EBF8FD] group-hover:bg-white rounded-lg p-3 w-fit">
                <div className="relative w-8 h-8 inline-block">
                  <Image
                    src={plan.icon}
                    alt={plan.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex-grow">
                <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>

                <div className="flex items-baseline">
                  <span className="text-3xl font-semibold  mb-5">
                    ${plan.price}
                  </span>
                  <span className="text-base ml-1 text-text-light group-hover:text-white">
                    {plan.monthlyPrice}
                  </span>
                </div>

                {plan.description && (
                  <p className="text-base text-text-light group-hover:text-white mb-4">
                    {plan.description}
                  </p>
                )}

                <div className="  border-b border-[#E9E9EA] group-hover:border-white"></div>

                <div className="">
                  <p className="text-lg font-semibold   group-hover:text-white  my-4">
                    {plan.achiPrice}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <FaCheckCircle className="text-[#2EB0E4] group-hover:text-white text-lg" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/membership_plans/payment">
                <button className="w-full py-3 rounded-full transition-all duration-300 border bg-[#2EB0E4] text-white hover:bg-white hover:text-[#2EB0E4] hover:border-[#2EB0E4] mt-auto">
                  Get Started
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
