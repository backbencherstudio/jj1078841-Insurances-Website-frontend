import { ReactElement, useState, ChangeEvent } from "react";
import { FaFileInvoice, FaFilePdf, FaFileImage, FaFileAlt } from "react-icons/fa";

interface PropsType {
  title: string;
  lastUpdate?: string;
  handleFileChange: (file: File) => void;
  icon: ReactElement;
}

const getFileIcon = (title: string) => {
  switch (title.toLowerCase()) {
    case 'policy docs':
    case 'signed forms':
    case 'carrier correspondence':
      return <FaFilePdf className="text-red-500 text-2xl" />;
    case 'damage photos':
      return <FaFileImage className="text-blue-500 text-2xl" />;
    default:
      return <FaFileAlt className="text-gray-500 text-2xl" />;
  }
};

export default function DocumentCard({ title, lastUpdate, handleFileChange, icon }: PropsType) {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCurrentFile(file);
      setFileName(file.name);
      handleFileChange(file);
    }
  };

  return (
    <div className="bg-[#f9f9f9] p-4 rounded-lg space-y-2 grow min-w-fit">
      <h3 className="text-center font-medium">{title}</h3>
      <div className="min-h-[80px] text-center border border-dashed bg-white rounded flex flex-col items-center justify-center">
        {currentFile ? (
          <div className="w-full h-full min-h-[80px] flex flex-col items-center justify-center p-2">
            {getFileIcon(title)}
            <p className="text-xs mt-2 text-gray-600 truncate w-full px-2">{fileName}</p>
          </div>
        ) : (
          <div className="w-full h-full min-h-[80px] flex flex-col items-center justify-center">
            {icon}
            <p className="text-sm text-gray-500 mt-1">No documents yet</p>
          </div>
        )}
      </div>
      <label 
        htmlFor={`file-upload-${title.replace(/\s+/g, '-').toLowerCase()}`} 
        className="block text-xs w-fit cursor-pointer font-medium pt-3 mx-auto"
      >
        <span className="p-1 px-2 rounded bg-white border border-[#666] hover:bg-gray-100 transition">
          Choose file
        </span>
        <span className="ml-2 text-gray-500">
          {currentFile ? fileName : 'No file chosen'}
        </span>
      </label>
      <input 
        type="file" 
        id={`file-upload-${title.replace(/\s+/g, '-').toLowerCase()}`} 
        className="hidden" 
        onChange={handleChange}
        accept={title === 'Damage Photos' ? 'image/*' : '.pdf,.doc,.docx'}
      />
      {lastUpdate && (
        <span className="text-xs text-center w-full block text-gray-500">
          Last Update: {lastUpdate}
        </span>
      )}
    </div>
  );
}