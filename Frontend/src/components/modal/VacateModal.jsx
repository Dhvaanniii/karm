


import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";

const VacateModal = ({ showVacateModal, onClose, setShowConfirmModal }) => {
  if (!showVacateModal) return null;
  const { resident } = useSelector((store) => store.resident);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-full max-w-[410px]">
        <h2 className="text-lg font-semibold mb-[10px]">Residence Status</h2>
        <div className="border-b border-[#F4F4F4] mb-[30px]"></div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Wing Dropdown */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Wing<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] appearance-none bg-white">
                <option>{resident?.Wing || "A"}</option>
              </select>
              <IoIosArrowDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
          </div>

          {/* Unit Dropdown */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Unit<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] appearance-none bg-white">
                <option>{resident?.Unit || "1001"}</option>
              </select>
              <IoIosArrowDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowConfirmModal(true)}
            className="flex-1 px-4 py-2 bg-custom-gradient text-white rounded-lg hover:bg-[#FF5500]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default VacateModal;
