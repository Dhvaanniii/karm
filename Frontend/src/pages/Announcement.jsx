import { useEffect, useState } from 'react'
import {
  FaEdit,
  FaPlus,
  FaTrash,
  FaEye,
  FaEllipsisV,
 
} from 'react-icons/fa'
import {
  CreateAnnouncement,
  DeleteAnnouncement,
  GetAnnouncements,
  UpdateAnnouncement
} from '../services/announcementService'
import { toast } from 'react-hot-toast'
import { convert24hrTo12hr } from '../utils/ConvertTime'
import { IoMdClose } from 'react-icons/io'
import { Loader } from '../utils/Loader'
import downicon from '../assets/images/downicon.svg'
import calendar from '../assets/images/calendar.svg'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function Announcement() {
  const [announcements, setAnnouncements] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null)
  // const [isFormFilled, setIsFormFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [selectedType, setSelectedType] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const announcementTypes = ['Event', 'Activity']

  const handleDateChange = date => {
    setCurrentAnnouncement({
      ...currentAnnouncement,
      date: date ? date.toISOString().split('T')[0] : ''
    })
    setIsOpen(false)
  }

  const handleeditClick = () => {
    setIsOpen(true)
  }

  const handleSelect = type => {
    setSelectedType(type)
    setDropdownOpen(false)
  }

  const isFormFilled =
    currentAnnouncement?.title !== '' &&
    currentAnnouncement?.description !== '' &&
    currentAnnouncement?.date !== '' &&
    currentAnnouncement?.time !== ''

  const handleAnnouncementChange = (field, value) => {
    const updatedAnnouncement = {
      ...currentAnnouncement,
      [field]: value
    }
    setCurrentAnnouncement(updatedAnnouncement)
  }

  const handleCreateAnnouncement = () => {
    setModalType('create')
    setCurrentAnnouncement({ title: '', date: '', time: '', description: '' })
    setIsModalOpen(true)
    setIsFormFilled(false)
  }

  const handleEditAnnouncement = announcement => {
    setModalType('edit')
    setCurrentAnnouncement({ ...announcement })
    setIsModalOpen(true)
    setSelectedType(announcement.type)
  }

  const handleDeleteAnnouncement = announcement => {
    setModalType('delete')
    setCurrentAnnouncement(announcement)
    setIsModalOpen(true)
  }

  const handleViewAnnouncement = announcement => {
    setModalType('view')
    setCurrentAnnouncement(announcement)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCurrentAnnouncement(null)
    setSelectedType('')
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)
    try {
      let response
      if (modalType === 'create') {
        response = await CreateAnnouncement({
          ...currentAnnouncement,
          type: selectedType
        })
      } else if (modalType === 'edit') {
        response = await UpdateAnnouncement(currentAnnouncement._id, {
          ...currentAnnouncement,
          type: selectedType
        })
      }
      fetchAnnouncement()
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
      setIsModalOpen(false)
      handleCloseModal()
      setSelectedType('')
      setDropdownOpen(false)
    }
  }

  const handleAction = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log(
        modalType === 'save' ? 'Saved successfully!' : 'Created successfully!'
      )
    } catch (error) {
      console.error('Error:', error)
    } finally {
    }
  }

  const handleDelete = async () => {
    try {
      setAnnouncements(
        announcements.filter(a => a._id !== currentAnnouncement._id)
      )
      const response = await DeleteAnnouncement(currentAnnouncement._id)
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      handleCloseModal()
    }
  }

  const toggleDropdown = id => {
    setDropdownOpen(dropdownOpen === id ? null : id)
  }

  const fetchAnnouncement = async () => {
    try {
      setIsLoading(true)
      const response = await GetAnnouncements()
      setAnnouncements(response.data.Announcement)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAnnouncement()
  }, [])

  return (
    <div className='p-4 sm:p-6 bg-white rounded-lg'>
      <div className='flex justify-between items-center mb-6 max-sm:flex-col'>
        <h1 className='text-[20px] lg:text-[20px] font-semibold text-black-800 max-sm:pb-[15px]'>
          Announcement
        </h1>

        <button
          className='modal bg-custom-gradient py-[12px] px-[10px] rounded-[10px] text-white font-semibold text-[18px] leading-[27px] w-[238px]'
          onClick={handleCreateAnnouncement}
        >
          <div className='flex justify-center items-center '>
            <span className='text-lg font-semibold leading-7'>
              Create Announcement
            </span>
          </div>
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {isLoading ? (
          <div className='col-span-full flex justify-center py-6'>
            <Loader />
          </div>
        ) : announcements.length > 0 ? (
          announcements.map(announcement => (
            <div
              key={announcement._id}
              className='bg-white shadow-sm border border-grey-800 rounded-lg'
            >
              <div className='bg-[#5678E9] text-white p-4 flex justify-between items-center rounded-t-lg'>
                <h2 className='text-base font-medium'>{announcement.title}</h2>
                <div className='relative'>
                  <button
                    onClick={() => toggleDropdown(announcement._id)}
                    className='hover:opacity-80 text-blue-500 rounded-md p-1 bg-white h-5 w-5'
                  >
                    <FaEllipsisV size={12} />
                  </button>

                  {dropdownOpen === announcement._id && (
                    <div className='absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10 py-1'>
                      <button
                        onClick={() => handleViewAnnouncement(announcement)}
                        className='w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditAnnouncement(announcement)}
                        className='w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAnnouncement(announcement)}
                        className='w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className='p-4'>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between text-sm text-gray-600'>
                    <span className='font-normal text-sm leading-[21px]'>Announcement Date</span>
                    <p className='text-black'>
                      <span className='font-medium'>
                        {new Date(announcement.date).toLocaleDateString(
                          'en-GB',
                          {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }
                        )}
                      </span>
                    </p>
                  </div>
                  <div className='flex items-center justify-between text-sm text-gray-600'>
                    <span className='font-normal text-sm leading-[21px]'>Announcement Time</span>
                    <p className='text-black'>
                      <span className='font-medium'>{convert24hrTo12hr(announcement.time)}</span>
                    </p>
                  </div>
                  <div className='text-sm'>
                    <p className='font-normal text-sm leading-[21px] text-[#4F4F4F]'>Description</p>
                    <p className='text-[#202224] text-sm leading-[21px]'>
                      {announcement.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='col-span-full text-center text-gray-600 py-4'>
            No data found.
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && modalType !== 'view' && modalType !== 'delete' && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-md md:max-w-[410px] lg:max-w-[410px]'>
            <div className='p-6'>
              <h2 className='text-[20px] max-sm:text-[15px] max-md:text-3xl font-semibold mb-2'>
                {modalType === 'create'
                  ? 'Add Announcement'
                  : 'Edit Announcement'}
              </h2>
              <div className='border-b border-[#F4F4F4] mb-[30px]'></div>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='relative'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Announcement Type
                  </label>
                  <input
                    type='text'
                    className='cursor-pointer w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black text-start flex justify-between items-center'
                    value={selectedType}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    placeholder='Select Announcement Type'
                    readOnly
                  />
                  <img
                    src={downicon}
                    className='ml-[9px] text-[12px] text-[#202224] transition-transform duration-200 absolute top-[45px] right-[20px]'
                    alt='Dropdown Icon'
                  />
                  {dropdownOpen && (
                    <ul className='absolute mt-[9px] w-full rounded-lg bg-white shadow-[0px_0px_40px_0px_#0000000D] py-[20px] ps-[20px]'>
                      {announcementTypes.map((type, index) => (
                        <li
                          key={index}
                          className='flex items-center p-2 cursor-pointer'
                          onClick={() => handleSelect(type)}
                        >
                          <input
                            type='radio'
                            id={type}
                            name='announcementType'
                            value={type}
                            checked={selectedType === type}
                            readOnly
                            className='mr-[20px] custom-radio'
                          />
                          <label
                            htmlFor={type}
                            className={`text-sm ${selectedType === type
                                ? 'font-semibold text-black cursor-pointer'
                                : 'text-[#A7A7A7] cursor-pointer'
                              }`}
                          >
                            {type}
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Announcement Title
                  </label>
                  <input
                    type='text'
                    value={currentAnnouncement?.title || ''}
                    onChange={e =>
                      handleAnnouncementChange('title', e.target.value)
                    }
                    className='w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black'
                    placeholder='Enter title'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Description
                  </label>
                  <textarea
                    value={currentAnnouncement?.description || ''}
                    onChange={e =>
                      handleAnnouncementChange('description', e.target.value)
                    }
                    className='w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none h-20 sm:h-24'
                    placeholder='Enter description'
                  ></textarea>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm sm:text-base font-medium text-gray-700 mb-1'>
                      Announcement Date
                    </label>
                    <div className='relative'>
                      <DatePicker
                        selected={
                          currentAnnouncement?.date
                            ? new Date(currentAnnouncement?.date)
                            : null
                        }
                        open={isOpen}
                        onChange={handleDateChange}
                        onClickOutside={() => setIsOpen(false)}
                        className='w-full px-3 py-3 pl-3 text-sm border border-gray-300 rounded-md focus:outline-none'
                        dateFormat='yyyy-MM-dd'
                        placeholderText='Select Date'
                        defaultValue={
                          currentAnnouncement?.date
                            ? new Date(currentAnnouncement?.date)
                              .toISOString()
                              .split('T')[0]
                            : ''
                        }
                        minDate={new Date()}
                      />
                      <img
                        src={calendar}
                        alt='calendar icon'
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer'
                        onClick={handleeditClick}
                      />
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Announcement Time
                    </label>
                    <input
                      type='time'
                      value={currentAnnouncement?.time || ''}
                      onChange={e =>
                        handleAnnouncementChange('time', e.target.value)
                      }
                      className='w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none '
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6'>
                  <button
                    type='button'
                    onClick={handleCloseModal}
                    className='w-full py-3 text-gray-700 bg-white border border-gray-200 rounded-lg text-sm font-medium'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    onClick={handleAction}
                    disabled={!isFormFilled}
                    className={`w-full py-3 text-sm font-medium rounded-lg transition-all duration-300
                ${isFormFilled
                        ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white hover:opacity-90'
                        : 'bg-[#F6F8FB] text-black-400 cursor-not-allowed'
                      }`}
                  >
                    {isLoading ? (
                      <Loader /> // Loader component
                    ) : modalType === 'save' ? (
                      'Create'
                    ) : (
                      'Save'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isModalOpen && modalType === 'view' && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4'>
          <div className='bg-white rounded-xl shadow-xl w-full max-w-sm md:max-w-[410px] lg:max-w-[410px]'>
            <div className='p-5'>
              {/* Header with Close Button */}
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg sm:text-xl md:text-2xl font-semibold'>
                  View Security Protocol
                </h2>
                <div className='border-b border-[#F4F4F4] mb-[10px]'></div>
                <button
                  onClick={handleCloseModal}
                  className='text-gray-400 hover:text-gray-600'
                >
                  <IoMdClose size={18} />
                </button>
              </div>
              <div className='border-b border-[#F4F4F4] mb-[10px]'></div>

              {/* Content */}
              <div className='space-y-4'>
                {/* Title */}
                <div>
                  <label className='block text-sm text-gray-500 mb-1'>
                    Title
                  </label>
                  <p className='text-sm'>{currentAnnouncement.title}</p>
                </div>

                {/* Description */}
                <div>
                  <label className='block text-sm text-gray-500 mb-1'>
                    Description
                  </label>
                  <p className='text-sm text-gray-600'>
                    {currentAnnouncement.description}
                  </p>
                </div>

                {/* Date and Time in Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2'>
                  <div>
                    <label className='block text-sm text-gray-500 mb-1'>
                      Date
                    </label>
                    <p className='text-sm'>
                      {new Date(currentAnnouncement.date).toLocaleDateString(
                        'en-GB',
                        {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        }
                      )}
                    </p>
                  </div>
                  <div>
                    <label className='block text-sm text-gray-500 mb-1'>
                      Time
                    </label>
                    <p className='text-sm'>
                      {convert24hrTo12hr(currentAnnouncement.time)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isModalOpen && modalType === 'delete' && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4'>
          <div className='bg-white rounded-xl shadow-xl w-full max-w-sm md:max-w-[410px] lg:max-w-[410px]'>
            <div className='p-5'>
              <h2 className='text-lg sm:text-xl md:text-2xl font-semibold mb-2'>
                Delete Announcement
              </h2>
              <div className='border-b border-[#F4F4F4] mb-[10px]'></div>
              <p className='text-sm md:text-md text-gray-600 mb-6'>
                Are you sure you want to delete this announcement?
              </p>

              {/* Full Width Buttons */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <button
                  onClick={handleCloseModal}
                  className='w-full py-3 text-gray-700 bg-white border border-gray-200 rounded-lg text-sm font-medium'
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className='w-full py-3 text-white bg-red-500 rounded-lg text-sm font-medium hover:bg-red-600'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Announcement
