
import { useSelector } from "react-redux";

const ConfirmationModal = ({ showConfirmModal, onClose, handleDelete }) => {
  if (!showConfirmModal) return null;

  const { _id } = useSelector((store) => store.resident.resident);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-full max-w-[410px] min-h-[222px] flex flex-col justify-between">
        <div>
          <h2 className="text-[20px] font-semibold mb-[10px]">
            Do you want to vacate the final flat?
          </h2>
          <div className="border-b border-[#F4F4F4] mb-[10px]"></div>
          <p className="text-gray-500 text-sm">
            Are you sure you want to delete all details?
          </p>
        </div>

        <div className="flex justify-end gap-4 mt-auto pt-4">
          <button
            onClick={() => onClose()}
            className="w-[200px] h-[45px] border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="w-[200px] h-[45px] bg-[#E74C3C] text-white rounded-lg hover:bg-[#E74C3C]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
