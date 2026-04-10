import { useEffect, useState } from 'react'
import PayMentMathodModal from './modal/PayMentMathodModal'
import PayMenCard from './modal/PayMenCard'
import { toast } from 'react-hot-toast'
import {
  GetPendingMaintenances,
  UpdateMaintenanceStatus
} from '../services/maintenanceService'

function PendingMaintence () {
  const [isPaymentNowOpen, setIsPaymantNowOpen] = useState(false)
  const [isPaymenCardOpen, setisPaymenCardOpen] = useState(false)
  const [maintenance, setMaintenance] = useState([])
  const [payMaintenance, setPayMaintenance] = useState(null)

  const handlePendingMaintence = maintenance => {
    setPayMaintenance(maintenance)
    setIsPaymantNowOpen(true)
  }

  const filterDate = data => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const filteredDatesCurrentMonth = data.filter(v => {
      const dateObj = new Date(v.createdAt)
      return (
        dateObj.getMonth() === currentMonth &&
        dateObj.getFullYear() === currentYear
      )
    })

    return filteredDatesCurrentMonth
  }

  const fetchPendingMaintenances = async () => {
    try {
      const response = await GetPendingMaintenances()
      const data = response.data.Maintenance
      const currentMonthData = filterDate(data)
      setMaintenance(currentMonthData)
    } catch (error) {error}
  }

  useEffect(() => {
    fetchPendingMaintenances()
  }, [])

  const handlePayment = async paymentMode => {
    try {
      const response = await UpdateMaintenanceStatus(payMaintenance._id, {
        paymentMode: paymentMode
      })
      toast.success(response.data.message)
      setMaintenance(prev =>
        prev.filter(entry => entry._id !== payMaintenance._id)
      )
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setPayMaintenance(null)
    }
  }

  return (
    <div>
      <div className='bg-white p-6  mt-6 rounded-lg shadow-sm'>
        <div>
          <h1 className='font-semibold font-md'>Pending Maintenance</h1>
        </div>
        <div className='grid max-sm:grid-cols-1  max-2xl:grid-cols-2  max-xl:grid-cols-2  max-lg:grid-cols-2 grid-cols-4  gap-4'>
          {maintenance.length > 0 ? (
            maintenance.map(maintence => (
              <div
                key={maintence._id}
                className='border border-grey-800 rounded-lg'
              >
                <div className='bg-[#5678E9] text-white p-4 flex justify-between items-center rounded-t-lg'>
                  <h2 className='text-sm sm:text-base font-semibold'>
                    Maintenance
                  </h2>
                  <h2 className='text-sm bg-[#FFFFFF1A] w-28 text-center rounded-2xl p-1 font-semibold'>
                    {maintence.residentList[0].paymentStatus}
                  </h2>
                </div>
                <div className='p-4'>
                  <div className='space-y-2'>
                    <div className='flex justify-between items-center text-sm sm:text-base text-gray-500'>
                      <span className='font-sm '>Bill Date</span>
                      <p className='text-grey-400 text-[15px]'>
                        {new Date(maintence.dueDate).toLocaleDateString(
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
                      <span className='font-sm '>Pending Date</span>
                      <p className='text-grey-400 text-[15px]'>
                        {new Date(maintence.penaltyDay).toLocaleDateString(
                          'en-GB',
                          {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }
                        )}
                      </p>
                    </div>
                    <div className='border-b border-[#F4F4F4] mb-[20px]'></div>
                    <div className='flex justify-between items-center text-sm sm:text-base text-gray-500'>
                      <span className='font-sm '>Maintenance Amount</span>
                      <p className='text-red-500'>
                        {maintence.maintenanceAmount}
                      </p>
                    </div>
                    <div className='flex justify-between items-center text-sm sm:text-base text-gray-500'>
                      <span className='font-[10px]  '>
                        Maintenance Penalty Amount
                      </span>
                      <p className='text-red-500'>{maintence.penaltyAmount}</p>
                    </div>
                    <div className='border-b border-[#F4F4F4] mb-[20px]'></div>
                    <div className='flex justify-between items-center text-sm sm:text-base text-black'>
                      <span className='font-sm font-semibold '>
                        Grand Total
                      </span>

                      {/* <span className='text-[15px]  text-green-600 '>{` `}</span> */}
                      <p className=' text-green-600'> ₹ 
                        {maintence.maintenanceAmount + maintence.penaltyAmount}
                      </p>
                    </div>
                    <button
                      onClick={() => handlePendingMaintence(maintence)}
                      className='h-14 bg-custom-gradient text-white font-bold  rounded-xl w-full border '
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='col-span-4 text-center text-gray-500 py-4'>No data found.</div>
          )}
        </div>
      </div>
      <PayMentMathodModal
        isOpen={isPaymentNowOpen}
        onClose={() => {
          setIsPaymantNowOpen(false)
        }}
        setisPaymenCardOpen={() => setisPaymenCardOpen(true)}
        handlePayment={handlePayment}
      />
      <PayMenCard
        isOpen={isPaymenCardOpen}
        onClose={() => {
          setisPaymenCardOpen(false)
        }}
        handlePayment={handlePayment}
      />
    </div>
  )
}

export default PendingMaintence
