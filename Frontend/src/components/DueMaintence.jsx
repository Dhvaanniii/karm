import { useEffect, useState } from 'react'
import PayMentMathodModal from './modal/PayMentMathodModal'
import PayMenCard from './modal/PayMenCard'
import {
  GetPendingMaintenances,
  UpdateMaintenanceStatus
} from '../services/maintenanceService'
import toast from 'react-hot-toast'
import { Loader } from '../utils/Loader'

function DueMaintence() {
  const [dueMaintenance, setDueMaintenance] = useState([])
  const [isPaymentNowOpen, setIsPaymantNowOpen] = useState(false)
  const [isPaymenCardOpen, setisPaymenCardOpen] = useState(false)
  const [payMaintenance, setPayMaintenance] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  const handlePendingMaintence = maintenance => {
    setPayMaintenance(maintenance)
    setIsPaymantNowOpen(true)
  }

  const handlePayment = async paymentMode => {
    try {
      const response = await UpdateMaintenanceStatus(payMaintenance._id, {
        paymentMode: paymentMode
      })
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setPayMaintenance(null)
    }
  }

  const filterDate = data => {
    const currentDate = new Date()
    const lastMonth =
      currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1
    const lastMonthYear =
      currentDate.getMonth() === 0
        ? currentDate.getFullYear() - 1
        : currentDate.getFullYear()

    const filteredDatesLastMonth = data.filter(v => {
      const dateObj = new Date(v.createdAt)
      return (
        dateObj.getMonth() === lastMonth &&
        dateObj.getFullYear() === lastMonthYear
      )
    })

    return filteredDatesLastMonth
  }

  const fetchPendingMaintenances = async () => {
    try {
      setIsLoading(true)
      const response = await GetPendingMaintenances()
      const data = response.data.Maintenance
      const filterMaintenances = filterDate(data)
      setDueMaintenance(filterMaintenances)
    } catch (error) { error} finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPendingMaintenances()
  }, [])

  return (
    <div>
      <div className='bg-white p-6  mt-6 rounded-lg shadow-sm'>
        <div>
          <h1 className='font-semibold font-md'>Due Maintence</h1>
        </div>
        <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative">
          {isLoading ? (
            <div className="flex justify-center items-center col-span-full py-8">
             <Loader></Loader>
            </div>
          ) : dueMaintenance.length > 0 ? (
            dueMaintenance.map(Duemaintence => (
              <div
                key={Duemaintence._id}
                className="border border-gray-300 rounded-lg"
              >
                <div className="bg-[#5678E9] text-white p-4 flex justify-between items-center rounded-t-lg">
                  <h2 className="text-sm sm:text-base font-semibold">Maintenance</h2>
                  <h2 className="text-sm bg-[#FFFFFF1A] w-28 text-center rounded-2xl p-1 font-semibold">
                    {Duemaintence.residentList[0].paymentStatus}
                  </h2>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm sm:text-base text-gray-500">
                      <span className="font-sm w-24"> Date</span>
                      <p className="text-grey-400 text-[15px]">
                        {new Date(Duemaintence.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
                    <div className="flex justify-between items-center text-sm sm:text-base text-gray-500">
                      <span className="font-sm w-32">Amount</span>
                      <p className="text-red-500">{Duemaintence.maintenanceAmount}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm sm:text-base text-gray-500">
                      <span className="font-sm ">Due Maintenance Amount</span>
                      <p className="text-red-500">{Duemaintence.penaltyAmount}</p>
                    </div>
                    <button
                      onClick={() => handlePendingMaintence(Duemaintence)}
                      className="h-14 bg-custom-gradient text-white font-bold rounded-xl w-full border"
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

export default DueMaintence
