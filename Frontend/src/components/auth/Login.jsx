import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../../assets/images/login.png";
import BackgroundImage from "../../assets/images/bg.png";
import { loginUser } from "../../services/AuthService";
import logo from "../../assets/images/BrightWeb.png";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { StoreUser } from "../../redux/features/AuthSlice";
import eyeslash from "../../assets/images/eye-slash.svg";
import eyeslashblack from "../../assets/images/eye-slash-black.svg";
import { Loader } from "../../utils/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    EmailOrPhone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const [errors, setErrors] = useState({
    EmailOrPhone: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    let formIsValid = true;
    let newErrors = { ...errors };
    if (!user.EmailOrPhone) {
      newErrors.EmailOrPhone = "Please enter your email or phone number";
      formIsValid = false;
    }
    if (!user.password) {
      newErrors.password = "Please enter your password";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (!formIsValid) return;

    try {
      setIsLoading(true)
      const response = await loginUser(user);
      toast.success(response.data.message);
      dispatch(StoreUser(response.data.user));
      if (response.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (response.data.user.role === "resident") {
        navigate("/resident/dashboard");
      } else if (response.data.user.role === "security") {
        navigate("/visitortracking");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false)
      setUser({
        EmailOrPhone: "",
        password: "",
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex items-center justify-center  bg-cover bg-center overflow-auto max-md:flex-col max-xl:flex-col"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="bg-[#F6F8FB] rounded-lg shadow-lg w-full flex flex-col items-start h-auto md:h-[950px] relative max-sm:hidden max-md:hidden max-xl:hidden">
        <div className="absolute inset-0 opacity-10 rounded-lg"></div>

        <img className="pt-[60px] ps-[60px]" src={logo} alt="" />

        <div className="flex-grow flex items-center justify-center w-full">
          <img
            src={LoginImage}
            alt="Society Management Illustration"
            className="w-full h-auto max-w-[561px] object-contain max-sm:max-w-[320px] max-md:max-w-[561px] mx-lg:mx-w-[500px]"
          />
        </div>
      </div>

      <div className="flex items-center  h-[100vh]  justify-center w-full lg:w-10/2 z-20 relative px-[15px]">
        <div className="p-[50px] px-[5%] w-full max-w-[630px] rounded-lg z-30 relative bg-white">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 max-sm:text-[2] max-sm:text-[24px] max-md:text-[28px]">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email or Phone
              </label>
              <input
                type="text"
                id="email"
                name="EmailOrPhone"
                value={user.EmailOrPhone}
                onChange={handleChange}
                placeholder="Enter Your Phone Number or Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {submitted &&
                errors.EmailOrPhone && ( // Show error if submitted
                  <p className="text-red-500 text-sm mt-1">
                    {errors.EmailOrPhone}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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

              {submitted && errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-400">Remember me</span>
              </label>
              <Link
                to="/forgotpassword"
                className="text-orange-500 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-medium  ${
                user.EmailOrPhone && user.password
                  ? "bg-custom-gradient  text-white"
                  : "bg-[#F6F8FB] text-[#A7A7A7] "
              }`}
            >
            {isLoading ? <Loader /> : 'Sign In'}   
            </button>

            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-orange-500 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
