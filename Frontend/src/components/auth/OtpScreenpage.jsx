import  { useEffect, useState } from "react";
import passwordimage from "../../assets/images/passwordimage.png";
import { AiOutlineClockCircle } from "react-icons/ai";
import Logo from "../Logo";
import { sendOtp, verifyOtp } from "../../services/AuthService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../utils/Loader";

const OtpScreenpage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [counter, setCounter] = useState(30);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const handleChange = (index, value) => {
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

    
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {

    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtp = async () => {
    try {
      const OTP = parseInt(otp.join(""));
      const storedValue  = localStorage.getItem("EmailOrPhone");
      const EmailOrPhone = JSON.parse(storedValue);
      const otpDetail = {
        otp: OTP,
        EmailOrPhone: EmailOrPhone,
      };
      setIsLoading(true)
      const response = await verifyOtp(otpDetail);
      toast.success(response.data.message);
      navigate("/resetpassword");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error verifying OTP");
    } finally {
      setIsLoading(false)
      setOtp(Array(6).fill(""));
    }
  };

  const resendOtp = async () => {
    try {
      setIsLoading(true)
      const storedValue  = localStorage.getItem("EmailOrPhone");
      const EmailOrPhone = JSON.parse(storedValue);
      const response = await sendOtp({ EmailOrPhone });
      toast.success(response.data.message);
      setCounter(30);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error sending OTP");
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="flex lg:flex-row h-screen overflow-hidden bg-cover bg-center bg-image relative max-md:flex-col">
      <div className="flex flex-col bg-[#F6F8FB] w-full lg:w-1/2 z-10   max-lg:hidden ">
        <div className="pt-[60px] flex justify-start max-sm:pt-[30px]">
          <Logo logocss />
        </div>
        <div className="flex-grow flex items-center justify-center mt-[93px] mb-[249px] max-sm:mt-[40px] max-sm:mb-[30px] max-md:mt-[30px] max-md:mb-[30px] max-lg:mt-[30px] max-lg:mb-[50px] z-10">
          <img
            src={passwordimage}
            alt="OTP"
            className="w-full h-auto max-w-[561px] object-contain sm:max-w-[480px] max-sm:max-w-[320px] max-md:max-w-[561px] mx-lg:mx-w-[500px]"
          />
        </div>
      </div>

      <div className="flex items-center  h-[100vh]  justify-center w-full lg:w-1/2 z-20 relative">
        <div className="pt-[20px] pb-[20px] px-[5%] lg:px-[20px] w-full max-w-[630px] rounded-lg z-30 relative">
          <h3 className="text-gray-700 text-[18px] font-semibold mb-[56px] ms-[40px] text-start max-sm:mb-[15px] max-md:mb-[15px]">
            3. OTP Screen (Unfill)
          </h3>
          <div className="custom-shadow px-[50px] pt-[50px] pb-[85px] w-full text-start bg-white rounded-[15px] z-40 relative max-sm:px-[15px] max-sm:pb-[50px] max-sm:pt-[30px]">
            <h2 className="text-[34px] font-semibold mb-[10px] text-gray-700 max-sm:text-[2] max-sm:text-[24px] max-md:text-[28px]">
              Enter OTP
            </h2>
            <p className="text-gray-600 text-[14px] mb-3">
              Please enter the 6-digit code sent to your phone number.
            </p>

            <div className="flex mb-[20px] justify-start space-x-[20px] max-sm:space-x-[5px] max-md:justify-start">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-[60px] min-w-[40px] h-[60px] border border-[#D3D3D3] rounded-[10px] text-center text-[24px] text-[#D3D3D3] focus:outline-none"
                />
              ))}
            </div>

            <div className="flex items-center justify-between mb-[20px]">
              <div className="flex items-center">
                <AiOutlineClockCircle className="text-[#202224] text-base mr-1" />
                <span className="text-[#202224] text-base">
                  {`00:${String(counter).padStart(2, "0")} sec`}
                </span>
              </div>
              <button
                onClick={resendOtp}
                disabled={counter > 0}
                className={`text-sm ${
                  counter > 0 ? "text-[#A7A7A7]" : "text-black"
                }`}
              >
                {isLoading ? <Loader /> : ' Resend OTP'}    
              </button>
            </div>

            <button
              onClick={handleOtp}
              className={`w-full py-[12px] rounded-[10px] leading-7 
                ${
                  otp.every((digit) => digit !== "")
                    ? "bg-custom-gradient text-white"
                    : "bg-[#F6F8FB] text-[#A7A7A7]"
                }`}
              disabled={!otp.every((digit) => digit !== "")}
            >
               {isLoading ? <Loader /> : 'Verify'}  
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpScreenpage;
