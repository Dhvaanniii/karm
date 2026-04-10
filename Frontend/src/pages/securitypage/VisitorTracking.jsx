import React, { useEffect, useState } from 'react'
import VisitorTrackingModal from '../../components/modal/VisitorTrackingModal'
import { createVisitor, GetVisitors } from '../../services/securityGuardService'
import toast from 'react-hot-toast'
import plus from '../../assets/images/plus.svg'
import downicon from '../../assets/images/downicon.svg'
import { Loader } from '../../utils/Loader'

export default function VisitorTracking () {
  const [visitorList, setVisitorList] = useState([])
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedOption, setSelectedOption] = React.useState('Month')
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleOptionClick = option => {
    setSelectedOption(option)
    setIsOpenDropdown(false)
  }

  const handleToggleDropdown = () => {
    setIsOpenDropdown(prev => !prev)
  }

  const convertToAmPm = timeStr => {
    const [hours, minutes] = timeStr.split(':')
    let hour = parseInt(hours, 10)
    const minute = minutes || '00'

    if (isNaN(hour) || isNaN(minute)) {
      return 'Invalid time format'
    }

    const suffix = hour >= 12 ? 'PM' : 'AM'
    hour = hour % 12 || 12
    return `${hour}:${minute} ${suffix}`
  }

  const addVisitor = async visitorData => {
    setIsLoading(true)
    try {
      await createVisitor(visitorData)
      toast.success('Visitor added successfully!')
      fetchVisitors()
      closeModal()
    } catch (error) {
      toast.error('Failed to add visitor. Please try again.', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchVisitors = async () => {
    try {
      setIsLoading(true)
      const response = await GetVisitors()
      setVisitorList(response.data.data)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVisitors()
  }, [])

  return (
    <>
      <div className='p-4 bg-white rounded-lg overflow-auto max-w-full'>
        <div className='flex  justify-between'>
          <h1 className='text-lg font-semibold pb-[31px] pt-[15px] text-gray-800'>
            Visitor Tracking
          </h1>
          <div className='flex items-center gap-4 mb-[20px]'>
            <div className='relative'>
              <button
                onClick={handleToggleDropdown}
                className='border border-gray-300 rounded-lg ps-[14px] py-1 flex justify-between items-center w-[120px] text-[15px] h-[44px] capitalize font-semibold'
              >
                {selectedOption}{' '}
                <img
                  src={downicon}
                  className='mr-[10px] text-[12px] text-[#202224] '
                />
              </button>
              {isOpenDropdown && (
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
                            : selectedOption === option
                            ? 'font-semibold text-black'
                            : 'text-gray-600'
                        }`}
                      >
                        <input
                          type='radio'
                          name='period'
                          checked={selectedOption === option}
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

            <button
              onClick={openModal}
              className='modal flex gap-2 bg-custom-gradient py-[12px] px-[10px] rounded-[10px] text-white font-semibold w-[229px] text-[18px]'
            >
              <span className='mr-[1.5px]'>
                <img src={plus} alt='' />{' '}
              </span>{' '}
              Add Visiter details
            </button>
          </div>
        </div>

        <div className='overflow-x-auto pr-[8px] ps-[20px] custom-scrollbar max-h-[44rem]'>
          <table className='min-w-full table-auto border-collapse'>
            <thead className='bg-indigo-50 h-[61px]'>
              <tr className='rounded-tl-[15px] rounded-tr-[15px] h-[61px]'>
                <th className='px-4 sm:px-6 py-4 text-left text-md font-semibold text-black-500 tracking-wider rounded-tl-[15px]'>
                  Visitor Name
                </th>
                <th className='px-4 sm:px-6 py-4 text-start text-md font-semibold text-black-500 tracking-wider'>
                  Phone Number
                </th>
                <th className='px-4 sm:px-6 py-4 text-left text-md font-semibold text-black-500 tracking-wider'>
                  Date
                </th>
                <th className='px-4 sm:px-6 py-4 text-center text-md font-semibold text-black-500 tracking-wider'>
                  Unit Number
                </th>
                <th className='px-4 sm:px-6 py-4 text-center text-md font-semibold text-black-500 tracking-wider'>
                  Time
                </th>
                <th className='px-4 sm:px-10 py-4 text-right text-md font-semibold text-black-500 tracking-wider rounded-tr-[15px]'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {isLoading ? (
                <tr>
                  <td colSpan='6' className='text-center py-4'>
                    <div className='flex justify-center items-center'>
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : visitorList.length > 0 ? (
                visitorList.map((visitor, index) => (
                  <tr key={index} className='h-[68px]'>
                    <td className='px-4 sm:px-6 py-4 flex items-center'>
                      <div className='flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden'>
                        {visitor.photoUrl ? (
                          <img
                            className='h-10 w-10 rounded-full object-cover'
                            src={visitor.photoUrl}
                            alt={visitor.name}
                          />
                        ) : (
                          <span className='text-xs text-gray-500 font-bold uppercase'>
                            {visitor.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className='ml-4'>
                        <div className='text-[16px] font-medium text-[#4F4F4F]'>
                          {visitor.name}
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-2 text-[#4F4F4F]'>
                      {visitor.number}
                    </td>
                    <td className='px-4 py-2 text-[#4F4F4F]'>
                      {new Date(visitor.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </td>
                    <td className='px-4 py-2 text-[#4F4F4F] text-center'>
                      <div className='flex items-center justify-center'>
                        <span className='h-[28px] w-[28px] flex items-center justify-center rounded-full bg-[#5678E91A] text-[#5678E9] text-xs font-medium mr-2'>
                          {visitor.wing}
                        </span>
                        <span className='text-sm font-medium'>{visitor.unit}</span>
                      </div>
                    </td>
                    <td className='px-4 py-2 text-[#4F4F4F] text-center'>
                      {convertToAmPm(visitor.time)}
                    </td>
                    <td className='px-4 sm:px-10 py-2 text-right'>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        visitor.status === 'approved' ? 'bg-green-50 text-green-600' :
                        visitor.status === 'rejected' ? 'bg-red-50 text-red-600' :
                        'bg-yellow-50 text-yellow-600'
                      }`}>
                        {visitor.status ? visitor.status.charAt(0).toUpperCase() + visitor.status.slice(1) : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='6' className='px-6 py-4 text-center text-gray-400 italic'>
                    No visitors logged in the system
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <VisitorTrackingModal
        isLoading={isLoading}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={addVisitor}
      />
    </>
  )
}
