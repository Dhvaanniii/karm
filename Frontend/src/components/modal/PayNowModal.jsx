const PayNowModal = ({
  income,
  isOpen,
  onClose,
  selectedMembers,
  totalAmount,
  perPersonAmount,
  setIsPaymanNowOpen,
}) => {
  const handlePaymentmathod = () => {
    setIsPaymanNowOpen(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="bg-white p-6 shadow-lg relative w-[410px] rounded-[15px]">
        <h2 className="text-lg font-semibold mb-[10px]">
          Detail of the Per Person
        </h2>
        <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
        <div className="mb-[5px] flex justify-between">
          <p className="text-[16px] leading-[24px] text-[#4F4F4F] font-normal">
            <span>Per Person Amount :</span>
          </p>
          <p className="w-[87px] text-[#4F4F4F] flex justify-center py-[5px]">
            ₹ {income.paymentAmount}
          </p>
        </div>
        <div className="mb-[5px] flex justify-between">
          <p className="text-[16px] leading-[24px] text-[#4F4F4F] font-normal">
            <span>Total Members :</span>
          </p>
          <p className="w-[87px] text-[#4F4F4F] flex justify-center py-[5px]">
            {selectedMembers}
          </p>
        </div>
        <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
        <div className="mb-[20px] flex justify-between">
          <p className="text-[16px] leading-[24px] text-[#202224] font-medium">
            <span>Total Amount :</span>
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
            onClick={handlePaymentmathod}
            className="flex-1 px-4 py-2 bg-custom-gradient text-white rounded-lg hover:bg-[#FF5500]"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayNowModal;
