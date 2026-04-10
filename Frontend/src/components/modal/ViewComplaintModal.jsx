import { IoMdClose } from "react-icons/io";

const ViewComplaintModal = ({ isOpen, onClose, complaint }) => {
  let avatar = "https://mighty.tools/mockmind-api/content/human/65.jpg";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 max-sm:px-[15px] ">
      <div className="bg-white rounded-lg shadow-lg max-w-[410px] w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-50 right-3 text-gray-500 hover:text-gray-800"
        >
          <IoMdClose size={20} className="text-black"/>
        </button>
        <h4 className="text-xl font-semibold mb-[10px] leading-[30px] text-[20px]">
          View Complaint
        </h4>
        <div className="border-b border-[#F4F4F4] mb-[30px]"></div>

        <div className="flex items-center mb-[25px]">
          <img
            src={avatar}
            alt=""
            className="w-[70px] h-auto rounded mr-[15px]"
          />
          <div>
            <h5 className="font-medium text-[18px] leading-[27px]">
              {complaint?.complainer}
            </h5>
            <h6 className="text-[#A7A7A7] text-[16px] leading-[24px] font-medium">
              {new Date(complaint?.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </h6>
          </div>
        </div>
        <div className="mb-[20px]">
          <h6 className="text-[16px] font-normal text-[#A7A7A7] leading-[24px] mb-[3px]">
            Request Name:
          </h6>
          <h6 className="font-normal text-[16px] leading-[27px] text-[#202224]">
            {complaint?.name}
          </h6>
        </div>
        <div>
          <h6 className="text-[16px] font-normal text-[#A7A7A7] leading-[24px] mb-[3px]">
            Description:
          </h6>
          <h6 className="font-normal text-[16px] leading-[24px] text-[#202224]">
            {complaint?.description ||
              "Offering, giving, receiving, or soliciting of value to influence the actions of an."}
          </h6>
        </div>
        <div className="flex justify-between items-center text-center mt-[20px] flex-wrap">
          <div>
            <h6 className="pb-[6.5px]">Wing:</h6>
            <h6 className="w-[28px] h-[28px] bg-[#F6F8FB] rounded-full py-[8px] px-[8px] flex justify-center items-center text-[#5678E9]">
              {complaint?.wing || "A"}
            </h6>
          </div>
          <div>
            <h6 className="pb-[2px]">Unit:</h6>
            <h6>{complaint?.unit || "1002"}</h6>
          </div>
          <div>
            <h6 className="pb-[3px]">Priority:</h6>
            <h6 className="rounded-full text-white flex justify-around items-center py-[5px] px-[21px] bg-[#5678E9] text-[16px]">
              {complaint?.priority}
            </h6>
          </div>
          <div>
            <h6 className="pb-[2px] gap-[8px]">Status:</h6>
            <h6>{complaint?.status}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComplaintModal;
