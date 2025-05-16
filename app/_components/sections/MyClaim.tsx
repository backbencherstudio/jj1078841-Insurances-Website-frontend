"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";

interface FormData {
  // Step 1
  propertyAddress: string;
  dateOfLoss: string;
  damageType: string;
  insuranceCompany: string;
  policyNumber: string;
  // Step 2
  damagePhotos: File[];
  insurancePolicy: File[];
  // Step 3
  signature: File | null;
  // Success state
  submitted: boolean;
}

const DAMAGE_TYPES = [
  "Water Damage",
  "Fire Damage",
  "Storm Damage",
  "Theft",
  "Other",
];

const INSURANCE_COMPANIES = [
  "State Farm",
  "Allstate",
  "GEICO",
  "Progressive",
  "Liberty Mutual",
];

export default function MyClaim() {
  const [currentStep, setCurrentStep] = useState(1); // Tracks active form input step (1, 2, 
  const [formData, setFormData] = useState<FormData>({
    propertyAddress: "",
    dateOfLoss: "",
    damageType: "",
    insuranceCompany: "",
    policyNumber: "",
    damagePhotos: [],
    insurancePolicy: [],
    signature: null,
    submitted: false,
  });

  const handleNext = () => {
    if (currentStep < 3) { // Form has 3 actual input steps
      setCurrentStep((prev) => prev + 1);
    } else {
      // This is when currentStep is 3, and "Submit Claim" is clicked
      setFormData((prev) => ({ ...prev, submitted: true }));
    }
  };

  const handleFileUpload =
    (type: "damagePhotos" | "insurancePolicy" | "signature") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFormData((prev) => ({
          ...prev,
          [type]:
            type === "signature"
              ? e.target.files![0]
              : Array.from(e.target.files!),
        }));
      }
    };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-[95%] sm:max-w-4/5 border border-[#F1F1F1] mx-auto py-6 sm:py-10 rounded-lg my-12 sm:my-24">
        <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-8 sm:mb-10">
            START A NEW CLAIM
          </h1>

          {/* Progress Steps - Always Visible, 4 steps */}
          <div className="flex justify-center items-center mb-8">
            <div className="flex w-full max-w-md">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base ${
                      formData.submitted
                        ? "bg-[#2EB0E4] text-white"
                        : step === currentStep
                        ? "bg-[#2EB0E4] text-white"
                        : step < currentStep
                        ? "bg-[#2EB0E4] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`flex-1 h-1 ${
                        formData.submitted
                          ? "bg-[#2EB0E4]"
                          : step < currentStep
                          ? "bg-[#2EB0E4]"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {formData.submitted ? (
            // Success Message
            <div className="text-center mt-6 sm:mt-10">
              <div className="w-16 h-16 bg-[#2EB0E4] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                Claim Submitted Successfully.
              </h2>
              <p className="text-gray-600 mb-6">
                A member of our team will contact you shortly.
              </p>
              <button
                className="px-6 py-2 bg-[#2EB0E4] text-white rounded-lg hover:bg-opacity-90 transition-all"
                onClick={() => window.location.reload()}
              >
                Done
              </button>
            </div>
          ) : (
            // Form Steps Content
            <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 mt-6 sm:mt-10">
              {/* Step 1 Content */}
              {currentStep === 1 && (
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your address"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2EB0E4] focus:border-transparent"
                      value={formData.propertyAddress}
                      onChange={(e) =>
                        setFormData({ ...formData, propertyAddress: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Loss
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2EB0E4] focus:border-transparent"
                        value={formData.dateOfLoss}
                        onChange={(e) =>
                          setFormData({ ...formData, dateOfLoss: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type of Damage
                    </label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2EB0E4] focus:border-transparent"
                      value={formData.damageType}
                      onChange={(e) =>
                        setFormData({ ...formData, damageType: e.target.value })
                      }
                    >
                      <option value="">Select type</option>
                      {DAMAGE_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Insurance Company
                    </label>
                    <select
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2EB0E4] focus:border-transparent"
                      value={formData.insuranceCompany}
                      onChange={(e) =>
                        setFormData({ ...formData, insuranceCompany: e.target.value })
                      }
                    >
                      <option value="">Select type of insurance</option>
                      {INSURANCE_COMPANIES.map((company) => (
                        <option key={company} value={company}>
                          {company}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Policy Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your number"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2EB0E4] focus:border-transparent"
                      value={formData.policyNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, policyNumber: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Step 2 Content */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Photos of damage
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8">
                      <div className="flex flex-col items-center">
                        <Upload className="text-gray-400 mb-4" size={24} />
                        <p className="text-gray-600 text-center mb-4 text-sm sm:text-base">Upload Photos</p>
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          id="damage-photos"
                          onChange={handleFileUpload("damagePhotos")}
                        />
                        <label
                          htmlFor="damage-photos"
                          className="bg-[#2EB0E4] text-white px-3 sm:px-4 py-2 rounded-lg cursor-pointer hover:bg-opacity-90 text-sm sm:text-base"
                        >
                          Choose Files
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Insurance Policy
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8">
                      <div className="flex flex-col items-center">
                        <Upload className="text-gray-400 mb-4" size={24} />
                        <p className="text-gray-600 text-center mb-4 text-sm sm:text-base">PDF</p>
                        <input
                          type="file"
                          accept=".pdf"
                          multiple
                          className="hidden"
                          id="insurance-policy"
                          onChange={handleFileUpload("insurancePolicy")}
                        />
                        <label
                          htmlFor="insurance-policy"
                          className="bg-[#2EB0E4] text-white px-3 sm:px-4 py-2 rounded-lg cursor-pointer hover:bg-opacity-90 text-sm sm:text-base"
                        >
                          Choose Files
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 Content */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Embedded E-Signature Tool
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8">
                      <div className="flex flex-col items-center">
                        {/* <Upload className="text-gray-400 mb-4" size={24} /> */}
                        <p className="text-gray-600 text-center mb-4 text-sm sm:text-base">
                          DocuSign, PDF filler
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          id="signature"
                          onChange={handleFileUpload("signature")}
                        />
                        <label
                          htmlFor="signature"
                          className="bg-[#2EB0E4] text-white px-3 sm:px-4 py-2 rounded-lg cursor-pointer hover:bg-opacity-90 text-sm sm:text-base"
                        >
                          Choose File
                        </label>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-4">
                    I authorize Insurance Ally to act as my Public Adjuster
                  </p>
                </div>
              )}

              {/* Navigation Button */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleNext}
                  className="w-full px-6 py-2 bg-[#2EB0E4] text-white rounded-lg hover:bg-opacity-90 transition-all"
                >
                  {currentStep === 3 ? "Submit Claim" : "Next"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}