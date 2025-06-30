"use client";

import React from 'react';
import BreadCrump from '../../_components/reusable/BreadCrump';
import { FaCheckCircle } from "react-icons/fa";
import Link from 'next/link';

interface PolicySection {
  title: string;
  content: string | string[];
}

const policyData: PolicySection[] = [
  {
    title: "Insurances Ally, LLC – Terms & Conditions",
    content: "Effective Date: 06/29/2025"
  },
  {
    title: "Service Scope & Usage",
    content: [
      "The services provided under each membership tier are subject to reasonable use limits.",
      "Inspections, consultations, and other support are intended for active property policyholders who maintain ongoing subscriptions.",
      "Excessive use beyond normal expectations may require tier adjustment or administrative review."
    ]
  },
  {
    title: "Membership Fees",
    content: [
      "The Insured agrees to pay a monthly membership fee based on the selected tier:",
      "• Renter: $9.99/month or $4.99/month with ACH Auto-Pay",
      "• Homeowners: $19.99/month or $14.99/month with ACH",
      "• Small Commercial Property Owners: $34.99/month or $29.99/month with ACH",
      "• Apartments, Condos, HOAs, Large Commercial: $54.99/month or $49.99/month with ACH",
      "The selected plan and payment method determine the applicable monthly fee, confirmed at enrollment.",
      "Charges recur monthly on the signup date."
    ]
  },
  {
    title: "Member Obligations",
    content: [
      "It is the Insured’s responsibility to notify Insurances Ally, LLC of any event that may require an inspection.",
      "The Insured agrees not to engage with third-party entities regarding any insurance related occurrences without first notifying Insurances Ally, LLC.",
      "Payment must be made monthly on the same calendar day via ACH or direct debit. Failed payments result in suspended access until successful payment.",
      "The Insured agrees to work cooperatively with the Member Network and holds it harmless from any liability related to inspections.",
      "The Insured intends to make all recommended repairs as directed by Insurances Ally, LLC, when applicable."
    ]
  },
  {
    title: "Declaration of Intent",
    content: "The Insured agrees to cooperate with Insurances Ally, LLC and acknowledges that additional services through the network—such as public insurance adjusters, attorneys, engineers, and appraisers—may be included depending on membership."
  },
  {
    title: "Legal Advice & Expert Testimony",
    content: "Insurances Ally, LLC does not provide legal advice. If legal counsel or expert testimony is required, the Insured agrees to enter into a separate agreement with an attorney in the network. Fees may be covered by membership, subject to the attorney’s independent terms."
  },
  {
    title: "Geographic Coverage",
    content: "Services are available in all 50 U.S. states. In regulated jurisdictions, inspections and adjusting will be conducted by properly licensed professionals."
  },
  {
    title: "Refund Policy",
    content: "All monthly fees are non-refundable once charged. Cancellation stops future billing but does not result in prorated refunds."
  },
  {
    title: "Automatic Renewal",
    content: "Membership renews automatically month-to-month unless canceled in accordance with this agreement."
  },
  {
    title: "Privacy & Data Use",
    content: "Insurances Ally, LLC will keep all personal and claim information confidential and will only share data with network professionals as required. Information will never be sold or shared with outside parties without consent, unless required by law."
  },
  {
    title: "Limitation of Liability",
    content: "Insurances Ally, LLC is not responsible for claim denials, delays, or insurance company discretion. Our role is advisory."
  },
  {
    title: "Member Eligibility",
    content: "This service is available to active property policyholders with valid homeowner or commercial insurance. Insured parties must keep their policies active."
  },
  {
    title: "Mutual Agreement",
    content: "This Contract is binding upon the parties and their heirs, successors, and assigns. Modifications must be made in writing and signed by both parties."
  },
  {
    title: "Governing Law & Dispute Resolution",
    content: "This Contract is governed by Arizona law. Any disputes shall be resolved through final and binding arbitration administered by a mutually agreed-upon arbitration service. Parties waive jury trial and class action rights."
  },
  {
    title: "Disclaimer of Insurance Affiliation",
    content: "Insurances Ally, LLC is not an insurance company or affiliated with any carrier. We do not sell policies or determine coverage. Our purpose is to assist policyholders in maximizing their entitled benefits."
  },
  {
    title: "Right to Cancel",
    content: "The Insured may cancel at any time by written notice via email, phone, online account, or U.S. Mail. Cancellation within three (3) business days of billing will void charges for that cycle."
  },
  {
    title: "Technology & Platform Use",
    content: "The Insured acknowledges that Insurances Ally, LLC provides its services via digital platforms and tools. The Company does not guarantee uninterrupted access to the website or mobile interfaces. Service outages due to maintenance, technical issues, or third-party service disruptions do not constitute a breach of contract."
  },
  {
    title: "Modification of Services",
    content: "Insurances Ally, LLC reserves the right to update, change, or discontinue any aspect of the membership services with reasonable notice to the Insured. Continued use of the membership after such changes shall constitute acceptance of the revised terms."
  },
  {
    title: "Non-Solicitation Clause",
    content: "The Insured agrees not to directly solicit, hire, or contract with any professional (e.g., public adjuster, inspector, contractor, or attorney) introduced through the Insurances Ally Network outside the scope of the membership service, unless expressly authorized in writing by Insurances Ally, LLC."
  },
  {
    title: "Chargebacks & Disputes",
    content: "If the Insured initiates a chargeback or payment dispute without first attempting to resolve the matter with Insurances Ally, LLC, the Company reserves the right to suspend services, recover fees, and pursue legal remedies for breach of contract."
  },
  {
    title: "Electronic Communications Consent",
    content: "By subscribing, the Insured agrees to receive communications electronically, including via email, SMS, and app notifications. These communications may include claim updates, service alerts, or membership-related notices."
  }  
];

export default function TermsAndConditions() {
  return (
    <div>
      <BreadCrump title="Terms & Conditions" BreadCrump="Home > Terms & Conditions" />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4/5 mx-auto bg-white rounded-3xl overflow-hidden shadow-lg">
          {/* Header */}
          <div className="bg-[#2EB0E4] text-white p-8">
            <h1 className="text-3xl font-semibold">{policyData[0].title}</h1>
            <p className="text-base font-normal mt-2">Last Updated: June 29, 2025</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Terms & Conditions content */}
            {policyData.slice(1).map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-4xl font-semibold text-gray-900 mb-4">
                  {section.title}
                </h2>
                {Array.isArray(section.content) ? (
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-3">
                        <FaCheckCircle className="text-text-light" />
                        <span className="text-text-light text-base font-normal">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">{section.content}</p>
                )}
              </div>
            ))}
            <Link href='/login' className=' bg-primary-color text-white text-lg px-2.5 py-1 rounded-lg '>login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
