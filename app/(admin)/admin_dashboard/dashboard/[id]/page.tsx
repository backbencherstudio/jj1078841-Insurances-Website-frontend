'use client'

import React from 'react';
// Removed unused react-icons: FaRegFilePdf, FaRegImage, FaRegPaperPlane
import PdfIcon from "@/public/dashbordOverview/PdfIcon"
import ImageIcon from "@/public/dashbordOverview/ImageIcon"
import { useForm } from 'react-hook-form';
import { Span } from 'next/dist/trace';
import SummaryForm from '@/app/(dashboard)/dashboard/_components/SummeryForm';
import TodayTable from '@/app/(dashboard)/dashboard/_components/TodayTable';
import DocumentCard from '@/app/(dashboard)/dashboard/_components/DocumentCard';

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

export default function Dashboard({params}) {
    const {id} = params;
  // Removed unused constants: primaryHeaderColor, darkBlueButtonColor
  const { handleSubmit, register, formState: { errors } } = useForm();

  const paymentItems: PaymentItem[] = [
    { statement: 'Statement', status: 'Status', statusPillClasses: 'bg-transparent text-gray-700 font-semibold', isHeader: true },
    { statement: 'ACV Status', status: 'Received', statusPillClasses: 'bg-primary-color  text-white' },
    { statement: 'RCV Status', status: 'Pending', statusPillClasses: "bg-primary-color text-white" },
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

  return (
    <div className="h-full max-h-[calc(100vh-130px)] space-y-8 overflow-y-auto px-6 pt-6">
      {/* Row 1: Claim Summary & Today */}
      <div className="flex flex-col xl:flex-row h-fit w-full justify-center gap-6">
        {/* Claim Summary */}
        <div className="flex-1 h-full max-h-[526px]  rounded-xl shadow-sm overflow-hidden">
          <div className="text-white p-3 sm:p-4 bg-[#1e90ff] rounded-t-xl">
            <h2 className="text-md sm:text-lg font-semibold">Claim Summary</h2>
          </div>
          {/* <div className="p-3 sm:p-4 space-y-2 text-sm text-gray-700">
            <p><strong className="font-medium">Claim Number:</strong> #12345</p>
            <p><strong className="font-medium">Status:</strong> Inspection Scheduled</p>
            <p><strong className="font-medium">Carrier & Adjuster:</strong> ABC Insurance - John Doe</p>
            <p className="text-xs text-gray-500 pt-1">Last Updated: 2025-04-23 10:00 AM</p>
          </div> */}
          <div className='p-4'>
            <SummaryForm />
          </div>
        </div>

        {/* Today */}
        <div className="flex-1 max-h-[526px]  rounded-xl bg-transparent overflow-hidden">
          <div className="text-white p-3 sm:p-4 rounded-t-xl bg-[#1e90ff]" >
            <h2 className="text-md sm:text-lg font-semibold">Today</h2>
          </div>
          <div className='p-4 rounded-lg'>
            {/* <div className="p-3 sm:p-4 space-y-3 bg-white rounded-lg">
              {todayTasks.map((task, index) => (
                <label key={index} className="flex items-center space-x-2.5 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-offset-0"
                  />
                  <span>{task}</span>
                </label>
              ))}
            </div> */}
            <div className='w-full h-full max-h-[435px] overflow-y-auto rounded-b-md'>
              <TodayTable />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Document Hub */}
      <div className="rounded-lg overflow-hidden">
        <div className="text-white p-3 sm:p-4 bg-[#1e90ff]" >
          <h2 className="text-md sm:text-lg font-semibold">Document Hub</h2>
        </div>
        <div className="p-4">
          {/* {documentHubItems.map((item, index) => ( */}
          {/* <div key={index}> */}
          {/* <p className="text-base   font-medium text-gray-bold  mb-2">{item.title}</p> */}
          {/* <div className="bg-gray-50 p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center space-y-2 border border-gray-200 min-h-[100px] sm:min-h-[120px]"> */}
          {/* {item.icon} */}
          {/* </div> */}
          {/* </div> */}
          {/* ))} */}
          <div className='bg-white rounded-lg'>
            {/* <h3 className='bg-[#1e90ff] w-full text-white font-medium text-xl p-2 rounded-t-md'>Document Hub</h3> */}
            <div className='p-5 flex flex-wrap gap-6 sm:gap-4'>
              {
                documentHubItems.map(item => (
                  <DocumentCard key={item.title} title={item.title} />
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Message Center & Payment Tracker */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">
        {/* Payment Tracker */}
        <div className="flex-1 rounded-lg overflow-hidden">
          <div className='text-white p-3 sm:p-4 bg-[#1e90ff]' > {/* Corrected className */}
            <h2 className="text-md sm:text-lg font-semibold">Payment Tracker</h2>
          </div>
          <div className='p-4'>
            <h2 className='text-xl font-medium p-2'>Payment Tracker</h2>
            <div className="p-3 sm:p-4 space-y-1.5 bg-white rounded-lg">
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
      </div>

      {/* Row 4: Claim Filed Timeline */}
      <div className="bg-white   rounded-lg overflow-hidden">
        <div className=" text-white p-3 sm:p-4 bg-[#1e90ff]" >
          <h2 className="text-md sm:text-lg font-semibold">Claim Filed Timeline</h2>
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