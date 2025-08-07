'use client'

import React, { ReactElement, useEffect, useState } from 'react';
import PdfIcon from "@/public/dashbordOverview/PdfIcon"
import ImageIcon from "@/public/dashbordOverview/ImageIcon"
import nookies from 'nookies'
import { UserService } from '@/service/user/user.service';
import toast from 'react-hot-toast';
import { TimelineStep, ClaimDataType, DocumentHubItem } from './types';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import DocumentCard from './DocumentCard';
import Link from 'next/link';

const todayTasks = [
  { title: 'Upload Photos of Damage', status: true,file: 'policyDocs'},
  { title: 'Upload Insurance Policy / Declaration Page', status: true,file: 'damagePhotos' },
  { title: 'Submit Signed Public Adjuster Agreement', status: false,file: 'signedForms' },
  { title: 'Schedule Inspection (if needed)', status: false,file: 'carrierCorrespondence' },
  { title: 'Await Response from Insurance Ally Team', status: false },
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

interface DocumentItem {
  title: string;
  icon: ReactElement;
  fileUrl?: string;
  lastUpdate?: string;
}



interface DashboardProps {
  id?: string;
}

export default function Dashboard({ id }: DashboardProps) {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [claimData, setClaimData] = useState<ClaimDataType>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [policyDocs, setPolicyDocs] = useState<File>();
  const [damagePhotos, setDamagePhotos] = useState<FileList>();
  const [signedForm, setSignedForm] = useState<File>();
  const [carrierCorrespondence, setCarrierCorrespondence] = useState<File>();


  const documentItems: DocumentItem[] = [
    {
      title: 'Policy Docs',
      icon: <PdfIcon />,
      fileUrl: claimData?.documentHub?.policyDocs
    },
    {
      title: 'Damage Photos',
      icon: <ImageIcon />,
      fileUrl: claimData?.documentHub?.damagePhotos?.[0]
    },
    {
      title: 'Signed Forms',
      icon: <PdfIcon />,
      fileUrl: claimData?.documentHub?.signedForms
    },
    {
      title: 'Carrier Correspondence',
      icon: <PdfIcon />,
      fileUrl: claimData?.documentHub?.carrierCorrespondence
    },
  ];


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

  const handleMessageSend = async (data) => {
    const message = data.message;
    console.log(message);
    const token = nookies.get(null).token;
    if (!token) {
      setError('Authentication required');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await UserService.sendMessage(message, id);
      console.log(res);
      if (res?.statusText === "Created") {
        toast.success("Message is sent to InsuranceAlly");
      } else {
        setError(res?.response?.data?.message || "Failed to send message");
        toast.error(res?.response?.data?.message || "Failed to send message");
      }
    } catch (error) {
      console.error('Failed to send message', error);
      setError('Failed to send message');
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };


  // File upload handlers for each document type
  const handlePolicyDocsUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('policy_docs', file);
      const res = await UserService.updateClaimDocuments(formData, claimData?.claimSummary?.id);
      if (res?.statusText === "OK") {
        toast.success("Policy documents updated successfully");
      }
    } catch (err) {
      toast.error("Failed to upload policy documents");
    }
  };

  const handleDamagePhotosUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('damage_photos', file);
      const res = await UserService.updateClaimDocuments(formData, claimData?.claimSummary?.id);
      if (res?.statusText === "OK") {
        toast.success("Damage photos updated successfully");
      }
    } catch (err) {
      toast.error("Failed to upload damage photos");
    }
  };

  const handleSignedFormsUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('signed_forms', file);
      console.log("File : ", file);
      const res = await UserService.updateClaimDocuments(formData, claimData?.claimSummary?.id);
      if (res?.statusText === "OK") {
        toast.success("Signed forms updated successfully");
      }
    } catch (err) {
      toast.error("Failed to upload signed forms");
    }
  };

  const handleCarrierCorrespondenceUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('carrier_correspondence', file);
      const res = await UserService.updateClaimDocuments(formData, claimData?.claimSummary?.id);
      console.log(res)
      if (res?.statusText === "OK") {
        toast.success("Carrier correspondence updated successfully");
      }
    } catch (err) {
      toast.error("Failed to upload carrier correspondence");
    }
  };

  const handleRequestStatusUpdate = async () => {
    const message = "What is my current status";
    console.log(message);
    const token = nookies.get(null).token;
    if (!token) {
      setError('Authentication required');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await UserService.sendMessage(message, id);
      console.log(res);
      if (res?.statusText === "Created") {
        toast.success("Message is sent to InsuranceAlly");
      } else {
        setError(res?.response?.data?.message || "Failed to send message");
        toast.error(res?.response?.data?.message || "Failed to send message");
      }
    } catch (error) {
      console.error('Failed to send message', error);
      setError('Failed to send message');
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }
  const handleMissingDocAlert = async () => {
    const message = "I have some missing documents. What to do now can you guide me.";
    console.log(message);
    const token = nookies.get(null).token;
    if (!token) {
      setError('Authentication required');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await UserService.sendMessage(message, id);
      console.log(res);
      if (res?.statusText === "Created") {
        toast.success("Message is sent to InsuranceAlly");
      } else {
        setError(res?.response?.data?.message || "Failed to send message");
        toast.error(res?.response?.data?.message || "Failed to send message");
      }
    } catch (error) {
      console.error('Failed to send message', error);
      setError('Failed to send message');
      toast.error('Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="h-full space-y-8 p-4 md:p-6 overflow-y-auto maxWidth" style={{ height: 'calc(100vh - 100px)' }} suppressHydrationWarning={true}>
      {/* Row 1: Claim Summary & Today */}
      <Toaster position='top-right' />
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
            {claimData?.claimSummary?.lastUpdated ? (
              <p className="text-xs text-gray-500 pt-1">
                Last Updated: {
                  claimData.claimSummary.lastUpdated
                    .split("T")[0] + " " +
                  claimData.claimSummary.lastUpdated.split("T")[1].slice(0, 5)
                }
              </p>
            ) : (
              <p className="text-xs text-gray-500 pt-1">Last Updated: Loading...</p>
            )}

          </div>
        </div>

        {/* Today */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="text-white p-4 rounded-t-xl bg-primary-color">
            <h2 className="text-xl font-semibold">Task</h2>
          </div>
          <div className="p-4 space-y-3 overflow-x-auto">
            {todayTasks.map((task, index) => (
              <label key={index} className="flex items-center space-x-2.5 text-sm text-gray-700 cursor-pointer text-nowrap min-w-[400px]">
                {/* <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-offset-0"
                /> */}
                <div className='flex gap-6 justify-between w-full'>
                  <span>{task?.title}</span>
                  {claimData.documentHub[task?.file] ?
                    <span className='text-green-500'>Complete</span>
                    :
                    <span className='text-[#F00]'>Incomplete</span>
                  }
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Document Hub */}
      <div className="rounded-lg overflow-hidden shadow-sm">
        <div className="text-white p-3 sm:p-4 bg-[#1e90ff]">
          <h2 className="text-md sm:text-lg font-semibold">Document Hub</h2>
        </div>
        <div className="p-4">
          <div className='bg-white rounded-lg'>
            <div className='p-5 flex flex-wrap gap-6 sm:gap-4'>
              {documentItems.map((item, index) => (
                item.fileUrl ? (
                  <div key={index} className="bg-[#f9f9f9] p-4 rounded-lg space-y-2 grow">
                    <h3 className="text-center">{item.title}</h3>
                    <Link
                      target='_blank'
                      href={`https://backend.insurancesally.com${item.fileUrl}`}
                      className="min-h-[80px] cursor-pointer text-center border border-dashed bg-white rounded flex items-center justify-center"
                    >
                      {item.icon}
                    </Link>
                  </div>
                ) : (
                  <DocumentCard
                    key={index}
                    title={item.title}
                    lastUpdate={item.lastUpdate}
                    icon={item.icon}
                    handleFileChange={
                      item.title === 'Policy Docs' ? handlePolicyDocsUpload :
                        item.title === 'Damage Photos' ? handleDamagePhotosUpload :
                          item.title === 'Signed Forms' ? handleSignedFormsUpload :
                            handleCarrierCorrespondenceUpload
                    }
                  />
                )
              ))}
            </div>
            {/* <button
              type="button"
              className='text-white bg-[#1e90ff] px-4 py-1 text-sm font-medium rounded-sm cursor-pointer mx-4 mb-4'
              onClick={handleUpdateStatus}
            >
              Save
            </button> */}
          </div>
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
                onClick={handleRequestStatusUpdate}
              >
                Request Status Update
              </button>
              <button
                className="flex-1 bg-primary-color hover:bg-sky-600 text-white text-sm py-2.5 px-4 rounded-md transition duration-150 font-medium"
                aria-label="Send missing document alert"
                onClick={handleMissingDocAlert}
              >
                Send Missing Doc Alert
              </button>
            </div>
            <form onSubmit={handleSubmit(handleMessageSend)} className="flex items-center gap-3" onSubmitCapture={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Type your message....."
                className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 text-sm"
                aria-label="Type your message"
                {...register("message", { required: "Enter the message" })}
              />
              {errors.message && <span>Enter the message</span>}
              <button
                type='submit'
                className="bg-primary-dark hover:bg-primary-color text-white py-2 px-4 rounded-md transition duration-150 text-sm font-medium"
                aria-label="Send message"
              >
                Send
              </button>
            </form>
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
                className={`flex-1 w-full text-nowrap p-2.5 rounded-md text-center text-sm font-medium ${parseInt(claimData.claimTimeline) === index + 1 ? "text-white p-4 bg-primary-color" : "border border-gray-200 text-gray-600 bg-gray-100"}`}
                aria-label={`Timeline step: ${step.name}`}
              >
                {step.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}