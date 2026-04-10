import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import RegisterImage from "../../assets/images/Register.png";
import logo from "../../assets/images/BrightWeb.png";
import BackgroundImage from "../../assets/images/bg.png";
import {
  createSociety,
  getSocieties,
  registerUser,
} from "../../services/AuthService";
import { toast } from "react-hot-toast";
import eyeslash from "../../assets/images/eye-slash.svg";
import eyeslashblack from "../../assets/images/eye-slash-black.svg";
import { Loader } from "../../utils/Loader";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Country: "",
    State: "",
    City: "",
    select_society: "",
    password: "",
    Cpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleOptionClick = (option) => {
    setSelectedOption(option.Society_name);
    setFormData({ ...formData, select_society: option._id });
    setDropdownOpen(false);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [society, setSociety] = useState({
    Society_name: "",
    Society_address: "",
    Country: "",
    State: "",
    City: "",
    ZipCode: "",
  });

  const [societyList, setSocietyList] = useState([]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocietyChange = (e) => {
    const { name, value } = e.target;
    setSociety({ ...society, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await registerUser(formData);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false)
      setFormData({
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: "",
        Country: "",
        State: "",
        City: "",
        select_society: "",
        password: "",
        Cpassword: "",
      });
    }
  };
  const isFormComplete = () => {
    return (
      formData.FirstName &&
      formData.LastName &&
      formData.Email &&
      formData.Phone &&
      formData.Country &&
      formData.State &&
      formData.City &&
      formData.select_society &&
      formData.password &&
      formData.Cpassword &&
      formData.password === formData.Cpassword // Optional: Ensure passwords match
    );
  };
  const handleSocietySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createSociety(society);
      toast.success(response.data.message);
      fetchSocieties();
      setShowModal(false); // Close modal after submission
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

  const handleSocietySelect = (e) => {
    const selectedValue = e.target.value;
    setFormData({ ...formData, select_society: selectedValue });
  };

  const fetchSocieties = async () => {
    setIsLoading(true);
    try {
      const response = await getSocieties();
      setSocietyList(response.data.Society || []);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch societies");
      setSocietyList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSocieties();
  }, []);

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

  return (
    <div>
      <div
        className="min-h-screen  flex flex-col  md:flex-row "
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col bg-[#F6F8FB] max-lg:hidden  w-full lg:w-1/2 z-10">
          <div className="bg-[#F6F8FB] rounded-lg shadow-lg  max-w-[900px] w-full flex flex-col items-start h-auto md:h-[950px] relative">
            <img className="pt-[60px] ps-[60px]" src={logo} alt="" />
            <div className="flex-grow flex items-center justify-center w-full">
              <div className="text-center mr-10">
                <img
                  src={RegisterImage}
                  alt="Society"
                  className="w-full h-auto max-w-[480px] object-contain z-10"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="md:w-3/5  max-lg:mx-auto w-full flex items-center justify-center p-6"
          style={{ overflowY: "auto" }}
        >
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[600px]">
            <h2 className="text-[34px] font-semibold mb-6 text-gray-800  max-sm:text-[2] max-sm:text-[24px] max-md:text-[28px]">
              Registration
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2  gap-4 max-sm:grid-cols-1">
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                    placeholder="Enter First Name"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                    placeholder="Enter Email Address"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                    placeholder="91+"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-1">
                    Country*
                  </label>
                  <input
                    type="text"
                    name="Country"
                    value={formData.Country}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                    placeholder="Enter Name"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-1">
                    State*
                  </label>
                  <input
                    type="text"
                    name="State"
                    value={formData.State}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                    placeholder="Enter Name"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-gray-700 mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    name="City"
                    value={formData.City}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                    placeholder="Enter Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-4 w-full  ">
                <div className="col-span-6 ">
                  <label className="block text-[14px] font-medium text-black mb-1">
                    Select Society
                  </label>
                  <div className="relative" onClick={toggleDropdown}>
                    <input
                      type="text"
                      readOnly
                      value={selectedOption}
                      placeholder="Select Society"
                      className="border h-12 rounded-md p-2 w-full "
                    />
                    <MdKeyboardArrowDown className="absolute right-3 text-2xl  font-bold top-3" />
                    {dropdownOpen && (
                      <div className="absolute left-0 w-full sm:w-[90%] md:w-[535px] mt-1 p-3  bg-white border border-gray-300 rounded-md shadow-lg z-10 top-100 md:left-auto ">
                        <div className="max-h-[200px] sm:max-h-[250px] sm:p-2 overflow-y-auto custom-scrollbar mb-2">
                          {societyList.map((option, index) => (
                            <div
                              key={index}
                              onClick={() => handleOptionClick(option)}
                              className="pb-2 sm:pb-3 hover:bg-gray-100 cursor-pointer text-sm sm:text-[14px]"
                            >
                              {option.Society_name}
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="button-gradient w-full bg-custom-gradient h-12 text-white text-center rounded-lg cursor-pointer"
                          onClick={() => setShowModal(true)}
                        >
                          Create Society
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-1">
                  Password*
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                    placeholder="Enter Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <img src={eyeslashblack} alt="Hide Password" />
                    ) : (
                      <img src={eyeslash} alt="Show Password" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-1">
                  Confirm Password*
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="Cpassword"
                  value={formData.Cpassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                  placeholder="Enter Confirm Password"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#FE512E] border-gray-300 rounded focus:ring-[#FE512E]"
                  />
                  <span className="ml-2 text-[14px] text-gray-600">
                    I agree to all the Terms and{" "}
                    <Link className="text-[#FE512E]">Privacy Policies</Link>.
                  </span>
                </div>

                <button
                  type="submit"
                  className={`w-full py-[12px] rounded-lg font-semibold ${
                    isFormComplete()
                      ? "bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white"
                      : "bg-[#F6F8FB] text-[#A7A7A7]"
                  }`}
                  disabled={!isFormComplete()}
                >
                 {isLoading ? <Loader /> : 'Register'}    
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-[#FE512E] hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-2">Add New Society</h2>
            <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
            <form onSubmit={handleSocietySubmit} className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-black-700">
                  Society Name*
                </label>
                <input
                  type="text"
                  name="Society_name"
                  value={society.Society_name}
                  onChange={handleSocietyChange}
                  className="w-full px-4 py-2.5 border rounded-lg"
                  placeholder="Enter society Name"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-black-700">
                  Society Address*
                </label>
                <input
                  type="text"
                  name="Society_address"
                  value={society.Society_address}
                  onChange={handleSocietyChange}
                  className="w-full px-4 py-2.5 border rounded-lg"
                  placeholder="Enter Address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-black-700">
                    Country*
                  </label>
                  <input
                    type="text"
                    name="Country"
                    value={society.Country}
                    onChange={handleSocietyChange}
                    className="w-full px-4 py-2.5 border rounded-lg"
                    placeholder="Enter Name"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-black-700">
                    State*
                  </label>
                  <input
                    type="text"
                    name="State"
                    value={society.State}
                    onChange={handleSocietyChange}
                    className="w-full px-4 py-2.5 border rounded-lg"
                    placeholder="Enter Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-black-700">
                    City*
                  </label>
                  <input
                    type="text"
                    name="City"
                    value={society.City}
                    onChange={handleSocietyChange}
                    className="w-full px-4 py-2.5 border rounded-lg"
                    placeholder="Enter Name"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-black-700">
                    Zip code*
                  </label>
                  <input
                    type="text"
                    name="ZipCode"
                    value={society.ZipCode}
                    onChange={handleSocietyChange}
                    className="w-full px-4 py-2.5 border rounded-lg"
                    placeholder="Enter Zip Code"
                  />
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-100 w-[180px] text-gray-700 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`w-[180px] px-4 py-2 rounded-lg ${
                    isFormValid()
                      ? "bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white"
                      : "bg-[#F6F8FB] text-gray-400"
                  }`}
                  disabled={!isFormValid()}
                >
                 {isLoading ? <Loader /> : 'Save'}     
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
