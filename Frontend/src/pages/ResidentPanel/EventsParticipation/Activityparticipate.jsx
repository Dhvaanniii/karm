import { useEffect, useState } from "react";
import { GetActivityParticipants } from "../../../services/announcementService";
import { Loader } from "../../../utils/Loader";

export default function ActivityParticipate() {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function convertTo12HourFormat(time24) {
    let [hours, minutes] = time24.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) {
      hours = 12;
    }
    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  }

  const fetchActivityParticipants = async () => {
    try {
      setIsLoading(true);
      const res = await GetActivityParticipants();
      setParticipants(res.data.activities);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivityParticipants();
  }, []);

  return (
    <div className="bg-gray-100">
      <div>
        <div className="bg-white rounded-lg overflow-auto max-w-full">
          <div className="flex justify-between ps-[20px]">
            <h1 className="text-[20px] font-semibold pb-[20px] pt-[15px] text-gray-800">
              Events Participation
            </h1>
          </div>

          <div className="overflow-x-auto pr-[8px] ps-[20px] custom-scrollbar max-h-[40rem]">
            {isLoading ? (
              <div className="flex justify-center items-center h-[40rem]">
                <Loader />
              </div>
            ) : (
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-indigo-50">
                  <tr className="rounded-tl-[15px] rounded-tr-[15px] h-[61px]">
                    <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-[600px] text-black-500 rounded-tl-[15px]">
                      Participator Name
                    </th>
                    <th className="px-4 py-4 text-start text-[14px] font-semibold text-black-500">
                      Description
                    </th>
                    <th className="px-4 py-4 text-center text-[14px] font-semibold text-black-500">
                      Activity Time
                    </th>
                    <th className="px-4 py-4 text-center text-[14px] font-semibold text-black-500">
                      Activity Date
                    </th>
                    <th className="px-6 py-4 text-center text-[14px] font-semibold text-black-500 rounded-tr-[15px]">
                      Activity Name
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {participants.length > 0 ? (
                    participants.map((v, index) =>
                      v.members.map((p) => (
                        <tr key={v._id} className="h-[68px]">
                          <div className="px-4 sm:px-6 py-4 flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={p.participent.profileImage}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-[16px] font-medium text-[#4F4F4F]">
                                {p.participent.Full_name}
                              </div>
                            </div>
                          </div>
                          <td className="px-4 py-2 text-[#4F4F4F] font-medium">
                            {v.description}
                          </td>
                          <td>
                            <div className="flex align-center justify-center max-sm:min-w-[180px] max-md:min-w-[180px]">
                              <span className="text-[#4F4F4F] bg-[#F6F8FB] w-[92px] h-[34px] inline-flex items-center justify-center rounded-[70px]">
                                {convertTo12HourFormat(v.time)}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-[#4F4F4F] font-medium text-center">
                            {new Date(v.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-4 py-2 text-[#4F4F4F] font-medium text-center">
                            {v.title}
                          </td>
                        </tr>
                      ))
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-500"
                      >
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
