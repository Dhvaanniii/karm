import  { useState } from "react";

export default function PayMenCard({ isOpen, onClose, handlePayment }) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  if (!isOpen) return null;

  const resetForm = () => {
    setCardName("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setErrors({
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { cardName: "", cardNumber: "", expiryDate: "", cvv: "" };
    const cardNameRegex = /^[A-Za-z\s]+$/;
    if (!cardName || !cardNameRegex.test(cardName)) {
      newErrors.cardName = "Card name must contain only letters and spaces";
      isValid = false;
    }

    const cardNumberSpaces = cardNumber.replace(/\s/g, "");
    const cardNumberPattern = /^[0-9]{16}$/;
    if (!cardNumber || !cardNumberPattern.test(cardNumberSpaces)) {
      newErrors.cardNumber = "Card Number must be 16 digits";
      isValid = false;
    }

    const expiryDatePattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryDate || !expiryDatePattern.test(expiryDate)) {
      newErrors.expiryDate = "Expiry Date must be in MM/YY format";
      isValid = false;
    }

    const cvvPattern = /^[0-9]{3}$/;
    if (!cvv || !cvvPattern.test(cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handlePayment("online");
      resetForm();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="bg-white p-6 shadow-lg relative w-[410px] rounded-[15px]">
        <h1 className="text-xl font-semibold mb-[10px]">
          Enter Payment Details
        </h1>
        <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Card Name*</label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full p-3 border rounded-md"
              placeholder="Marcus George"
            />
            {errors.cardName && (
              <p className="text-red-500 text-sm">{errors.cardName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Card Number*
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full p-3 border rounded-md"
              placeholder="1234 4567 8745 5212"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">{errors.cardNumber}</p>
            )}
          </div>

          <div className="mb-4 flex justify-between">
            <div className="w-[48%]">
              <label className="block text-sm font-medium mb-1">
                Expiry Date*
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full p-3 border rounded-md"
                placeholder="MM/YY"
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm">{errors.expiryDate}</p>
              )}
            </div>

            <div className="w-[48%]">
              <label className="block text-sm font-medium mb-1">CVV*</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full p-3 border rounded-md"
                placeholder="225"
              />
              {errors.cvv && (
                <p className="text-red-500 text-sm">{errors.cvv}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 h-[51px]">
            <button
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-custom-gradient text-white rounded-lg hover:bg-[#FF5500]"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
