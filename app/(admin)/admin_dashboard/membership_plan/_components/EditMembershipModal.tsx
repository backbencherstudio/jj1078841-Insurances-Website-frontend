"use client";

import React from 'react';
import { X } from 'lucide-react';

interface EditMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: MembershipFormData) => void;
  initialData?: MembershipFormData;
}

interface MembershipFormData {
  planName: string;
  price: string;
  billingCycle: string;
  features: string;
}

export default function EditMembershipModal({ isOpen, onClose, onUpdate, initialData }: EditMembershipModalProps) {
  const [formData, setFormData] = React.useState<MembershipFormData>({
    planName: initialData?.planName || '',
    price: initialData?.price || '',
    billingCycle: initialData?.billingCycle || 'Monthly',
    features: initialData?.features || '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-[600px] mx-4">
        <div className="flex justify-between items-center p-6 border-b border-[#E2E8F0]">
          <h2 className="text-xl font-semibold text-[#0B1C39]">Edit Membership Plan</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan Name:
              </label>
              <input
                type="text"
                value={formData.planName}
                onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                className="w-full p-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Business Plan"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price:
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="14.99"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Billing Cycle:
              </label>
              <select
                value={formData.billingCycle}
                onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
                className="w-full p-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Features (comma-separated):
              </label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full p-2 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Estimates, Online Payments, No Hidden Fees, 100% Secure"
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#2EB0E4] text-white rounded-lg hover:bg-opacity-90 transition-all"
            >
              Update Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}