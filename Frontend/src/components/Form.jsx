
import { FaImage } from 'react-icons/fa'

function Form ({ user }) {
  const handleViewFile = file => {
    window.open(file)
  }

  return (
    <div>
      <div className='bg-white p-6 rounded-lg shadow-md max-w-8xl flex max-sm:flex-col'>
        <div>
          <img
            src={user.profileImage}
            alt='Profile'
            className='w-28 h-28 rounded-full border border-gray-300 object-cover'
          />
        </div>
        <div className='bg-white p-6 rounded-lg max-w-7xl form-resident'>
          <div className='grid xl:grid-cols-5   max-2xl:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2 max-3xl:grid-cols-2 lg:grid-cols-2'>
            {/* Full Name */}
            <div>
              <label className='block text-[18px] font-medium text-black'>
                Full Name
              </label>
              <p className='text-gray-400 font-lighter'>{user.Full_name}</p>
            </div>
            <div>
              <label className='block text-[18px] font-medium text-black'>
                Phone Number
              </label>
              <p className='text-gray-400 font-lighter'>
                +91 {user.Phone_number}
              </p>
            </div>
            <div>
              <label className='block text-[18px] font-medium text-black'>
                Email Address
              </label>
              <p className='text-gray-400 font-lighter '>{user.Email_address}</p>
            </div>
            <div>
              <label className='block text-[18px] font-medium text-black'>
                Gender
              </label>
              <p className='text-gray-400 font-lighter'> {user.Gender}</p>
            </div>
            <button
              onClick={() => handleViewFile(user?.Address_proof)}
              className='flex flex-col items-start w-[250px] max-md:w-[200px] max-xl:mr-[30px] max-2xl:w-[200px] max-3xl:w-[200px] max-2xl:mt-[10px] max py-3 px-4 bg-white border border-gray-300 rounded-lg mb-[15px]'
            >
              <div className='flex items-center gap-3'>
                <div>
                  <FaImage size={16} className='text-blue-500' />
                </div>
                <div>
                  <p className='font-lighter text-[10px] truncate'>
                    Address Proof Front Side.PDF
                  </p>
                  <p className='text-xs text-start text-gray-500 font-lighter mt-1'>
                    3.5 MB
                  </p>
                </div>
              </div>
            </button>
            <div>
              <label className='block text-[18px] font-medium text-black'>
                Wing
              </label>
              <p className='text-gray-400 font-lighter'>{user.Wing}</p>
            </div>
            <div>
              <label className='block text-[18px] font-medium text-black'>
                Age
              </label>
              <p className='text-gray-400 font-lighter'>{user.Age}</p>
            </div>
            <div>
              <label className='block text-[18px] font-medium text-black'>
                Unit
              </label>
              <p className='text-gray-400 font-lighter'>{user.Unit}</p>
            </div>
            <div>
              <label className='block text-[18px] font-medium text-black'>
                Relation
              </label>
              <p className='text-gray-400 font-lighter'>{user.Relation}</p>
            </div>
            <button
              onClick={() => handleViewFile(user?.Address_proof)}
              className='flex flex-col items-start w-[250px] max-2xl:w-[200px] max-3xl:w-[200px]  py-3 px-4 bg-white border border-gray-300 rounded-lg'
            >
              <div className='flex items-center gap-3 max-md:w-[150px]'>
                <div>
                  <FaImage size={16} className='text-blue-500' />
                </div>
                <div>
                  <p className='font-lighter text-[10px] truncate'>
                    Address Proof Front Side.PDF
                  </p>
                  <p className='text-xs text-start text-gray-500 font-lighter mt-1'>
                    3.5 MB
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Form