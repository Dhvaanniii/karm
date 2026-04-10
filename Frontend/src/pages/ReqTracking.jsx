import React, { useEffect, useState } from "react";
import CreateRequestModal from "../components/modal/CreateRequestModal";
import ViewRequestModal from "../components/modal/ViewRequestModal";
import EditRequestModal from "../components/modal/EditRequestModal";
import DeleteRequestModal from "../components/modal/DeleteRequestModal";
import {
  CreateRequest,
  DeleteRequest,
  GetRequests,
  UpdateRequest,
} from "../services/requestTrackingService";
import toast from "react-hot-toast";
import eye from "../assets/images/eye.svg";
import edit from "../assets/images/edit.svg";
import trash from "../assets/images/trash.svg";
import { Loader } from "../utils/Loader";

const ReqTracking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [Requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let avatar = "https://mighty.tools/mockmind-api/content/human/65.jpg";

  // create new request
  const handleSubmit = async (data) => {
    try {
      setIsLoading(true)
      const response = await CreateRequest(data);
      toast.success(response.data.message);
      fetchRequests();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    finally{
      setIsLoading(false)
    }
  };

  // delete request by id
  const handleDelete = async (id) => {
    setRequests(Requests.filter((request) => request._id !== id));
    try {
      const response = await DeleteRequest(id);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  // update request by id
  const handleUpdate = async (id, data) => {
    try {
      setIsLoading(true)
      const response = await UpdateRequest(id, data);
      fetchRequests();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false)
      setIsEditModalOpen(false);
    }
  };

  // get all request
  const fetchRequests = async () => {
    try {
      setIsLoading(true)
      const response = await GetRequests();
      setRequests(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);


  return (
    <div className="bg-gray-100">
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 max-sm:items-center">
            <h1 className="text-[20px] font-semibold text-gray-800 max-xl:mb-0">
              Create Request
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 md:mt-0 bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white px-4 h-[51px] rounded-md hover:opacity-90 transition-all duration-300"
            >
              Create Request
            </button>
          </div>

          <div className="overflow-x-auto pr-[8px] custom-scrollbar">
      {isLoading ? (
    
        <div className="flex justify-center items-center py-12">
          <Loader/>
        </div>
      ) : (
        <table className="w-full text-center rounded-lg">
          <thead>
            <tr className="bg-indigo-50 h-[61px] text-nowrap text-[#202224]">
              <th className="px-8 rounded-tl-[10px] py-3 text-sm font-semibold text-start">Requester Name</th>
              <th className="px-8 py-3 text-sm font-semibold">Request Name</th>
              <th className="px-8 py-3 text-sm font-semibold">Description</th>
              <th className="px-8 py-3 text-sm font-semibold">Request Date</th>
              <th className="px-8 py-3 text-sm font-semibold">Unit Number</th>
              <th className="px-8 py-3 text-sm font-semibold">Priority</th>
              <th className="px-8 py-3 text-sm font-semibold">Status</th>
              <th className="px-8 py-3 text-sm font-semibold rounded-tr-[10px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {Requests.length > 0 ? (
              Requests.map((Request) => (
                <tr key={Request._id} className="border-b text-[#4F4F4F]">
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={avatar} alt="" className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
                      <span className="text-base font-medium">{Request.requester}</span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-base font-medium">{Request.name}</td>
                  <td className="px-4 md:px-6 py-4 text-base font-medium">{Request.description}</td>
                  <td className="px-4 md:px-6 py-4 text-base font-medium">
                    {new Date(Request.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 flex justify-center items-center md:px-6 py-4 text-base">
                    <span className="bg-blue-50 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                      {Request.wing}
                    </span>
                    <span className="ml-4 mt-0 text-base font-medium text-gray-600">
                      {Request.unit}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <PriorityBadge priority={Request.priority} />
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex justify-center items-center">
                      <StatusBadge status={Request.status} />
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          setSelectedRequest(Request);
                          setIsViewModalOpen(true);
                        }}
                        className="cursor-pointer text-blue-500 hover:text-blue-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                      >
                        <img src={eye} alt="" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRequest(Request);
                          setIsEditModalOpen(true);
                        }}
                        className="cursor-pointer text-green-500 hover:text-green-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                      >
                        <img src={edit} alt="" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRequest(Request);
                          setIsDeleteModalOpen(true);
                        }}
                        className="cursor-pointer text-green-500 hover:text-green-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                      >
                        <img src={trash} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>

      
          <CreateRequestModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          {selectedRequest && (
            <ViewRequestModal
              isOpen={isViewModalOpen}
              onClose={() => {
                setIsViewModalOpen(false);
                setSelectedRequest(null);
              }}
              Request={selectedRequest}
              isLoading={isLoading}
            />
          )}
          {selectedRequest && (
            <EditRequestModal
            isLoading={isLoading}
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setSelectedRequest(null);
              }}
              Request={selectedRequest}
              onSubmit={handleUpdate}
            />
          )}
          {selectedRequest && (
            <DeleteRequestModal
              isOpen={isDeleteModalOpen}
              onClose={() => {
                setIsDeleteModalOpen(false);
                setSelectedRequest(null);
              }}
              onConfirm={handleDelete}
              request={selectedRequest}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    High: "bg-[#E74C3C] text-white font-medium text-sm",
    Medium: "bg-[#5678E9] text-white font-medium text-sm",
    Low: "bg-[#39973D] text-white font-medium text-sm",
  };
  return (
    <p
      className={`flex items-center justify-center w-[80px] md:w-[100px] h-[24px] md:h-[31px] rounded-full ${styles[priority]}`}
    >
      {priority}
    </p>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-[#FFC3131A] text-[#FFC313] font-medium text-sm",
    Solve: "bg-[#39973D1A] text-[#39973D] font-medium text-sm",
    Open: "bg-[#5678E91A] text-[#5678E9] font-medium text-sm",
  };
  const capitalizedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <p
      className={`flex items-center justify-center w-[80px] md:w-[100px] h-[24px] md:h-[31px] rounded-full ${styles[capitalizedStatus]}`}
    >
      {capitalizedStatus}
    </p>
  );
};

export default ReqTracking;
