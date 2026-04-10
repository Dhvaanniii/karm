
import React, { useState, useEffect } from "react";
import { FaCamera, FaImage, FaUpload, FaCheckCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateTenant, UpdateTenant } from "../services/ownerTenantService";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux'
import { Loader } from "../utils/Loader";

export default function TeantForm () {
  const location = useLocation()
  const { resident } = location.state || {}
  const [formData, setFormData] = useState({
    Owner_Full_name: resident?.Owner_Full_name || '',
    Owner_Phone: resident?.Owner_Phone || '',
    Owner_Address: resident?.Owner_Address || '',
    Member_Counting: resident?.Member_Counting || [],
    Vehicle_Counting: resident?.Vehicle_Counting || [],
    Full_name: resident?.Full_name || '',
    Phone_number: resident?.Phone_number || '',
    Email_address: resident?.Email_address || '',
    Age: resident?.Age || '',
    Gender: resident?.Gender || '',
    Wing: resident?.Wing || '',
    Unit: resident?.Unit || '',
    Relation: resident?.Relation || '',
    profileImage: null,
    Adhar_front: null,
    Adhar_back: null,
    Address_proof: null,
    Rent_Agreement: null
  })


  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tenant");
  const [memberCount, setMemberCount] = useState(1);
  const [vehicleCount, setVehicleCount] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [credentialsModal, setCredentialsModal] = useState({ show: false, username: '', password: '' });

  useEffect(() => {
    if (resident) {
      setProfilePhotoPreview(resident?.profileImage || null)
      setEdit(true)
      setIsFormValid(true)
    } else {
      validateForm()
    }
  }, [formData])

  const validateForm = () => {
    const requiredFields = {
      Owner_Full_name: formData.Owner_Full_name,
      Owner_Phone: formData.Owner_Phone,
      Owner_Address: formData.Owner_Address,
      profileImage: formData.profileImage,
      fullName: formData.Full_name, 
      phone: formData.Phone_number,
      age: formData.Age, 
      gender: formData.Gender, 
      wing: formData.Wing, 
      unit: formData.Unit, 
      relation: formData.Relation, 
      aadharFront: formData.Adhar_front,
      aadharBack: formData.Adhar_back,
      addressProof: formData.Address_proof,
      Rent_Agreement: formData.Rent_Agreement
    }

    const isValid = Object.values(requiredFields).every(
      value => value !== null && value !== undefined && value !== ''
    )

    setIsFormValid(isValid)
  }

  const handleTenantClick = () => {
    setActiveTab('owner')
    navigate('/ownerform')
  }
  const handleCreate = async () => {
    setSubmitted(true) 
    let newErrors = {}

    // Validate form data
    if (!formData.Owner_Full_name)
      newErrors.Owner_Full_name = 'Owner Full name is required.'
    if (!formData.Owner_Phone)
      newErrors.Owner_Phone = 'Owner Phone number is required.'
    if (!formData.Owner_Address)
      newErrors.Owner_Address = 'Owner Address is required.'
    if (!formData.profileImage)
      newErrors.profileImage = 'profileImage is required.'
    if (!formData.Full_name) newErrors.Full_name = 'Full Name is required.'
    if (!formData.Phone_number)
      newErrors.Phone_number = 'Phone Number is required.'
    if (!formData.Email_address)
      newErrors.Email_address = 'Email Address is required.'
    if (!formData.Age) newErrors.Age = 'Age is required.'
    if (!formData.Gender) newErrors.Gender = 'Gender is required.'
    if (!formData.Wing) newErrors.Wing = 'Wing is required.'
    if (!formData.Unit) newErrors.Unit = 'Unit is required.'
    if (!formData.Relation) newErrors.Relation = 'Relation is required.'
    if (!formData.Adhar_front)
      newErrors.Adhar_front = 'Aadhar Front is required.'
    if (!formData.Adhar_back) newErrors.Adhar_back = 'Aadhar Back is required.'
    if (!formData.Address_proof)
      newErrors.Address_proof = 'Address Proof is required.'
    if (!formData.Rent_Agreement)
      newErrors.Rent_Agreement = 'Rent Agreement is required.'

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {

        setIsLoading(true)
        const response = await CreateTenant(formData);
        
        // Show credentials modal
        if (response.data.loginCredentials) {
          setCredentialsModal({
            show: true,
            username: response.data.loginCredentials.username,
            password: response.data.loginCredentials.password
          })
        }
        
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message)
      } finally {
        setIsLoading(false)
      }
    }
  }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Handle input changes
  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle file uploads
  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }))
    }
  }

  const handleProfilePhotoChange = e => {
    const file = e.target.files[0]
    if (file) {
      setProfilePhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
      setFormData({ ...formData, [e.target.name]: file })
    }
  }

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.Member_Counting]
    if (!updatedMembers[index]) {
      updatedMembers[index] = {}
    }
    updatedMembers[index][field] = value
    setFormData({ ...formData, Member_Counting: updatedMembers })
  }

  const handleVehicleChange = (index, field, value) => {
    const updatedVehicles = [...formData.Vehicle_Counting]
    if (!updatedVehicles[index]) {
      updatedVehicles[index] = {}
    }
    updatedVehicles[index][field] = value
    setFormData({ ...formData, Vehicle_Counting: updatedVehicles })
  }

  const handleMemberChangeEdit = (index, name, value) => {
    setFormData(prevState => {
      const updatedMembers = [...prevState.Member_Counting]

      updatedMembers[index] = {
        ...updatedMembers[index],
        [name]: value
      }

      return {
        ...prevState,
        Member_Counting: updatedMembers
      }
    })
  }

  const handleUpdateTenant = async () => {
    try {
      setIsLoading(true)
      const response = await UpdateTenant(resident._id, formData)
      toast.success(response.data.message)
      navigate('/residentmanagement')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen p-4 bg-gray-100'>
      {/* Tab Buttons */}
      <div className='flex '>
        <button
          className={`px-6 py-[14px] rounded-t-[10px] w-[135px] font-semibold text-[#202224] ${
            activeTab === 'owner'
              ? 'bg-[#FF6B07] text-white'
              : 'bg-white text-gray-600  border-b-2 border-orange-500'
          }`}
          onClick={() => handleTenantClick('owner')}
        >
          Owner
        </button>
        <button
          className={`px-6 py-[14px] rounded-t-[10px] w-[135px] font-semibold text-[#202224] ${
            activeTab === 'tenant'
              ? 'bg-[#FF6B07] text-white'
              : 'bg-white text-gray-600  border-b-2 border-orange-500'
          }`}
          onClick={() => {
            setActiveTab('tenant')
          }}
        >
          Tenant
        </button>
      </div>

     
      <div className="grid grid-cols-1 bg-white rounded-lg p-6 shadow-md md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className='block text-sm font-lighter text-black-500'>
            Owner Full Name*
          </label>
          <input
            type='text'
            name='Owner_Full_name'
            value={formData.Owner_Full_name}
            onChange={handleInputChange}
            placeholder='Enter Full Name'
            className='w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200'
          />
        </div>
        <div>
          <label className='block text-sm font-lighter text-black-500'>
            Owner Phone*
          </label>
          <input
            type='tel'
            name='Owner_Phone'
            value={formData.Owner_Phone}
            onChange={handleInputChange}
            placeholder='+91'
            className='w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200'
          />
        </div>
        <div>
          <label className='block text-sm font-lighter text-black-500'>
            Owner Address*
          </label>
          <input
            type='text'
            name='Owner_Address'
            value={formData.Owner_Address}
            onChange={handleInputChange}
            placeholder='Enter Address'
            className='w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200'
          />
        </div>
      </div>
      {/* Form Container */}
      <div className='bg-white rounded-lg p-6 shadow-md'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
          {/* Profile Photo Section */}
          <div className='md:col-span-2 flex flex-col items-center'>
            <div className='relative w-24 h-24'>
              <input
                type='file'
                name='profileImage'
                accept='image/*'
                onChange={handleProfilePhotoChange}
                className='hidden'
                id='profilePhotoInput'
              />
              <label
                htmlFor='profilePhotoInput'
                className='cursor-pointer w-full h-full rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-300'
              >
                {profilePhotoPreview ? (
                  <img
                    src={profilePhotoPreview}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-full bg-gray-200 rounded-full flex items-center justify-center'>
                    <FaCamera size={24} className='text-gray-400' />
                  </div>
                )}
              </label>
            </div>
            <label
              htmlFor='profilePhotoInput'
              className='text-blue-500 font-semibold text-sm mt-2 cursor-pointer'
            >
              Add Photo
            </label>
          </div>

          {/* Form Fields */}
          <div className='md:col-span-10'>
           
            <div className='grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-xl:grid-cols-2 max-2xl:grid-cols-2 max-sm:grid-cols-1'>
              <div>
                <label className='block text-sm font-lighter text-black-500'>
                  Full Name*
                </label>
                <input
                  type='text'
                  name='Full_name'
                  value={formData.Full_name}
                  onChange={handleInputChange}
                  placeholder='Enter Full Name'
                  className='w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200'
                />
                {submitted && errors.Full_name && (
                  <p className='text-red-500'>{errors.Full_name}</p>
                )}
              </div>
              <div>
                <label className='block text-sm font-lighter text-black-500'>
                  Phone Number*
                </label>
                <input
                  type='tel'
                  name='Phone_number'
                  value={formData.Phone_number}
                  onChange={handleInputChange}
                  placeholder='+91'
                  className='w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200'
                />
                {submitted && errors.Phone_number && (
                  <p className='text-red-500'>{errors.Phone_number}</p>
                )}
              </div>
              <div>
                <label className='block text-sm font-lighter text-black-500'>
                  Email Address
                </label>
                <input
                  type='email'
                  name='Email_address'
                  value={formData.Email_address}
                  onChange={handleInputChange}
                  placeholder='Enter Email Address'
                  className='w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200'
                />
                {submitted && errors.Email_address && (
                  <p className='text-red-500'>{errors.Email_address}</p>
                )}
              </div>
            </div>

         
            <div className='grid grid-cols-5 gap-4 mt-4 max-lg:grid-cols-2 max-sm:grid-cols-1 max-xl:grid-cols-3 max-2xl:grid-cols-3'>
              <div>
                <label className='block text-sm font-lighter text-black-500'>
                  Age*
                </label>
                <input
                  type='number'
                  name='Age'
                  value={formData.Age}
                  onChange={handleInputChange}
                  placeholder='Enter Age'
                  className='w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200'
                />
                {submitted && errors.Age && (
                  <p className='text-red-500'>{errors.Age}</p>
                )}
              </div>
              <div className='relative'>
                <label className='block text-sm font-lighter text-black-500'>
                  Gender*
                </label>
                <div onClick={toggleDropdown} className='cursor-pointer'>
                  <div className='w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200 bg-white flex justify-between items-center'>
                    <span>{formData.Gender || 'Select Gender'}</span>
                    <IoIosArrowDown
                      className='text-bold mt-1 text-black pointer-events-none'
                      size={16}
                    />
                  </div>
                </div>

                {isDropdownOpen && (
                  <div className='absolute mt-1 bg-white p-2 w-full z-10 shadow-[0px_0px_40px_0px_#00000014] ps-[20px] py-[20px] rounded-[10px]'>
                    <label
                      className={`flex items-center ${
                        formData.Gender === 'male'
                          ? 'font-semibold'
                          : 'font-normal text-[#A7A7A7]'
                      }`}
                    >
                      <input
                        type='radio'
                        name='Gender'
                        value='male'
                        checked={formData.Gender === 'male'}
                        onChange={handleInputChange}
                        className='mr-2 custom-radio'
                      />
                      Male
                    </label>
                    <label
                      className={`flex items-center mt-1 ${
                        formData.Gender === 'female'
                          ? 'font-semibold'
                          : 'font-normal text-[#A7A7A7]'
                      }`}
                    >
                      <input
                        type='radio'
                        name='Gender'
                        value='female'
                        checked={formData.Gender === 'female'}
                        onChange={handleInputChange}
                        className='mr-2 custom-radio'
                      />
                      Female
                    </label>
                    <label
                      className={`flex items-center mt-1 ${
                        formData.Gender === 'other'
                          ? 'font-semibold'
                          : 'font-normal text-[#A7A7A7]'
                      }`}
                    >
                      <input
                        type='radio'
                        name='Gender'
                        value='other'
                        checked={formData.Gender === 'other'}
                        onChange={handleInputChange}
                        className='mr-2 custom-radio'
                      />
                      other
                    </label>
                  </div>
                )}
                {submitted && errors.Gender && (
                  <p className='text-red-500'>{errors.Gender}</p>
                )}
              </div>
              <div>
                <label className='block text-sm font-lighter text-black-500'>
                  Wing*
                </label>
                <input
                  type='text'
                  name='Wing'
                  value={formData.Wing}
                  onChange={handleInputChange}
                  placeholder='Enter Wing'
                  className='w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200'
                />
                {submitted && errors.Wing && (
                  <p className='text-red-500'>{errors.Wing}</p>
                )}
              </div>
              <div>
                <label className='block text-sm font-lighter text-black-500'>
                  Unit*
                </label>
                <input
                  type='text'
                  name='Unit'
                  value={formData.Unit}
                  onChange={handleInputChange}
                  placeholder='Enter Unit'
                  className='w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200'
                />
                {submitted && errors.Unit && (
                  <p className='text-red-500'>{errors.Unit}</p>
                )}
              </div>
              <div>
                <label className='block text-sm font-lighter text-black-500'>
                  Relation*
                </label>
                <input
                  type='text'
                  name='Relation'
                  value={formData.Relation}
                  onChange={handleInputChange}
                  placeholder='Enter Relation'
                  className='w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200'
                />
                {submitted && errors.Relation && (
                  <p className='text-red-500'>{errors.Relation}</p>
                )}
              </div>
            </div>

            {/* Document Upload Section */}
            <div className='grid grid-cols-4 gap-3 mt-8 max-lg:grid-cols-2 max-sm:grid-cols-1 max-xl:grid-cols-2 max-2xl:grid-cols-2'>
              {/* Aadhar Front */}
              <div>
                <label className='block text-sm font-lighter text-black-700 mb-2 text-nowrap'>
                  Upload Aadhar Card (Front Side)
                </label>
                <div className='relative'>
                  <input
                    type='file'
                    name='Adhar_front'
                    accept='.pdf,.jpg,.jpeg,.png'
                    onChange={e => handleFileUpload(e, 'Adhar_front')}
                    className='hidden'
                    id='aadharFrontInput'
                  />
                  <label
                    htmlFor='aadharFrontInput'
                    className='border-2 border-dashed border-gray-200 rounded-lg p-4 text-center block cursor-pointer hover:border-gray-300 transition-colors'
                  >
                    {formData.Adhar_front ? (
                      <div className='text-sm text-green-600'>
                        <FaCheckCircle className='mx-auto mb-2' size={20} />
                        {formData.Adhar_front.name}
                      </div>
                    ) : (
                      <>
                        <FaImage
                          className='mx-auto text-gray-400 mb-2'
                          size={20}
                        />
                        <div className='flex justify-center mb-[4px] text-nowrap'>
                          <span className='text-[#5678E9] text-sm leading-[21px] font-bold mr-[4px]'>
                            Upload a file
                          </span>
                          <span className='text-[#4F4F4F] text-sm leading-[21px] font-bold'>
                            or drag and drop
                          </span>
                        </div>
                        <p className='text-xs text-gray-400'>
                          PDF, JPG, PNG up to 10MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Aadhar Back */}
              <div>
                <label className='block text-sm font-lighter text-black-700 mb-2 text-nowrap'>
                  Upload Aadhar Card (Back Side)
                </label>
                <div className='relative'>
                  <input
                    type='file'
                    name='Adhar_back'
                    accept='.pdf,.jpg,.jpeg,.png'
                    onChange={e => handleFileUpload(e, 'Adhar_back')}
                    className='hidden'
                    id='aadharBackInput'
                  />
                  <label
                    htmlFor='aadharBackInput'
                    className='border-2 border-dashed border-gray-200 rounded-lg p-4 text-center block cursor-pointer hover:border-gray-300 transition-colors'
                  >
                    {formData.Adhar_back ? (
                      <div className='text-sm text-green-600'>
                        <FaCheckCircle className='mx-auto mb-2' size={20} />
                        {formData.Adhar_back.name}
                      </div>
                    ) : (
                      <>
                        <FaImage
                          className='mx-auto text-gray-400 mb-2'
                          size={20}
                        />
                        <div className='flex justify-center mb-[4px] text-nowrap'>
                          <span className='text-[#5678E9] text-sm leading-[21px] font-bold mr-[4px]'>
                            Upload a file
                          </span>
                          <span className='text-[#4F4F4F] text-sm leading-[21px] font-bold'>
                            or drag and drop
                          </span>
                        </div>
                        <p className='text-xs text-gray-400'>
                          PDF, JPG, PNG up to 10MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Address Proof */}
              <div>
                <label className='block text-sm font-lighter text-black-700 mb-2 text-nowrap'>
                  Address Proof (With Bill Light Bill)
                </label>
                <div className='relative'>
                  <input
                    type='file'
                    name='Address_proof'
                    accept='.pdf,.jpg,.jpeg,.png'
                    onChange={e => handleFileUpload(e, 'Address_proof')}
                    className='hidden'
                    id='addressProofInput'
                  />
                  <label
                    htmlFor='addressProofInput'
                    className='border-2 border-dashed border-gray-200 rounded-lg p-4 text-center block cursor-pointer hover:border-gray-300 transition-colors'
                  >
                    {formData.Address_proof ? (
                      <div className='text-sm text-green-600'>
                        <FaCheckCircle className='mx-auto mb-2' size={20} />
                        {formData.Address_proof.name}
                      </div>
                    ) : (
                      <>
                        <FaImage
                          className='mx-auto text-gray-400 mb-2'
                          size={20}
                        />
                        <div className='flex justify-center mb-[4px] text-nowrap'>
                          <span className='text-[#5678E9] text-sm leading-[21px] font-bold mr-[4px]'>
                            Upload a file
                          </span>
                          <span className='text-[#4F4F4F] text-sm leading-[21px] font-bold'>
                            or drag and drop
                          </span>
                        </div>
                        <p className='text-xs text-gray-400'>
                          PDF, JPG, PNG up to 10MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Rent Agreement */}
              <div>
                <label className='block text-sm font-lighter text-black-700 mb-1'>
                  Rent Agreement
                </label>
                <div className='relative'>
                  <input
                    type='file'
                    name='Rent_Agreement'
                    accept='.pdf,.jpg,.jpeg,.png'
                    onChange={e => handleFileUpload(e, 'Rent_Agreement')}
                    className='hidden'
                    id='rentAgreementInput'
                  />
                  <label
                    htmlFor='rentAgreementInput'
                    className='border-2 border-dashed border-gray-200 rounded-lg p-4 text-center block cursor-pointer hover:border-gray-300 transition-colors'
                  >
                    {formData.Rent_Agreement ? (
                      <div className='text-sm text-green-600'>
                        <FaCheckCircle className='mx-auto mb-2' size={20} />
                        {formData.Rent_Agreement.name}
                      </div>
                    ) : (
                      <>
                        <FaImage
                          className='mx-auto text-gray-400 mb-2'
                          size={20}
                        />
                        <div className='flex justify-center mb-[4px] text-nowrap'>
                          <span className='text-[#5678E9] text-sm leading-[21px] font-bold mr-[4px]'>
                            Upload a file
                          </span>
                          <span className='text-[#4F4F4F] text-sm leading-[21px] font-bold'>
                            or drag and drop
                          </span>
                        </div>
                        <p className='text-xs text-gray-400'>
                          PDF, JPG, PNG up to 10MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Member and Vehicle Section */}
        <div className='flex flex-col gap-6 mt-8'>
          {/* Member Section */}
          <div className='bg-white rounded-lg p-4'>
            <div className='flex justify-between items-center mb-4'>
              <label className='text-sm text-black-700 font-medium'>
                Member Counting{' '}
                <span className='text-gray-500'> : (Other Members)</span>
              </label>
              <div className='relative'>
                <select
                  className='w-32 h-10 px-3 pr-8 border border-[#E8E8E8] rounded-[4px] text-sm text-black-600 focus:outline-none appearance-none bg-white cursor-pointer'
                  onChange={e => setMemberCount(Number(e.target.value))}
                >
                  <option value='0'>Select Member</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <IoIosArrowDown
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                  size={16}
                />
              </div>
            </div>

            {resident?.Member_Counting ? (
              <>
                {formData.Member_Counting.map((member, index) => (
                  <div
                    key={index}
                    className='grid grid-cols-1 md:grid-cols-6 gap-4 mt-4 items-start'
                  >
                    <div>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Full Name*
                      </label>
                      <input
                        name='Full_name'
                        type='text'
                        value={member.Full_name}
                        placeholder='Enter Full Name'
                        onChange={e =>
                          handleMemberChangeEdit(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        className='w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none'
                      />
                    </div>
                    <div>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Phone No*
                      </label>
                      <input
                        name='Phone_number'
                        type='tel'
                        value={member.Phone_number}
                        placeholder='+91'
                        onChange={e =>
                          handleMemberChangeEdit(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        className='w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none'
                      />
                    </div>
                    <div>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Email
                      </label>
                      <input
                        name='Email_address'
                        type='email'
                        value={member.Email_address}
                        placeholder='Enter Email Address'
                        onChange={e =>
                          handleMemberChangeEdit(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        className='w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none'
                      />
                    </div>
                    <div>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Age*
                      </label>
                      <input
                        name='Age'
                        type='number'
                        value={member.Age}
                        placeholder='Enter Age'
                        onChange={e =>
                          handleMemberChangeEdit(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        className='w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none'
                      />
                    </div>
                    <div className='relative'>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Gender*
                      </label>
                      <select
                        name='Gender'
                        defaultValue={member.Gender}
                        className='w-full h-[42px] px-4 pr-8 border border-[#E8E8E8] rounded-[4px] text-sm text-gray-600 focus:outline-none appearance-none bg-white cursor-pointer'
                        onChange={e =>
                          handleMemberChangeEdit(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                      >
                        <option value=''>Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                      </select>
                      <IoIosArrowDown
                        className='absolute right-3 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none'
                        size={16}
                      />
                    </div>
                    <div>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Relation*
                      </label>
                      <input
                        name='Relation'
                        type='text'
                        value={member.Relation}
                        placeholder='Enter Relation'
                        onChange={e =>
                          handleMemberChangeEdit(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        className='w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none'
                      />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {' '}
                {/* Member Form Fields */}
                {[...Array(memberCount)].map((_, index) => (
                  <div
                    key={index}
                    className='grid grid-cols-1 md:grid-cols-6 gap-4 mt-4 items-start'
                  >
                    <div>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Full Name*
                      </label>
                      <input
                        name='Full_name'
                        type='text'
                        placeholder='Enter Full Name'
                        onChange={e =>
                          handleMemberChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        className='w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none'
                      />
                    </div>
                    <div>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Phone No*
                      </label>
                      <input
                        name='Phone_number'
                        type='tel'
                        placeholder='+91'
                        onChange={e =>
                          handleMemberChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        className='w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none'
                      />
                    </div>
                    <div>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Email
                      </label>
                      <input
                        name='Email_address'
                        type='email'
                        placeholder='Enter Email Address'
                        onChange={e =>
                          handleMemberChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        className='w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none'
                      />
                    </div>
                    <div>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Age*
                      </label>
                      <input
                        name='Age'
                        type='number'
                        placeholder='Enter Age'
                        onChange={e =>
                          handleMemberChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        className='w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none'
                      />
                    </div>
                    <div className='relative'>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Gender*
                      </label>
                      <select
                        name='Gender'
                        className='w-full h-[42px] px-4 pr-8 border border-[#E8E8E8] rounded-[4px] text-sm text-gray-600 focus:outline-none appearance-none bg-white cursor-pointer'
                        onChange={e =>
                          handleMemberChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                      >
                        <option value=''>Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                      </select>
                      <IoIosArrowDown
                        className='absolute right-3 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none'
                        size={16}
                      />
                    </div>
                    <div>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Relation*
                      </label>
                      <input
                        name='Relation'
                        type='text'
                        placeholder='Enter Relation'
                        onChange={e =>
                          handleMemberChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        className='w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none'
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Vehicle Section */}
          <div className='bg-white rounded-lg p-4'>
            <div className='flex justify-between items-center mb-4'>
              <label className='text-sm text-black font-medium'>
                Vehicle Counting :
              </label>
              <div className='relative'>
                <select
                  className='w-32 h-10 px-3 pr-8 border border-[#E8E8E8] rounded-[4px] text-sm text-black-600 focus:outline-none appearance-none bg-white cursor-pointer'
                  onChange={e => setVehicleCount(Number(e.target.value))}
                >
                  <option value='0'>Select Vehicle</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <IoIosArrowDown
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
                  size={16}
                />
              </div>
            </div>

            {/* Vehicle Form Fields */}
            {resident?.Vehicle_Counting ? (
              <>
                {formData?.Vehicle_Counting.map((vehicle, index) => (
                  <div
                    key={index}
                    className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'
                  >
                    <div className='relative'>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Vehicle Type*
                      </label>
                      <select
                        name='vehicle_type'
                        defaultValue={vehicle.vehicle_type}
                        className='w-full h-[42px] px-4 pr-8 border border-[#E8E8E8] rounded-[4px] text-sm text-gray-600 focus:outline-none appearance-none bg-white cursor-pointer'
                        onChange={e =>
                          handleVehicleChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                      >
                        <option selected disabled>
                          Select Vehicle Type
                        </option>
                        <option value='Two Wheelers'>Two Wheelers</option>
                        <option value='Four Wheelers'>Four Wheelers</option>
                      </select>
                      <IoIosArrowDown
                        className='absolute right-3 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none'
                        size={16}
                      />
                    </div>
                    <div>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Vehicle Name
                      </label>
                      <input
                        name='vehicle_name'
                        type='text'
                        value={vehicle.vehicle_name}
                        placeholder='Enter Name'
                        onChange={e =>
                          handleVehicleChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        className='w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none'
                      />
                    </div>
                    <div>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Vehicle Number
                      </label>
                      <input
                        name='vehicle_number'
                        type='text'
                        value={vehicle.vehicle_number}
                        placeholder='Enter Number'
                        onChange={e =>
                          handleVehicleChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        className='w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none'
                      />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className='grid grid-cols-2 gap-4 mt-4 items-start max-lg:grid-cols-1 max-xl:grid-cols-1 max-sm:grid-cols-1'>
                {[...Array(vehicleCount)].map((_, index) => (
                  <div key={index} className='flex gap-4 mt-4 max-sm:flex-col'>
                    <div className='relative w-full'>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Vehicle Type*
                      </label>
                      <select
                        name='vehicle_type'
                        className='w-full h-[42px] px-4 pr-8 border border-[#E8E8E8] rounded-[4px] text-sm text-gray-600 focus:outline-none appearance-none bg-white cursor-pointer'
                        onChange={e =>
                          handleVehicleChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                      >
                        <option selected disabled>
                          Select Vehicle Type
                        </option>
                        <option value='Two Wheelers'>Two Wheelers</option>
                        <option value='Four Wheelers'>Four Wheelers</option>
                      </select>
                      <IoIosArrowDown
                        className='absolute right-3 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none'
                        size={16}
                      />
                    </div>
                    <div className='w-full'>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Vehicle Name
                      </label>
                      <input
                        name='vehicle_name'
                        type='text'
                        placeholder='Enter Name'
                        onChange={e =>
                          handleVehicleChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        className='w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none'
                      />
                    </div>
                    <div className='w-full'>
                      <label className='block text-xs text-black-500 font-lighter mb-1'>
                        Vehicle Number
                      </label>
                      <input
                        name='vehicle_number'
                        type='text'
                        placeholder='Enter Number'
                        onChange={e =>
                          handleVehicleChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        className='w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none'
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end gap-4 mt-8'>
          <button className='px-6 py-2 border border-gray-200 rounded-lg text-gray-700 bg-white'>
            Cancel
          </button>
          <button
            className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
              isFormValid
                ? 'bg-[#FF6B07] text-white hover:bg-[#FF5500]'
                : 'bg-[#F6F8FB] text-gray-400 cursor-not-allowed'
            }`}
            onClick={edit ? handleUpdateTenant : handleCreate}
          >
           {isLoading ? (
       <Loader/>
      ) : (
        edit ? "Save" : "Create"
      )}
          </button>
        </div>
      </div>

      {/* Credentials Modal */}
      {credentialsModal.show && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4'>
          <div className='bg-white rounded-2xl shadow-xl w-full max-w-md'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold text-gray-800'>
                  Tenant Created Successfully!
                </h2>
                <button
                  onClick={() => {
                    setCredentialsModal({ show: false, username: '', password: '' })
                    navigate("/residentmanagement")
                    setFormData({
                      Owner_Full_name: '',
                      Owner_Phone: '',
                      Owner_Address: '',
                      Member_Counting: [],
                      Vehicle_Counting: [],
                      profileImage: null,
                      Full_name: '',
                      Phone_number: '',
                      Email_address: '',
                      Age: '',
                      Gender: '',
                      Wing: '',
                      Unit: '',
                      Relation: '',
                      Adhar_front: null,
                      Adhar_back: null,
                      Address_proof: null,
                      Rent_Agreement: null
                    })
                    setMemberCount(0)
                    setVehicleCount(0)
                    setProfilePhotoPreview(null)
                  }}
                  className='text-gray-400 hover:text-gray-600'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className='border-b border-[#F4F4F4] mb-4'></div>

              <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4'>
                <p className='text-sm text-blue-800 font-medium mb-2'>
                  ⚠️ Important: Save these credentials and share them with the tenant
                </p>
                <div className='space-y-3'>
                  <div>
                    <label className='text-xs text-gray-600 font-medium'>Username (Email):</label>
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
                  These credentials have also been sent via email to the tenant.
                </p>
              </div>

              <button
                onClick={() => {
                  setCredentialsModal({ show: false, username: '', password: '' })
                  navigate("/residentmanagement")
                  setFormData({
                    Owner_Full_name: '',
                    Owner_Phone: '',
                    Owner_Address: '',
                    Member_Counting: [],
                    Vehicle_Counting: [],
                    profileImage: null,
                    Full_name: '',
                    Phone_number: '',
                    Email_address: '',
                    Age: '',
                    Gender: '',
                    Wing: '',
                    Unit: '',
                    Relation: '',
                    Adhar_front: null,
                    Adhar_back: null,
                    Address_proof: null,
                    Rent_Agreement: null
                  })
                  setMemberCount(0)
                  setVehicleCount(0)
                  setProfilePhotoPreview(null)
                }}
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
