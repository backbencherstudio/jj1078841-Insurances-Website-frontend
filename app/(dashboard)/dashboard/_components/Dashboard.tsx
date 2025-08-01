'use client'

import React, { useEffect, useState } from 'react';
// Removed unused react-icons: FaRegFilePdf, FaRegImage, FaRegPaperPlane
 import PdfIcon from "@/public/dashbordOverview/PdfIcon"
 import ImageIcon from "@/public/dashbordOverview/ImageIcon"
 import nookies from 'nookies'

// Type for Payment Tracker items
interface PaymentItem {
  statement: string;
  status: string;
  statusPillClasses: string; // Tailwind CSS classes for the status pill
  isHeader?: boolean;
}

// Type for Timeline items
interface TimelineStep {
  name: string;
  // Add 'active' or 'completed' if styling needs to differ based on state
}

type propType={
  id?:string;
}

export default function Dashboard({id="hello"}:propType) {
  // Removed unused constants: primaryHeaderColor, darkBlueButtonColor
  const [claimid,setClaimid] = useState("");

  useEffect(()=>{
    if(id){
      setClaimid(id);
    }else{
      setClaimid('CLM-1753680588084')
    }
    const initializeAuth = async () => {
      const token = nookies.get(null).token
      if (token) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const data = await response.json()
            setUser(data.data)
          }
        } catch (error) {
          console.error('Failed to validate token', error)
        }
      }
      setLoading(false)
    }

    initializeAuth()
  },[id])

  const paymentItems: PaymentItem[] = [
    { statement: 'Statement', status: 'Status', statusPillClasses: 'bg-transparent text-gray-700 font-semibold', isHeader: true },
    { statement: 'ACV Status', status: 'Received', statusPillClasses: 'bg-primary-color  text-white' },
    { statement: 'RCV Status', status: 'Pending', statusPillClasses:  "bg-primary-color text-white" },
    { statement: 'Depreciation', status: 'Estimated', statusPillClasses: 'bg-primary-color text-white' },
    { statement: 'Mortgage Endorsement', status: 'Required', statusPillClasses: 'bg-primary-color text-white' },
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

  const documentHubItems = [
    { title: 'Policy Docs', icon: <PdfIcon/>  },
    { title: 'Damage Photos', icon: <ImageIcon/>   },
    { title: 'Signed Forms', icon:  <PdfIcon/> },
    { title: 'Carrier Correspondence', icon: <PdfIcon /> },
  ];

  const todayTasks = [
    'Upload Photos of Damage',
    'Upload Insurance Policy / Declaration Page',
    'Submit Signed Public Adjuster Agreement',
    'Schedule Inspection (if needed)',
    'Await Response from Insurance Ally Team',
  ];

  return (
    <div className="min-h-screen space-y-8">
      {/* Row 1: Claim Summary & Today */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">
        {/* Claim Summary */}
        <div className=" flex-1   rounded-xl bg-white">
          <div className= "text-white p-3 sm:p-4 bg-primary-color rounded-t-xl">
            <h2 className="text-lg sm:text-xl font-semibold">Claim Summary</h2>
          </div>
          <div className="p-3 sm:p-4 space-y-2 text-sm text-gray-700">
            <p><strong className="font-medium">Claim Number:</strong> #12345</p>
            <p><strong className="font-medium">Status:</strong> Inspection Scheduled</p>
            <p><strong className="font-medium">Carrier & Adjuster:</strong> ABC Insurance - John Doe</p>
            <p className="text-xs text-gray-500 pt-1">Last Updated: 2025-04-23 10:00 AM</p>
          </div>
        </div>

        {/* Today */}
        <div className="flex-1   rounded-xl bg-white">
          <div className=   "text-white p-3 sm:p-4 rounded-t-xl bg-primary-color" >
            <h2 className="text-lg sm:text-xl font-semibold">Today</h2>
          </div>
          <div className="p-3 sm:p-4 space-y-3">
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
      <div className="bg-white   rounded-lg overflow-hidden">
        <div className=   "text-white p-3 sm:p-4 bg-primary-color" >
          <h2 className="text-lg sm:text-xl font-semibold">Document Hub</h2>
        </div>
        <div className="py-6 sm:p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4  ">
          {documentHubItems.map((item, index) => (  
            <div key={index}> {/* Key on the outermost element */}
              <p className="text-base   font-medium text-gray-bold  mb-2">{item.title}</p>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center space-y-2 border border-gray-200 min-h-[100px] sm:min-h-[120px]"> {/* Removed redundant key */}
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Message Center & Payment Tracker */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">
        {/* Message Center */}
        <div className="flex-1 bg-white rounded-lg overflow-hidden">
          <div className= " bg-primary-color  text-white p-3 sm:p-4" >
            <h2 className="text-lg sm:text-xl font-semibold">Message Center</h2>
          </div>
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
            <textarea
              className="w-full h-32 sm:h-24 p-2 border border-border-light bg-disabled rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 text-sm"
              placeholder="Message history area..."
              readOnly 
              style={{ resize: 'none' }}
            ></textarea>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button className= "flex-1 bg-primary-color  hover:bg-sky-600 text-white text-xs sm:text-sm py-2.5  sm:px-4 rounded-md transition duration-150 font-medium" >
                Request Status Update
              </button>
              <button className="flex-1 bg-primary-color  hover:bg-sky-600 text-white text-xs sm:text-sm py-2.5  sm:px-4 rounded-md transition duration-150 font-medium">
                Send Missing Doc Alert
              </button>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <input
                type="text"
                placeholder="Type your message....."
                className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 text-sm"
              />
              <button className=  "hover:bg-primary-color text-white py-2 px-14 sm:px-4 rounded-md transition duration-150 text-sm font-medium   bg-primary-dark">
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Payment Tracker */}
        <div className="flex-1 bg-white   rounded-lg overflow-hidden">
          <div className= 'text-white p-3 sm:p-4 bg-primary-color' > {/* Corrected className */}
            <h2 className="text-lg sm:text-xl font-semibold">Payment Tracker</h2>
          </div>
          <div className="p-3 sm:p-4 space-y-1.5">
            {paymentItems.map((item, index) => (
              <div 
                key={index} 
                className={`flex justify-between items-center p-2 rounded-md text-sm ${item.isHeader ? '' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <span className={`${item.isHeader ? 'font-semibold text-gray-700' : 'text-gray-700'}`}>{item.statement}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.statusPillClasses}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Claim Filed Timeline */}
      <div className="bg-white   rounded-lg overflow-hidden">
        <div className=  " text-white p-3 sm:p-4 bg-primary-color" >
          <h2 className="text-lg sm:text-xl font-semibold">Claim Filed Timeline</h2>
        </div>
        <div className="p-3 sm:p-4 overflow-x-auto">
          <div className="flex   gap-4  flex-wrap pb-2">
            {timelineSteps.map((step, index) => (
              <div key={index} className="flex-1 min-w-[90px] sm:min-w-[110px] bg-gray-100 p-2.5 rounded-md text-center text-xs sm:text-sm text-gray-600 font-medium border border-gray-200">
                {step.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}