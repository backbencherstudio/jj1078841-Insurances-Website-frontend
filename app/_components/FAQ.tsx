"use client"

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What exactly does Insurances Ally do?",
    answer: ` We guide homeowners through the property insurance claims process—helping document 
damage, interpret policy coverage, communicate with the insurance company, and advocate for 
the best possible outcome`
  },
  {
    question: "How much does it cost, and what’s included?",
    answer: ` Our membership starts at $14.99/month for homeowners. It includes expert guidance, claims 
documentation support, strategy, and access to a vetted network of professionals (like public 
adjusters, contractors, engineers, and attorneys) at no additional charge`
  },
  {
    question: "Can you help even if I already filed a claim?",
    answer:  `Yes. Whether you’re just starting, already filed, or were denied or underpaid, we can step in at 
any point to help guide or escalate the claim`
  },
  {
    question: "Will you communicate with the insurance company for me??",
    answer:  ` Yes. We take over communication with your insurance company, including adjusters and desk 
reviewers, and handle all the back-and-forth to reduce stress and ensure nothing is missed.`
  },
  {
    question: "What happens if I don’t end up filing a claim?",
    answer:  ` That’s okay. Part of our service is helping you decide whether or not it makes sense to file. 
We’ll assess your situation, deductible, and policy to help you make an informed decision—
 usually within 48 hours`
  },
  {
    question: " Can you help if my claim was denied or underpaid?",
    answer:  `Absolutely. We specialize in reviewing denied or underpaid claims, identifying missed damages 
or errors, and building a strong case for supplement or appeal`
  },
  {
    question: " Do I need to hire a public adjuster separately?",
    answer:  `Not necessarily. While our base membership provides expert support, if your case requires a 
licensed public adjuster, we’ll connect you with one from our network—and their fees are 
covered as part of your membership`
  },
  {
    question: " Can I cancel anytime?",
    answer:  ` Yes. Our service is contract-free. You can cancel your membership at any time with no penalties 
or long-term commitment`
  },
   
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-8 sm:mb-12 px-4">
        Frequently Asked Questions
      </h2>

      <div className="max-w-[900px] mx-auto space-y-3 sm:space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`bg-disabled rounded-lg transition-all duration-300 overflow-hidden ${
              openIndex === index ? 'bg-opacity-100' : 'bg-opacity-50'
            }`}
          >
            <button
              className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center gap-4"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-left font-medium text-[#1D1F2C] flex-1">
                {index + 1}. {faq.question}
              </span>
              <span className={`text-white bg-isecondary rounded-full flex-shrink-0 p-1 sm:p-1.5 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}>
                {openIndex === index ? (
                  <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </span>
            </button>
            
            <div 
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="text-sm sm:text-base font-normal px-4 sm:px-6 pb-3 sm:pb-4 text-text-light">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}