import  { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { CreateAlert } from "../../services/alertService";
import { toast } from "react-hot-toast";
import { addNewNotification } from "../../redux/features/notificationSlice";
import { useDispatch } from "react-redux";
import { Loader } from "../../utils/Loader";

export default function EmergencyManagement() {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [alert_type, setAlert_type] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!alert_type) {
      newErrors.alert_type = "Please select an alert type.";
    }
    if (!description) {
      newErrors.description = "Please enter a description.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const data = { alert_type, description };
        setIsLoading(true)
        const response = await CreateAlert(data);
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
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false)
        setAlert_type("");
        setDescription("");
      }
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setAlert_type(option);
    setDropdownOpen(false);
    setErrors((prevErrors) => ({ ...prevErrors, alert_type: "" }));
  };

  return (
    <div className="flex justify-center items-end min-h-[66vh] bg-gray-100">
      <div className="bg-white p-8 rounded-[15px] shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] w-full max-w-[630px] px-[50px]">
        <h2 className="text-[34px] leading-[51px] font-semibold mb-[20px] text-start">
          Alert
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Alert Type*</label>
            <div className="relative">
              <button
                type="button"
                onClick={handleDropdownToggle}
                className={`w-full p-2 rounded-[10px] text-left flex justify-between items-center 
        ${alert_type ? "border-black" : "border-gray-300"} border`}
              >
                <span className={alert_type ? "text-black" : "text-[#A7A7A7]"}>
                  <span className="text-[14px] leading-[21px] font-normal">
                    {alert_type || "Select Alert"}
                  </span>
                </span>
                <IoChevronDownOutline className="text-gray-500" />
              </button>
              {dropdownOpen && (
                <ul
                  className="absolute w-full mt-1 bg-white rounded-md shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] max-h-[200px] overflow-y-auto 
                             scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                >
                  <li
                    onClick={() => handleOptionSelect("Emergency")}
                    className="p-2 cursor-pointer text-[14px] leading-[21px] text-[#A7A7A7] hover:text-black"
                  >
                    Emergency
                  </li>
                  <li
                    onClick={() => handleOptionSelect("Warning")}
                    className="p-2 cursor-pointer text-[14px] leading-[21px] text-[#A7A7A7] hover:text-black"
                  >
                    Warning
                  </li>
                  <li
                    onClick={() => handleOptionSelect("Fire Alarm")}
                    className="p-2 cursor-pointer text-[14px] leading-[21px] text-[#A7A7A7] hover:text-black"
                  >
                    Fire Alarm
                  </li>
                  <li
                    onClick={() => handleOptionSelect("Earth Quack")}
                    className="p-2 cursor-pointer text-[14px] leading-[21px] text-[#A7A7A7] hover:text-black"
                  >
                    Earth Quake
                  </li>
                  <li
                    onClick={() => handleOptionSelect("High Winds")}
                    className="p-2 cursor-pointer text-[14px] leading-[21px] text-[#A7A7A7] hover:text-black"
                  >
                    High Winds
                  </li>
                  <li
                    onClick={() => handleOptionSelect("Thunder")}
                    className="p-2 cursor-pointer text-[14px] leading-[21px] text-[#A7A7A7] hover:text-black"
                  >
                    Thunder
                  </li>
                </ul>
              )}
            </div>
            {errors.alert_type && (
              <p className="text-red-500 text-sm mt-1">{errors.alert_type}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-2">Description*</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the emergency situation"
              className="w-full p-2 border rounded-md focus:outline-none"
              rows="4"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="w-full py-[12px] border rounded-[10px] bg-custom-gradient text-white"
            >
              {isLoading ? <Loader/>
                : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
