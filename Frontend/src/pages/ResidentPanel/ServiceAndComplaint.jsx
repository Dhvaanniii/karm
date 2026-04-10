import { useEffect, useState } from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import DeleteConfirmModal from '../../components/modal/DeleteConfirmModal' // Import the modal
import CreateComplaintModal from '../../components/modal/CreateComplaintModal' // Import the Create Complaint modal
import DeleteRequestModal from '../../components/modal/DeleteRequestModal'
import CreateRequestModal from '../../components/modal/CreateRequestModal'
import {
  CreateComplaint,
  DeleteComplaint,
  GetComplaintsForUser
} from '../../services/complaintService'
import toast from 'react-hot-toast'
import {
  CreateRequest,
  DeleteRequest,
  GetRequestsForUser
} from '../../services/requestTrackingService'
import { Loader } from '../../utils/Loader'

const ServiceAndComplaint = () => {
  const [activeTab, setActiveTab] = useState('complaint')
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [modalItem, setModalItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [complaints, setComplaints] = useState([])
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const toggleDropdown = id => {
    setDropdownOpen(dropdownOpen === id ? null : id)
  }

  const handleDeleteClick = item => {
    setModalItem(item)
  }

  // delete request
  const confirmDeleteRequest = async id => {
    try {
      setRequests(requests.filter(request => request._id !== id))
      const response = await DeleteRequest(id)
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setModalItem(null)
    }
  }

  // Handle adding a new complaint
  const handleCreateRequest = async newRequest => {
    try {
      setIsLoading(true)
      const response = await CreateRequest(newRequest)
      toast.success(response.data.message)
      fetchRequests()
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
      setIsModalOpen(false)
    }
  }

  // Fetch All Requests
  const fetchRequests = async () => {
    try {
      setIsLoading(true)
      const response = await GetRequestsForUser()
      setRequests(response.data.data)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle deletion confirmation from modal
  const confirmDelete = async id => {
    try {
      setComplaints(complaints.filter(complaint => complaint._id !== id))
      const response = await DeleteComplaint(id)
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setModalItem(null)
    }
  }

  // Handle adding a new complaint
  const handleCreateComplaint = async newComplaint => {
    try {
      setIsLoading(true)
      const response = await CreateComplaint(newComplaint)
      toast.success(response.data.message)
      fetchComplaints()
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
      setIsModalOpen(false)
    }
  }

  // Fetch All Complaints
  const fetchComplaints = async () => {
    try {
      setIsLoading(true)
      const response = await GetComplaintsForUser()
      setComplaints(response.data.data)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchComplaints()
    fetchRequests()
  }, [])

  return (
    <div className='rounded-lg'>
      {/* Tabs */}
      <div className='flex'>
        <button
          className={`px-[10px] py-[14px] w-[183px] rounded-t-lg cursor-pointer text-[14px] text-[#202224] font-semibold max-sm:text-[14px] ${
            activeTab === 'complaint'
              ? 'bg-custom-gradient text-white'
              : 'bg-white text-black  border-b-2 border-orange-500'
          }`}
          onClick={() => setActiveTab('complaint')}
        >
          Complaint Submission
        </button>

        <button
          className={`px-[10px] py-[14px] w-[183px] rounded-t-lg cursor-pointer text-[14px] text-[#202224] font-semibold max-sm:text-[14px] ${
            activeTab === 'request'
              ? 'bg-custom-gradient text-white'
              : 'bg-white text-black  border-b-2 border-orange-500'
          }`}
          onClick={() => setActiveTab('request')}
        >
          Request Submission
        </button>
      </div>

      {/* Complaint Submission Form */}
      {activeTab === 'complaint' && (
        <div className='bg-white rounded-xl shadow-sm p-10 '>
          <div className='flex justify-between items-center mb-6 max-sm:flex-col'>
            <h1 className='text-[20px] font-semibold text-gray-800 max-xl:mb-0 max-sm:mb-[15px]'>
              Complaint
            </h1>
            <button
              onClick={() => setIsModalOpen(true)} // Open the Create Complaint modal
              className='h-[51px] bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white px-4 rounded-lg hover:opacity-90 transition-all duration-300'
            >
              Create Complaint
            </button>
          </div>
          <div className='grid mt-4 max-sm:grid-cols-1 max-2xl:grid-cols-2 max-lg:grid-cols-2 grid-cols-4 gap-4'>
            {isLoading ? (
              <div className='flex justify-center items-center col-span-4 py-12'>
                <Loader />
              </div>
            ) : complaints.length > 0 ? (
              complaints.map(item => (
                <div
                  key={item._id}
                  className='border border-grey-800 rounded-lg'
                >
                  <div className='bg-[#5678E9] text-white p-4 flex justify-between items-center rounded-t-lg'>
                    <h2 className='text-sm sm:text-base text-[16px] font-semibold'>
                      {item.name}
                    </h2>
                    <div className='relative'>
                      <button
                        onClick={() => toggleDropdown(item._id)}
                        className='hover:opacity-80 text-blue-500 rounded-md p-1 bg-white h-5 w-5 flex items-center justify-center'
                      >
                        <FaEllipsisV size={12} />
                      </button>

                      {dropdownOpen === item._id && (
                        <div className='absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10 py-1'>
                          <button
                            onClick={() => handleDeleteClick(item)}
                            className='w-full px-4 py-2 text-sm text-black rounded-lg hover:bg-gray-50 flex items-center'
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='p-4'>
                    <div className='space-y-2'>
                      <div className='flex items-center text-sm sm:text-base text-gray-500'>
                        <span className='font-sm '>Request Date</span>
                        <p className='text-black text-[15px] ml-auto'>
                          {new Date(item.createdAt).toLocaleDateString(
                            'en-GB',
                            {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            }
                          )}
                        </p>
                      </div>
                      <div className='flex items-center text-sm sm:text-base text-gray-500'>
                        <span className='font-sm  '>Status</span>
                        <p className='text-blue-500  font-semibold p-1 w-24 text-center rounded-full ml-auto'>
                          <StatusBadge status={item.status} />
                        </p>
                      </div>
                      <div className='justify-between items-center text-sm sm:text-base text-gray-500'>
                        <span className='font-sm '>Description</span>
                        <p className='text-black font-[500px] text-[14px] mt-1'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='col-span-4 text-center text-gray-500 py-4'>No data found.</div>
            )}
          </div>

          {modalItem && (
            <DeleteConfirmModal
              isOpen={modalItem}
              onClose={() => setModalItem(false)}
              onConfirm={confirmDelete}
              itemName={modalItem.name}
              complaint={modalItem}
            />
          )}

          {/* Create Complaint Modal */}
          {isModalOpen && (
            <CreateComplaintModal
              isLoading={isLoading}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleCreateComplaint}
            />
          )}
        </div>
      )}

      {/* Request Submission Form */}
      {activeTab === 'request' && (
        <div className='bg-white rounded-xl shadow-sm p-10 '>
          <div className='flex justify-between items-center mb-6 max-sm:flex-col'>
            <h1 className='text-[22px] font-semibold text-gray-800 max-xl:mb-0 max-sm:mb-[15px]'>
              Request
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className='bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white px-4 py-3 rounded-lg hover:opacity-90 transition-all duration-300'
            >
              Create Request
            </button>
          </div>
          <div className='grid max-sm:grid-cols-1  max-2xl:grid-cols-2  max-lg:grid-cols-2 grid-cols-4 gap-4'>
            {isLoading ? (
              <div className='flex justify-center items-center col-span-4 py-12'>
                <Loader />
              </div>
            ) : requests.length > 0 ? (
              requests.map(item => (
                <div
                  key={item._id}
                  className='border border-grey-800 rounded-lg'
                >
                  <div className='bg-[#5678E9] text-white p-4 flex justify-between items-center rounded-t-lg'>
                    <h2 className='text-sm sm:text-base font-semibold'>
                      {item.name}
                    </h2>
                    <div className='relative'>
                      <button
                        onClick={() => toggleDropdown(item._id)}
                        className='hover:opacity-80 text-blue-500 rounded-md p-1 bg-white h-5 w-5 flex items-center justify-center'
                      >
                        <FaEllipsisV size={12} />
                      </button>

                      {dropdownOpen === item._id && (
                        <div className='absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10 py-1'>
                          <button
                            onClick={() => handleDeleteClick(item)}
                            className='w-full px-4 py-2 text-sm text-black rounded-lg hover:bg-gray-50 flex items-center'
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='p-4'>
                    <div className='space-y-2'>
                      <div className='flex items-center text-sm sm:text-base text-gray-500'>
                        <span className='font-sm '>Request Date</span>
                        <p className='text-black text-[15px] ml-auto'>
                          {new Date(item.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className='flex items-center text-sm sm:text-base text-gray-500'>
                        <span className='font-sm  '>Status</span>
                        <p className='text-blue-500  font-semibold p-1 w-24 text-center rounded-full ml-auto'>
                          <StatusBadge status={item.status} />
                        </p>
                      </div>
                      <div className='justify-between items-center text-sm sm:text-base text-gray-500'>
                        <span className='font-sm '>Description</span>
                        <p className='text-black font-[500px] text-[14px] mt-1'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <tr>
                <td className='text-center py-4 text-gray-500'>
                  No data found
                </td>
              </tr>
            )}
          </div>
          {modalItem && (
            <DeleteRequestModal
              isOpen={!!modalItem}
              onClose={() => setModalItem(null)}
              onConfirm={confirmDeleteRequest}
              itemName={modalItem.name}
              request={modalItem}
            />
          )}

          {/* Create Complaint Modal */}
          {isModalOpen && (
            <CreateRequestModal
              isOpen={isModalOpen}
              isLoading={isLoading}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleCreateRequest}
            />
          )}
        </div>
      )}
    </div>
  )
}
const StatusBadge = ({ status }) => {
  const styles = {
    Pending: 'bg-[#FFC3131A] text-[#FFC313] font-medium text-xs',
    Solve: 'bg-[#39973D1A] text-[#39973D] font-medium text-xs',
    Open: 'bg-[#5678E91A] text-[#5678E9] font-medium text-xs'
  }

  const lowercaseStatus = status.toLowerCase()
  const capitalizedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()

  return (
    <p
      className={`flex items-center justify-center w-[100px] h-[31px]  rounded-full ${styles[capitalizedStatus]}`}
    >
      {capitalizedStatus}
    </p>
  )
}
export default ServiceAndComplaint
