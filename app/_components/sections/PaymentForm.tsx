"use client";

import React, { useState } from "react";
import { CreditCard, CheckCircle2 } from "lucide-react"; // Using Lucide icons
import Link from "next/link";
// A simple Mastercard SVG icon (you can replace this with a higher quality one or an <img> tag)
const MastercardIcon = () => (
  <svg width="32" height="20" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="3" fill="#FFF"/>
    <circle cx="14.5" cy="12" r="6.5" fill="#EB001B"/>
    <circle cx="23.5" cy="12" r="6.5" fill="#F79E1B"/>
    <path d="M20 12C20 10.0227 19.3063 8.22216 18.1812 6.81875C16.8187 8.22216 16 10.0227 16 12C16 13.9773 16.8187 15.7778 18.1812 17.1812C19.3063 15.7778 20 13.9773 20 12Z" fill="#FF5F00"/>
  </svg>
);

interface FormErrors {
  cardNumber?: string;
  expirationDate?: string;
  cvv?: string;
}

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "ach">("card");
  const [isSubmitted, setIsSubmitted] = useState(false); // Changed initial state to false
  const [saveCardDetails, setSaveCardDetails] = useState(false);

  // Form field states
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const validateCardDetails = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Card Number Validation (basic)
    if (!cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required.";
      isValid = false;
    } else if (!/^\d{13,19}$/.test(cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Enter a valid card number (13-19 digits).";
      isValid = false;
    }

    // Expiration Date Validation (basic)
    if (!expirationDate.trim()) {
      newErrors.expirationDate = "Expiration date is required.";
      isValid = false;
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expirationDate)) {
      newErrors.expirationDate = "Enter a valid date (MM/YY).";
      isValid = false;
    } else {
      const [month, year] = expirationDate.split("/");
      const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
      const currentMonth = new Date().getMonth() + 1;
      if (parseInt(year, 10) < currentYear || (parseInt(year, 10) === currentYear && parseInt(month, 10) < currentMonth)) {
        newErrors.expirationDate = "Card has expired.";
        isValid = false;
      }
    }

    // CVV Validation (basic)
    if (!cvv.trim()) {
      newErrors.cvv = "CVV is required.";
      isValid = false;
    } else if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "Enter a valid CVV (3 or 4 digits).";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    if (paymentMethod === "card") {
      if (!validateCardDetails()) {
        return; // Stop submission if validation fails
      }
    }
    // Add your payment processing logic here
    console.log("Payment submitted:", { paymentMethod, cardNumber, expirationDate, cvv, saveCardDetails });
    setIsSubmitted(true); // Set to true only after successful submission
  };

  // const handleMyClaim = () => {
  //   setIsSubmitted(false);
  //   setCardNumber("");
  //   setExpirationDate("");
  //   setCvv("");
  //   setSaveCardDetails(false);
  //   setErrors({});
  // }

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: keyof FormErrors) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }

  return (
    <div className="max-w-[955px] mx-auto px-6 bg-white rounded-lg overflow-hidden  border border-border-light mt-20  ">
      {/* Header */}
      <div className="bg-primary-dark  text-white p-6">
        <h2 className="text-5xl font-semibold text-center">Payment</h2>
      </div>

      {/* Body */}
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="  max-w-[551px] mx-auto pt-20  pb-28">
          <div>
            <label className="block text-3xl font-semibold text-gray-bold ">
              Pay With:
            </label>
            <div className="flex items-center space-x-6 mb-10">
              {["Card", "PayPal", "ACH"].map((method) => (
                <label key={method} className="flex items-center space-x-2 cursor-pointer mt-5">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.toLowerCase()}
                    checked={paymentMethod === method.toLowerCase()}
                    onChange={() => {
                      setPaymentMethod(method.toLowerCase() as "card" | "paypal" | "ach");
                      setErrors({}); // Clear errors when changing payment method
                    }}
                    className="form-radio h-4 w-4 text-[#2EB0E4] border-gray-300 focus:ring-[#2EB0E4]"
                  />
                  <span className="text-lg font-normal text-gray-bold ">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {paymentMethod === "card" && (
            <div className="  ">
              <div className=" mb-8">
                <label htmlFor="cardNumber" className="block text-lg font-medium text-gray-bold">
                  Card Number
                </label>
                <div className="mt-1 relative rounded-md     ">
                  <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={handleInputChange(setCardNumber, "cardNumber")}
                    className={`focus:ring-[#2EB0E4] focus:border-[#2EB0E4] block w-full pr-10 sm:text-sm   rounded-md p-3 ${errors.cardNumber ? 'border-red-500':''} border border-border-light`}
                    placeholder="5566 0000 0000 0000"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none   ">
                    <MastercardIcon />
                  </div>
                </div>
                {errors.cardNumber && <p className="mt-1 text-xs text-red-600">{errors.cardNumber}</p>}
              </div>

              <div className="flex space-x-4 mb-5">
                <div className="flex-1">
                  <label htmlFor="expirationDate" className="block text-lg font-medium text-gray-bold">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    name="expirationDate"
                    id="expirationDate"
                    value={expirationDate}
                    onChange={handleInputChange(setExpirationDate, "expirationDate")}
                    className={`mt-1  border border-border-light focus:ring-[#2EB0E4] focus:border-[#2EB0E4] block w-full sm:text-sm   rounded-md p-3 ${errors.expirationDate ? 'border-red-500' : ''}`}
                    placeholder="MM/YY"
                  />
                  {errors.expirationDate && <p className="mt-1 text-xs text-red-600">{errors.expirationDate}</p>}
                </div>
                <div className="flex-1">
                  <label htmlFor="cvv" className="block text-lg font-medium text-gray-bold">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    id="cvv"
                    value={cvv}
                    onChange={handleInputChange(setCvv, "cvv")}
                    className={`mt-1 border border-border-light focus:ring-[#2EB0E4] focus:border-[#2EB0E4] block w-full sm:text-sm   rounded-md p-3 ${errors.cvv ? 'border-red-500' : ''}`}
                    placeholder="•••"
                  />
                  {errors.cvv && <p className="mt-1 text-xs text-red-600">{errors.cvv}</p>}
                </div>
              </div>

              <div className="flex items-center mb-5">
                <input
                  id="saveCardDetails"
                  name="saveCardDetails"
                  type="checkbox"
                  checked={saveCardDetails}
                  onChange={(e) => setSaveCardDetails(e.target.checked)}
                  className="h-4 w-4 text-[#2EB0E4] focus:ring-[#2EB0E4] border-gray-300 rounded"
                />
                <label htmlFor="saveCardDetails" className="ml-2 block text-sm text-gray-900">
                  Save card details
                </label>
              </div>
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div className="text-center p-4 border border-gray-200 rounded-md">
              <p className="text-gray-600">PayPal payment option coming soon.</p>
            </div>
          )}

          {paymentMethod === "ach" && (
            <div className="text-center p-4 border border-gray-200 rounded-md">
              <p className="text-gray-600">ACH payment option coming soon.</p>
            </div>
          )}


          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#2EB0E4] hover:bg-primary-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2EB0E4] transition-colors"
            >
              {paymentMethod === "ach"?"Pay USD 9.99":"Pay USD 14.99"}
            </button>
          </div>
        </form>
      ) : (
        // Success State
        <div className=" text-center pt-36 pb-44">
          <div className="bg-sky-50 max-w-[556px] mx-auto rounded-lg py-12 px-6 ">
            {/* <CheckCircle2 className="mx-auto h-12 w-12 text-[#2EB0E4] mb-4" /> Using Lucide icon */}
            <h3 className="text-2xl font-semibold text-isecondary mb-2">
              Congratulations — You're In!
            </h3>
            <p className="text-lg text-text-light font-normal mb-8 mt-4">
            Welcome to Insurances Ally. Let's get started on your insurance claim journey.
            </p>
            <Link href="/membership_plans/claim"
               
              className="w-full sm:w-auto inline-flex justify-center py-4 px-12 border border-transparent rounded-md shadow-sm text-base  font-normal text-white bg-[#2EB0E4] hover:bg-[#2599c7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2EB0E4] transition-colors"
            >
              My Claim
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}