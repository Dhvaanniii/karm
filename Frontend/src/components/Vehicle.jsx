const Vehicle = ({ vehicle }) => {
  return (
    <div className='bg-white p-6  mt-6 rounded-lg shadow-sm'>
      <h1 className='font-semibold font-lg'>Vehicle : {vehicle.length}</h1>
      <div className='grid grid-cols-1  mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {vehicle.length > 0 ? (
          vehicle.map(vehicle => (
            <div
              key={vehicle._id}
              className='border border-grey-800 rounded-lg'
            >
              <div className='bg-[#5678E9]  text-white p-4 flex justify-between items-center rounded-t-lg'>
                <h2 className='text-sm sm:text-base font-semibold'>
                  {vehicle.vehicle_name}
                </h2>
              </div>
              <div className='p-4'>
                <div className='space-y-2'>
                  <div className='flex items-center text-sm sm:text-base text-gray-500'>
                    <div>
                      <span className='font-sm w-24'>Vehicle Name</span>
                    </div>
                    <p className='text-black text-[15px] ml-auto'>
                      <span>{vehicle.vehicle_name}</span>
                    </p>
                  </div>
                  <div className='flex items-center text-sm sm:text-base text-gray-500'>
                    <div>
                      <span className='font-sm w-24'>Vehicle Number</span>
                    </div>
                    <p className='text-black text-[15px] ml-auto'>
                      <span>{vehicle.vehicle_number}</span>
                    </p>
                  </div>
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
    </div>
  )
}

export default Vehicle
