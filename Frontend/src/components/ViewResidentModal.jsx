import { IoArrowBack, IoClose } from "react-icons/io5";
import { FaEye } from 'react-icons/fa';

export default function ViewResidentModal({ isOpen, onClose, resident }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70">
      <div className="bg-white w-full h-full max-w-4xl overflow-hidden rounded-lg shadow-lg">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <IoClose size={24} className="text-gray-600 hover:text-gray-800" />
        </button>

        <div className="h-full overflow-y-auto">
          <div className="sticky top-0 bg-white px-6 py-4 flex items-center gap-3 border-b border-gray-200 z-10">
            <button onClick={onClose} className="text-gray-600">
              <IoArrowBack size={24} />
            </button>
            <h2 className="text-2xl font-semibold">View Owner Details</h2>
          </div>

          <div className="flex flex-col p-6">
            <div className="flex flex-col items-center py-4">
              <img 
                src={resident?.profileImage || '/default-avatar.png'} 
                alt="Profile" 
                className="w-24 h-24 rounded-full mb-2"
              />
              <h3 className="text-xl font-semibold mb-1">
                {resident?.fullName || 'Roger Lubin'}
              </h3>
              <p className="text-sm text-gray-500">
                {resident?.email || 'RogerLubin@gmail.com'}
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-4 mb-4">
              <h4 className="text-lg font-medium mb-2">Details</h4>
              <div className="space-y-4">
                <DetailRow label="Wing" value={resident?.wing || 'A'} />
                <DetailRow label="Unit" value={resident?.unit || '101'} />
                <DetailRow label="Age" value={resident?.age || '20'} />
                <DetailRow label="Gender" value={resident?.gender || 'Male'} />
              </div>
            </div>

            <DocumentSection documents={resident?.documents} />

            <MemberCountingSection members={resident?.members} />
          </div>
        </div>
      </div>
    </div>
  );
}

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <p className="text-md text-black">{label}</p>
    <p className="text-md font-medium">{value}</p>
  </div>
);

const DocumentSection = ({ documents }) => (
  <div className="mb-6">
    <h4 className="text-lg font-medium mb-3">Documents</h4>
    <div className="space-y-3">
      {documents?.map((doc, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-gray-300 p-2 rounded-lg">
              <img src="/document-icon.png" alt="Document" className="w-5 h-5" />
            </div>
            <div>
              <p className="text-md font-medium">{doc.name}</p>
              <p className="text-sm text-gray-500">{doc.size}</p>
            </div>
          </div>
          <button className="text-gray-400 p-2">
            <FaEye size={16} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

const MemberCountingSection = ({ members }) => (
  <div className="mb-6">
    <div className="bg-gray-300 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 bg-blue-600">
        <h4 className="text-lg font-medium text-white">Member Counting</h4>
        <span className="bg-white text-blue-600 px-3 py-0.5 rounded-full text-md font-medium">{members?.length || '0'}</span>
      </div>
      <div className="p-4">
        {members?.map((member, index) => (
          <div key={index} className="space-y-2 mb-4">
            <DetailRow label="First Name" value={member.firstName} />
            <DetailRow label="Phone No" value={member.phone} />
          </div>
        ))}
      </div>
    </div>
  </div>
); 