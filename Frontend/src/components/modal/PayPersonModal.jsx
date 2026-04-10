const PayPersonModal = ({
  income,
  isOpen,
  selectedMembers,
  onClose,
  setIsPayNowOpen,
  perPersonAmount,
  totalAmount,
  handleChange,
}) => {
  const handleGetPass = () => {
    setIsPayNowOpen(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="bg-white p-6 shadow-lg relative w-[410px] rounded-[15px]">
        <h2 className="text-lg font-semibold mb-[10px]">
          Details of the Per Person
        </h2>
        <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
        <div className="mb-4 flex justify-between">
          <p className="text-[16px] leading-[24px] text-[#4F4F4F] font-normal">
            <span>Per Person Amount:</span>
          </p>
          <p className="w-[87px] bg-[#F4F4F4] text-[#4F4F4F] flex justify-center py-[5px] rounded-full">
            ₹ {income.paymentAmount}
          </p>
        </div>

        <div className="mb-[20px]">
          <label
            htmlFor="select-members"
            className="block text-[14px] leading-[21px] font-medium mb-[5px] text-[#202224]"
          >
            Select Members
          </label>
          <select
            id="select-members"
            value={selectedMembers}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full"
          >
            {[ 1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-[20px] flex justify-between">
          <p className="text-[16px] leading-[24px] text-[#202224] font-medium">
            <span>Total Amount::</span>
          </p>
          <p className="w-[87px] flex justify-center text-[#202224] font-medium rounded-full">
            ₹ {totalAmount.toLocaleString()}
          </p>
        </div>

        <div className="flex justify-end space-x-4 h-[51px]">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleGetPass}
            className="flex-1 px-4 py-2 bg-custom-gradient text-white rounded-lg hover:bg-[#FF5500]"
          >
            Get Pass
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayPersonModal;
