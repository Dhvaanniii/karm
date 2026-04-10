
import { IoMdClose } from "react-icons/io";

const ViewRequestModal = ({ isOpen, onClose, Request }) => {
  if (!isOpen) return null;
  let avatar = "https://mighty.tools/mockmind-api/content/human/65.jpg";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">View Request</h2>
          <div className="border-b border-[#F4F4F4] mb-[30px]"></div>
          <button
            onClick={onClose}
            className="text-[#A7A7A7] hover:text-gray-700"
          > 
            <IoMdClose size={20} className="text-black "/>
          </button>
        </div>
        <div className="border-b border-[#F4F4F4] mb-[10px]"></div>
        <div className="space-y-6">
          {/* User Info Section */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src={avatar}
              alt={Request.requester}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {Request.requester}
              </h3>
              <p className="text-sm text-[#A7A7A7]">
                {new Date(Request.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Request Details */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-normal text-[#A7A7A7]">
                Request Name
              </label>
              <p className="mt-1 text-base font-normal text-gray-900">
                {Request.name}
              </p>
            </div>

            <div>
              <label className="text-sm font-normal text-[#A7A7A7]">
                Description
              </label>
              <p className="mt-1 text-base text-gray-900">
                {Request.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-between">
              <div className="text-center">
                <label className="text-sm font-normal text-[#A7A7A7]">
                  Wing
                </label>
                <p className="mt-1 text-base font-normal text-[#5678E9] bg-[#F6F8FB] rounded-full w-[28px] h-[28px] flex justify-center items-center">
                  {Request.wing || "A"}
                </p>
              </div>
              <div className="text-center">
                <label className="text-sm font-normal text-[#A7A7A7]">
                  Unit
                </label>
                <p className="mt-1 text-base font-normal text-gray-900">
                  {Request.unit || "1002"}
                </p>
              </div>
              <div className="text-center">
                <label className="text-sm font-normal text-[#A7A7A7]">
                  Priority
                </label>
                <p className="mt-1">
                  <span className="px-3 py-1 text-sm font-normal text-white bg-[#5678E9] rounded-full">
                    {Request.priority || "Medium"}
                  </span>
                </p>
              </div>
              <div className="text-center">
                <label className="text-sm font-normal text-[#A7A7A7]">
                  Status
                </label>
                <p className="mt-1">
                  <span className="px-3 py-1 text-sm font-normal text-[#5678E9] bg-[#5678E91A] rounded-full">
                    {Request.status || "Open"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default ViewRequestModal;
