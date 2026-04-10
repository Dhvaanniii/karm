import React, { useEffect, useState } from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import { CreateNote, GetNotes, UpdateNote } from '../services/notesService'
import { toast } from 'react-hot-toast'
import { Loader } from '../utils/Loader'
import calendar from '../assets/images/calendar.svg'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function Note () {
  const [notes, setNotes] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [currentNote, setCurrentNote] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const checkFormFilled = note => {
    return (
      note?.title?.trim() !== '' &&
      note?.description?.trim() !== '' &&
      note?.date?.trim() !== ''
    )
  }

  const handleNoteChange = (field, value) => {
    const updatedNote = {
      ...currentNote,
      [field]: value
    }
    setCurrentNote(updatedNote)
    setIsFormFilled(checkFormFilled(updatedNote))
  }

  const handleCreateNote = () => {
    setModalType('create')
    setCurrentNote({ title: '', description: '', date: '' })
    setIsModalOpen(true)
    setIsFormFilled(false)
  }

  const handleEditNote = note => {
    setModalType('edit')
    setCurrentNote({ ...note })
    setIsModalOpen(true)
    setIsFormFilled(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCurrentNote(null)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (modalType === 'create') {
      try {
        const response = await CreateNote(currentNote)
        fetchNotes()
        toast.success(response.data.message)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    } else if (modalType === 'edit') {
      const updateData = {
        title: currentNote.title,
        description: currentNote.description,
        date: currentNote.date
      }
      try {
        const response = await UpdateNote(currentNote._id, updateData)
        fetchNotes()
        toast.success(response.data.message)
      } catch (error) {
        toast.error(error.response.data.message)
      } finally {
        setDropdownOpen(false)
      }
    }
    handleCloseModal()
  }

  const handleAction = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log(
        modalType === 'save' ? 'Saved successfully!' : 'Created successfully!'
      )
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleDropdown = id => {
    setDropdownOpen(dropdownOpen === id ? null : id)
  }

  const fetchNotes = async () => {
    try {
      setIsLoading(true)
      const response = await GetNotes()
      setNotes(response.data.Note)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className='p-6 bg-white rounded-[10px]'>
      <div className='flex justify-between   items-center  mb-6'>
        <h1 className='text-[20px] font-semibold text-gray-800 max-xl:mb-0 max-sm:mb-[15px]'>
          Note
        </h1>
        <button
          onClick={handleCreateNote}
          className='h-[51px] w-[138px] bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-md hover:opacity-90'
        >
          Create Note
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {isLoading ? (
          <div className='col-span-4 flex justify-center items-center py-12'>
            <Loader />
          </div>
        ) : notes.length > 0 ? (
          notes.map(note => (
            <div
              key={note._id}
              className='bg-white rounded-[10px] border border-grey-800 hover:shadow-sm transition-shadow'
            >
              <div className='bg-[#5678E9] text-white p-4 rounded-t-lg flex justify-between items-center'>
                <h3 className='font-medium'>{note.title}</h3>
                <div className='relative'>
                  <button
                    onClick={() => toggleDropdown(note._id)}
                    className='hover:opacity-80 text-blue-500 rounded-md p-1 bg-white h-5 w-5'
                  >
                    <FaEllipsisV size={12} />
                  </button>
                  {dropdownOpen === note._id && (
                    <div className='absolute right-0 mt-2 w-28 bg-white rounded-md hover:bg-gray-50 shadow-lg z-10'>
                      <button
                        onClick={() => handleEditNote(note)}
                        className='w-full px-3 py-2 text-left text-sm text-gray-700 flex items-center gap-2 font-semibold'
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className='p-4'>
                <div className='space-y-2'>
                  <p className='text-gray-500 text-sm'>Description</p>
                  <p className='text-sm text-black-600'>{note.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='col-span-4 text-center text-gray-500 py-4'>
            No data found.
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4'>
          <div className='bg-white rounded-[10px] w-full max-w-[410px]'>
            <div className='p-6'>
              <h2 className='text-xl font-semibold mb-3'>
                {modalType === 'create' ? 'Add Note' : 'Edit Note'}
              </h2>
              <div className='border-b border-[#F4F4F4] mb-[20px]'></div>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Title
                  </label>
                  <input
                    name='title'
                    type='text'
                    value={currentNote?.title || ''}
                    onChange={e => handleNoteChange('title', e.target.value)}
                    className='w-full p-3 border border-gray-200 rounded-[10px] text-sm'
                    placeholder='Enter title'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Description
                  </label>
                  <textarea
                    name='description'
                    value={currentNote?.description || ''}
                    onChange={e =>
                      handleNoteChange('description', e.target.value)
                    }
                    className='w-full p-3 border border-gray-200 rounded-[10px] h-24 text-sm'
                    placeholder='Enter description'
                  />
                </div>

                {/* <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Date
                  </label>
                  <input
                    name='date'
                    type='date'
                    defaultValue={
                      currentNote?.date
                        ? new Date(currentNote.date).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={e => handleNoteChange('date', e.target.value)}
                    className='w-full p-3 border border-gray-200 rounded-[10px] text-sm'
                  />
                </div> */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Date
                  </label>
                  <div className='relative'>
                    <DatePicker
                      selected={
                        currentNote?.date ? new Date(currentNote.date) : null
                      }
                      onChange={date =>
                        handleNoteChange(
                          'date',
                          date ? date.toISOString().split('T')[0] : ''
                        )
                      }
                      className='w-full p-3 border border-gray-200 rounded-[10px] text-sm'
                      placeholderText='Select a date'
                      dateFormat='yyyy-MM-dd'
                      required
                    />
                    <img
                      src={calendar}
                      alt='calendar icon'
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer'
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4 mt-6'>
                  <button
                    type='button'
                    onClick={handleCloseModal}
                    className='w-full py-3 text-gray-700 bg-white border border-gray-200 rounded-[10px] text-sm font-medium'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    onClick={handleAction}
                    disabled={!isFormFilled}
                    className={`w-full py-3 text-sm font-medium rounded-[10px] transition-all duration-300
                      ${
                        isFormFilled
                          ? ' bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white hover:opacity-90'
                          : 'bg-[#F6F8FB] text-black font-bold text-black-400 cursor-not-allowed'
                      }`}
                  >
                    {isLoading ? (
                      <Loader />
                    ) : modalType === 'save' ? (
                      'save'
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
    </div>
  )
}

export default Note
