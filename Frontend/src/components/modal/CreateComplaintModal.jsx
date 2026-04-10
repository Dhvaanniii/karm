
import  { useState } from 'react'


import { Loader } from '../../utils/Loader';

const CreateComplaintModal = ({ isOpen, onClose, onSubmit , isLoading }) => {
  if (!isOpen) return null

  const [formData, setFormData] = useState({
    complainer: '',
    name: '',
    description: '',
    wing: '',
    unit: '',
    priority: '',
    status: ''
  })
  const [formErrors, setFormErrors] = useState({})
 

  const isFormValid = () => {
    return (
      formData.complainer &&
      formData.name &&
      formData.description &&
      formData.wing &&
      formData.unit &&
      formData.priority &&
      formData.status
    )
  }

  const handleSubmit = async e => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      complainer: '',
      name: '',
      description: '',
      wing: '',
      unit: '',
      priority: '',
      status: ''
    })
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999] overflow-y-auto custom-scrollbar '>
      <div
        className='bg-white rounded-lg w-full max-w-[410px] p-6 max-sm:h-[100vh] overflow-hidden custom-scrollbar overflow-y-auto'
        style={{ maxWidth: '410px' }}
      >
        <div className='flex justify-between items-center mb-[10px]'>
          <h2 className='text-xl font-semibold text-gray-800'>
            Create Complaint
          </h2>
          <div className='border-b border-[#F4F4F4] mb-[10px]'></div>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-[text-[#202224]'
          >
          </button>
        </div>
        <div className='border-b border-[#F4F4F4] mb-[20px]'></div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Complainant Name */}
          <div>
            <label className='block text-sm font-medium text-[text-[#202224] mb-1'>
              Complainer Name*
            </label>
            <input
              type='text'
              name='complainer'
              value={formData.complainer}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-[10px] outline-none focus:border-black'
              placeholder='Enter name'
            />
            {formErrors.requesterName && (
              <span className='text-red-500 text-sm'>
                {formErrors.requesterName}
              </span>
            )}
          </div>

          {/* Complaint Name */}
          <div>
            <label className='block text-sm font-medium text-[text-[#202224] mb-1'>
              Complaint Name
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-[10px] outline-none focus:border-black'
              placeholder='Enter name'
            />
            {formErrors.requestName && (
              <span className='text-red-500 text-sm'>
                {formErrors.requestName}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm font-medium text-[text-[#202224] mb-1'>
              Description
            </label>
            <textarea
              name='description'
              rows='3'
              value={formData.description}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded-[10px] outline-none focus:border-black'
              placeholder='Enter description'
            />
            {formErrors.description && (
              <span className='text-red-500 text-sm'>
                {formErrors.description}
              </span>
            )}
          </div>

          {/* Wing and Unit */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-[text-[#202224] mb-1'>
                Wing
              </label>
              <input
                type='text'
                name='wing'
                value={formData.wing}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded-[10px] outline-none focus:border-black'
                placeholder='Enter wing'
              />
              {formErrors.wing && (
                <span className='text-red-500 text-sm'>{formErrors.wing}</span>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-[text-[#202224] mb-1'>
                Unit
              </label>
              <input
                type='text'
                name='unit'
                value={formData.unit}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded-[10px] outline-none focus:border-black'
                placeholder='Enter unit'
              />
              {formErrors.unit && (
                <span className='text-red-500 text-sm'>{formErrors.unit}</span>
              )}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className='block text-sm font-medium text-[text-[#202224] mb-2'>
              Priority
            </label>
            <div className='flex gap-4 max-sm:flex-col'>
              {['High', 'Medium', 'Low'].map(priority => (
                <label key={priority} className='flex items-center'>
                  <input
                    type='radio'
                    name='priority'
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={handleInputChange}
                    className='hidden'
                  />
                  <span
                    className={`flex items-center gap-2 ps-4 py-1.5 border border-gray-300 rounded-[10px] w-[109px] text-[14px] cursor-pointer max-sm:w-full
                    ${
                      formData.priority === priority
                        ? 'border-[#FF6B07] bg-white font-medium'
                        : 'border-gray-200'
                    }
                    hover:border-orange-500 transition-all duration-200`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center 
                      ${
                     formData.priority === priority
                      ? 'border-[#FF6B07]'
                      : 'border-gray-300'
                  }`}
                    >
                      {formData.priority === priority && (
                        <div className='w-2 h-2 bg-[#FF6B07] rounded-full'></div>
                      )}
                    </div>
                    {priority}
                  </span>
                </label>
              ))}
            </div>
            {formErrors.priority && (
              <span className='text-red-500 text-sm'>
                {formErrors.priority}
              </span>
            )}
          </div>

          {/* Status */}
          <div>
            <label className='block text-sm font-medium text-[text-[#202224] mb-2'>
              Status
            </label>
            <div className='flex gap-4 max-sm:flex-col'>
              {['Open', 'Pending', 'Solve'].map(status => (
                <label key={status} className='flex items-center'>
                  <input
                    type='radio'
                    name='status'
                    value={status}
                    checked={formData.status === status}
                    onChange={handleInputChange}
                    className='hidden'
                  />
                  <span
                    className={`flex items-center gap-2 ps-4 py-1.5 border border-gray-300 rounded-[10px] text-sm w-[109px] text-[14px] cursor-pointer max-sm:w-full
                    ${
                      formData.status === status
                        ? 'border-[#FF6B07] bg-white font-medium'
                        : 'border-gray-200'
                    }
                     transition-all duration-200`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center 
                      ${
                        formData.status === status
                          ? 'border-[#FF6B07]'
                          : 'border-gray-300'
                      }`}
                    >
                      {formData.status === status && (
                        <div className='w-2 h-2 bg-[#FF6B07] rounded-full'></div>
                      )}
                    </div>
                    {status}
                  </span>
                </label>
              ))}
            </div>
            {formErrors.status && (
              <span className='text-red-500 text-sm'>{formErrors.status}</span>
            )}
          </div>

          {/* Buttons */}
          <div className='flex justify-center max-sm:flex-col gap-3 mt-6'>
            <button
              type='button'
              onClick={onClose}
              className='w-[175px]  max-sm:w-full py-[13.5px] px-[58.5px] border rounded-[10px] text-sm leading-[27px] font-medium text-[18px]'
            >
              Cancel
            </button>
            <button
              type='submit'
              className={`w-[175px]   max-sm:w-full py-[13.5px] px-[58.5px] text-[18px] font-medium text-black rounded-[10px] text-sm transition-all duration-300
                ${
                  isFormValid()
                    ? 'bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] hover:opacity-90 text-white'
                    : 'bg-slate-100 border  text-black'
                }`}
            >
              {isLoading ? <Loader/>
                : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateComplaintModal
