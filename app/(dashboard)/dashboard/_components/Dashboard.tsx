'use client'

import React, { useEffect, useState } from 'react';
import PdfIcon from "@/public/dashbordOverview/PdfIcon"
import ImageIcon from "@/public/dashbordOverview/ImageIcon"
import nookies from 'nookies'
import { UserService } from '@/service/user/user.service';
import toast from 'react-hot-toast';
import { TimelineStep, ClaimDataType, DocumentHubItem } from './types';

const documentHubItems: DocumentHubItem[] = [
  { title: 'Policy Docs', icon: <PdfIcon /> },
  { title: 'Damage Photos', icon: <ImageIcon /> },
  { title: 'Signed Forms', icon: <PdfIcon /> },
  { title: 'Carrier Correspondence', icon: <PdfIcon /> },
];

const todayTasks = [
  'Upload Photos of Damage',
  'Upload Insurance Policy / Declaration Page',
  'Submit Signed Public Adjuster Agreement',
  'Schedule Inspection (if needed)',
  'Await Response from Insurance Ally Team',
];

const timelineSteps: TimelineStep[] = [
  { name: 'Claim Filed' },
  { name: 'Inspection' },
  { name: 'Estimate Received' },
  { name: 'Supplement' },
  { name: 'Negotiation' },
  { name: 'Payment Released' },
  { name: 'Construction Complete' },
];

interface DashboardProps {
  id?: string;
}

export default function Dashboard({ id = "CLM-1753680588084" }: DashboardProps) {
  const [claimData, setClaimData] = useState<ClaimDataType>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClaims = async () => {
      const token = nookies.get(null).token;
      if (!token) {
        setError('Authentication required');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const res = await UserService.getSingleClaim(id);
        console.log(res)
        if (res?.statusText === "OK") {
          setClaimData(res.data);
        } else {
          setError(res?.response?.data?.message || "Failed to fetch data");
          toast.error(res?.response?.data?.message || "Failed to fetch data");
        }
      } catch (error) {
        console.error('Failed to fetch claim details', error);
        setError('Failed to load claim data');
        toast.error('Failed to load claim data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClaims();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-full space-y-8 p-4 md:p-6 overflow-y-auto" style={{height:'calc(100vh - 100px)'}}>
      {/* Row 1: Claim Summary & Today */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Claim Summary */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="text-white p-4 bg-primary-color rounded-t-xl">
            <h2 className="text-xl font-semibold">Claim Summary</h2>
          </div>
          <div className="p-4 space-y-2 text-sm text-gray-700">
            <p><strong className="font-medium">Claim Number:</strong> #{claimData?.claimSummary?.claimNumber || 'N/A'}</p>
            <p><strong className="font-medium">Status:</strong> {claimData?.claimSummary?.status || 'Inspection Scheduled'}</p>
            <p><strong className="font-medium">Carrier & Adjuster:</strong> {claimData?.claimSummary?.carrier || 'ABC Insurance'} - {claimData?.claimSummary?.adjuster || 'John Doe'}</p>
            <p className="text-xs text-gray-500 pt-1">Last Updated: {claimData?.claimSummary?.lastUpdated.split("T")[0]+" "+claimData?.claimSummary?.lastUpdated.split("T")[1].slice(0,5) || '2025-04-23 10:00 AM'}</p>
          </div>
        </div>

        {/* Today */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="text-white p-4 rounded-t-xl bg-primary-color">
            <h2 className="text-xl font-semibold">Today</h2>
          </div>
          <div className="p-4 space-y-3">
            {todayTasks.map((task, index) => (
              <label key={index} className="flex items-center space-x-2.5 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-offset-0"
                />
                <span>{task}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Document Hub */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="text-white p-4 bg-primary-color">
          <h2 className="text-xl font-semibold">Document Hub</h2>
        </div>
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {documentHubItems.map((item, index) => (
            <div key={index} className="space-y-2">
              <p className="text-base font-medium text-gray-700">{item.title}</p>
              <div 
                className="bg-gray-50 p-4 rounded-xl flex flex-col items-center justify-center space-y-2 border border-gray-200 min-h-[120px]"
                aria-label={`${item.title} section`}
              >
                {item.icon}
                <span className="sr-only">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Message Center & Payment Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Message Center */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="bg-primary-color text-white p-4">
            <h2 className="text-xl font-semibold">Message Center</h2>
          </div>
          <div className="p-4 space-y-4">
            <textarea
              className="w-full h-32 p-2 border border-gray-200 bg-gray-50 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 text-sm"
              placeholder="Message history area..."
              readOnly
              aria-label="Message history"
              style={{ resize: 'none' }}
            ></textarea>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                className="flex-1 bg-primary-color hover:bg-sky-600 text-white text-sm py-2.5 px-4 rounded-md transition duration-150 font-medium"
                aria-label="Request status update"
              >
                Request Status Update
              </button>
              <button 
                className="flex-1 bg-primary-color hover:bg-sky-600 text-white text-sm py-2.5 px-4 rounded-md transition duration-150 font-medium"
                aria-label="Send missing document alert"
              >
                Send Missing Doc Alert
              </button>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type your message....."
                className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 text-sm"
                aria-label="Type your message"
              />
              <button 
                className="bg-primary-dark hover:bg-primary-color text-white py-2 px-4 rounded-md transition duration-150 text-sm font-medium"
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Payment Tracker */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className='text-white p-4 bg-primary-color'>
            <h2 className="text-xl font-semibold">Payment Tracker</h2>
          </div>
          <div className="p-4 space-y-2">
              <div
                className={`flex justify-between items-center p-2 rounded-md text-sm`}
              >
                <span className={`font-semibold text-gray-700 bg-transparent`}>
                  Statement
                </span>
                <span 
                  className={`px-2 py-0.5 rounded-full text-xs bg-transparent text-gray-700 font-semibold`}                >
                  Status
                </span>
              </div>
              <div
                className={`flex justify-between items-center p-2 rounded-md text-sm`}
              >
                <span className={`font-semibold text-gray-700`}>
                  ACV Status
                </span>
                <span 
                  className={`px-2 py-0.5 rounded-full text-xs font-medium bg-primary-color text-white`}                >
                  {claimData?.paymentTracker?.acvStatus}
                </span>
              </div>
              <div
                className={`flex justify-between items-center p-2 rounded-md text-sm`}
              >
                <span className={`font-semibold text-gray-700`}>
                  RCV Status
                </span>
                <span 
                  className={`px-2 py-0.5 rounded-full text-xs font-medium bg-primary-color text-white`}                >
                  {claimData?.paymentTracker?.rcvStatus}
                </span>
              </div>
              <div
                className={`flex justify-between items-center p-2 rounded-md text-sm`}
              >
                <span className={`font-semibold text-gray-700`}>
                  Depreciation
                </span>
                <span 
                  className={`px-2 py-0.5 rounded-full text-xs font-medium bg-primary-color text-white`}                >
                  {claimData?.paymentTracker?.depreciation}
                </span>
              </div>
              <div
                className={`flex justify-between items-center p-2 rounded-md text-sm`}
              >
                <span className={`font-semibold text-gray-700`}>
                  Mortgage Endorsement
                </span>
                <span 
                  className={`px-2 py-0.5 rounded-full text-xs font-medium bg-primary-color text-white`}                >
                  {claimData?.paymentTracker?.mortgageEndorsement}
                </span>
              </div>
          </div>
        </div>
      </div>

      {/* Row 4: Claim Filed Timeline */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="text-white p-4 bg-primary-color">
          <h2 className="text-xl font-semibold">Claim Filed Timeline</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <div className="flex gap-2 md:gap-4 pb-2">
            {timelineSteps.map((step, index) => (
              <div 
                key={index} 
                className="flex-1 w-full text-nowrap bg-gray-100 p-2.5 rounded-md text-center text-sm text-gray-600 font-medium border border-gray-200"
                aria-label={`Timeline step: ${step.name}`}
              >
                {step.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}