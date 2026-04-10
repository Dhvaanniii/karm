// src/hooks/useCurrentPath.js
import { useLocation } from "react-router-dom";

const useCurrentPath = () => {
  const location = useLocation();

  const isDashboard = location.pathname === "/admin/dashboard";
  const isResidentManagement = location.pathname === "/residentmanagement";
  const isEditProfile = location.pathname === "/editprofile";
  const isHome = location.pathname === "/home";
  const isReqTracking = location.pathname === "/reqtracking";
  const isVisitorLog = location.pathname === "/visitorlog";
  const isSecurityGuard = location.pathname === "/securityguard";
  const isAnnouncement = location.pathname === "/announcement";
  const isIncome = location.pathname === "/income";

  return {
    isDashboard,
    isResidentManagement,
    isEditProfile,
    isHome,
    isReqTracking,
    isVisitorLog,
    isSecurityGuard,
    isAnnouncement,
    isIncome,
  };
};

export default useCurrentPath;
