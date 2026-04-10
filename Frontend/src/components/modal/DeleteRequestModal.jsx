import  { useState } from "react";

import { Loader } from "../../utils/Loader";
import { IoMdClose } from "react-icons/io";

const DeleteRequestModal = ({ isOpen, onClose, request, onConfirm }) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    onConfirm(request._id);
    onClose();
  };
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-lg w-full p-6 max-w-[410px]">
        <div className="flex justify-between items-center mb-[10px]">
          <h2 className="text-xl font-semibold text-gray-800">
            Delete Request ?
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoMdClose size={20} />
          </button>
        </div>
        <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this Request?
        </p>

        <div className="flex justify-center max-sm:flex-col gap-3 mt-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 text-md font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-4 py-3 text-md font-medium text-white bg-red-500 rounded-md hover:opacity-90"
          >
           {isLoading ? <Loader/>
            : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRequestModal;
