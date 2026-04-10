import { useEffect, useState } from 'react'
import {
  FaCheck,
  FaSun,
  FaMoon,
  FaMale,
  FaFemale,

  FaCamera,
  FaUser
} from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import {
  CreateSecurityGuard,
  DeleteSecurityGuard,
  GetSecurityGuards,
  UpdateSecurityGuard
} from '../services/securityGuardService'
import eye from '../assets/images/eye.svg'
import edit from '../assets/images/edit.svg'
import trash from '../assets/images/trash.svg'
import plus from '../assets/images/plus.svg'
import Addimage from '../assets/images/Addimage.svg'
import { convert24hrTo12hr } from '../utils/ConvertTime'
import { useDispatch } from 'react-redux'
import { IoMdClose } from 'react-icons/io'
import { Loader } from '../utils/Loader'
import calendar from '../assets/images/calendar.svg'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function SecurityGuardDetails () {
  const [guards, setGuards] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [currentGuard, setCurrentGuard] = useState(null)
  const [newGuard, setNewGuard] = useState({
    full_name: '',
    MailOrPhone: '',
    shift: '',
    date: '',
    time: '',
    gender: '',
    profileimage: null,
    adhar_card: null
  })

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [guardToDelete, setGuardToDelete] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [aadharPreview, setAadharPreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [credentialsModal, setCredentialsModal] = useState({ show: false, username: '', password: '' })

  const checkFormFilled = guard => {
    return (
      guard.full_name.trim() !== '' &&
      guard.MailOrPhone.trim() !== '' &&
      guard.gender !== '' &&
      guard.shift !== '' &&
      guard.date !== '' &&
      guard.time !== '' &&
      guard.adhar_card !== null
    )
  }

  const handleAddSecurity = () => {
    setModalMode('add')
    setNewGuard({
      full_name: '',
      MailOrPhone: '',
      shift: '',
      date: '',
      time: '',
      gender: '',
      profileimage: null,
      adhar_card: null
    })
    setIsModalOpen(true)
  }

  const handleEdit = guard => {
    setModalMode('edit')
    // setCurrentGuard(guard);
    setPhotoPreview(guard.profileimage)
    setNewGuard({ ...guard })
    setIsModalOpen(true)
  }

  const handleView = guard => {
    setModalMode('view')
    setCurrentGuard(guard)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setPhotoPreview(null)
    setAadharPreview(null)
  }

  const handleDeleteClick = guard => {
    setGuardToDelete(guard)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    try {
      setGuards(guards.filter(guard => guard._id !== guardToDelete._id))
      const response = await DeleteSecurityGuard(guardToDelete._id)
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setIsDeleteModalOpen(false)
    }
  }

  const handleFileUpload = (event, type) => {
    event.preventDefault()
    const file = event.target.files[0]
    handleFile(file, type)

    const updatedGuard = {
      ...newGuard,
      [type]: file
    }
    setIsFormFilled(checkFormFilled(updatedGuard))
  }

  const handleDrop = (event, type) => {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer.files[0]
    handleFile(file, type)
  }

  const handleFile = (file, type) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === 'profileimage') {
          setPhotoPreview(reader.result)
          setNewGuard({ ...newGuard, profileimage: file })
        } else if (type === 'adhar_card') {
          setAadharPreview(reader.result)
          setNewGuard({ ...newGuard, adhar_card: file })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = event => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = event => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleGuardChange = (field, value) => {
    const updatedGuard = {
      ...newGuard,
      [field]: value
    }
    setNewGuard(updatedGuard)
    setIsFormFilled(checkFormFilled(updatedGuard))
  }

  const handleSave = async () => {
    // setIsModalOpen(false);
    try {
      let response
      if (modalMode === 'add') {
        setIsLoading(true)
        response = await CreateSecurityGuard(newGuard)
        setIsModalOpen(false)
        
        // Show credentials modal
        if (response.data.loginCredentials) {
          setCredentialsModal({
            show: true,
            username: response.data.loginCredentials.username,
            password: response.data.loginCredentials.password
          })
        }
      } else if (modalMode === 'edit') {
        setIsLoading(true)
        response = await UpdateSecurityGuard(newGuard._id, newGuard)
        setIsModalOpen(false)
      }
      fetchSecurityGuards()
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
      setPhotoPreview(null)
      setAadharPreview(null)
      setNewGuard({
        full_name: '',
        MailOrPhone: '',
        shift: '',
        date: '',
        time: '',
        gender: '',
        profileimage: null,
        adhar_card: null
      })
    }
  }

  const fetchSecurityGuards = async () => {
    try {
      setIsLoading(true)
      const response = await GetSecurityGuards()
      setGuards(response.data.Guard)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSecurityGuards()
  }, [])

  return (
    <div className='sm:p-6 bg-white rounded-lg'>
      <div className='flex justify-between items-center mb-6 max-sm:flex-col'>
        <h1 className='text-[20px] font-semibold text-gray-800 max-xl:mb-0 max-sm:mb-[15px]'>
          Security Guard Details
        </h1>
        <button
          onClick={handleAddSecurity}
          className='px-4 h-[51px] bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white rounded-[10px] hover:opacity-90 flex items-center gap-2'
        >
          <img src={plus} alt='' />
          Add Security
        </button>
      </div>

      <div className='bg-white rounded-lg shadow-sm overflow-x-auto custom-scrollbar min-w-0'>
        <div className='overflow-x-auto block bg-transparent w-full'>
          {isLoading ? (
            <Loader />
          ) : (
            <table className='divide-y divide-gray-200 w-full'>
              <thead className='bg-indigo-50'>
                <tr className='h-[61px] text-[#202224]'>
                  <th className='px-4 py-4 text-left text-sm text-nowrap font-semibold text-black-500 rounded-tl-[15px]'>
                    Security Guard Name
                  </th>
                  <th className='px-4 py-4 text-center text-nowrap text-sm font-semibold text-black-500'>
                    Phone Number & E-Mail*
                  </th>
                  <th className='px-4 py-4 text-center text-sm font-semibold text-black-500'>
                    Select Shift
                  </th>
                  <th className='px-4 py-4 text-center text-sm font-semibold text-black-500'>
                    Shift Date
                  </th>
                  <th className='px-4 py-4 text-center text-sm font-semibold text-black-500'>
                    Shift Time
                  </th>
                  <th className='px-4 py-4 text-center text-sm font-semibold text-black-500'>
                    Gender
                  </th>
                  <th className='px-4 py-4 text-center text-sm font-semibold text-black-500 rounded-tr-[15px]'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-100'>
                {guards.length > 0 ? (
                  guards.map((guard, i) => (
                    <tr key={i} className='text-[#4F4F4F]'>
                      <td className='px-1 py-4 text-center'>
                        <div className='flex items-center'>
                          <img
                            className='h-10 w-10 rounded-full object-cover'
                            src={guard.profileimage}
                            alt=''
                          />
                          <div className='ml-4'>
                            <div className='text-base font-medium text-[#4F4F4F]'>
                              {guard.full_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='text-base font-medium text-center text-gray-[#4F4F4F]'>
                          {guard.MailOrPhone}
                        </div>
                      </td>
                      <td className='px-6 py-4 text-center'>
                        <span
                          className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium w-[113px] h-[31px] ${
                            guard.shift === 'Day'
                              ? 'bg-orange-50 text-orange-500'
                              : 'bg-gray-600 text-white'
                          }`}
                        >
                          {guard.shift === 'Day' ? (
                            <FaSun className='mr-2' />
                          ) : (
                            <FaMoon className='mr-2' />
                          )}
                          {guard.shift}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-center'>
                        <div className='text-base font-medium text-gray-500'>
                          {new Date(guard.date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className='px-6 py-4 text-center'>
                        <div className='inline-flex justify-center items-center rounded-full px-3 py-1 font-medium text-base text-gray-500 bg-[#F6F8FB] w-[92px] h-[34px]'>
                          {convert24hrTo12hr(guard.time)}
                        </div>
                      </td>
                      <td className='px-6 py-4 text-center'>
                        <span
                          className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium w-[113px] h-[31px] ${
                            guard.gender === 'Male'
                              ? 'bg-blue-50 text-blue-600'
                              : 'bg-pink-50 text-pink-600'
                          }`}
                        >
                          {guard.gender === 'male' ? (
                            <svg
                              className='mr-[5px]'
                              width='17'
                              height='17'
                              viewBox='0 0 17 17'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M5.90564 5.04901C5.91017 3.64094 7.05111 2.5 8.46371 2.5C9.87177 2.50453 11.0127 3.64547 11.0127 5.05806C11.0082 6.46613 9.86724 7.60707 8.45918 7.60707C7.04659 7.60707 5.90564 6.4616 5.90564 5.04901ZM13.0094 13.923C13.0094 14.3531 12.6607 14.7062 12.2306 14.7062H4.6153C4.18065 14.7062 3.83203 14.3531 3.83203 13.923C3.83203 11.3876 5.89206 9.323 8.41843 9.323C10.9448 9.323 13.0094 11.3876 13.0094 13.923Z'
                                fill='#FE76A8'
                              />
                            </svg>
                          ) : (
                            <svg
                              className='mr-[5px]'
                              width='17'
                              height='17'
                              viewBox='0 0 17 17'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M5.90564 5.04901C5.91017 3.64094 7.05111 2.5 8.46371 2.5C9.87177 2.50453 11.0127 3.64547 11.0127 5.05806C11.0082 6.46613 9.86724 7.60707 8.45918 7.60707C7.04659 7.60707 5.90564 6.4616 5.90564 5.04901ZM13.0094 13.923C13.0094 14.3531 12.6607 14.7062 12.2306 14.7062H4.6153C4.18065 14.7062 3.83203 14.3531 3.83203 13.923C3.83203 11.3876 5.89206 9.323 8.41843 9.323C10.9448 9.323 13.0094 11.3876 13.0094 13.923Z'
                                fill='#5678E9'
                              />
                            </svg>
                          )}
                          {guard.gender === 'Male' ? 'Male' : 'Female'}
                        </span>
                      </td>
                      <td className='px-1 py-4 text-center'>
                        <div className='flex items-center gap-3 justify-center'>
                          <button
                            onClick={() => handleEdit(guard)}
                            className='cursor-pointer text-blue-500 hover:text-blue-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]'
                          >
                            <img src={edit} alt='' />
                          </button>
                          <button
                            onClick={() => handleView(guard)}
                            className='cursor-pointer text-green-500 hover:text-green-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]'
                          >
                            <img src={eye} alt='' />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(guard)}
                            className='cursor-pointer text-green-500 hover:text-green-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]'
                          >
                            <img src={trash} alt='' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='6' className='text-center py-4 text-gray-500'>
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] overflow-y-auto custom-scrollbar p-4'>
          <div className='bg-white rounded-2xl shadow-xl w-full max-w-sm relative max-sm:h-[100vh] overflow-hidden custom-scrollbar overflow-y-auto'>
            <div className=''>
              {/* Loading Spinner */}

              {modalMode !== 'view' && (
                <form className='space-y-4 p-6'>
                  {/* Photo Upload */}
                  <div className='flex items-center mb-6'>
                    <div className='relative'>
                      <label htmlFor='photo-upload' className='cursor-pointer'>
                        {photoPreview ? (
                          <div className='relative'>
                            <img
                              src={photoPreview}
                              alt='Guard'
                              className='w-20 h-20 rounded-full object-cover border-2 border-gray-200'
                            />
                            <div className='absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5 border-2 border-white'>
                              <FaCamera className='w-3 h-3 text-white' />
                            </div>
                          </div>
                        ) : (
                          <div className='flex flex-col items-center'>
                            <div className='w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100'>
                              <div className='w-8 h-8 rounded-full bg-white flex items-center justify-center'>
                                <FaCamera className='w-4 h-4  text-gray-400' />
                              </div>
                            </div>
                          </div>
                        )}
                      </label>
                      <input
                        id='photo-upload'
                        type='file'
                        className='hidden'
                        onChange={e => handleFileUpload(e, 'profileimage')}
                        accept='image/*'
                      />
                    </div>
                    <div className='ml-[15px]'>
                      <span className='text-blue-500 text-base font-medium'>
                        Add Photo
                      </span>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Full Name*
                    </label>
                    <input
                      type='text'
                      placeholder='Enter full name'
                      value={newGuard.full_name}
                      onChange={e =>
                        handleGuardChange('full_name', e.target.value)
                      }
                      className='w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Phone Number & E-Mail*
                    </label>
                    <input
                      type='tel'
                      placeholder='Enter Number & E-Mail'
                      value={newGuard.MailOrPhone}
                      onChange={e =>
                        handleGuardChange('MailOrPhone', e.target.value)
                      }
                      className='w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black'
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-4 max-sm:grid-cols-1'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Gender*
                      </label>
                      <select
                        value={newGuard.gender}
                        onChange={e =>
                          handleGuardChange('gender', e.target.value)
                        }
                        className='w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black'
                      >
                        <option value=''>Select Gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Others'>Others</option>
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Shift*
                      </label>
                      <select
                        value={newGuard.shift}
                        onChange={e =>
                          handleGuardChange('shift', e.target.value)
                        }
                        className='w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black'
                      >
                        <option value=''>Select Shift</option>
                        <option value='Day'>Day</option>
                        <option value='Night'>Night</option>
                      </select>
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4 max-sm:grid-cols-1'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Shift Date*
                      </label>
                      <div className='relative'>
                        <DatePicker
                          selected={
                            newGuard?.date
                              ? new Date(newGuard?.date)
                              : currentGuard?.date
                              ? new Date(currentGuard?.date)
                              : null
                          }
                          open={isOpen}
                          onClickOutside={() => setIsOpen(false)}
                          onChange={date => handleGuardChange('date', date)}
                          className='w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none pr-10'
                          dateFormat='yyyy-MM-dd'
                          placeholderText='Select Date'
                          minDate={new Date()}
                        />
                        <img
                          src={calendar}
                          alt='calendar icon'
                          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer'
                          onClick={() => setIsOpen(!isOpen)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Shift Time*
                      </label>
                      <div className='relative'>
                        <input
                          type='time'
                          value={newGuard.time}
                          onChange={e =>
                            handleGuardChange('time', e.target.value)
                          }
                          className='w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 pr-10'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Aadhar Upload */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Upload Aadhar Card*
                    </label>
                    <div
                      className={`border-2 border-dashed ${
                        isDragging
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200'
                      } rounded-lg p-4`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={e => handleDrop(e, 'adhar_card')}
                    >
                      <label htmlFor='aadhar-upload' className='cursor-pointer'>
                        <div className='flex flex-col items-center justify-center text-center'>
                          {aadharPreview ? (
                            <div className='flex items-center space-x-2 text-green-500'>
                              <FaCheck className='w-5 h-5' />
                              <span className='text-sm font-medium'>
                                File uploaded successfully
                              </span>
                            </div>
                          ) : (
                            <>
                              <img src={Addimage} alt='' />
                              <span className='text-blue-500 text-sm'>
                                Upload a file or drag and drop
                              </span>
                              <span className='text-gray-400 text-xs mt-1'>
                                PDF, JPG, GIF up to 10MB
                              </span>
                            </>
                          )}
                        </div>
                      </label>
                      <input
                        id='aadhar-upload'
                        type='file'
                        className='hidden'
                        onChange={e => handleFileUpload(e, 'adhar_card')}
                        accept='.pdf,.jpg,.jpeg,.png'
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className='grid grid-cols-2 gap-4 mt-6'>
                    <button
                      type='button'
                      onClick={handleCancel}
                      className='w-full p-3 text-gray-700 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50'
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      onClick={handleSave}
                      disabled={!isFormFilled}
                      className={`w-full p-3 text-sm font-medium text-black rounded-lg 
                      ${
                        isFormFilled
                          ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white hover:opacity-90'
                          : 'bg-[#F6F8FB] text-black-400 cursor-not-allowed'
                      }`}
                    >
                      {isLoading ? <Loader /> : 'Create'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {isModalOpen && modalMode === 'view' && (
        <div className='fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-[9999] p-4'>
          <div className='bg-white rounded-2xl shadow-xl w-full max-w-sm'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>
                  View Security Guard Details
                </h2>
                <button
                  onClick={() => {
                    setIsModalOpen(false)
                  }}
                  className='text-gray-400 hover:text-gray-600'
                >
                  <IoMdClose size={20} />
                </button>
              </div>
              <div className='border-b border-[#F4F4F4] mb-[10px]'></div>
              <div className='space-y-4'>
                {/* Profile Image & Name */}
                <div className='flex items-center space-x-3 mb-6'>
                  {currentGuard.profileimage ? (
                    <img
                      src={currentGuard.profileimage}
                      alt='Guard'
                      className='w-12 h-12 rounded-full object-cover'
                    />
                  ) : (
                    <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center'>
                      <FaUser className='text-gray-400 text-xl' />
                    </div>
                  )}
                  <div>
                    <h3 className='font-semibold text-lg'>
                      {currentGuard.full_name}
                    </h3>
                    <p className='text-gray-500 text-sm'>
                      {new Date(currentGuard.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className='grid grid-cols-3 gap-4 max-sm:grid-cols-2'>
                  <div>
                    <p className='text-sm text-gray-500'>Select Shift</p>
                    <div
                      className={`mt-1 px-3 py-1 rounded-full text-xs inline-flex items-center gap-1
                      ${
                        currentGuard.shift === 'Day'
                          ? 'bg-yellow-50 text-yellow-600'
                          : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      {currentGuard.shift === 'Day' ? (
                        <FaSun size={12} />
                      ) : (
                        <FaMoon size={12} />
                      )}
                      {currentGuard.shift}
                    </div>
                  </div>

                  <div>
                    <p className='text-sm text-gray-500'>Shift Time</p>
                    <p className='mt-1 text-sm font-medium'>
                      {convert24hrTo12hr(currentGuard.time)}
                    </p>
                  </div>

                  <div>
                    <p className='text-sm text-gray-500'>Gender</p>
                    <div
                      className={`mt-1 px-3 py-1 rounded-full text-xs inline-flex items-center gap-1
                      ${
                        currentGuard.gender === 'Male'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-pink-50 text-pink-600'
                      }`}
                    >
                      {currentGuard.gender === 'Male' ? (
                        <FaMale size={12} />
                      ) : (
                        <FaFemale size={12} />
                      )}
                      {currentGuard.gender}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4'>
          <div className='bg-white rounded-2xl shadow-xl w-full max-w-sm'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4 '>
                <h2 className='text-xl font-semibold'>
                  Delete Security Guard ?
                </h2>

                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className='text-gray-400 hover:text-gray-600'
                >
                  <IoMdClose size={20} />
                </button>
              </div>
              <div className='border-b border-[#F4F4F4] mb-[10px]'></div>

              <div className='text-center '>
                <p className='text-gray-500 text-sm mb-6'>
                  Do you really want to delete this security guard?
                </p>
              </div>

              <div className='flex gap-3 max-sm:flex-col'>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className='flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className='flex-1 px-4 py-3 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Credentials Modal */}
      {credentialsModal.show && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4'>
          <div className='bg-white rounded-2xl shadow-xl w-full max-w-md'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-gray-800'>
                  Security Guard Created Successfully!
                </h2>
                <button
                  onClick={() => setCredentialsModal({ show: false, username: '', password: '' })}
                  className='text-gray-400 hover:text-gray-600'
                >
                  <IoMdClose size={20} />
                </button>
              </div>
              <div className='border-b border-[#F4F4F4] mb-4'></div>

              <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
                <p className='text-sm text-blue-800 font-medium mb-2'>
                  ⚠️ Important: Save these credentials and share them with the security guard
                </p>
                <div className='space-y-3'>
                  <div>
                    <label className='text-xs text-gray-600 font-medium'>Username (Email/Phone):</label>
                    <div className='mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-mono'>
                      {credentialsModal.username}
                    </div>
                  </div>
                  <div>
                    <label className='text-xs text-gray-600 font-medium'>Temporary Password:</label>
                    <div className='mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-mono font-bold text-orange-600'>
                      {credentialsModal.password}
                    </div>
                  </div>
                </div>
              </div>

              <div className='text-center mb-4'>
                <p className='text-gray-600 text-sm'>
                  These credentials have also been sent via email/SMS to the security guard.
                </p>
              </div>

              <button
                onClick={() => setCredentialsModal({ show: false, username: '', password: '' })}
                className='w-full px-4 py-3 bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white rounded-lg text-sm font-medium hover:opacity-90'
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SecurityGuardDetails
