import { useState } from "react";
import EventsParticipate from "./EventsParticipate";
import ActivityParticipate from "./Activityparticipate";


const EventTab = () => {
  const [activetab, setActiveTab] = useState(true);
  return (
    <div>
      <div className="flex">
        <div
          onClick={() => setActiveTab(true)}
          className={`px-[21px] py-[18px] rounded-t-lg cursor-pointer text-[14px] text-[#202224] font-semibold max-sm:text-[14px] ${
            activetab
              ? "bg-[#FF6B07] text-white"
              : "bg-white py-5 border-b-2 border-[#FF6B07]"
          }`}
        >
          Events Participate
        </div>

        <div
          onClick={() => setActiveTab(false)}
          className={`px-[21px] py-[18px] rounded-t-lg cursor-pointer text-[14px] text-[#202224] font-semibold max-sm:text-[14px] max-sm:px-[10px] ${
            !activetab
              ? "bg-[#FF6B07] text-white"
              : "bg-white py-5 border-b-2 border-[#FF6B07]"
          }`}
        >
          Activity Participate
        </div>
      </div>
      {activetab && <EventsParticipate />}
      {!activetab && <ActivityParticipate />}
    </div>
  );
};

export default EventTab;
