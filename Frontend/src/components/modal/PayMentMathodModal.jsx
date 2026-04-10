import { useState } from "react";
import { paymentMethods } from "../../constantdata";

export default function PayMentMathodModal({
  onClose ,
  isOpen ,
  setisPaymenCardOpen ,
  handlePayment ,
}) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Master Card");

  const handlePaymentCardmathod = () => {
    if (selectedPaymentMethod === "Cash Payment") {
      handlePayment("cash");
      onClose();
    } else {
      setisPaymenCardOpen(true);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="bg-white p-6 shadow-lg relative w-[410px] rounded-[15px]">
        <h2 className="text-lg font-semibold mb-[10px]">
          Card Detail
        </h2>
        <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
        {/* Payment Methods */}
        <div className="space-y-4 mb-6">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${
                selectedPaymentMethod === method.name
                  ? "bg-white"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center">
                <img
                  src={method.image}
                  alt={method.name}
                  className="w-10 h-10 mr-4"
                />
                <span className="font-medium">{method.name}</span>
              </div>
              <input
                type="radio"
                name="paymentMethod"
                value={method.name}
                checked={selectedPaymentMethod === method.name}
                onChange={() => setSelectedPaymentMethod(method.name)}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPaymentMethod === method.name
                    ? "border-[#FF6B07]"
                    : "border-gray-300"
                }`}
              >
                {selectedPaymentMethod === method.name && (
                  <div className="w-3 h-3 bg-[#FF6B07] rounded-full"></div>
                )}
              </div>
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 h-[51px]">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePaymentCardmathod}
            className="flex-1 px-4 py-2 bg-custom-gradient text-white rounded-lg hover:bg-[#FF5500]"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
