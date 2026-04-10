import  { useState } from "react";
import Smiley from "../../assets/images/Smiley.svg";
import camera from "../../assets/images/camera.svg";
import Paperclip from "../../assets/images/Paperclip.svg";
import speaker from "../../assets/images/speaker.svg";
import videoicon from "../../assets/images/videoicon.png";
import callicon from "../../assets/images/callicon.png"
import dottedicon from "../../assets/images/dottedicon.svg";
import { useSelector } from "react-redux";
import { GoArrowLeft } from "react-icons/go";

export default function MobileViewAccessForums({
    userList,
    discussions,
    receiver,
    setReceiver,
    handleSendMessage,
    message,
    setMessage,
    handleChatClick,
}) {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const userId = useSelector((store) => store.auth.user._id);

    const format12HourTimeShort = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert 0 hours to 12
        return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    };
    const handleFileChange = (e) => {
        e.preventDefault();
        setMedia(e.target.files[0]);
    };
    const toggleDropdown = () => {
        
        setIsDropdownVisible((prev) => !prev);
      };
    
    return (
        <div className="bg-gray-100">
            {/* Chats Section */}
            <div className="w-full flex flex-col space-y-4">
                {!receiver ? (
                    <div className="bg-white h-screen shadow-lg rounded-tl-[15px]">
                        {/* Chat List Header */}
                        <div className="p-4 border-b">
                            <h1 className="text-[#202224] text-[20px] font-semibold">Chat</h1>
                            <div className="relative mt-2">
                                <input
                                    type="text"
                                    placeholder="Search Here"
                                    className="py-2 w-full pl-10 bg-[#F6F8FB] h-[40px] rounded-full border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                />
                                <span className="absolute left-4 top-3 text-gray-400">
                                    <i className="fas fa-search"></i>
                                </span>
                            </div>
                        </div>

                        {/* Chat List */}
                        <div className="overflow-y-auto sticky top-0 left-0 ">
                            {userList.map((user) => (
                                <div
                                    key={user._id}
                                    className={`flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 ${receiver?._id === user._id ? "bg-gray-200" : ""
                                        }`}
                                    onClick={() => handleChatClick(user)}
                                >
                                    <div className="flex items-center">

                                        <img
                                            className="h-12 w-12 rounded-full object-cover mr-4"
                                            src={user.profileImage}
                                            alt="Avatar"
                                        />
                                        <div>
                                            <h4 className="font-semibold">{user.Full_name}</h4>
                                            <p className="text-sm text-gray-600 truncate w-[200px]">
                                                {user.Email_address}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-black">2:00 AM</span>
                                </div>
                            ))}

                        </div>
                    </div>
                ) : (
                    // Chat View
                    <div className="h-screen bg-gray-100">
                        {/* Chat Header */}
                        <div className="flex items-center justify-between bg-gray-200 p-4 border-b">
                           
                            <div className="flex ">
                            <button
                                onClick={() => setReceiver(null)}
                                className="text-black hover:text-black"
                            >
                                <GoArrowLeft size={20} />
                            </button>
                            <img
                                className="h-10 w-10 rounded-full ml-4"
                                src={receiver.profileImage}
                                alt="Avatar"
                            />
                            <div>
                                <h4 className="font-semibold ml-5">{receiver?.Full_name}</h4>
                                <span className="text-xs ml-5  text-gray-600 font-semibold">9:00 PM</span>
                            </div>

                            </div>

                                   
                                   <div className="relative flex items-center space-x-4">
                            <img
                                src={videoicon}
                                alt="videoicon"
                                className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500"
                            />
                            <img
                                src={callicon}
                                className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500"
                            />
                            {isDropdownVisible && (
                                <div className="absolute top-[40px] right-0 bg-white shadow-lg rounded-lg w-[112px] p-[20px] z-10">
                                    <ul className="space-y-2">
                                        <li className="text-[#202224] hover:text-blue-500 cursor-pointer font-semibold mb-[10px]">
                                            Copy
                                        </li>
                                        <li className="text-[#202224] hover:text-blue-500 cursor-pointer font-semibold">
                                            Forward
                                        </li>
                                    </ul>
                                </div>
                            )}
                            <img
                                src={dottedicon}
                                alt="dottedicon"
                                onClick={toggleDropdown}
                                className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500"
                            />
                        </div>
                        </div>
                 

                        {/* Chat Messages */}
                        <div className="flex flex-col p-4 h-[calc(100vh-160px)] overflow-x-hidden overflow-y-auto bg-gray-100 ">
                            {discussions.map((chat) => (
                                <div
                                    key={chat._id}
                                    className={`flex ${chat.senderId === userId ? "justify-end" : "justify-start"
                                        } mb-2`}
                                >
                                    <div
                                        className={`max-w-[70%] p-2 rounded-lg shadow ${chat.senderId === userId
                                            ? "bg-blue-500 text-white text-left"
                                            : "bg-gray-200 text-black text-left"
                                            }`}
                                    >
                                        {chat.media && (
                                            <img
                                                src={chat.media}
                                                alt="Media"
                                                className="w-[100px] h-auto rounded mb-2"
                                            />
                                        )}
                                        <p className="text-sm">{chat.message}</p>
                                        <span className="text-xs text-gray-400 block text-right mt-1">
                                            {format12HourTimeShort(chat.timestamp)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        {receiver && (
                            <div className="flex items-center p-[20px] bg-white border-t relative ">
                                <input
                                    type="text"
                                    className="w-[94%] h-[46px] p-2 outline-none rounded-full shadow-[0px_7px_15px_0px_#0000000D] py-[9px] ps-[40px] pl-[40px] relative"
                                    placeholder="Type Message "
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                />
                                <img
                                    src={Smiley}
                                    alt="Smiley"
                                    className="absolute left-[45px] translate-x-[-20px] cursor-pointer"
                                />
                                <img
                                    src={camera}
                                    alt="Camera Icon"
                                    className="absolute right-[-8px] translate-x-[-65px] cursor-pointer"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer absolute right-[-35px] translate-x-[-130px]"
                                >
                                    <img src={Paperclip} alt="Attachment Icon" />
                                </label>
                                <input
                                    id="file-upload"
                                    onChange={handleFileChange}
                                    type="file"
                                    className="hidden"
                                />
                                <img
                                    src={speaker}
                                    alt="Speaker Icon"
                                    className="absolute  w-12  right-[-5px] cursor-pointer"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

    );
}
