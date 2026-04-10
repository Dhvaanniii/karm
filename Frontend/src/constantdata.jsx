// dashboard constant
// sidebar
import icon1 from "./assets/images/icon-1.png";
import moneyrecive from "./assets/images/money-recive.png";
import moneysend from "./assets/images/money-send.png";
import vacate from "./assets/images/vacate.png";
import evelynHarperimage from "./assets/images/EvelynHarperimage.png";
import mastercard from "./assets/images/mastercard.png";
import visacard from "./assets/images/visacard.png";
import cashpayment from "./assets/images/cashpayment.png";
import moneys from "./assets/images/moneys.png";
import { MdEvent } from "react-icons/md";
import dashboardicon from "./assets/images/dashboardicon.svg";
import personalcard from "./assets/images/personalcard.svg";
import money from "./assets/images/money.svg";
import dollarsquare from "./assets/images/dollar-square.svg";
import building from "./assets/images/building.svg";
import servicesimg from "./assets/images/servicesimg.svg";
import eventicon from "./assets/images/eventicon.svg";
import smstracking from "./assets/images/sms-tracking.svg";
import shieldsecurity from "./assets/images/shield-security.svg";
import securityuser from "./assets/images/security-user.svg";
import communitiesicon from "./assets/images/communitiesicon.svg";
import paymenticon from "./assets/images/paymenticon.svg";
import securityicon from "./assets/images/securityicon.svg";
import announcement from "./assets/images/announcement.svg";

export const sidebarItems = [
  {
    id: 1,
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: dashboardicon,
  },
  {
    id: 2,
    path: "/residentmanagement",
    label: "Resident Management",
    icon: money,
  },
  {
    id: 3,
    label: "Financial Management",
    icon: dollarsquare,
    subItems: [
      { id: 4, path: "/income", label: "Income" },
      { id: 5, path: "/expense", label: "Expanse" },
      { id: 6, path: "/note", label: "Note" },
    ],
  },
  {
    id: 7,
    path: "/facilitymanagement",
    label: "Facility Management",
    icon: building,
  },
  {
    id: 8,
    label: "Complaint Tracking",
    icon: smstracking,
    subItems: [
      { id: 9, path: "/complainttable", label: "Create Complaint" },
      { id: 10, path: "/reqtracking", label: "Request Tracking" },
    ],
  },
  {
    id: 11,
    label: "Security Management",
    icon: shieldsecurity,
    subItems: [
      { id: 12, path: "/visitorlog", label: "Visitor Logs" },
    ],
  },
  {
    id: 14,
    path: "/securityguard",
    label: "Security Guard",
    icon: securityuser,
  },
  {
    id: 15,
    path: "/announcement",
    label: "Announcement",
    icon: announcement,
  },
  {
    id: 16,
    path: "/vehiclemanagement",
    label: "Vehicle Management",
    icon: personalcard,
  },
];

export const securityBar = [
  {
    id: 1,
    label: "Security",
    icon: securityicon,
    subItems: [
      { id: 2, path: "/visitortracking", label: "Visitor Tracking" },
      { id: 3, path: "/emergencymanagement", label: "Emergency Management" },
      { id: 4, path: "/vehicletracking", label: "Vehicle Tracking" },
    ],
  },
];

export const residentItems = [
  {
    id: 1,
    path: "/resident/dashboard",
    label: "Dashboard",
    icon: dashboardicon,
  },
  {
    id: 2,
    path: "/residentowner",
    label: "Personal Details",
    icon: personalcard,
  },
  {
    id: 3,
    path: "/serviceandcomplaint",
    label: "Service And Complaint",
    icon: servicesimg,
  },
  {
    id: 4,
    path: "/eventsparticipate",
    label: "Events Participation",
    icon: eventicon,
  },
  {
    id: 5,
    label: "Community",
    icon: communitiesicon,
    subItems: [
      { id: 6, path: "/accessforums", label: "Access Forums" },
      { id: 7, path: "/polls", label: "Polls" },
      { id: 8, path: "/communitiesdiscusion", label: "Communities Discussion" },
    ],
  },
  {
    id: 9,
    label: "Payment Portol",
    icon: paymenticon,
    subItems: [
      { id: 10, path: "/maintenceinvoices", label: "Maintence Invoices" },
      { id: 11, path: "/otherincomeinvoices", label: "Other Income Invoices" },
    ],
  },
  {
    id: 31,
    path: "/resident/vehicle",
    label: "Vehicle Management",
    icon: personalcard,
  },
];

export const Navigationbar = [
  { path: "/editprofile", label: "EditProfile" },
  { path: "/residentmanagement", label: "ResidentManagement" },
  { path: "/reqtracking", label: "RequestTracking" },
  { path: "/visitorlog", label: "VisitorLog" },
  { path: "/announcement", label: "Announcement" },
  { path: "/facilitymanagement", label: "FacilityManagement" },
  { path: "/note", label: "Note" },
  { path: "/ownerform", label: "OwnerForm" },
  { path: "/tenantform", label: "TenantForm" },
  { path: "/complainttable", label: "CreateComplaint" },
  { path: "/income", label: "FinancialMaintenance" },
  { path: "/expense", label: "Expense" },
  { path: "/securityguard", label: "SecurityGuard" },
  { path: "/other-income", label: "FinancialMaintenance" },
  { path: "/visitortracking", label: "VisitorTracking" },
  { path: "/emergencymanagement", label: "EmergencyManagement" },
  { path: "/activityparticipate", label: "ActivityParticipate" },
  { path: "/eventsparticipate", label: "EventsParticipate" },
  { path: "/residentowner", label: "PersonalDetails" },
  { path: "/serviceandcomplaint", label: "ServiceAndComplaint" },
  { path: "/maintenceinvoices", label: "maintenceinvoices" },
  { path: "/invoicespage", label: "InvoicesPage" },
  { path: "/otherinvoices", label: "OtherInvoices" },
  { path: "/otherincomeinvoices", label: "otherincomeinvoices" },
  { path: "/polls", label: "polls" },
  { path: "/communitiesdiscusion", label: "CommunitiesDiscussion" },
  { path: "/accessforums", label: "AccessForums" },
  { path: "/vehiclemanagement", label: "VehicleManagement" },
  { path: "/resident/vehicle", label: "ResidentVehicle" },
  { path: "/adminincome", label: "MaintenceDetails" },
];

export const pendingMaintenances = [
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
];

export const notifications = [
  {
    title: "Evelyn Harper (A- 101)",
    description: (
      <>
        Evelyn Harper gave a fund
        <span className="ml-1 text-[#5678E9] text-[14px]">
          of 1000 rupees for Navratri.
        </span>
      </>
    ),
    event: "for Navratri",
    time: "32 Minutes ago",
    options: ["Accept"],
    options2: ["Decline"],
    icon: (
      <img
        src={evelynHarperimage}
        alt="Evelyn"
        className="w-[40px] h-[40px] rounded-full mr-[10px]"
      />
    ),
  },
  {
    title: "Maintenance (A- 101)",
    description: (
      <>
        Evelyn Harper gave a
        <span className="text-[#5678E9] text-[14px] ml-1">
          Maintenance of 1000 rupees.
        </span>
      </>
    ),
    time: "Tuesday 11:41 AM",
    options: ["Accept"],
    options2: ["Decline"],
    icon: (
      <div className="icon-wrapper">
        <img
          src={moneys}
          alt="Evelyn"
          className="w-[22px] h-[22px] rounded-full relative top-[-3px] mr-[20px]"
        />
      </div>
    ),
  },
  {
    title: "Ganesh Chaturthi (A- 101)",
    description: (
      <>
        <p>
          {" "}
          Per Person Amount : <span className="text-[#5678E9]">1,500</span>{" "}
        </p>
        <span className="tag text-[#4F4F4F] text-[14px]">
          The celebration of Ganesh Chaturthi involves the installation of clay
          idols of Lord Ganesa in OurResident.
        </span>
      </>
    ),
    time: "Saturday 11:41 AM",
    icon: (
      <div className="icon-wrapper-text mr-[10px]">
        <p className="relative top-[-1px] left-[2px] mr-[20px] font-bold">G</p>
      </div>
    ),
  },
  {
    title: "Update Maintenance",
    icon: (
      <div className="icon-wrapper">
        <img
          src={moneys}
          alt="Evelyn"
          className="w-[22px] h-[22px] rounded-full relative top-[-3px] mr-[20px]"
        />
      </div>
    ),
  },
];

//   dashboard constant end

// residentmanagement data constant

export const Residentmanagementdata = [
  {
    fullName: "Evelyn Harper",
    unit: "A 1001",
    unitStatus: "Occupied",
    residentStatus: "Tenant",
    phone: "97587 85828",
    member: 1,
    vehicle: 2,
  },
  {
    fullName: "Evelyn Harper",
    unit: "B 1002",
    unitStatus: "Vacate",
    residentStatus: "--",
    phone: "97587 85828",
    member: 2,
    vehicle: 2,
  },
  {
    fullName: "Evelyn Harper",
    unit: "C 1003",
    unitStatus: "Occupied",
    residentStatus: "Owner",
    phone: "97587 85828",
    member: 1,
    vehicle: 4,
  },
  {
    fullName: "Evelyn Harper",
    unit: "D 1004",
    unitStatus: "Occupied",
    residentStatus: "Tenant",
    phone: "97587 85828",
    member: 4,
    vehicle: 2,
  },
  {
    fullName: "Evelyn Harper",
    unit: "E 2001",
    unitStatus: "--",
    residentStatus: "--",
    phone: "97587 85828",
    member: 2,
    vehicle: 2,
  },
  {
    fullName: "Robert Fox",
    unit: "F 2002",
    unitStatus: "Occupied",
    residentStatus: "Tenant",
    phone: "97587 85828",
    member: 3,
    vehicle: 2,
  },
  {
    fullName: "Evelyn Harper",
    unit: "G 2003",
    unitStatus: "Occupied",
    residentStatus: "Owner",
    phone: "97587 85828",
    member: 2,
    vehicle: 2,
  },
  {
    fullName: "Evelyn Harper",
    unit: "H 2004",
    unitStatus: "Occupied",
    residentStatus: "Tenant",
    phone: "97587 85828",
    member: 6,
    vehicle: 3,
  },
  {
    fullName: "Evelyn Harper",
    unit: "I 3001",
    unitStatus: "Vacate",
    residentStatus: "--",
    phone: "97587 85828",
    member: 2,
    vehicle: 2,
  },
  {
    fullName: "Evelyn Harper",
    unit: "A 3002",
    unitStatus: "Occupied",
    residentStatus: "Owner",
    phone: "97587 85828",
    member: 3,
    vehicle: 3,
  },
  {
    fullName: "Evelyn Harper",
    unit: "I 3003",
    unitStatus: "Occupied",
    residentStatus: "Tenant",
    phone: "97587 85828",
    member: 3,
    vehicle: 2,
  },
];

// securitypage

export const visitors = [
  {
    name: "Evelyn Harper",
    phone: "97852 12368",
    date: "10/01/2024",
    unit: "A 1001",
    time: "3:45 PM",
  },
  {
    name: "Wade Warren",
    phone: "97852 25893",
    date: "11/01/2024",
    unit: "B 1002",
    time: "2:45 AM",
  },
  {
    name: "Guy Hawkins",
    phone: "97589 55563",
    date: "12/01/2024",
    unit: "C 1003",
    time: "3:00 PM",
  },
  {
    name: "Robert Fox",
    phone: "97444 56323",
    date: "13/01/2024",
    unit: "D 1004",
    time: "5:30AM",
  },
  {
    name: "Jacob Jones",
    phone: "97121 12583",
    date: "14/01/2024",
    unit: "E 2001",
    time: "12:45 PM",
  },
  {
    name: "Ronald Richards",
    phone: "97259 12363",
    date: "15/01/2024",
    unit: "F 2002",
    time: "3:45 PM",
  },
  {
    name: "Annette Black",
    phone: "97569 77783",
    date: "16/01/2024",
    unit: "G 2003",
    time: "6:00 AM",
  },
  {
    name: "Jerome Bell",
    phone: "97123 25863",
    date: "17/01/2024",
    unit: "H 2004",
    time: "3:45 PM",
  },
  {
    name: "Theresa Webb",
    phone: "97258 36973",
    date: "18/01/2024",
    unit: "I 3001",
    time: "7:00 PM",
  },
  {
    name: "Kathryn Murphy",
    phone: "97577 66663",
    date: "19/01/2024",
    unit: "A 3002",
    time: "6:00 AM",
  },
  {
    name: "Eleanor Pena",
    phone: "97259 69963",
    date: "20/01/2024",
    unit: "B 3003",
    time: "7:00 PM",
  },
];

export const data = [
  {
    title: "Maintenance Amount",
    amount: "0",
    bgColor: "rgba(57, 151, 61, 0.5)",
    gradient:
      "linear-gradient(220.5deg, #39973D 7.71%, rgba(255, 255, 255, 0) 30.54%)",
    textColor: "text-green-500",
  },
  {
    title: "Penalty Amount",
    amount: "0",
    bgColor: "rgba(255, 106, 0, 0.5)",
    gradient:
      "linear-gradient(220.5deg, #FF6A00 7.71%, rgba(255, 255, 255, 0) 30.54%)",
    textColor: "text-red-500",
  },
];

export const paymentMethods = [
  { id: 1, name: "Master Card", image: mastercard },
  { id: 2, name: "Visa Card", image: visacard },
  { id: 3, name: "Cash Payment", image: cashpayment },
];

export const eventsData = [
  {
    name: "Cody Fisher",
    description: "Event and recreational activities.",
    time: "2:45 PM",
    date: "11/02/2024",
    eventName: "Holi Festival",
  },
  {
    name: "Esther Howard",
    description: "Securing critical government systems.",
    time: "1:45 AM",
    date: "12/02/2024",
    eventName: "Ganesh Chaturthi",
  },
  {
    name: "Brooklyn Simmons",
    description: "Implementing surveillance in public spaces.",
    time: "2:00 PM",
    date: "13/02/2024",
    eventName: "Navratri Festival",
  },
  {
    name: "Jenny Wilson",
    description: "Event and recreational activities.",
    time: "4:00 AM",
    date: "14/02/2024",
    eventName: "Holi Festival",
  },
  {
    name: "Guy Hawkins",
    description: "Expenses will make sense for you.",
    time: "5:30 PM",
    date: "15/02/2024",
    eventName: "Ganesh Chaturthi",
  },
  {
    name: "Robert Fox",
    description: "Event and recreational activities.",
    time: "2:45 AM",
    date: "16/02/2024",
    eventName: "Navratri Festival",
  },
  {
    name: "Albert Flores",
    description: "Implementing surveillance in public spaces.",
    time: "2:45 PM",
    date: "17/02/2024",
    eventName: "Holi Festival",
  },
  {
    name: "Annette Black",
    description: "Event and recreational activities.",
    time: "6:00 AM",
    date: "18/02/2024",
    eventName: "Ganesh Chaturthi",
  },
  {
    name: "Annette Black",
    description: "Securing critical government systems.",
    time: "6:45 PM",
    date: "20/02/2024",
    eventName: "Navratri Festival",
  },
  {
    name: "Floyd Miles",
    description: "Event and recreational activities.",
    time: "5:00 AM",
    date: "21/02/2024",
    eventName: "Holi Festival",
  },
];

export const activityData = [
  {
    name: "Cody Fisher",
    description: "Event and recreational activities.",
    time: "2:45 PM",
    date: "11/02/2024",
    eventName: "Holi Festival",
  },
  {
    name: "Esther Howard",
    description: "Securing critical government systems.",
    time: "1:45 AM",
    date: "12/02/2024",
    eventName: "Ganesh Chaturthi",
  },
  {
    name: "Brooklyn Simmons",
    description: "Implementing surveillance in public spaces.",
    time: "2:00 PM",
    date: "13/02/2024",
    eventName: "Navratri Festival",
  },
  {
    name: "Jenny Wilson",
    description: "Event and recreational activities.",
    time: "4:00 AM",
    date: "14/02/2024",
    eventName: "Holi Festival",
  },
  {
    name: "Guy Hawkins",
    description: "Expenses will make sense for you.",
    time: "5:30 PM",
    date: "15/02/2024",
    eventName: "Ganesh Chaturthi",
  },
  {
    name: "Robert Fox",
    description: "Event and recreational activities.",
    time: "2:45 AM",
    date: "16/02/2024",
    eventName: "Navratri Festival",
  },
  {
    name: "Albert Flores",
    description: "Implementing surveillance in public spaces.",
    time: "2:45 PM",
    date: "17/02/2024",
    eventName: "Holi Festival",
  },
  {
    name: "Annette Black",
    description: "Event and recreational activities.",
    time: "6:00 AM",
    date: "18/02/2024",
    eventName: "Ganesh Chaturthi",
  },
  {
    name: "Annette Black",
    description: "Securing critical government systems.",
    time: "6:45 PM",
    date: "20/02/2024",
    eventName: "Navratri Festival",
  },
  {
    name: "Floyd Miles",
    description: "Event and recreational activities.",
    time: "5:00 AM",
    date: "21/02/2024",
    eventName: "Holi Festival",
  },
];

// polls modal image
