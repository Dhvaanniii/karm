import  { useEffect, useState } from 'react'
import { GetAnnouncements } from '../services/announcementService'

function AnnouncementDetails () {
  const [announcements, setAnnouncements] = useState([])

  // convert 24 hr to 12 hr
  function formatTimeTo12HourAMPM (timeStr) {
    let [hours, minutes] = timeStr.split(':').map(Number)
    let ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`
  }

  // Fetch all announcement
  const fetchAnnouncement = async () => {
    try {
      const response = await GetAnnouncements()
      setAnnouncements(response.data.Announcement)
    } catch (error) {
     error
    }
  }

  useEffect(() => {
    fetchAnnouncement()
  }, [])

  return (
    <div>
      <div className='bg-white p-6  mt-6 rounded-lg shadow-sm'>
        <div>
          <h1 className='font-semibold font-md'>Announcement Details</h1>
        </div>
        <div className='grid max-sm:grid-cols-1  max-2xl:grid-cols-2  max-xl:grid-cols-2  max-lg:grid-cols-2 grid-cols-4  gap-4'>
          {announcements.length > 0 ? (
            announcements.map(ResidentAnnouncement => (
              <div
                key={ResidentAnnouncement._id}
                className='border border-grey-800 rounded-lg'
              >
                <div className='bg-[#5678E9] text-white p-4  justify-between items-center rounded-t-lg'>
                  <h2 className='text-sm sm:text-base font-semibold'>
                    {ResidentAnnouncement.title}
                  </h2>
                </div>
                <div className='p-4'>
                  <div className='space-y-2'>
                    <div className='flex justify-between items-center text-sm sm:text-base text-gray-500'>
                      <span className='font-sm '>Announcement Date</span>
                      <p className='text-black text-[15px]'>
                        {new Date(ResidentAnnouncement.date).toLocaleDateString(
                          'en-GB',
                          {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }
                        )}
                      </p>
                    </div>

                    <div className='flex justify-between items-center text-sm sm:text-base text-gray-500'>
                      <span className='font-sm '>Announcement Time</span>
                      <p className='text-black'>
                        {formatTimeTo12HourAMPM(ResidentAnnouncement.time)}
                      </p>
                    </div>
                    <div className=' justify-between items-center text-sm sm:text-base text-gray-500'>
                      <span className='font-sm '>Description</span>
                      <p className='text-black text-[14px] mt-2'>
                        {ResidentAnnouncement.description}
                      </p>
                    </div>
                    <div className='border-b border-[#F4F4F4] mb-[20px]'></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='col-span-4 text-center text-gray-500 py-4'>No data found.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AnnouncementDetails
