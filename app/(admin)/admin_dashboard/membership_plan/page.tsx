"use client";
import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { TfiTrash } from "react-icons/tfi";
import {SquarePen} from "lucide-react"

interface MembershipPlan {
  plan: string;
  price: string;
  duration: string;
  features: string[];
  status: "Active" | "Inactive";
}

export default function MembershipPlan() {
  const [plans, setPlans] = useState<MembershipPlan[]>([
    {
      plan: "Business",
      price: "$14.99",
      duration: "Monthly",
      features: ["Invoices", "No Hidden Fees"],
      status: "Inactive",
    },
    {
      plan: "Vehicle",
      price: "$14.99",
      duration: "Monthly",
      features: ["Invoices", "No Hidden Fees"],
      status: "Active",
    },
    {
      plan: "Property",
      price: "$14.99",
      duration: "Monthly",
      features: ["Invoices", "No Hidden Fees"],
      status: "Active",
    },
  ]);

  const getStatusStyle = (status: MembershipPlan["status"]) => {
    switch (status) {
      case "Active":
        return "bg-[#E8FFE5] text-[#4CD440]";
      case "Inactive":
        return "bg-[#FFF3E5] text-[#FF9C37]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = (planToDelete: string) => {
    setPlans(plans.filter((plan) => plan.plan !== planToDelete));
  };

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
      <h1 className="text-[32px] font-semibold text-[#0B1C39] mb-8">
        Membership Plan
      </h1>

      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <h2 className="text-lg font-medium text-[#0B1C39] p-4 border-b border-[#E2E8F0]">
          Membership
        </h2>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Headers */}
            <div className="grid grid-cols-5 bg-[#e6ecf2] px-6 py-4">
              <div className="text-xs font-semibold text-[#0B1C39]">Plan</div>
              <div className="text-xs font-semibold text-[#0B1C39]">Price</div>
              <div className="text-xs font-semibold text-[#0B1C39]">
                Duration
              </div>
              <div className="text-xs font-semibold text-[#0B1C39]">
                Features
              </div>
              <div className="text-xs font-semibold text-[#0B1C39]">Status</div>
            </div>

            {/* Plan Rows */}
            <div className="divide-y divide-[#E2E8F0]">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 px-6 py-4 hover:bg-gray-50 items-center"
                >
                  <div className="text-sm text-[#64748B]">{plan.plan}</div>
                  <div className="text-sm text-[#64748B]">{plan.price}</div>
                  <div className="text-sm text-[#64748B]">{plan.duration}</div>
                  <div className="text-sm text-[#64748B]">
                    <ul className="list-disc pl-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        plan.status
                      )}`}
                    >
                      {plan.status}
                    </span>
                    <div className="flex gap-2 justify-between items-center">
                      <button className="p-3 rounded-lg    text-primary-dark hover:bg-blue-100 border border-primary-dark">
                      <SquarePen size={18}/>
                      </button>

                      <button
                        onClick={() => handleDelete(plan.plan)}
                        className="text-white bg-[#EB3D4D] p-3 rounded-xl"
                      >
                        <TfiTrash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {plans.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No membership plans found
          </div>
        )}
      </div>
    </div>
  );
}
