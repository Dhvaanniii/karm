import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";
import {
  CreateFacility,
  GetFacilities,
  UpdateFacility,
} from "../services/facilityService";
import { addNewNotification } from "../redux/features/notificationSlice";
import { useDispatch } from "react-redux";
import { Loader } from "../utils/Loader";
import calendar from '../assets/images/calendar.svg'
import DatePicker from 'react-datepicker'

function FacilityManagement() {
  const dispatch = useDispatch();
  const [facilities, setFacilities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentFacility, setCurrentFacility] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null)
  const [startDate, setStartDate] = useState(
    currentFacility?.date ? new Date(currentFacility.date) : null
  );

  const handleCalendarClick = () => {
    setIsCalendarOpen(!isCalendarOpen)
  }

  const checkFormFilled = (facility) => {
    return (
      facility?.name?.trim() !== "" &&
      facility?.description?.trim() !== "" &&
      facility?.date?.trim() !== "" &&
      facility?.remindDays?.toString()?.trim() !== ""
    );
  };

  const handleFacilityChange = (field, value) => {
    const updatedFacility = {
      ...currentFacility,
      [field]: value,
    };
    setCurrentFacility(updatedFacility);
    setIsFormFilled(checkFormFilled(updatedFacility));
  };

  const handleCreateFacility = () => {
    setModalType("create");
    setCurrentFacility({
      name: "",
      description: "",
      date: "",
      remind: "",
    });
    setIsModalOpen(true);
    setIsFormFilled(false);
  };

  const handleEditFacility = (facility) => {
    setModalType("edit");
    setCurrentFacility({ ...facility });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentFacility(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (modalType === "create") {
      try {
        setIsLoading(true)
        const response = await CreateFacility(currentFacility);
        fetchFacilities();

        const notification = {
          _id: response.data.notification._id,
          title: response.data.notification.title,
          name: response.data.notification.name,
          message: response.data.notification.message,
          date: response.data.notification.date,
        };

        dispatch(addNewNotification(notification));
        toast.success(response.data.message);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
      finally {
        setIsLoading(false)
      }
    } else if (modalType === "edit") {
      const updateData = {
        name: currentFacility.name,
        description: currentFacility.description,
        date: currentFacility.date,
        remind: currentFacility.remind,
      };
      try {
        setIsLoading(true)
        const response = await UpdateFacility(currentFacility._id, updateData);
        fetchFacilities();
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false)
        setDropdownOpen(false);
      }
    }
    handleCloseModal();
  };

  const handleAction = async () => {
    setIsLoading(true);
    try {

      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(`${modalType === "save" ? "Saved" : "Created"} successfully!`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const renderDropdownMenu = (facility) => (
    <div className="absolute right-0 mt-2 w-20 bg-white rounded-md shadow-lg z-10 hover:bg-gray-50">
      <button
        onClick={() => handleEditFacility(facility)}
        className="font-semibold h-[41px] w-[100px] ps-[10px] text-left text-sm text-black  flex items-center gap-2"
      >
        Edit
      </button>
    </div>
  );

  const renderModalForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Facility Name
        </label>
        <input
          name="name"
          type="text"
          value={currentFacility?.name || ""}
          onChange={(e) => handleFacilityChange("name", e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-[10px]"
          placeholder="Enter facility title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={currentFacility?.description || ""}
          onChange={(e) => handleFacilityChange("description", e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-[10px] h-24"
          placeholder="Enter description"
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='relative'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Schedule Service Date
          </label>
          <div className='relative'>
            <DatePicker
              selected={startDate}
              minDate={new Date()}
              onChange={(date) => {
                setStartDate(date); // Update local state for the DatePicker
                handleFacilityChange('date', date.toISOString()); // Update the currentFacility object
              }}
              dateFormat='yyyy-MM-dd'
              placeholderText='Select Date'
              open={isCalendarOpen}
              onClickOutside={() => setIsCalendarOpen(false)}
              onClickInside={() => setIsCalendarOpen(true)}
              className='w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black'
            />
            <img
              src={calendar}
              alt='calendar icon'
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer'
              onClick={handleCalendarClick}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Remind before
          </label>
          <input
            name="remind"
            type="number"
            value={currentFacility?.remind || ""}
            onChange={(e) => handleFacilityChange("remind", e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-[10px]"
            placeholder="Enter days"
            min="1"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          type="button"
          onClick={handleCloseModal}
          className="w-full h-[51px]  text-gray-700 bg-white border border-gray-200 rounded-[10px] text-sm font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isFormFilled}
          className={`w-full h-[51px] text-sm font-medium rounded-[10px] transition-all duration-300
            ${isFormFilled
              ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white hover:opacity-90"
              : "bg-[#F6F8FB] text-black-400 cursor-not-allowed"
            }`}
        >
          {modalType === "save" ? "save" : "Save"}
        </button>
      </div>
    </form>
  );

  const fetchFacilities = async () => {
    try {
      setIsLoading(true)
      const response = await GetFacilities();
      setFacilities(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-white rounded-[10px] ">
      <div className="flex justify-between  items-center mb-6 max-sm:flex-col">
        <h1 className="text-[20px] font-semibold text-gray-800 max-xl:mb-0 max-sm:mb-[15px]">
          Facility Management
        </h1>
        <button
          onClick={handleCreateFacility}
          className="px-4 py-3 bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white rounded-[10px] hover:opacity-90 flex items-center gap-2"
        >
          Create Facility
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (

          <div className="col-span-full flex justify-center items-center py-12">
            <Loader />
          </div>
        ) : facilities.length > 0 ? (
          facilities.map((facility) => (
            <div
              key={facility._id}
              className="bg-white rounded-[10px] shadow-sm border border-grey-800 hover:shadow-sm transition-shadow"
            >
              <div className="bg-[#5678E9] text-white p-4 rounded-t-lg flex justify-between items-center">
                <h3 className="font-medium">{facility.name}</h3>
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(facility._id)}
                    className="hover:opacity-80 text-blue-500 rounded-md p-1 bg-white h-5 w-5"
                  >
                    <FaEllipsisV size={12} />
                  </button>
                  {dropdownOpen === facility._id && renderDropdownMenu(facility)}
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center text-sm justify-between">
                    <span className="text-gray-500">
                      Upcoming Schedule Service Date
                    </span>
                    <span className="text-black font-semibold">
                      {new Date(facility.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-500 text-sm">Description</p>
                    <p className="text-sm text-black line-clamp-2">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-4 text-gray-500">
            No data found.
          </div>
        )}
      </div>

      {/* Create/Edit Modal - Updated for better responsiveness */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-2 sm:p-4">
          <div className="bg-white rounded-xl w-[95%] sm:w-[85%] md:w-[65%] lg:w-[50%] max-w-md max-h-[90vh] sm:max-h-[85vh] overflow-y-auto my-2 sm:my-8 mx-auto relative">
            <div className="p-3 sm:p-6 ">
              {/* Header */}
              <div className="flex justify-between items-center mb-3 sm:mb-4 sticky top-0 bg-white pt-1">
                <h2 className="text-base sm:text-xl font-semibold text-gray-800">
                  {modalType === "create" ? "Create Facility" : "Edit Facility"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-black hover:text-gray-600 p-1"
                >
                  <IoMdClose size={18} />
                </button>
              </div>

              {/* Form with updated spacing */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="border-b border-[#F4F4F4] mb-[10px]"></div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Facility Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={currentFacility?.name || ""}
                    onChange={(e) =>
                      handleFacilityChange("name", e.target.value)
                    }
                    className="w-full p-2 sm:p-3 border border-gray-200 focus:outline-none rounded-[10px] text-sm"
                    placeholder="Enter facility title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={currentFacility?.description || ""}
                    onChange={(e) =>
                      handleFacilityChange("description", e.target.value)
                    }
                    className="w-full p-2 sm:p-3 border border-gray-200 rounded-[10px] h-16 sm:h-24  focus:outline-none text-sm"
                    placeholder="Enter description"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Schedule Service Date
                    </label>
                    <div className="relative">
                      <DatePicker
                        selected={startDate}
                        minDate={new Date()}
                        onChange={(date) => {
                          setStartDate(date); // Update local state for the DatePicker
                          handleFacilityChange('date', date.toISOString()); // Update the currentFacility object
                        }}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select Date"
                        open={isCalendarOpen}
                        onClickOutside={() => setIsCalendarOpen(false)}
                        onClickInside={() => setIsCalendarOpen(true)} 
                        className="w-[400px] max-sm:w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none  " 
                      />
                      <img
                        src={calendar}
                        alt="calendar icon"
                        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                        onClick={handleCalendarClick}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Remind before
                    </label>
                    <input
                      name="remind"
                      type="number"
                      value={currentFacility?.remind || ""}
                      onChange={(e) =>
                        handleFacilityChange("remind", e.target.value)
                      }
                      className="w-full p-2 sm:p-3 border border-gray-200 rounded-[10px] text-sm focus:outline-none"
                      placeholder="Enter days"
                      min="1"
                    />
                  </div>
                </div>

                {/* Buttons with better mobile spacing */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full py-2 sm:py-3 text-gray-700 bg-white border border-gray-200 rounded-[10px] text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormFilled}
                    onClick={handleAction}
                    className={`w-full py-2 sm:py-3 text-sm font-medium rounded-[10px] transition-all duration-300
                      ${isFormFilled
                        ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white hover:opacity-90"
                        : "bg-[#F6F8FB] text-black-400 cursor-not-allowed"
                      }`}
                  >
                    {isLoading ? (
                      <Loader />
                    ) : modalType === "save" ? (
                      "Save"
                    ) : (
                      "Create"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacilityManagement;
