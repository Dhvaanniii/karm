import  { useEffect } from "react";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { GetResident } from "../../services/ownerTenantService";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function ViewResidentModal({ isOpen, onClose, resident }) {
  if (!isOpen) return null;

  const [residentData, setResidentData] = useState(null);

  const handleViewFile = (file) => {
    window.open(file);
  };

  const residentById = async () => {
    try {
      const response = await GetResident(resident._id);
      setResidentData(response.data.Resident);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    residentById();
  }, []);

  return (
    <div className="fixed inset-y-0 right-0 flex justify-end z-[9999]">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      <div className="bg-white w-[400px] h-full my-auto relative overflow-hidden z-10 animate-slide-left rounded-l-xl shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-6 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <IoClose size={20} className="text-gray-600 hover:text-gray-800" />
        </button>

        <div className="h-full overflow-y-auto">
          <div className="sticky top-0 bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-100 z-10">
            <button onClick={onClose} className="text-gray-600">
              <IoArrowBack size={20} />
            </button>
            <h2 className="text-[16px] font-medium">
              View {residentData?.Resident_Status} Details
            </h2>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col items-center py-4">
              <img
                src={residentData?.profileImage || "/default-avatar.png"}
                alt="Profile"
                className="w-[70px] h-[70px] rounded-full mb-2"
              />
              <h3 className="text-[16px] font-medium mb-1">
                {residentData?.Full_name || "Roger Lubin"}
              </h3>
              <p className="text-[13px] text-gray-500">
                {residentData?.Email_address || "RogerLubin@gmail.com"}
              </p>
            </div>

            <div className="px-4 pb-4">
              <div className="bg-[#F9FAFB] rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-[16px] font-medium">Details</h4>
                </div>

                <div className="space-y-4">
                  <div className="flex  text-end    items-center">
                    <p className="text-[14px] text-start text-black w-[120px]">
                      Wing
                    </p>
                    <p className="text-[16px] font-medium flex-1">
                      {residentData?.Wing || "A"}
                    </p>
                  </div>

                  <div className="flex text-end items-center">
                    <p className="text-[14px] text-start text-black-500 w-[120px]">
                      Unit
                    </p>
                    <p className="text-[16px] font-medium flex-1">
                      {residentData?.Unit || "101"}
                    </p>
                  </div>

                  <div className="flex text-end items-center">
                    <p className="text-[14px] text-start text-black-500 w-[120px]">
                      Age
                    </p>
                    <p className="text-[16px]  font-medium flex-1">
                      {residentData?.Age || "20"}
                    </p>
                  </div>

                  <div className="flex text-end items-center">
                    <p className="text-[14px] text-start text-black-500 w-[120px]">
                      Gender
                    </p>
                    <p className="text-[16px] font-medium flex-1">
                      {residentData?.Gender || "Male"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-[16px] font-medium mb-3">Document</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#EEF2FF] p-2 rounded-lg">
                        <img
                          src={residentData?.Adhar_front}
                          alt="Document"
                          className="w-5 h-5"
                        />
                      </div>
                      <div>
                        <p className="text-[14px] font-medium">
                          Adharcard Front Side.JPG
                        </p>
                        <p className="text-[12px] text-gray-500">3.5 MB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewFile(residentData?.Adhar_front)}
                      className="text-gray-400 p-2"
                    >
                      <FaEye size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#F9FAFB] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FFF1F2] p-2 rounded-lg">
                        <img
                          src={residentData?.Address_proof}
                          alt="PDF"
                          className="w-5 h-5"
                        />
                      </div>
                      <div>
                        <p className="text-[14px] font-medium">
                          Address Proof Front Side.PDF
                        </p>
                        <p className="text-[12px] text-gray-500">3.5 MB</p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleViewFile(residentData?.Address_proof)
                      }
                      className="text-gray-400 p-2"
                    >
                      <FaEye size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {residentData?.Resident_Status === "Tenante" ? (
                <>
                  <div className="bg-[#EEF2FF] rounded-xl overflow-hidden mb-5">
                    <div className="px-4 py-3 bg-[#6366F1]">
                      <h4 className="text-[16px] font-medium text-white">
                        Owner Detail
                      </h4>
                    </div>
                    <div className="p-2">
                      <div className="bg-white p-2 rounded-md">
                        <div className="flex items-center border border-b-[1px] border-gray-100 pb-1">
                          <p className="text-[14px] text-start font-semibold  w-[120px]">
                            Name
                          </p>
                          <p className="text-[16px] text-end text-gray-500  flex-1">
                            {residentData.Owner_Full_name}
                          </p>
                        </div>

                        <div className="flex items-center border border-b-[1px] border-gray-100 pb-1">
                          <p className="text-[14px] text-start font-semibold w-[120px]">
                            Phone
                          </p>
                          <p className="text-[16px] text-end  text-gray-500 flex-1">
                            {residentData.Owner_Phone}
                          </p>
                        </div>

                        <div className="flex items-center border border-b-[1px] border-gray-100 pb-1">
                          <p className="text-[14px] text-start font-semibold w-[120px]">
                            Address
                          </p>
                          <p className="text-[16px] text-end  text-gray-500 flex-1">
                            {residentData.Owner_Address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="mb-6">
                <div className="bg-[#EEF2FF] rounded-xl overflow-hidden">
                  <div className="flex justify-between items-center px-4 py-3 bg-[#6366F1]">
                    <h4 className="text-[16px] font-medium text-white">
                      Member Counting
                    </h4>
                    <span className="bg-white text-[#6366F1] px-3 py-0.5 rounded-full text-[14px] font-medium">
                      {residentData?.Member_Counting_Total}
                    </span>
                  </div>
                  {residentData?.Member_Counting.map((member) => (
                    <div className="p-2" key={member._id}>
                      <div className="bg-white p-2 rounded-md">
                        <div className="flex items-center border border-b-[1px] border-gray-100 pb-1">
                          <p className="text-[14px] text-start font-semibold  w-[120px]">
                            First Name
                          </p>
                          <p className="text-[16px] text-end text-gray-500  flex-1">
                            {member.Full_name}
                          </p>
                        </div>

                        <div className="flex items-center border border-b-[1px] border-gray-100 pb-1">
                          <p className="text-[14px] text-start font-semibold w-[120px]">
                            Phone No
                          </p>
                          <p className="text-[16px] text-end  text-gray-500 flex-1">
                            {member.Phone_number}
                          </p>
                        </div>

                        <div className="flex items-center border border-b-[1px] border-gray-100 pb-1">
                          <p className="text-[14px] text-start font-semibold w-[120px]">
                            Age
                          </p>
                          <p className="text-[16px] text-end  text-gray-500 flex-1">
                            {member.Age}
                          </p>
                        </div>

                        <div className="flex items-center border border-b-[1px] border-gray-100 pb-1">
                          <p className="text-[14px] text-start font-semibold w-[120px]">
                            Gender
                          </p>
                          <p className="text-[16px] text-end text-gray-500 flex-1">
                            {member.Gender}
                          </p>
                        </div>

                        <div className="flex items-center">
                          <p className="text-[14px] text-start font-semibold w-[120px]">
                            Relation
                          </p>
                          <p className="text-[16px] text-end  text-gray-500 flex-1">
                            {member.Relation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
