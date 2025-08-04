"use client";
import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { TfiTrash } from "react-icons/tfi";
import { SquarePen } from "lucide-react"
import EditMembershipModal from "./_components/EditMembershipModal";

interface MembershipPlan {
  plan: string;
  price: string;
  duration: string;
  features: string[];
  status: "Active" | "Inactive";
}

export default function MembershipPlan() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Initial plan data
  const [membership, setMembership] = useState({
    planName: "Starter Plan",
    price: "9.99",
    billingCycle: "Monthly",
    features: "Support,Dashboard Access,Reports"
  });

  const handleUpdate = (updatedData: typeof membership) => {
    setMembership(updatedData); // update local state
    console.log("Updated membership plan:", updatedData); // optional: send to API
  };

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
    <div className="p-6 bg-[#F8FAFC] overflow-y-auto maxWidth">
      <h1 className="text-[32px] font-semibold text-[#0B1C39] mb-8">
        Membership Plan
      </h1>

      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <h2 className="text-lg font-medium text-[#0B1C39] p-4 border-b border-[#E2E8F0]">
          Membership
        </h2>

        <div className="border border-[#E2E8F0] rounded-b-xl overflow-x-auto text-nowrap maxWidth">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#E2E8F0]">
              {/* Table Header */}
              <thead className="bg-[#e6ecf2]">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-[#0B1C39]">
                    Plan
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-[#0B1C39]">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-[#0B1C39]">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-[#0B1C39]">
                    Features
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-[#0B1C39]">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-[#0B1C39]">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white divide-y divide-[#E2E8F0]">
                {plans.map((plan) => (
                  <tr key={plan.plan} className="hover:bg-gray-50">
                    {/* Plan Name */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#64748B]">
                      {plan.plan}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#64748B]">
                      {plan.price}
                    </td>

                    {/* Duration */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#64748B]">
                      {plan.duration}
                    </td>

                    {/* Features */}
                    <td className="px-6 py-4 text-sm text-[#64748B]">
                      <ul className="list-disc pl-4">
                        {plan.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(plan.status)}`}>
                        {plan.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="p-3 rounded-lg text-primary-dark hover:bg-blue-100 border border-primary-dark"
                          aria-label={`Edit ${plan.plan} plan`}
                        >
                          <SquarePen size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(plan.plan)}
                          className="text-white bg-[#EB3D4D] p-3 rounded-xl hover:bg-red-600 transition-colors"
                          aria-label={`Delete ${plan.plan} plan`}
                        >
                          <TfiTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal (positioned outside table but in same component) */}
          <EditMembershipModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onUpdate={handleUpdate}
            initialData={membership}
          />
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
