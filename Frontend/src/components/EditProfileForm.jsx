import  { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import editimage from "../assets/images/editimage.png";


import { useDispatch, useSelector } from "react-redux";
import {
  createSociety,
  getSocieties,
  UpdateUserProfile,
} from "../services/AuthService";
import toast from "react-hot-toast";
import { MdKeyboardArrowDown } from "react-icons/md";
import { UpdateUser } from "../redux/features/AuthSlice";
import { Loader } from "../utils/Loader";

function EditProfileForm() {
 
  const { user } = useSelector((store) => store.auth);
  const [profile, setProfile] = useState({
    FirstName: user?.FirstName,
    LastName: user?.LastName,
    Email: user?.Email,
    Phone: user?.Phone,
    Country: user?.Country,
    State: user?.State,
    City: user?.City,
    select_society: user?.select_society,
    profileImage: user?.profileImage,
  });
  const [profileImage, setProfileImage] = useState(
    user.profileImage || editimage
  );
  const [isEditing, setIsEditing] = useState(false);
  const [societyList, setSocietyList] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [society, setSociety] = useState({
    Society_name: "",
    Society_address: "",
    Country: "",
    State: "",
    City: "",
    ZipCode: "",
  });
  const dispatch = useDispatch();

  const handleSocietySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createSociety(society);
      toast.success(response.data.message);
      fetchSocieties();
      setShowModal(false); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create society");
    } finally {
      setSociety({
        Society_name: "",
        Society_address: "",
        Country: "",
        State: "",
        City: "",
        ZipCode: "",
      });
    }
  };

  const handleSocietyChange = (e) => {
    const { name, value } = e.target;
    setSociety({ ...society, [name]: value });
  };

  const isFormValid = () => {
    return (
      society.Society_name &&
      society.Society_address &&
      society.Country &&
      society.State &&
      society.City &&
      society.ZipCode 
    );
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.Society_name);
    setProfile({ ...profile, select_society: option._id });
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prevProfile) => ({
        ...prevProfile,
        [e.target.name]: e.target.files[0],
      }));
      setProfileImage(imageUrl);
    }
  };

  // Update user profile
  const handleProfileUpdate = async () => {
    try {
      setIsLoading(true)
      const response = await UpdateUserProfile(user._id, profile);
      dispatch(UpdateUser(response.data.user));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false)
      setIsEditing(false);
    }
  };

  // get all societies
  const fetchSocieties = async () => {
    try {
      const response = await getSocieties();
      setSocietyList(response.data.Society);
    } catch (error) {
      toast.error("Failed to fetch societies");
    }
  };

  useEffect(() => {
    fetchSocieties();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-start items-center h-screen bg-edit-images pt-16 px-4 md:px-8">
        <div className="max-w-[991px] w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-4 mt-4">
              {isEditing ? "Edit Profile" : "Profile"}
            </h2>
            {!isEditing && (
              <button
                onClick={handleEditToggle}
                className="bg-custom-gradient text-white py-2 px-4 rounded-lg flex items-center mb-4"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            )}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md relative">
            <div className="flex flex-col md:flex-row items-start">
              <div className="relative w-full md:w-1/4 flex flex-col items-center">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-[150px] h-[150px] rounded-full mb-2"
                />

                {<button
                  onClick={() => document.getElementById("imageInput").click()}
                  className="absolute bottom-[50%] right-[50%] bg-white p-1 rounded-full shadow-md translate-x-[50px] translate-y-[56px]"
                  title="Edit Profile"
                >
                  <FaEdit className="text-gray-600" />
                </button>}
                <input
                  type="file"
                  id="imageInput"
                  style={{ display: "none" }}
                  accept="image/*"
                  name="profileImage"
                  onChange={handleImageChange}
                  disabled={!isEditing}
                />
                <p className="font-semibold">
                  {user?.FirstName || "First Name"}{" "}
                  {user?.LastName || "Last Name"}
                </p>
              </div>

              <div className="w-full md:w-3/4 md:pl-8 mt-4 md:mt-0">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        value={profile.FirstName}
                        onChange={(e) =>
                          setProfile({ ...profile, FirstName: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px]"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        value={profile.LastName}
                        onChange={(e) =>
                          setProfile({ ...profile, LastName: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="text"
                        value={profile.Phone}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            Phone: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        value={profile.Email}
                        onChange={(e) =>
                          setProfile({ ...profile, Email: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>


                    <div className="grid grid-cols-6 gap-4 w-full">
                      <div className="col-span-6 ">
                        <label className="block text-md font-medium text-black mb-1">
                          Select Society
                        </label>
                        <div className="relative" onClick={toggleDropdown}>
                          <input
                            type="text"
                            readOnly
                            value={selectedOption}
                            placeholder="Select Society"
                            className="border h-12 rounded-md p-2 w-full "
                          // className={`border ${
                          //   errors.society ? "border-red-500" : "border-[#D3D3D3]"
                          // } rounded-lg bg-transparent focus-visible:outline-none focus:border focus:border-[#5678E9] p-2 w-full cursor-pointer`}
                          />
                          <MdKeyboardArrowDown className="absolute right-3 text-2xl  font-bold top-3" />
                        </div>
                        {/* {errors.society && (
                      <span className="text-red-500">{errors.society}</span>
                    )} */}
                        {dropdownOpen && (
                          <div className="absolute w-[320px] mt-0 p-3 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            <div className="max-h-[200px] overflow-y-auto 
                             scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 custom-scrollbar mb-2">
                              {societyList.map((option, index) => (
                                <div
                                  key={index}
                                  onClick={() => handleOptionClick(option)}
                                  className="p-2 hover:bg-custom-gradient hover:text-white cursor-pointer rounded-[10px]"
                                >
                                  {option.Society_name}
                                </div>
                              ))}
                            </div>

                            <button
                              className="button-gradient w-full bg-custom-gradient h-12 text-white text-center rounded-lg cursor-pointer"
                              onClick={() => setShowModal(true)}
                            >
                              Create Society
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">
                        Country*
                      </label>
                      <input
                        type="text"
                        value={profile.Country}
                        onChange={(e) =>
                          setProfile({ ...profile, Country: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">State*</label>
                      <input
                        type="text"
                        value={profile.State}
                        onChange={(e) =>
                          setProfile({ ...profile, State: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">City*</label>
                      <input
                        type="text"
                        value={profile.City}
                        onChange={(e) =>
                          setProfile({ ...profile, City: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleProfileUpdate}  
                  className="bg-custom-gradient text-white py-2 px-4 rounded-lg"
                  disabled={isLoading}  
                >
                  {isLoading ? <Loader /> : "Update Profile"}  
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-2">Add New Society</h2>
            <div className="border-b border-[#F4F4F4] mb-[30px]"></div>
            <form onSubmit={handleSocietySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black-700">
                  Society Name*
                </label>
                <input
                  type="text"
                  name="Society_name"
                  value={society.Society_name}
                  onChange={handleSocietyChange}
                  className="w-full px-4 py-2.5 border rounded-lg"
                  required
                  placeholder="Enter society Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black-700">
                  Society Address*
                </label>
                <input
                  type="text"
                  name="Society_address"
                  value={society.Society_address}
                  onChange={handleSocietyChange}
                  className="w-full px-4 py-2.5 border rounded-lg"
                  required
                  placeholder="Enter Address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black-700">
                    Country*
                  </label>
                  <input
                    type="text"
                    name="Country"
                    value={society.Country}
                    onChange={handleSocietyChange}
                    className="w-full px-4 py-2.5 border rounded-lg"
                    required
                    placeholder="Enter Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black-700">
                    State*
                  </label>
                  <input
                    type="text"
                    name="State"
                    value={society.State}
                    onChange={handleSocietyChange}
                    className="w-full px-4 py-2.5 border rounded-lg"
                    required
                    placeholder="Enter Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black-700">
                    City*
                  </label>
                  <input
                    type="text"
                    name="City"
                    value={society.City}
                    onChange={handleSocietyChange}
                    className="w-full px-4 py-2.5 border rounded-lg"
                    required
                    placeholder="Enter Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black-700">
                    Zip code*
                  </label>
                  <input
                    type="text"
                    name="ZipCode"
                    value={society.ZipCode} 
                    onChange={handleSocietyChange}
                    className="w-full px-4 py-2.5 border rounded-lg"
                    required
                    placeholder="Enter Zip Code"
                  />
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 w-[180px] text-gray-700 px-4 py-2 rounded-lg h-12"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`w-[180px] h-12 px-4 py-2 rounded-lg ${isFormValid()
                    ? "bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white"
                    : "bg-[#F6F8FB] text-gray-400"
                    }`}
                  disabled={!isFormValid()} 
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfileForm;
