import  { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Loader } from "../../utils/Loader";

const EditComplaintModal = ({ isOpen, onClose, complaint, onSubmit , isLoading  }) => {
  if (!isOpen) return null;

  const [selectedPriority, setSelectedPriority] = useState(complaint?.priority);
  const [selectedStatus, setSelectedStatus] = useState(complaint?.status);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedComplaint = {
      complainer: formData.get("complainer"),
      name: formData.get("name"),
      description: formData.get("description"),
      unit: formData.get("unit"),
      wing: formData.get("wing"),
      priority: selectedPriority,
      status: selectedStatus,
    };

    onSubmit(complaint._id, updatedComplaint);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999] overflow-y-auto custom-scrollbar">
      <div className="bg-white rounded-lg w-full max-w-[410px] max-sm:h-[100vh] overflow-hidden custom-scrollbar overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-[10px]">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Complaint
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoMdClose size={20} className="text-black"/>
          </button>
        </div>
        <div className="border-b border-[#F4F4F4] mb-[20px]"></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Complainant Name */}
          <div>
            <label className="block text-sm font-medium text-[#202224] mb-1">
              Complainer Name*
            </label>
            <input
              type="text"
              name="complainer"
              defaultValue={complaint?.complainer}
              className="w-full p-2 border border-gray-300 rounded-[10px] text-sm"
              required
            />
          </div>

          {/* Complaint Name */}
          <div>
            <label className="block text-sm font-medium text-[#202224] mb-1">
              Complaint Name*
            </label>
            <input
              type="text"
              name="name"
              defaultValue={complaint?.name}
              className="w-full p-2 border border-gray-300 rounded-[10px] text-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#202224] mb-1">
              Description*
            </label>
            <textarea
              name="description"
              defaultValue={complaint?.description}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-[10px] text-sm"
              required
            />
          </div>

          {/* Wing and Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#202224] mb-1">
                Wing*
              </label>
              <input
                type="text"
                name="wing"
                defaultValue={complaint?.wing}
                className="w-full p-2 border border-gray-300 rounded-[10px] text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#202224] mb-1">
                Unit*
              </label>
              <input
                type="text"
                name="unit"
                defaultValue={complaint?.unit}
                className="w-full p-2 border border-gray-300 rounded-[10px] text-sm"
                required
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-[#202224] mb-2">
              Priority*
            </label>
            <div className="flex gap-4 max-sm:flex-col">
              {["High", "Medium", "Low"].map((priority) => (
                <label key={priority} className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={selectedPriority === priority}
                    onChange={() => setSelectedPriority(priority)}
                    className="hidden"
                  />
                  <span
                    className={`flex items-center gap-2 ps-4 py-1.5 border border-gray-300 rounded-[10px] text-sm w-[109px] text-[14px] cursor-pointer max-sm:w-full
                    ${selectedPriority === priority
                        ? "border-[#FF6B07] bg-white font-medium"
                        : "border-gray-200"
                      }
                    hover:border-orange-500 transition-all duration-200`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                      ${selectedPriority === priority
                          ? "border-[#FF6B07]"
                          : "border-gray-300"
                        }`}
                    >
                      {selectedPriority === priority && (
                        <div className="w-2 h-2 bg-[#FF6B07] rounded-full"></div>
                      )}

                    </div>
                    {priority}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-[#202224] mb-2">
              Status*
            </label>
            <div className="flex gap-4 max-sm:flex-col">
              {["Open", "Pending", "Solve"].map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={selectedStatus === status}
                    onChange={() => setSelectedStatus(status)}
                    className="hidden"
                  />
                  <span
                    className={`flex items-center gap-2 ps-4 py-1.5 border border-gray-300 rounded-[10px] text-sm w-[109px] text-sm cursor-pointer  max-sm:w-full
                    ${
                      selectedStatus === status
                        ? "border-[#FF6B07] bg-white font-medium"
                        : "border-gray-200"
                    }
                    hover:border-orange-500 transition-all duration-200`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                      ${
                        selectedStatus === status
                          ? "border-[#FF6B07]"
                          : "border-gray-300"
                      }`}
                    >
                       {selectedStatus === status && (
                        <div className="w-2 h-2 bg-[#FF6B07] rounded-full"></div>
                      )}
                    </div>
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6  mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full px-4 py-3 text-[18px] font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full px-4 py-3 text-[18px] font-medium text-white bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] rounded-lg hover:opacity-90"
            >
                {isLoading ? <Loader/>
                  : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditComplaintModal;
