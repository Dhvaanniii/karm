
import { IoMdClose } from 'react-icons/fa';

const DeleteConfirmModal = ({ isOpen, onClose, Request, onDelete }) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    onDelete(Request.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Delete Request</h2>
          <div className="border-b border-[#F4F4F4] mb-[10px]"></div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoMdClose size={20} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this Request? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 flex-col">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
