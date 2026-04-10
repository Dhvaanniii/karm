import { useState } from "react";
import { Loader } from "../../utils/Loader";

const CreateRequestModal = ({ isOpen, onClose, onSubmit , isLoading }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    requesterName: "",
    requestName: "",
    date: "",
    wing: "",
    unit: "",
    priority: "",
    status: "",
  });


  const isFormValid =
    formData.requesterName &&
    formData.requestName &&
    formData.date &&
    formData.wing &&
    formData.unit &&
    formData.priority &&
    formData.status;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const RequestData = {
      requester: formData.get("requesterName"),
      name: formData.get("requestName"),
      description: formData.get("description"),
      date: formData.get("date"),
      wing: formData.get("wing"),
      unit: formData.get("unit"),
      priority: formData.get("priority"),
      status: formData.get("status"),
    };

    onSubmit(RequestData);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999] overflow-y-auto custom-scrollbar">
      <div className="bg-white rounded-lg w-full max-w-[410px] max-sm:h-[100vh] overflow-hidden custom-scrollbar overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Create Request</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
          </button>
        </div>
        <div className="border-b border-[#F4F4F4] mb-[10px]"></div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Requester Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requester Name*
            </label>
            <input
              type="text"
              name="requesterName"
              value={formData.requesterName}
              onChange={handleInputChange}
              className="w-full py-[10.5px] ps-[13px] border border-gray-300 outline-none rounded-[10px] text-sm"
              placeholder="Enter name"
              required
            />
          </div>

          {/* Request Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Request Name*
            </label>
            <input
              type="text"
              name="requestName"
              value={formData.requestName}
              onChange={handleInputChange}
              className="w-full py-[10.5px] ps-[13px] border border-gray-300 outline-none rounded-[10px] text-sm"
              placeholder="Enter name"
              required
            />
          </div>

          {/* Request description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full py-[10.5px] ps-[13px] border border-gray-300 outline-none rounded-[10px] text-sm"
              placeholder="Enter description"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date*
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full py-[10.5px] ps-[13px] pr-[13px] pl-10 border border-gray-300 outline-none rounded-[10px] text-sm"
                required
              />
            </div>
          </div>
          {/* Wing and Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wing*
              </label>
              <input
                type="text"
                name="wing"
                value={formData.wing}
                onChange={handleInputChange}
                className="w-full py-[10.5px] ps-[13px] border border-gray-300 outline-none rounded-[10px] text-sm"
                placeholder="Enter wing"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit*
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="w-full py-[10.5px] ps-[13px] border border-gray-300 outline-none rounded-[10px] text-sm"
                placeholder="Enter unit"
                required
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority*
            </label>
            <div className="flex gap-4 max-sm:flex-col">
              {["High", "Medium", "Low"].map((priority) => (
                <label key={priority} className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={handleInputChange}
                    className="hidden "
                    required
                  />
                  <span
                    className={`flex items-center gapy-[10.5px] ps-[13px]  py-1.5 border border-gray-300 rounded-[10px] text-sm w-[110px] text-[14px] cursor-pointer max-sm:w-full
                    ${
                      formData.priority === priority
                        ? "border-[#FF6B07] bg-white font-medium"
                        : ""
                    }
                    hover:border-orange-500 transition-all duration-200`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-[8px] 
                      ${
                        formData.priority === priority
                          ? "border-orange-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.priority === priority && (
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status*
            </label>
            <div className="flex gap-4 max-sm:flex-col">
              {["Open", "Pending", "Solve"].map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={formData.status === status}
                    onChange={handleInputChange}
                    className="hidden"
                    required
                  />
                  <span
                    className={`flex items-center gapy-[10.5px] ps-[13px] py-1.5 border border-gray-300 rounded-[10px] text-sm w-[110px] cursor-pointer max-sm:w-full
                    ${
                      formData.status === status
                        ? "border-[#FF6B07] bg-white font-medium"
                        : ""
                    }
                    hover:border-orange-500 transition-all duration-200`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-[8px] 
                      ${
                        formData.status === status
                          ? "border-orange-500"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.status === status && (
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
          <div className="flex justify-center max-sm:flex-col gap-3 mt-6" >
            <button
              type="button"
              onClick={onClose}
              className="w-full px-4 py-3 text-md font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full px-4 py-3 text-md font-medium rounded-md transition-all duration-300
                ${
                  isFormValid
                    ? "bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white hover:opacity-90"
                    : "bg-[#F6F8FB] text-black"
                }`}
            >
             {isLoading ? <Loader/>
              : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequestModal;
