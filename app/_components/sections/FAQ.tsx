"use client"

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Do I have to pay upfront to become a member?",
    answer: "No, our membership is completely free. You only pay when you use our services."
  },
  {
    question: "What does InsuranceSally do?",
    answer: "InsuranceSally helps homeowners navigate insurance claims—from filing paperwork to negotiating settlements. We take the stress out of the process so you can focus on recovery."
  },
  {
    question: "Can I use your service if I've already started a claim?",
    answer: "Yes, we can assist you at any stage of the claims process."
  },
  {
    question: "What if my insurance company has already denied my claim?",
    answer: "We can help review your case and explore options for appeal or reconsideration."
  },
  {
    question: "Are your services available 24/7?",
    answer: "Yes, our support team is available 24/7 to assist you with your insurance needs."
  },
  {
    question: "How do I access your trusted contractor network?",
    answer: "Once you're registered, you'll have access to our vetted network of contractors."
  },
  {
    question: "What's included in a typical video project?",
    answer: "Our video projects include professional filming, editing, and final delivery."
  },
  {
    question: "Do you work with small businesses or startups?",
    answer: "Yes, we work with businesses of all sizes, including startups and small businesses."
  },
  {
    question: "How long does it take to deliver a finished video?",
    answer: "Delivery times vary by project scope, typically ranging from 2-4 weeks."
  },
  {
    question: "Will I own the content after it's produced?",
    answer: "Yes, you'll have full ownership rights to all content we produce for you."
  }
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