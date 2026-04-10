import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import OtpScreenpage from "./components/auth/OtpScreenpage";
import ResetPassword from "./components/auth/ResetPassword";
import ComplaintTable from "./pages/ComplaintTable";
import ReqTracking from "./pages/ReqTracking";
import VisitorLog from "./pages/VisitorLog";
import "./App.css";
import Residentmanagement from "./pages/Residentmanagement";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import EditProfileForm from "./components/EditProfileForm";
import SecurityGuardDetails from "./pages/SecurityGuardDetails.jsx";
import Announcement from "./pages/Announcement.jsx";
import Facilitymanagement from "./pages/Facilitymanagement.jsx";
import Note from "./pages/Note.jsx";
import Expense from "./pages/Expense.jsx";
import Income from "./pages/Income";
import OtherIncome from "./pages/OtherIncome";
import ResidentManagement from "./pages/Residentmanagement";
import TenantForm from "./pages/TenantForm.jsx";
import OwnerForm from "./pages/OwnerForm.jsx";
import VisitorTracking from "./pages/securitypage/VisitorTracking.jsx";
import EmergencyManagement from "./pages/securitypage/EmergencyManagement.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import EventTab from "./pages/ResidentPanel/EventsParticipation/EventTab.jsx";
import ResidentOwner from "./pages/ResidentPanel/ResidentOwner.jsx";
import ServiceAndComplaint from "./pages/ResidentPanel/ServiceAndComplaint.jsx";
import Maintenceinvoices from "./pages/ResidentPanel/Maintenceinvoices.jsx";
import InvoicesPage from "./pages/ResidentPanel/InvoicesPage.jsx";
import OtherIncomeInvoices from "./pages/ResidentPanel/OtherIncomeInvoices.jsx";
import AccessForums from "./pages/ResidentPanel/Community/AccessForums.jsx";
import CommunityTab from "./pages/ResidentPanel/Community/communitytab/CommunityTab.jsx";
import Discusion from "./pages/ResidentPanel/Community/communitytab/Discusion.jsx";
import AdminIncome from "./components/modal/AdminIncome.jsx";
import OtherInvoices from "./pages/ResidentPanel/OtherInvoices.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";
import QuestionPage from "./pages/ResidentPanel/QuestionPage.jsx";
import ResidentRoutes from "./routes/ResidentRoutes.jsx";
import SecurityRoutes from "./routes/SecurityRoutes.jsx";
import VehicleManagement from "./pages/VehicleManagement.jsx";
import ResidentVehicle from "./pages/ResidentVehicle.jsx";
import VehicleTracking from "./pages/securitypage/VehicleTracking.jsx";
import NotFound from "./components/NotFound.jsx";

function App() {
  const [isSidebaropen, setSidebaropen] = useState(false);
  const location = useLocation();
  // const user

  // List of routes without sidebar and navbar
  const layoutRoutes = [
    "/",
    "/register",
    "/forgotpassword",
    "/otpscreenpage",
    "/resetpassword",
  ];
  const shouldRenderSidebarAndNavbar = !layoutRoutes.includes(
    location.pathname
  );

  const toggleSidebar = () => {
    setSidebaropen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setSidebaropen(false);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-theme-bg text-theme-text transition-colors duration-300">
      {shouldRenderSidebarAndNavbar && (
        <PrivateRoutes>
          <Sidebar isopen={isSidebaropen} onclose={closeSidebar} />
        </PrivateRoutes>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {shouldRenderSidebarAndNavbar && (
          <PrivateRoutes>
            <Navbar toggleSidebar={toggleSidebar} />
          </PrivateRoutes>
        )}

        <div
          className={`flex-1 overflow-y-auto bg-theme-bg ${
            shouldRenderSidebarAndNavbar ? "p-4 md:p-6" : ""
          } custom-scrollbar transition-colors duration-300`}
        >
          <Routes>
            {/* Public Routes without Sidebar and Navbar */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/otpscreenpage" element={<OtpScreenpage />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />

            {/* Protected Routes with Sidebar and Navbar */}
            {shouldRenderSidebarAndNavbar && (
              <>
                <Route
                  path="/admin/dashboard"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <Dashboard />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />

                <Route
                  path="/resident/dashboard"
                  element={
                    <PrivateRoutes>
                      <ResidentRoutes>
                        <Dashboard />
                      </ResidentRoutes>
                    </PrivateRoutes>
                  }
                />

                <Route
                  path="/editprofile"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <EditProfileForm />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/residentmanagement"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <Residentmanagement />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/complainttable"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <ComplaintTable />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/reqtracking"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <ReqTracking />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/visitorlog"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <VisitorLog />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/securityguard"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <SecurityGuardDetails />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/announcement"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <Announcement />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/facilitymanagement"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <Facilitymanagement />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/vehiclemanagement"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <VehicleManagement />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/note"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <Note />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/expense"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <Expense />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/income"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <Income />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/other-income"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <OtherIncome />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/ownerform"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <OwnerForm />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/ownerform/edit"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <OwnerForm />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/tenantform"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <TenantForm />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/tenantform/edit"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <TenantForm />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/visitortracking"
                  element={
                    <PrivateRoutes>
                      <SecurityRoutes>
                        <VisitorTracking />
                      </SecurityRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/emergencymanagement"
                  element={
                    <PrivateRoutes>
                      <SecurityRoutes>
                        <EmergencyManagement />
                      </SecurityRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/vehicletracking"
                  element={
                    <PrivateRoutes>
                      <SecurityRoutes>
                        <VehicleTracking />
                      </SecurityRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/eventsParticipate"
                  element={
                    <PrivateRoutes>
                      <ResidentRoutes>
                        <EventTab />
                      </ResidentRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/residentowner"
                  element={
                    <PrivateRoutes>
                      <ResidentRoutes>
                        <ResidentOwner />
                      </ResidentRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/serviceandcomplaint"
                  element={
                    <PrivateRoutes>
                      <ResidentRoutes>
                        <ServiceAndComplaint />
                      </ResidentRoutes>
                    </PrivateRoutes>
                  }
                />

                <Route
                  path="/maintenceinvoices"
                  element={
                    <PrivateRoutes>
                      <ResidentRoutes>
                        <Maintenceinvoices />
                      </ResidentRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/accessforums"
                  element={
                    <PrivateRoutes>
                      <ResidentRoutes>
                        <AccessForums />
                      </ResidentRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/invoicespage"
                  element={
                    <PrivateRoutes>
                      <ResidentRoutes>
                        <InvoicesPage />
                      </ResidentRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/otherinvoices"
                  element={
                    <PrivateRoutes>
                      <ResidentRoutes>
                        <OtherInvoices />
                      </ResidentRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/otherincomeinvoices"
                  element={
                    <PrivateRoutes>
                      <ResidentRoutes>
                        <OtherIncomeInvoices />
                      </ResidentRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/polls"
                  element={
                    <PrivateRoutes>
                      <ResidentRoutes>
                        <CommunityTab />
                      </ResidentRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/communitiesdiscusion"
                  element={
                    <PrivateRoutes>
                      <ResidentRoutes>
                        <Discusion />
                      </ResidentRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/adminincome/:id"
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <AdminIncome />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/resident/vehicle"
                  element={
                    <PrivateRoutes>
                      <ResidentRoutes>
                        <ResidentVehicle />
                      </ResidentRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path="/questionpage/:id"
                  element={
                    <PrivateRoutes>
                      <ResidentRoutes>
                        <QuestionPage />
                      </ResidentRoutes>
                    </PrivateRoutes>
                  }
                />
              </>
            )}
          </Routes>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
