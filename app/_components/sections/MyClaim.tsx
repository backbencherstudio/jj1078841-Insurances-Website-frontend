'use client';

import React, { useState, useEffect } from "react";
import { Upload, FileImage, FileText } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { FaFileAlt } from "react-icons/fa";
import Link from "next/link";

interface FormData {
  propertyAddress: string;
  dateOfLoss: string;
  damageType: string;
  insuranceCompany: string;
  policyNumber: string;
  damagePhotos: File[];
  insurancePolicy: File[];
  signature: File | null;
  submitted: boolean;
  fullName: string;
  dateOfClaim: string;
  agreeWithPolicy: boolean,
}

const DAMAGE_TYPES = ["Water Damage", "Fire Damage", "Storm Damage", "Theft", "Other"];
const INSURANCE_COMPANIES = ["State Farm", "Allstate", "GEICO", "Progressive", "Liberty Mutual", "Other"];

export default function MyClaim() {
  const [currentStep, setCurrentStep] = useState(1);
  const [agreeWithPolicy, setAgreeWithPolicy] = useState<boolean | null>(true)
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
    fullName: "",
    dateOfClaim: "",
    agreeWithPolicy: false
  });

  const [token, setToken] = useState<string | null>(null);

  // Retrieve token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const validateStep = () => {
    if (currentStep === 1) {
      return (
        formData.propertyAddress.trim() &&
        formData.dateOfLoss &&
        formData.damageType &&
        formData.insuranceCompany &&
        formData.policyNumber.trim()
      );
    }
    if (currentStep === 2) {
      setAgreeWithPolicy(false);
      return formData.damagePhotos.length > 0 && formData.insurancePolicy.length > 0;
    }
    if (currentStep === 3) {
      return formData.fullName !== null && formData.dateOfClaim !== null && formData.agreeWithPolicy;
    }
    return true;
  };

  const handleNext = () => {
    console.log("Handle next")
    if (!validateStep()) {
      toast.error("Please complete all required fields before proceeding.");
      return;
    }

    if (currentStep < 3) {
      console.log("Current stage : ", currentStep)
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleFileUpload =
  (type: "damagePhotos" | "insurancePolicy" | "signature") =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      
      
      // If all files are within the size limit, update the state
      setFormData((prev) => ({
        ...prev,
        [type]: type === "signature"? files[0] : files,
      }));
    }
  };
  const handleSubmit = async () => {
    if (!token) {
      toast.error("No user found. Please log in again.");
      return;
    }

    const form = new FormData();
    form.append("property_address", formData.propertyAddress);
    form.append("date_of_loss", formData.dateOfLoss);
    form.append("type_of_damage", formData.damageType);
    form.append("insurance_company", formData.insuranceCompany);
    form.append("policy_number", formData.policyNumber);
    form.append("fullName", formData.fullName);
    form.append("dateOfClaim", new Date().toLocaleDateString());
    form.append("agreeWithPolicy", String(formData.agreeWithPolicy));

    formData.damagePhotos.forEach((file) => {
      form.append("damage_photos", file);
    });

    formData.insurancePolicy.forEach((file) => {
      form.append("policy_docs", file);
    });

    // if (formData.signature) {
    //   form.append("signature", formData.signature);
    // }

    try {
      toast.loading("Submitting claim...");
      const response = await fetch(` ${process.env.NEXT_PUBLIC_API_URL}/api/new-claim-insurance`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to submit the claim.");
      }

      const result = await response.json();
      console.log(result);

      toast.dismiss();
      toast.success("Claim submitted successfully!");
      setFormData((prev) => ({ ...prev, submitted: true }));
      setCurrentStep((prev) => prev + 1);
    } catch (error: any) {
      toast.dismiss();
      const message = error?.message || "Submission failed";
      toast.error(message);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="max-w-[95%] sm:max-w-4/5 border border-[#F1F1F1] mx-auto py-6 sm:py-10 rounded-lg my-12 sm:my-24">
        <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-8 sm:mb-10">
            START A NEW CLAIM
          </h1>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center mb-8">
            <div className="flex w-full max-w-md">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base ${step <= currentStep ? "bg-[#2EB0E4] text-white" : "bg-gray-200 text-gray-500"}`}
                  >
                    {step}
                  </div>
                  {step < 4 && <div className={`flex-1 h-1 ${step < currentStep ? "bg-[#2EB0E4]" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>
          </div>

          {/* Submitted Success Message */}
          {formData.submitted ? (
            <div className="text-center mt-10">
              <div className="w-16 h-16 bg-[#2EB0E4] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Claim Submitted Successfully.</h2>
              <p className="text-gray-600 mb-6">A member of our team will contact you shortly.</p>
              <Link
                href='/'
                className="px-6 py-2 bg-[#2EB0E4] text-white rounded-lg hover:bg-opacity-90"
              >
                Done
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 mt-6 sm:mt-10">
              {/* STEP 1 */}
              {currentStep === 1 && (
                <div className="space-y-5 outline-none">
                  <InputField
                    label="Property Address"
                    value={formData.propertyAddress}
                    onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                  />
                  <InputField
                    label="Date of Loss"
                    type="date"
                    value={formData.dateOfLoss}
                    onChange={(e) => setFormData({ ...formData, dateOfLoss: e.target.value })}
                  />
                  <SelectField
                    label="Type of Damage"
                    options={DAMAGE_TYPES}
                    value={formData.damageType}
                    onChange={(e) => setFormData({ ...formData, damageType: e.target.value })}
                  />
                  <SelectField
                    label="Insurance Company"
                    options={INSURANCE_COMPANIES}
                    value={formData.insuranceCompany}
                    onChange={(e) => setFormData({ ...formData, insuranceCompany: e.target.value })}
                  />
                  <InputField
                    label="Policy Number"
                    value={formData.policyNumber}
                    onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                  />
                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <FileUpload
                    label="Photos of damage"
                    id="damage-photos"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload("damagePhotos")}
                    files={formData.damagePhotos}
                  />
                  <FileUpload
                    label="Insurance Policy"
                    id="insurance-policy"
                    multiple
                    accept=".pdf"
                    onChange={handleFileUpload("insurancePolicy")}
                    files={formData.insurancePolicy}
                  />
                </div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#B5A3FF]">
                    <div className="text-[#E7DFF1]">
                      <FaFileAlt />
                    </div>
                    <Link href="/Files/Claim_Authorization.pdf" target="_blank" className="hover:underline">View Full Public Adjuster Authorization Agreement</Link>
                  </div>
                  <InputField
                    label="Full Name"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                  <div>
                    <h3>Date</h3>
                    <div className="border p-2 rounded-md">{new Date().toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agreeWithPolicy"
                        name="agreeWithPolicy"
                        type="checkbox"
                        required
                        checked={formData.agreeWithPolicy || false}
                        onChange={(e) => { setFormData({ ...formData, agreeWithPolicy: e.currentTarget.checked }); setAgreeWithPolicy(e.currentTarget.checked) }}
                        className="w-4 h-4 border border-gray-300 rounded"
                      />
                    </div>
                    <label htmlFor="agreeWithPolicy" className="ml-2 text-sm font-medium text-gray-900">
                      I agree to the terms of the Public Adjuster Authorization. By checking this box, I agree this serves as my electronic signature.
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  disabled={!agreeWithPolicy}
                  onClick={handleNext}
                  className="w-full px-6 py-2 bg-[#2EB0E4] text-white rounded-lg hover:bg-opacity-90"
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

// --- Reusable Components ---
const InputField = ({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2EB0E4]"
      value={value}
      onChange={onChange}
    />
  </div>
);

const SelectField = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2EB0E4]"
      value={value}
      onChange={onChange}
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const FileUpload = ({
  label,
  id,
  multiple = false,
  accept,
  onChange,
  files = [],
}: {
  label: string;
  id: string;
  multiple?: boolean;
  accept?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  files: File[];
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8">
      <div className="flex flex-col items-center">
        <Upload className="text-gray-400 mb-4" size={24} />
        <input id={id} type="file" accept={accept} multiple={multiple} className="hidden" onChange={onChange} />
        <label
          htmlFor={id}
          className="bg-[#2EB0E4] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-opacity-90 text-sm"
        >
          Choose {multiple ? "Files" : "File"}
        </label>

        {files.length > 0 && (
          <ul className="mt-4 w-full text-sm text-left text-gray-700">
            {files.map((file, index) => (
              <li key={index} className="flex items-center gap-2 mb-2 truncate">
                {file.type.includes("image") ? <FileImage size={16} /> : <FileText size={16} />}
                <span className="truncate">{file.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);
