



const DeleteConfirmModal = ({ isOpen, onClose, complaint, onConfirm }) => {
  if (!isOpen) return null;

  const handleDelete = (id) => {
    onConfirm(id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-lg w-full max-w-[410px] p-4 sm:p-6">
        <div className="flex justify-between items-center mb-[10px]">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Delete Complaint?
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
           
          </button>
        </div>
        <div className="border-b border-[#F4F4F4] mb-[20px]"></div>

        <p className="text-gray-600 text-sm sm:text-base mb-6">
          Are you sure you want to delete this complaint?
        </p>

        <div className="flex justify-center max-sm:flex-col gap-4 mt-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 text-[18px] sm:text-md font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(complaint._id)}
            className="w-full  px-4 py-3 text-[18px] font-medium sm:text-md text-white bg-red-500 rounded-md hover:opacity-90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
