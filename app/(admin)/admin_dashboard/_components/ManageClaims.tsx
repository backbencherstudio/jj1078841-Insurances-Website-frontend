'use client'

import React, { ReactElement, useEffect, useState } from 'react';
import PdfIcon from "@/public/dashbordOverview/PdfIcon";
import ImageIcon from "@/public/dashbordOverview/ImageIcon";
import { useForm } from 'react-hook-form';
import SummaryForm from '@/app/(dashboard)/dashboard/_components/SummeryForm';
import { UserService } from '@/service/user/user.service';
import nookies from 'nookies';
import { TimelineStep } from '@/app/(dashboard)/dashboard/_components/types';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import DocumentCard from '@/app/(dashboard)/dashboard/_components/DocumentCard';

// Define proper types
interface PaymentItem {
  acv_status: string;
  rcv_status: string;
  depreciation_status: string;
  mortgage_status: string;
}

interface UserType {
  address: string;
  city: string;
  country: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  state: string;
  zip_code: string;
}

interface ClaimDataType {
  fullName: string;
  claim_number: string;
  policy_number: string;
  address: string;
  city: string;
  country: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  state: string;
  zip_code: string;
  insurance_company: string;
  adjuster: string;
  last_updated?: string;
  policy_docs?: string;
  damage_photos?: string[];
  signed_forms?: string;
  carrier_correspondence?: string;
}

interface DocumentItem {
  title: string;
  icon: ReactElement;
  fileUrl?: string;
  lastUpdate?: string;
}

const getPaymentStatusClasses = (status: string) => {
  switch (status) {
    case 'Approved': return 'bg-green-100 text-green-800';
    case 'Released': return 'bg-blue-100 text-blue-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Cancelled': return 'bg-red-100 text-red-800';
    case 'Not Required': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};


interface PageProps {
    id: string;
}

export default function ManageClaims({id}:PageProps) {
    
  const [paymentItems, setPaymentItems] = useState<PaymentItem>({
    acv_status: '',
    rcv_status: '',
    depreciation_status: '',
    mortgage_status: ''
  });
  const [selectedClaimTimeLine, setSelectedClaimTimeLine] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [claimData, setClaimData] = useState<ClaimDataType | null>(null);

  const { handleSubmit, register, formState: { errors } } = useForm();

  const timelineSteps: TimelineStep[] = [
    { name: 'Claim Filed' },
    { name: 'Inspection' },
    { name: 'Estimate Received' },
    { name: 'Supplement' },
    { name: 'Negotiation' },
    { name: 'Payment Released' },
    { name: 'Construction Complete' },
  ];

  const documentItems: DocumentItem[] = [
    {
      title: 'Policy Docs',
      icon: <PdfIcon />,
      fileUrl: claimData?.policy_docs,
      lastUpdate: claimData?.last_updated?.split("T")[0]
    },
    {
      title: 'Damage Photos',
      icon: <ImageIcon />,
      fileUrl: claimData?.damage_photos?.[0],
      lastUpdate: claimData?.last_updated?.split("T")[0]
    },
    {
      title: 'Signed Forms',
      icon: <PdfIcon />,
      fileUrl: claimData?.signed_forms,
      lastUpdate: claimData?.last_updated?.split("T")[0]
    },
    {
      title: 'Carrier Correspondence',
      icon: <PdfIcon />,
      fileUrl: claimData?.carrier_correspondence,
      lastUpdate: claimData?.last_updated?.split("T")[0]
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
        const res = await UserService.getSingleClaimAdmin(id);

        if (res?.statusText === "OK") {
          setClaimData(res.data);
          setSelectedClaimTimeLine(parseInt(res?.data?.claim_timeline));
          setPaymentItems({
            acv_status: res?.data?.acv_status || '',
            rcv_status: res?.data?.rcv_status || '',
            depreciation_status: res?.data?.depreciation_status || '',
            mortgage_status: res?.data?.mortgage_status || ''
          });
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

  const handleStatusChange = (key: keyof PaymentItem, newStatus: string) => {
    setPaymentItems(prev => ({
      ...prev,
      [key]: newStatus
    }));
  };

  const handleUpdateStatus = async () => {
    if (!id) {
      toast.error("Missing claim ID");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('acv_status', paymentItems.acv_status);
      formData.append('rcv_status', paymentItems.rcv_status);
      formData.append('depreciation_status', paymentItems.depreciation_status);
      formData.append('mortgage_status', paymentItems.mortgage_status);

      const res = await UserService.updatePaymentTracker(formData, id);
      if (res?.status >= 200 && res?.status < 300) {
        toast.success("Payment tracker updated successfully");
      } else {
        toast.error("Failed to update payment tracker");
      }
    } catch (err) {
      console.error('Error updating payment tracker:', err);
      toast.error(
        err.response?.data?.message ||
        "An error occurred while updating payment tracker"
      );
    }
  };

  const handleTimelineUpdate = async () => {
    try {
      const res = await UserService.updateClaimTimeline(
        { "claim_timeline": selectedClaimTimeLine.toString() },
        id
      );
      if (res?.statusText === "OK") {
        toast.success("Timeline updated.");
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error("Failed to update timeline");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // File upload handlers for each document type
  const handlePolicyDocsUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('policy_docs', file);
      const res = await UserService.updateClaimDocuments(formData, id);
      // if (res?.status >= 200 && res?.status < 300) {
      //   toast.success("Policy documents updated successfully");
      //   // Refresh claim data
      //   // fetchClaims();
      // }
    } catch (err) {
      toast.error("Failed to upload policy documents");
    }
  };

  const handleDamagePhotosUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('damage_photos', file);
      const res = await UserService.updateClaimDocuments(formData, id);
      // if (res?.status >= 200 && res?.status < 300) {
      //   toast.success("Damage photos updated successfully");
      //   // fetchClaims();
      // }
    } catch (err) {
      toast.error("Failed to upload damage photos");
    }
  };

  const handleSignedFormsUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('signed_forms', file);
      console.log("File : ",file);
      const res = await UserService.updateClaimDocuments(formData, id);
      // if (res?.status >= 200 && res?.status < 300) {
      //   toast.success("Signed forms updated successfully");
      //   // fetchClaims();
      // }
    } catch (err) {
      toast.error("Failed to upload signed forms");
    }
  };

  const handleCarrierCorrespondenceUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('carrier_correspondence', file);
      const res = await UserService.updateClaimDocuments(formData, id);
      // if (res) {
      //   toast.success("Carrier correspondence updated successfully");
      //   // fetchClaims();
      // }
    } catch (err) {
      toast.error("Failed to upload carrier correspondence");
    }
  };

  return (
    <div className="h-full max-h-[calc(100vh-130px)] space-y-8 overflow-y-auto px-6 pt-6">
      <Toaster position='top-right' />

      {/* Row 1: Claim Summary */}
      <div className="flex flex-col xl:flex-row h-fit w-full justify-center gap-6">
        <div className="flex-1 h-full max-h-[526px] rounded-xl shadow-sm overflow-hidden">
          <div className="text-white p-3 sm:p-4 bg-[#1e90ff] rounded-t-xl">
            <h2 className="text-md sm:text-lg font-semibold">Claim Summary</h2>
          </div>
          <div className='py-4'>
            <SummaryForm claimData={claimData} id={id} />
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
                  <div key={index} className="bg-[#f9f9f9] p-4 rounded-lg space-y-2 grow min-w-fit">
                    <h3 className="text-center">{item.title}</h3>
                    <Link
                      target='_blank'
                      href={`https://backend.insurancesally.com${item.fileUrl}`}
                      className="min-h-[80px] cursor-pointer text-center border border-dashed bg-white rounded flex items-center justify-center"
                    >
                      {item.icon}
                    </Link>
                    <span className="text-xs text-center w-full block">
                      Last Update: {item.lastUpdate}
                    </span>
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

      {/* Row 3: Payment Tracker */}
      <div className="flex-1 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
        <div className='text-white p-3 sm:p-4 bg-[#1e90ff]'>
          <h2 className="text-md sm:text-lg font-semibold">Payment Tracker</h2>
        </div>
        <div className='p-4 bg-white'>
          <div className="space-y-1.5">
            <div className={`flex justify-between items-center p-3 rounded-md text-sm bg-gray-100`}>
              <span className={`font-semibold text-gray-700`}>
                Statement
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium">
                Status
              </span>
            </div>
            {Object.entries(paymentItems).map(([key, value]) => (
              <div
                key={key}
                className={`flex justify-between items-center p-3 rounded-md text-sm bg-gray-50 hover:bg-gray-100`}
              >
                <span className={`text-gray-700 capitalize`}>
                  {key.replace('_', ' ')}
                </span>
                <select
                  className={`px-2 py-0.5 rounded-full text-xs font-medium appearance-none cursor-pointer ${getPaymentStatusClasses(value)}`}
                  value={value}
                  onChange={(e) => handleStatusChange(key as keyof PaymentItem, e.target.value)}
                >
                  <option value="Approved" className="bg-green-100 text-green-800">Approved</option>
                  <option value="Released" className="bg-blue-100 text-blue-800">Released</option>
                  <option value="Pending" className="bg-yellow-100 text-yellow-800">Pending</option>
                  <option value="Cancelled" className="bg-red-100 text-red-800">Cancelled</option>
                  <option value="Not Required" className="bg-gray-100 text-gray-800">Not Required</option>
                </select>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className='text-white bg-[#1e90ff] px-4 py-1 text-sm font-medium rounded-sm cursor-pointer m-4'
          onClick={handleUpdateStatus}
        >
          Save
        </button>
      </div>

      {/* Row 4: Claim Filed Timeline */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="text-white p-3 sm:p-4 bg-[#1e90ff]">
          <h2 className="text-md sm:text-lg font-semibold">Claim Filed Timeline</h2>
        </div>
        <button
          type="button"
          className='text-white bg-[#1e90ff] px-4 py-1 text-sm font-medium rounded-sm cursor-pointer mx-4 mt-4'
          onClick={handleTimelineUpdate}
        >
          Save
        </button>
        <div className="p-3 sm:p-4 pr-4 overflow-x-auto w-full">
          <div className="flex gap-4 pb-2">
            {timelineSteps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 text-nowrap p-2.5 rounded-md text-center text-xs sm:text-sm font-medium cursor-pointer ${selectedClaimTimeLine === index + 1
                  ? "text-white bg-primary-color"
                  : "border border-gray-200 text-gray-600 bg-gray-100"
                  }`}
                onClick={() => setSelectedClaimTimeLine(index + 1)}
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