import  { useEffect, useState } from "react";
import ownerImage from "../../assets/images/owner.png";
import { FaUser } from "react-icons/fa";
import moneys from "../../assets/images/moneys.svg";
import wallet from "../../assets/images/wallet.png";
import { GetEventParticipantById } from "../../services/incomeService";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const AdminIncome = () => {
  const { id } = useParams();
  const [income, setIncome] = useState(null);

  const fetchMembers = async () => {
    try {
      const response = await GetEventParticipantById(id);
      console.log(response);
      setIncome(response.data.Income);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl">
      <h1 className="text-2xl font-normal mb-4">
        {income?.title} Participator Member List
      </h1>
      <table className="min-w-full table-auto  bg-white shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-indigo-50  text-black ">
            <th className="px-6 py-3 font-medium text-left">Unit Number</th>
            <th className="px-6 py-3 font-medium text-left">Payment Date</th>
            <th className="px-6 py-3 font-medium text-left">
              Tenant/Owner Status
            </th>
            <th className="px-6 py-3 font-medium text-left">Phone Number</th>
            <th className="px-4 py-3 font-medium text-left">Amount</th>
            <th className="px-4 py-3 font-medium text-right">Payment</th>
          </tr>
        </thead>
        <tbody>
          {income?.members.map((participant, index) => (
            <tr key={index} className={"text-gray-600 border-b "}>
              <div className="px-4 py-2  flex  items-center text-[#4F4F4F]">
                <span className="mr-2 w-[28px] h-[28px] bg-gray-200 rounded-full flex items-center justify-center text-[#5678E9] text-[14px] font-semibold">
                  {participant.resident.Wing}
                </span>
                {participant.resident.Unit}
              </div>
              <td className="px-6 py-4">
                {" "}
                {new Date(income.dueDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full inline-flex items-center gap-1.5 w-[113px] h-[31px] justify-center text-[14px] ${
                    participant.resident.Resident_status === "Tenante"
                      ? "bg-pink-50 text-pink-500"
                      : "bg-purple-50 text-purple-500"
                  }`}
                >
                  {participant.resident.Resident_status === "Tenante" ? (
                    <FaUser size={12} />
                  ) : (
                    <img
                      src={ownerImage}
                      className="mr-[4px]"
                      alt="Owner Icon"
                    />
                  )}
                  {participant.resident.Resident_status}
                </span>
              </td>
              <td className="px-6 py-4">{participant.resident.Phone_number}</td>
              <td className="px-6 py-4 text-green-600">₹ {income.amount}</td>
              <td className=" py-4 text-right">
                <span
                  className={`inline-flex items-center justify-center  w-[113px] h-[31px] text-[14px] ${
                    participant.payment === "Online"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 bg-gray-50"
                  } px-2 py-1 rounded-full`}
                >
                  {participant.payment === "Online" ? (
                    <img src={wallet} className="pr-[2.5px]" />
                  ) : (
                    <img src={moneys} className="pr-[2.5px]" />
                  )}
                  {participant.paymentMode}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminIncome;
