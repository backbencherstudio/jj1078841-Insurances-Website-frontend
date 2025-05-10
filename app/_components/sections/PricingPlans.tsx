"use client"

import React from 'react';
import { Check } from 'lucide-react';

interface PlanFeature {
  text: string;
}

interface Plan {
  name: string;
  price: string;
  features: PlanFeature[];
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Business Plan",
    price: "14.99",
    features: [
      { text: "Invoices/Estimates" },
      { text: "Online Payments" },
      { text: "No Hidden Fees" },
      { text: "Cancel Anytime" },
      { text: "100% Secure" }
    ]
  },
  {
    name: "Vehicle Plan",
    price: "14.99",
    features: [
      { text: "Invoices/Estimates" },
      { text: "Online Payments" },
      { text: "No Hidden Fees" },
      { text: "Cancel Anytime" },
      { text: "100% Secure" }
    ],
    isPopular: true
  },
  {
    name: "Property Plan",
    price: "14.99",
    features: [
      { text: "Invoices/Estimates" },
      { text: "Online Payments" },
      { text: "No Hidden Fees" },
      { text: "Cancel Anytime" },
      { text: "100% Secure" }
    ]
  }
];

export default function PricingPlans() {
  return (
    <section className="py-16 px-4">
      <div className="text-center mb-12">
        <p className="text-[#2EB0E4] text-base mb-2">Membership Plan</p>
        <h2 className="text-3xl md:text-4xl font-semibold">
          Choose the best plans for<br />your self
        </h2>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 transition-all duration-300 hover:shadow-xl ${
                plan.isPopular ? 'bg-[#2EB0E4] text-white' : 'bg-white border border-gray-200'
              }`}
            >
              <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-sm ml-1">/Monthly</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`h-5 w-5 mr-3 ${plan.isPopular ? 'text-white' : 'text-[#2EB0E4]'}`} />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg transition-all duration-300 ${
                  plan.isPopular
                    ? 'bg-white text-[#2EB0E4] hover:bg-opacity-90'
                    : 'bg-[#2EB0E4] text-white hover:bg-opacity-90'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}