// EditModal.js
import  { useState, useEffect } from "react";

const EditModal = ({ isOpen, onClose, complaint, onSave }) => {
  const [formData, setFormData] = useState({
    complainer: "",
    name: "",
    description: "",
    priority: "",
    status: "",
    wing: "",
    unit: "",
  });

  useEffect(() => {
    if (complaint) {
      setFormData({
        complainer: complaint.complainer,
        name: complaint.name,
        description: complaint.description,
        priority: complaint.priority,
        status: complaint.status,
        wing: complaint.wing,
        unit: complaint.unit,
      });
    }
  }, [complaint]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-[9999]">
      <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 max-w-[410px]">
        <h4 className="text-xl font-semibold mb-[10px] leading-[30px] text-[20px]">
          Edit Complaint
        </h4>
        <div className="border-b border-[#F4F4F4] mb-[30px]"></div>
        <form onSubmit={handleSubmit}>
          <div className="mb-[30px]">
            <label className="block mb-[5px] text-[14px] leading-[21px] font-medium">
              Complainer Name:
            </label>
            <input
              type="text"
              name="complainerName"
              value={formData.complainerName}
              onChange={handleChange}
              className="border border-[#202224] rounded-[10px] w-full p-2"
            />
          </div>
          <div className="mb-[30px]">
            <label className="block mb-[5px] text-[14px] leading-[21px] font-medium">
              Complaint Name:
            </label>
            <input
              type="text"
              name="complaintName"
              value={formData.complaintName}
              onChange={handleChange}
              className="border border-[#202224] rounded-[10px] w-full py-[9px] px-[13px] leading-[21px]"
            />
          </div>
          <div className="mb-[30px]">
            <label className="block mb-[5px] text-[14px] leading-[21px] font-medium">
              Description:
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-[#202224] rounded-[10px] w-full p-2"
            />
          </div>

          <div className="flex justify-between items-center mb-[25px]">
            <div>
              <label className="block mb-[5px] text-[14px] leading-[21px] font-medium">
                Wing:
              </label>

              <input
                type="text"
                name="wing"
                value={formData.wing}
                onChange={handleChange}
                className="border border-[#202224] rounded-[10px] w-[175px] py-[13px] ps-[13px] pr-[52px]"
              />
            </div>
            <div>
              <label className="block mb-[5px] text-[14px] leading-[21px] font-medium">
                Unit:
              </label>

              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="border border-[#202224] rounded-[10px] w-[175px] py-[13px] ps-[13px] pr-[52px]"
              />
            </div>
          </div>

          {/* Priority Radio Buttons */}
          <div className="mb-3">
            <label className="block mb-[5px] text-[14px] leading-[21px] font-medium">
              Priority:
            </label>
            <div className="flex">
              {["Low", "Medium", "High"].map((level) => (
                <label
                  key={level}
                  className="flex items-center mr-4 border pt-[10px px-[10px] w-[113px] h-[41px] rounded-[10px] text-[14px]"
                >
                  <input
                    type="radio"
                    name="priority"
                    value={level}   
                    checked={formData.priority === level}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span
                    className={`h-[20px] w-[20px] rounded-full border-2 flex items-center justify-center ${
                      formData.priority === level
                        ? "border-custom-gradient"
                        : "border-gray-300"
                    }`}
                  >
                    {formData.priority === level && (
                      <span className="h-[12px] w-[12px] rounded-full bg-custom-gradient"></span>
                    )}
                  </span>
                  <span
                    className={`ml-2 ${
                      formData.priority === level ? "font-semibold" : ""
                    }`}
                  >
                    {level}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Radio Buttons */}
          <div className="mb-3">
            <label className="block mb-[5px] text-[14px] leading-[21px] font-medium">
              Status:
            </label>
            <div className="flex">
              {["Open", "Pending", "Solve"].map((state) => (
                <label
                  key={state}
                  className="flex items-center mr-4 border pt-[10px px-[10px] w-[113px] h-[41px] rounded-[10px] text-[14px]"
                >
                  <input
                    type="radio"
                    name="status"
                    value={state}
                    checked={formData.status === state}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span
                    className={`h-[20px] w-[20px] rounded-full border-2 ${
                      formData.status === state
                        ? "border-custom-gradient"
                        : "border-gray-300"
                    } flex items-center justify-center`}
                  >
                    {formData.status === state && (
                      <span className="h-[12px] w-[12px] rounded-full bg-custom-gradient"></span>
                    )}
                  </span>
                  <span
                    className={`ml-2 ${
                      formData.status === state ? "font-semibold" : ""
                    }`}
                  >
                    {state}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button className="bg-white py-[12px] px-[58.5px] rounded-[10px] mr-[20px] w-full border border-[#D3D3D3] leading-[27px font-medium">
              Cancel
            </button>
            <button
              className="bg-custom-gradient text-white py-[12px] px-[57px] rounded-[10px] w-full font-semibold leading-[27px]"
              onClick={onClose}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
