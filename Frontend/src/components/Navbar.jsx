import { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../assets/images/Avatar.png";
import { Navigationbar } from "../constantdata";
import NotificationImage from "../assets/images/notificationimage.png";
import bellIcon from "../assets/images/notification-bing.svg";
import search from "../assets/images/search.svg";
import useCurrentPath from "./useCurrentPath";
import { FaChevronRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import PayNowModal from "./modal/PayNowModal";
import PayPersonModal from "./modal/PayPersonModal";
import PayMentMathodModal from "./modal/PayMentMathodModal";
import PayMenCard from "./modal/PayMenCard";
import {
  ClearNotification,
  DeleteNotification,
  GetNotifications,
} from "../services/notificationService";
import { toast } from "react-hot-toast";
import {
  allNotification,
  clearNotifications,
  deleteNotification,
} from "../redux/features/notificationSlice";
import { ApproveCashRequest, sendCashRequest } from "../services/incomeService";
import { AcceptAnnouncement } from "../services/announcementService";
import { ApproveMaintenanceByAdmin } from "../services/maintenanceService";
import { ApproveVisitor } from "../services/visitorService";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ toggleSidebar }) => {
  const notifications = useSelector(
    (store) => store.notification.notificationList
  );
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [showSearch, setShowSearch] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [clearedNotifications, setClearedNotifications] = useState(true);
  const [isPayNowOpen, setIsPayNowOpen] = useState(false);
  const [isPaymentNowOpen, setIsPaymantNowOpen] = useState(false);
  const [isPaymenCardOpen, setisPaymenCardOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [notificationList, setIsNotificationList] = useState(notifications);
  // for payment
  const [maintenance, setMaintenance] = useState(null);
  const [income, setIncome] = useState(null);
  const [facility, setFacility] = useState(null);
  const [announcement, setAnnouncement] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const perPersonAmount = 1500;

  const totalAmount = income?.paymentAmount * selectedMembers;

  const {
    isDashboard,
    isResidentManagement,
    isEditProfile,
    isHome,
    isReqTracking,
    isVisitorLog,
    isSecurityGuard,
    isAnnouncement,
    isIncome,
  } = useCurrentPath();

  const handleProfileClick = () => {
    setShowSearch(false);
    if (user.role === "admin" && isDashboard) {
      navigate("/editprofile");
    }
  };

  // notification click model open
  const handleOpenModal = (notification) => {
    if (notification.type === "Income" || notification.type === "rejected") {
      setIncome(notification);
      setIsModalOpen(true);
    }
    if (notification.type === "approve") {
      const { incomeId, residentId } = notification.othercontent;
      handleCashApproval(incomeId, residentId, "approve");
      declineNotification(notification._id);
    }
    if (notification.type === "Maintenance") {
      navigate("/maintenceinvoices");
    }
    if (notification.type === "announcement") {
      const { announcementId } = notification.othercontent;
      acceptAnnouncement(announcementId);
      declineNotification(notification._id);
    }
    if (notification.type === "maintenance-approve") {
      const { maintenanceId, residentId } = notification.othercontent;
      acceptMaintenance(maintenanceId, residentId, "approve");
      declineNotification(notification._id);
    }
    if (notification.type === "visitor-approve") {
      const { visitorId } = notification.othercontent;
      handleVisitorApproval(visitorId, "approve", notification._id);
    }
    // if (user.role === "admin") {
    //   navigate("/income");
    // } else if (user.role === "resident") {
    //   navigate("/maintenceinvoices");
    // }
  };

  const handleVisitorApproval = async (visitorId, action, notificationId) => {
    try {
      const response = await ApproveVisitor({ visitorId, action });
      toast.success(response.data.message);
      declineNotification(notificationId);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const acceptMaintenance = async (maintenanceId, residentId, action) => {
    try {
      const response = await ApproveMaintenanceByAdmin(
        maintenanceId,
        residentId,
        action
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const acceptAnnouncement = async (id) => {
    try {
      const response = await AcceptAnnouncement({ announcementId: id });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
    }
  };

  const handleCashApproval = async (incomeId, residentId, action) => {
    try {
      const response = await ApproveCashRequest(incomeId, residentId, {
        action,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    const membersCount = Number(e.target.value);
    setSelectedMembers(membersCount);
  };

  const handleNotificationClick = () => {
    if (user.role !== "security") {
      setIsNotificationOpen(!isNotificationOpen);
      setClearedNotifications(false);
    }
  };

  const handleClearNotifications = async () => {
    try {
      setIsNotificationList([]);
      const response = await ClearNotification();
      toast.success(response.data.message);
      dispatch(clearNotifications());
      setClearedNotifications(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handlePaymentOfOtherIncome = async (type) => {
    // sent request to admin
    if (income) {
      try {
        const response = await sendCashRequest(income.othercontent.incomeId, {
          paymentMode: type,
        });
        declineNotification(income._id);
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIncome(null);
      }
    }
  };

  useEffect(() => {
    if (isDashboard) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [
    isDashboard,
    isResidentManagement,
    isEditProfile,
    isHome,
    isReqTracking,
    isVisitorLog,
    isSecurityGuard,
    isAnnouncement,
    isIncome,
  ]);

  // decline
  const declineNotification = async (id) => {
    try {
      setIsNotificationList((prev) => prev.filter((n) => n._id !== id));
      const response = await DeleteNotification(id);
      dispatch(deleteNotification(id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // reject by admin
  const rejectCashReq = (notification) => {
    const { incomeId, residentId } = notification.othercontent;
    handleCashApproval(incomeId, residentId, "reject");
    declineNotification(notification._id);
  };

  // fetch notification
  const fetchNotifications = async () => {
    try {
      const response = await GetNotifications();
      dispatch(allNotification(response.data.notifications));
      setIsNotificationList(response.data.notifications);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
    if (notificationList.length === 0) {
      setClearedNotifications(true);
    }
  }, []);

  useEffect(() => {
    setIsNotificationList(notifications);
  }, [notifications]);

  return (
    <div className="flex justify-between items-center p-4 bg-theme-card text-theme-text sticky top-0 left-0 w-full z-[99] border-b border-theme-border transition-colors duration-300">
      <div className="flex items-center">
        <button
          className="lg:hidden mr-4 p-2 rounded-md hover:bg-theme-bg"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {showSearch ? (
          <div className="search-icon relative w-[335px] max-sm:w-[200px] max-md:w-[250px] flex justify-end">
            <div className="relative w-full flex justify-end">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-theme-border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 bg-theme-bg text-theme-text transition-colors duration-300"
              />
              <span className="absolute left-3 top-[10px] text-gray-400">
                <img className="h-[20px] w-[20px]" src={search} alt="" />
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center max-sm:hidden">
            <span
              className="cursor-pointer text-base font-normal text-gray-400 mr-2"
              onClick={() => {
                if (user.role === "admin") {
                  navigate("/admin/dashboard");
                } else {
                  navigate("/resident/dashboard");
                }
              }}
            >
              Home
            </span>
            <FaChevronRight className="mr-2 w-3 text-gray-400" />
            {Navigationbar.map(
              (item) =>
                location.pathname === item.path && (
                  <span
                    key={item.path}
                    className="text-[#5678E9] text-base font-medium"
                  >
                    {item.label}
                  </span>
                )
            )}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4 justify-end w-full max-md:justify-end max-sm:justify-end">
        <div className="input-search-icon max-sm:block max-xl:hidden lg:hidden max-sm:rounded-full"></div>
        
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification Icon */}
        <div className="relative">
          <img
            src={bellIcon}
            alt=""
            className="text-black cursor-pointer border border-[#D3D3D3] rounded-[10px] p-[8px] md:block max-sm:rounded-full max-sm:bg-[#F6F8FB] max-sm:border-none max-sm:w-[50px] max-sm:h-[50px] max-sm:p-[10px]"
            onClick={handleNotificationClick}
          />

          <span className="absolute text-xs top-1 right-1 bg-red-500 px-1 rounded-full text-white w-[15px] h-[15px] flex justify-center items-center">
            {notificationList.length}
          </span>

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 max-w-[540px] bg-white rounded-lg shadow-lg p-4 z-[9999] max-h-[540px] max-sm:max-h-[700px] max-sm:p-[30px] overflow-y-auto max-sm:min-w-[355px] max-md:min-w-[500px] max-md:left-0 max-md:translate-x-[-100%] max-sm:translate-x-[-55%] sm:min-w-[30rem] custom-scrollbar">
              <div className="flex justify-between items-center mb-2 max-sm:ps-[15px] max-sm:pr-[15px]">
                <span className="text-[20px] font-normal leading-[30px] max-md:justify-start max-sm:mb-[10px]">
                  Notifications
                </span>
                {clearedNotifications ? (
                  <AiOutlineClose
                    size={20}
                    className="cursor-pointer ml-2 text-gray-500"
                    onClick={() => setIsNotificationOpen(false)}
                  />
                ) : (
                  <button
                    className="text-sm text-gray-500"
                    onClick={handleClearNotifications}
                  >
                    Clear all
                  </button>
                )}
              </div>

              {notificationList?.length === 0 ? (
                <div className="text-center py-10">
                  <img
                    src={NotificationImage}
                    alt="No Notifications"
                    className="mx-auto mb-[24px]"
                  />
                  <h4 className="text-[20px] font-normal leading-[30px]">
                    No notification yet!
                  </h4>
                </div>
              ) : (
                notificationList.map((notification, index) => (
                  <div
                    key={index}
                    className="border-b flex gap-4 items-start  border-gray-200 pb-5 mb-[14px]"
                  >
                    <span className="w-[40px] flex justify-center items-center py-[9px] rounded-full bg-red-300">
                      S
                    </span>
                    <div className="">
                      <h6 className="font-bold ">{notification.name} </h6>
                      <span className="text-sm font-light text-gray-800">
                        {notification.title}
                      </span>
                      <p className="text-[12px] text-[#A7A7A7] font-normal mt-1] mb-[4px]">
                        {new Date(notification.date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-sm text-gray-600 ">
                        {notification.message}
                      </p>

                      <div className="flex space-x-3 mt-2  max-md:justify-start max-sm:space-x-0">
                        <div className="space-x-3">
                          <button
                            onClick={() => handleOpenModal(notification)}
                            className="px-[28px] py-[8px] text-xs rounded-[10px] border border-gray-300"
                          >
                            {notification.type === "rejected"
                              ? "Pay Online"
                              : "Accept"}
                          </button>

                          {notification.type.includes("approve") ? (
                            <button
                              onClick={() => {
                                if (notification.type === "visitor-approve") {
                                  handleVisitorApproval(
                                    notification.othercontent.visitorId,
                                    "reject",
                                    notification._id
                                  );
                                } else {
                                  rejectCashReq(notification);
                                }
                              }}
                              className={`px-[28px] py-[8px] text-xs rounded-[10px] bg-[#5678E9] 
                                  border border-gray-300 text-white`}
                            >
                              Reject
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                declineNotification(notification._id)
                              }
                              className={`px-[28px] py-[8px] text-xs rounded-[10px] bg-[#5678E9] 
                                border border-gray-300 text-white`}
                            >
                              Decline
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          <PayPersonModal
            income={income}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setIsAccepted(true);
            }}
            totalAmount={totalAmount}
            perPersonAmount={perPersonAmount}
            setIsPayNowOpen={setIsPayNowOpen}
            handleChange={handleChange}
            selectedMembers={selectedMembers}
          />
          <PayNowModal
            income={income}
            isOpen={isPayNowOpen}
            onClose={() => {
              setIsPayNowOpen(false);
              setIsAccepted(true);
            }}
            totalAmount={totalAmount}
            perPersonAmount={perPersonAmount}
            selectedMembers={selectedMembers}
            setIsPaymanNowOpen={() => setIsPaymantNowOpen(true)}
          />
          <PayMentMathodModal
            handlePayment={handlePaymentOfOtherIncome}
            isOpen={isPaymentNowOpen}
            onClose={() => {
              setIsPaymantNowOpen(false);
              setIsAccepted(true);
            }}
            setisPaymenCardOpen={() => setisPaymenCardOpen(true)}
          />
          <PayMenCard
            isOpen={isPaymenCardOpen}
            onClose={() => {
              setisPaymenCardOpen(false);
              setIsAccepted(false);
            }}
          />
        </div>

        {/* Profile Icon */}
        <div
          className="border-l border-[#F4F4F4] pl-[20px] cursor-pointer max-sm:border-0 max-sm:pl-0"
          onClick={handleProfileClick}
        >
          <img
            src={
              user.role === "security"
                ? user?.profileimage || Avatar
                : user?.profileImage || Avatar
            }
            alt="Profile"
            className="rounded-full w-[48px] h-[48px] max-sm:w-[50px] max-sm:h-[50px] sm:w-[50px] md-[50px] cursor-pointer object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col md:flex">
          <h6 className="font-bold text-[16px] max-sm:hidden">
            {user.role === "security"
              ? user?.full_name
              : user?.role === "resident"
              ? user?.Full_name
              : user?.FirstName + " " + user?.LastName}
          </h6>
          <span className="text-[12px] leading-[18px] text-[#A7A7A7] max-sm:hidden">
            {user?.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
