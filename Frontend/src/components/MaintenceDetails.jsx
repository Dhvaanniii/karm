export const data = [
  {
    title: 'Maintenance Amount',
    amount: '1,500',
    bgColor: 'rgba(57, 151, 61, 0.5)',
    gradient:
      'linear-gradient(220.5deg, #39973D 7.71%, rgba(255, 255, 255, 0) 30.54%)',
    iconBg: '#E6F7E6',
    textColor: 'text-green-500'
  },
  {
    title: 'Penalty Amount',
    amount: '500',
    bgColor: 'rgba(255, 106, 0, 0.5)',
    gradient:
      'linear-gradient(220.5deg, #FF6A00 7.71%, rgba(255, 255, 255, 0) 30.54%)',
    iconBg: '#FFE6E6',
    textColor: 'text-red-500'
  }
]

function MaintenceDetails () {
  return (
    <div>
      <div className='h-auto w-full bg-white mt-6 rounded-lg flex flex-wrap items-start justify-start p-4 md:flex-row md:items-center md:justify-between'>
        {/* Title */}
        <h1 className='font-semibold text-[20px] text-start'>
          Show Maintenance Details
        </h1>

        {/* Cards */}
        <div className='grid grid-cols-1 gap-4 mt-4 w-full sm:grid-cols-2 md:mt-0 md:w-auto md:flex md:space-x-4 max-sm:grid-cols-1 relative z-[9]'>
          {data.map((card, index) => (
            <div
              key={index}
              className='flex items-center justify-center relative w-full'
              style={{
                borderRadius: '15px'
              }}
            >
              <div
                style={{
                  borderRight: '1px solid transparent',
                  borderTop: '2px solid transparent'
                }}
                className='relative flex flex-col justify-start items-start w-full max-md:flex-col max-md:justify-start max-md:flex max-md:items-start max-sm:flex-col max-sm:justify-start max-sm:flex max-sm:items-start'
              >
                <div
                  className='w-[7px] h-[52px] mr-[10px] absolute z-[99] top-[50%] rounded-tr-[10px] rounded-br-[10px]'
                  style={{
                    backgroundColor: card.bgColor,
                    transform: 'translateY(-50%)'
                  }}
                />
                <div className='relative flex flex-col justify-between items-start py-[19px] px-[30px] rounded-[15px] flex-grow bg-white max-sm:pt-[12px] max-sm:pb-[12px] max-md:pt-[12px] max-md:pb-[12px] w-[236px] max-sm:max-w-full max-md:col-span-2 shadow-[0px_0px_40px_0px_#0000000F]'>
                  <div className='flex justify-between items-center w-full max-sm:flex-col-reverse max-sm:items-start'>
                    <div className='flex flex-col items-start max-sm:mt-[15px]'>
                      <h6 className='text-gray-700 font-medium text-[16px] leading-2 max-sm:text-[14px] max-md:text-[18px] max-sm:text-nowrap'>
                        {card.title}
                      </h6>
                      <h3
                        className={`font-bold text-[26px] max-sm:text-[20px] max-sm:font-medium max-md:text-[20px] max-lg:text-[20px] max-xl:text-[20px] max-2xl:text-[20px] ${card.textColor}`}
                      >
                        <span className='text-[26px] mr-[5px]'>{` ₹`}</span>
                        <span className='text-[26px]'>{card.amount}</span>
                      </h3>
                    </div>
                    <div className='relative'>
                      <div
                        className='rounded-[10px] p-2 opacity-[10%] w-[50px] h-[50px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[40px] max-sm:h-[42px] max-sm:bg-iconColor max-md:w-[40px] max-md:h-[42px] bg-iconColor'
                        style={{
                          backgroundColor: card.iconBg
                        }}
                      ></div>
                    </div>
                  </div>
                  <div
                    className='rounded-[15px] max-md:translate-y-[4%]'
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: '-31.2%',
                      bottom: 10,
                      margin: 'auto',
                      width: '70%',
                      height: '95px',
                      background: card.gradient,
                      zIndex: -1
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MaintenceDetails
