import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { GetVisitors } from "../services/securityGuardService";
import { convert24hrTo12hr } from "../utils/ConvertTime";
import { Loader } from "../utils/Loader";


const VisitorLogs = () => {
  const [visitorLog, setVisitorLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch visitor list
  const fetchVisitors = async () => {
    try {
      setIsLoading(true)
      const response = await GetVisitors();
      setVisitorLog(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <div
      className="p-4 sm:p-6 bg-white rounded-lg overflow-auto max-w-full  
    3xl:max-w-[2240px] visiter-table"
    >
      <div className="flex justify-between items-center mb-6 max-xl:mb-0 max-sm:mb-[15px]">
        <h1 className="text-[20px] font-semibold text-gray-800">
          Visitor Logs
        </h1>
        <div className="bg-[#5678E91A] text-[#5678E9] px-4 py-1 rounded-full text-sm font-medium">
          Total: {visitorLog.length}
        </div>
      </div>
      <div className=" relative bg-white rounded-lg shadow-sm overflow-y-auto overflow-x-auto custom-scrollbar">
      {/* Loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
         <Loader/>
        </div>
      )}

      {/* Table */}
      <div className="max-h-[45rem] ps-0 pr-[8px]">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-indigo-50 h-[61px]">
            <tr className="text-nowrap text-[#202224]">
              <th className="px-6 py-4 text-left text-[14px] font-semibold rounded-ts-[15px]">
                Visitor Name
              </th>
              <th className="px-6 py-4 text-left text-[14px] font-semibold">
                Phone Number
              </th>
              <th className="px-10 py-4 text-left text-[14px] font-semibold">
                Date
              </th>
              <th className="px-6 py-4 text-left text-[14px] font-semibold">
                Unit
              </th>
              <th className="px-6 py-4 text-center text-[14px] font-semibold">
                Time
              </th>
              <th className="px-4 sm:px-10 py-4 text-right text-[14px] font-semibold rounded-tr-[15px]">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {visitorLog.length > 0 ? (
              visitorLog.map((visitor, index) => (
                <tr key={index} className="hover:bg-gray-50 text-[#4F4F4F]">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        {visitor.photoUrl ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={visitor.photoUrl}
                            alt={visitor.name}
                          />
                        ) : (
                          <span className="text-xs text-gray-500 font-bold uppercase">
                            {visitor.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium ">{visitor.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{visitor.number}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">
                      {new Date(visitor.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="h-[28px] w-[28px] flex items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xs font-semibold mr-2 uppercase">
                        {visitor.wing}
                      </span>
                      <span className="text-sm font-medium">{visitor.unit}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center">
                    <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium min-w-[80px]">
                      {convert24hrTo12hr(visitor.time)}
                    </span>
                  </td>
                  <td className="px-4 sm:px-10 py-4 whitespace-nowrap text-right">
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                      visitor.status === "approved" ? "bg-green-100 text-green-600" :
                      visitor.status === "rejected" ? "bg-red-100 text-red-600" :
                      "bg-yellow-100 text-yellow-600"
                    }`}>
                      {visitor.status.charAt(0).toUpperCase() + visitor.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-400 italic">
                  No visitors logged in the system
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default VisitorLogs;
