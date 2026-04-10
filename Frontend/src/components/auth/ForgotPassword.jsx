import { useState } from "react";
import passwordimage from "../../assets/images/passwordimage.png";
import Logo from "../Logo";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../services/AuthService";
import toast from "react-hot-toast";
import { Loader } from "../../utils/Loader";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [EmailOrPhone, setEmailOrPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleOtp = async () => {
    try {
      setIsLoading(true)
      const response = await sendOtp({ EmailOrPhone });
      localStorage.setItem("EmailOrPhone", JSON.stringify(EmailOrPhone));
      toast.success(response.data.message);
      navigate("/otpscreenpage");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false)
      setEmailOrPhone("");
    }
  };

  return (
    <div className="flex lg:flex-row h-screen  bg-cover bg-center bg-image max-md:flex-col">
      <div className="flex flex-col bg-[#F6F8FB]  max-lg:hidden  w-full lg:w-1/2 z-10">
        <div className="pt-8 lg:pt-[60px] flex justify-start">
          <Logo logocss className="w-24 h-24 lg:w-32 lg:h-32" />
        </div>
        <div className="flex-grow  flex items-center justify-center mt-[93px] mb-[249px] max-sm:mt-[50px] max-sm:mb-[50px] max-md:mt-[30px] max-md:mb-[30px] max-lg:mt-[30px] max-lg:mb-[50px] z-10">
          <img
            src={passwordimage}
            alt="Otp image"
            className="w-full h-auto max-w-[561px] object-contain sm:max-w-[480px] max-sm:max-w-[320px] max-md:max-w-[561px] mx-lg:max-w-[500px]"
          />
        </div>
      </div>

      <div className="flex items-center h-[100vh]  justify-center w-full lg:w-1/2 z-20">
        <div className="pt-8 pb-8 px-4 lg:px-[20px] w-full max-w-[630px]">
          <div className="custom-shadow p-[40px] w-full text-start rounded-[15px] bg-white z-30 relative">
            <h2 className="text-[28px] lg:text-[34px] font-semibold mb-[10px] text-gray-700 max-sm:text-[24px] max-md:text-[28px]">
              Forgot Password
            </h2>

            <p className="text-[#4F4F4F] text-[14px] mb-3">
              Enter your email and we’ll send you a OTP to reset your password.
            </p>
            <div className="mb-12">
              <label className="mb-2 text-[14px] text-[#202224] font-semibold">
                Email or Phone
              </label>
              <input
                type="text"
                name="EmailOrPhone"
                value={EmailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full p-3 border border-black focus:outline-none rounded-[10px]"
              />
            </div>
            <button
              className={`w-full  rounded-[10px] pt-[12px] pb-[12px] leading-7 text-[16px] lg:text-[18px] font-semibold ${EmailOrPhone
                  ? "text-white" 
                  : "bg-[#F6F8FB] text-[#A7A7A7]" 
                }`}
              onClick={handleOtp}
              disabled={!EmailOrPhone}
              style={
                EmailOrPhone
                  ? { background: "linear-gradient(90deg, #FE512E 0%, #F09619 100%) " } 
                  : {}
              }
            >
              {isLoading ? <Loader /> : ' Get OTP'}   
            </button>
            <div className="mt-4 text-center">
              <button
                className="hover:underline text-[#E74C3C] leading-7"
                onClick={() => navigate("/")}
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
