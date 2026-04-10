import { useEffect, useState } from "react";
import { GetEventsParticipants } from "../../../services/incomeService";
import toast from "react-hot-toast";
import { Loader } from "../../../utils/Loader";
import { GetEventParticipants } from "../../../services/announcementService";

export default function EventsParticipate() {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEventParticipants = async () => {
    try {
      setIsLoading(true);
      const response = await GetEventParticipants();
      setParticipants(response.data.activities);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventParticipants();
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
                    <th className="px-4 sm:px-6 py-4 text-left text-[14px] font-semibold text-black-500 rounded-tl-[15px]">
                      Participator Name
                    </th>
                    <th className="px-4 py-4 text-start text-[14px] font-semibold text-black-500">
                      Description
                    </th>
                    <th className="px-4 py-4 text-center text-[14px] font-semibold text-black-500">
                      Event Time
                    </th>
                    <th className="px-4 py-4 text-center text-[14px] font-semibold text-black-500">
                      Event Date
                    </th>
                    <th className="px-4 py-4 text-[14px] font-semibold text-black-500 rounded-tr-[15px] text-start">
                      Event Name
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {participants.length > 0 &&
                  participants.some((v) => v.members.length > 0) ? (
                    participants.map((e) =>
                      e.members.map((m) => (
                        <tr key={e._id}>
                          <div className="px-4 sm:px-6 py-4 flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={m.participent.profileImage}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-[16px] font-medium text-[#4F4F4F]">
                                {m.participent.Full_name}
                              </div>
                            </div>
                          </div>
                          <td className="px-4 py-2 text-[#4F4F4F] font-medium text-wrap">
                            {e.description}
                          </td>
                          <td>
                            <div className="flex align-center justify-center max-sm:min-w-[180px] max-md:min-w-[180px]">
                              <span className="text-[#4F4F4F] bg-[#F6F8FB] w-[92px] h-[34px] inline-flex items-center justify-center rounded-[70px]">
                                8:00 AM
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-2 text-[#4F4F4F] font-medium text-center">
                            {new Date(e.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-4 py-2 text-[#4F4F4F] font-medium text-start">
                            {e.title}
                          </td>
                        </tr>
                      ))
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center text-gray-500 py-4"
                      >
                        No data found.
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
