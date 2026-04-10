import { useState } from 'react';
import OwnPolls from '../OwnPolls';

export default function CommunityTab() {
    const [activeTab, setActiveTab] = useState(0);

    const renderTabContent = () => {
        switch (activeTab) {
            case 0:
                return <OwnPolls />;
            default:
                return <OwnPolls />;
        }
    };

    return (
        <div>
            <div className="flex">
                <div
                    onClick={() => setActiveTab(0)}
                    className={`px-6 py-5 max-sm:px-3 rounded-t-lg cursor-pointer text-[14px] text-[#202224] font-semibold w-[171px] max-sm:w-[117px] h-[57px] flex justify-center items-center ${activeTab === 0 ? "bg-[#FF6B07] text-white" : "bg-white py-5 border-b-2 border-[#FF6B07]"}`}
                >
                    Own polls
                </div>

                <div
                    onClick={() => setActiveTab(0)}
                    className={`px-6 py-5 max-sm:px-3 rounded-t-lg cursor-pointer text-[14px] text-[#202224] font-semibold w-[171px] max-sm:w-[117px] h-[57px] flex justify-center items-center ${activeTab === 1 ? "bg-[#FF6B07] text-white" : "bg-white py-5 border-b-2 border-[#FF6B07]"}`}
                >
                    New Poll
                </div>

                <div
                    onClick={() => setActiveTab(0)}
                    className={`px-6 py-5 max-sm:px-3 rounded-t-lg cursor-pointer text-[14px] text-[#202224] font-semibold w-[171px] max-sm:w-[117px] h-[57px] flex justify-center items-center ${activeTab === 2 ? "bg-[#FF6B07] text-white" : "bg-white py-5 border-b-2 border-[#FF6B07]"}`}
                >
                    Previous Poll
                </div>
            </div>
            {renderTabContent()}
        </div>
    );
}
