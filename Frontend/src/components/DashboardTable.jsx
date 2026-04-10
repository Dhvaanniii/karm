import  { useEffect, useState } from 'react'
import ViewComplaintModal from './modal/ViewComplaintModal'
import complainimages from '../assets/images/complainimage.png'
import downicon from '../assets/images/downicon.svg'
import eye from '../assets/images/eye.svg'
import edit from '../assets/images/edit.svg'
import trash from '../assets/images/trash.svg'
import DeleteConfirmationModal from './modal/DeleteConfirmationModal'
import {
  DeleteComplaint,
  GetComplaints,
  UpdateComplaint
} from '../services/complaintService'
import EditComplaintModal from './modal/EditComplaintModal'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'

const getPriorityBackgroundColor = priority => {
  switch (priority) {
    case 'Medium':
      return 'bg-[#5678E9]'
    case 'High':
      return 'bg-[#39973D]'
    case 'Low':
      return 'bg-[#E74C3C]'
    default:
      return ''
  }
}

const DashboardTable = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [isViewModalOpen, setViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('Month')
  const [currentComplaint, setCurrentComplaint] = useState(null)
  const [complaintList, setComplaintList] = useState([])
  const { role } = useSelector(store => store.auth.user)
  let avatar = 'https://mighty.tools/mockmind-api/content/human/65.jpg'


  const onEdit = complaint => {
    setCurrentComplaint(complaint)
    setEditModalOpen(true)
  }

  const onView = complaint => {
    setCurrentComplaint(complaint)
    setViewModalOpen(true)
  }

  const onSave = async (id, updatedComplaint) => {
    try {
      const response = await UpdateComplaint(id, updatedComplaint)
      fetchComplaints()
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setEditModalOpen(false)
    }
  }

  const onCloseEditModal = () => {
    setEditModalOpen(false)
    setCurrentComplaint(null)
  }

  const onCloseViewModal = () => {
    setViewModalOpen(false)
    setCurrentComplaint(null)
  }

  const handleDeleteContact = complaint => {
    setCurrentComplaint(complaint)
    setDeleteModalOpen(true)
  }

  const onDelete = async () => {
    setComplaintList(
      complaintList.filter(complaint => complaint._id !== currentComplaint._id)
    )
    try {
      const response = await DeleteComplaint(currentComplaint._id)
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const onCloseDeleteModal = () => {
    setDeleteModalOpen(false)
    setCurrentComplaint(null)
  }

  const handleOptionClick = option => {
    setSelectedPeriod(option)
    setIsOpen(false)
  }

  const handleToggleDropdown = () => {
    setIsOpen(prev => !prev)
  }

  const getStatusStyle = status => {
    switch (status) {
      case 'Open':
        return 'bg-[#5678E91A] text-[#5678E9]'
      case 'Pending':
        return 'bg-[#FFC3131A] text-[#FFC313]'
      case 'Solved':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-[#39973D1A] text-[#39973D]'
    }
  }

  // get complaint list
  const fetchComplaints = async () => {
    try {
      const response = await GetComplaints()
      setComplaintList(response.data.data)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  return (

    <div className='bg-white pt-[10px] rounded-[15px] mt-[-5px] col-span-2 max-2xl:col-span-4 h-[345px] overflow-hidden'>
      <div className='flex justify-between items-center mb-[10px] ps-[20px] pr-[20px] '>
        <div>
          <h2 className='text-[20px] font-semibold leading-4 max-sm:text-[16px] max-mb:text-[18px] '>
            Complaint List
          </h2>
        </div>
        <div className='relative '>
          <button
            onClick={handleToggleDropdown}
            className='border border-gray-300 rounded-lg ps-[14px] py-1 flex justify-between items-center w-[120px] text-[15px] h-[44px] capitalize font-semibold'
          >
            {selectedPeriod}{' '}
            <img
              src={downicon}
              className='mr-[10px] text-[12px] text-[#202224] '
            />
          </button>
          {isOpen && (
            <div className='absolute z-10 left-[-39px] bg-white rounded-lg shadow-[0px_0px_40px_0px_#0000000D] mt-1 w-[160px] py-[15px]'>
              {['Select Month', 'Last week', 'Month', 'Last year'].map(
                (option, index) => (
                  <div
                    key={option}
                    onClick={
                      option === 'Select Month'
                        ? null
                        : () => handleOptionClick(option)
                    }
                    className={`flex items-center bg-white cursor-pointer mb-[10px] ps-[15px] ${
                      option === 'Select Month'
                        ? 'text-gray-400 cursor-not-allowed'
                        : selectedPeriod === option
                        ? 'font-semibold text-black'
                        : 'text-gray-600'
                    }`}
                  >
                    <input
                      type='radio'
                      name='period'
                      checked={selectedPeriod === option}
                      onChange={() => handleOptionClick(option)}
                      className='custom-radio mr-2'
                      disabled={option === 'Select Month'} 
                    />
                    {option}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      <div className='overflow-y-auto pr-[8px] ps-[20px] max-h-[18rem] custom-scrollbar'>
        <table className='w-full table-auto border-collapse'>
          <thead>
            <tr className='text-start text-black bg-opacity-custom rounded-tl-[15px] rounded-tr-[15px] bg-gray-100 h-[61px] #F4F4F4 text-nowrap'>
              <th className='text-[14px] leading-[21px] font-semibold rounded-tl-[15px] text-start ps-[20px] max-sm:min-w-[180px] max-md:min-w-[180px] max-lg:min-w-[180px]'>
                Complainer Name
              </th>
              <th className='text-[14px] leading-[21px] font-semibold text-start max-sm:min-w-[180px] max-md:min-w-[180px] max-lg:min-w-[180px]'>
                Complaint Name
              </th>
              <th className='text-[14px] leading-[21px] font-semibold text-center max-sm:min-w-[180px] max-md:min-w-[180px] max-lg:min-w-[180px]'>
                Date
              </th>
              <th className='text-[14px] leading-[21px] font-semibold text-center max-sm:min-w-[180px] max-md:min-w-[180px] max-lg:min-w-[180px]'>
                Priority
              </th>
              <th className='text-[14px] leading-[21px] font-semibold text-center max-sm:min-w-[180px] max-md:min-w-[180px] max-lg:min-w-[180px]'>
                Complain Status
              </th>
              {role === 'admin' && (
                <th className='text-[14px] leading-[21px] font-semibold rounded-tr-[15px] text-center max-sm:min-w-[180px] max-md:min-w-[180px] max-lg:min-w-[180px]'>
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className='overflow-y-auto pr-[8px] ps-[20px] max-h-[18rem] custom-scrollbar'>
            {complaintList.length > 0 ? (
              complaintList.map(complaint => (
                <tr
                  key={complaint._id}
                  className='border-b border-[#F4F4F4] text-nowrap text-[#4F4F4F]'
                >
                  <td>
                    <div className='flex items-center justify-start ps-4 py-[16px]'>
                      <img
                        src={avatar}
                        alt='Profile'
                        className='rounded-full mr-2 w-8 h-8'
                      />
                      <span className='text-base font-medium leading-[24px]'>{complaint.complainer}</span>
                    </div>
                  
                  </td>
                  <td className='text-start text-base font-medium leading-[24px]'>{complaint.name}</td>
                  <td className='text-center text-base font-medium leading-[24px]'>
                    {new Date(complaint.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </td>
                  <td className='text-center'>
                    <button
                      className={`rounded-full text-white text-[14px] py-[5px] px-[21px] w-[100px] text-center font-medium ${getPriorityBackgroundColor(
                        complaint.priority
                      )}`}
                      title={`Priority: ${complaint.priority}`}
                    >
                      {complaint.priority}
                    </button>
                  </td>
                  <td className='py-3 text-center'>
                    <button
                      className={`text-[14px] font-medium leading-[21px] inline-block py-1 px-2 rounded-full w-[113px] h-[31px] ${getStatusStyle(
                        complaint.status
                      )}`}
                    >
                      {complaint.status}
                    </button>
                  </td>
                  {role === 'admin' && (
                    <td className='space-x-[10px] text-center flex justify-center items-start h-[40px] pt-[13px]'>
                      <img
                        src={edit}
                        alt=''
                        className='cursor-pointer text-blue-500 hover:text-blue-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]'
                        onClick={() => onEdit(complaint)}
                        title='Edit'
                      />
                      <img
                        src={eye}
                        alt=''
                        className='cursor-pointer text-green-500 hover:text-green-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]'
                        onClick={() => onView(complaint)}
                        title='View'
                      />
                      <img
                        src={trash}
                        alt=''
                        className='cursor-pointer text-red-500 hover:text-red-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]'
                        onClick={() => handleDeleteContact(complaint)}
                        title='View'
                      />
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className='text-center text-gray-500 py-20'>
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EditComplaintModal
        isOpen={isEditModalOpen}
        onClose={onCloseEditModal}
        complaint={currentComplaint}
        onSubmit={onSave}
      />
      <ViewComplaintModal
        isOpen={isViewModalOpen}
        onClose={onCloseViewModal}
        complaint={currentComplaint}
        complainimage={complainimages}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={onCloseDeleteModal}
        onDelete={onDelete}
        modalName={'Complaint'}
      />
    </div>
  )
}

export default DashboardTable
