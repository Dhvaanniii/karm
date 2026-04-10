import { useState } from "react";
import passwordimage from "../../assets/images/passwordimage.png";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Logo from "../Logo";
// import { resetPassword } from '../../services/authService.jsx'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import eyeslash from "../../assets/images/eye-slash.svg";
import eyeslashblack from "../../assets/images/eye-slash-black.svg";
import { resetPasswords } from "../../services/AuthService";
import { Loader } from "../../utils/Loader";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [new_pass, setNew_pass] = useState("");
  const [confirm_pass, setConfirm_pass] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword((show) => !show);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((show) => !show);
  };

  const handleResetPassword = async () => {
    const storedValue = localStorage.getItem("EmailOrPhone");
    const EmailOrPhone = JSON.parse(storedValue);
    try {
      setIsLoading(true)
      const response = await resetPasswords({
        new_pass,
        confirm_pass,
        EmailOrPhone,
      });
      toast.success(response.data.message);
      localStorage.clear("EmailOrPhone");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false)
      setNew_pass("");
      setConfirm_pass("");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-cover bg-center relative bg-image">
      <div className="flex flex-col bg-[#F6F8FB] w-full lg:w-1/2 z-10  max-lg:hidden ">
        <div className="pt-8 lg:pt-[60px] flex justify-start">
          <Logo logocss />
        </div>
        <div className="flex-grow flex items-center justify-center mt-[93px] mb-[249px] lg:mx-auto z-10">
          <img
            src={passwordimage}
            alt="Password Reset"
            className="w-full h-auto max-w-[561px] object-contain sm:max-w-[480px] max-sm:max-w-[320px] max-md:max-w-[561px] mx-lg:mx-w-[500px]"
          />
        </div>
      </div>

      <div className="flex items-center justify-center w-full lg:w-1/2 z-20  h-[100vh] ">
        <div className="w-full max-w-[630px] rounded-[15px] px-4 lg:px-0">
          <div className="custom-shadow px-4 lg:px-[50px] pt-8 lg:pt-[50px] pb-8 lg:pb-[85px] w-full text-start bg-white rounded-[15px] z-40 relative">
            <h2 className="text-[28px] lg:text-[34px] font-semibold mb-[20px] text-[#202224]">
              Reset Password
            </h2>

            <div>
              <label className="mb-[6px] text-[14px] text-[#202224] font-medium">
                New Password
              </label>
              <div className="relative mb-[30px]">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full py-[11px] ps-[13px] pr-[9px] border border-[#D3D3D3] focus:outline-none rounded-[10px]"
                  placeholder="Enter New Password"
                  value={new_pass}
                  onChange={(e) => setNew_pass(e.target.value)}
                />
                <span
                  onClick={handleToggleNewPasswordVisibility}
                  className="absolute right-[13px] top-[13px] cursor-pointer text-[#A7A7A7]"
                >
                  {showNewPassword ? (
                    <img src={eyeslashblack} alt="Hide Password" />
                  ) : (
                    <img src={eyeslash} alt="Show Password" />
                  )}
                </span>
              </div>
            </div>

            <div className="mb-12">
              <label className="mb-[6px] text-[14px] text-[#202224] font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full py-[11px] ps-[13px] pr-[9px] border border-[#D3D3D3] focus:outline-none rounded-[10px]"
                  placeholder="Enter Confirm Password"
                  value={confirm_pass}
                  onChange={(e) => setConfirm_pass(e.target.value)}
                />
                <span
                  onClick={handleToggleConfirmPasswordVisibility}
                  className="absolute right-[13px] top-[13px] cursor-pointer text-[#A7A7A7]"
                >
                  {showConfirmPassword ? (
                    <img src={eyeslashblack} alt="Hide Password" />
                  ) : (
                    <img src={eyeslash} alt="Show Password" />
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={handleResetPassword}
              className={`w-full py-[12px] rounded font-semibold leading-7 
                 ${
                   new_pass && confirm_pass
                     ? "bg-custom-gradient text-white"
                     : "bg-[#F6F8FB] text-[#A7A7A7]"
                 }`}
              disabled={!new_pass || !confirm_pass}
            >
              {isLoading ? <Loader /> : 'Reset Password'}   
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
