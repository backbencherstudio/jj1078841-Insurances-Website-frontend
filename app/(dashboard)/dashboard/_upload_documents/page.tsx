import React from 'react';

// A simple SVG Cloud Icon component
const CloudUploadIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
  </svg>
);

interface DocumentUploadItem {
  id: string;
  title: string;
  dropzoneText: string;
}

const documentUploadItems: DocumentUploadItem[] = [
  {
    id: 'policy_docs',
    title: 'Policy Docs',
    dropzoneText: 'Policy Docs',
  },
  {
    id: 'damage_photos',
    title: 'Damage Photos',
    dropzoneText: 'Damage Photos',
  },
  {
    id: 'signed_forms',
    title: 'Signed Forms',
    dropzoneText: 'Signed Forms',
  },
  {
    id: 'carrier_correspondence',
    title: 'Carrier Correspondence',
    dropzoneText: 'Carrier Correspondence',
  },
];

export default function UploadDocuments() {
  return (
    <div className=" min-h-screen bg-gray-50">
      <div className=" ">
        <h1 className="text-[40px]   font-semibold text-primary-dark mb-4">
          Upload Documents
        </h1>
       
<div className=' bg-white border border-border-light rounded-xl px-6'>

        <div className=" sm:p-8 rounded-xl    space-y-8 max-w-6xl   mx-auto  ">
        <p className="text-text-light font-normal text-lg mb-8    text-center py-7">
          Upload all necessary documents to keep your insurance claim on track. Make
          sure each file is clear, legible, and appropriately categorized.
        </p>
          {documentUploadItems.map((item) => (
            <div key={item.id}>
              <h2 className="text-base font-medium   text-gray-bold mb-3">
                {item.title} 
              </h2>
              <div className="border-2 border-dashed border-sky-400 rounded-lg p-8 sm:p-12 flex flex-col items-center justify-center bg-disabled cursor-pointer hover:bg-sky-100 transition-colors duration-150 ">
                <CloudUploadIcon className="w-10 h-10 sm:w-12 sm:h-12 text-sky-500 mb-3" />
                <p className="text-sm sm:text-base text-gray-500">
                  {item.dropzoneText}
                </p>
                {/* You can add a hidden file input here for actual uploads */}
                {/* <input type="file" className="hidden" /> */}
              </div>
            </div>
          ))}
        </div>
</div>
      </div>
    </div>
  );
}
