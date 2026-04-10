import React, { useEffect, useRef, useState } from "react";
import search from "../../../assets/images/search.svg";
import videoicon from "../../../assets/images/videoicon.png";
import callicon from "../../../assets/images/callicon.png";
import dottedicon from "../../../assets/images/dottedicon.svg";
import Smiley from "../../../assets/images/Smiley.svg";
import Paperclip from "../../../assets/images/Paperclip.svg";
import camera from "../../../assets/images/camera.svg";
import speaker from "../../../assets/images/speaker.svg";
import { GetResidents } from "../../../services/ownerTenantService";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { GetChatHistory, SendMessage } from "../../../services/chatService";
import MobileViewAccessForums from "../MobileViewAccessForums";
import { socket } from "../../../components/Socket";
import { format } from "timeago.js";

const peerConnectionConfig = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const format12HourTimeShort = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 hours to 12
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

export default function AccessForums() {
  const userId = useSelector((store) => store.auth.user._id);
  const senderModel = useSelector((store) => store.auth.user.Resident_status);
  const [userList, setUserList] = useState([]);
  const [originalUserList, setOriginalUserList] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(3);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [media, setMedia] = useState(null);
  const [searching, setSearching] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isInCall, setIsInCall] = useState(false);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  // **Start Video Call**
  const handleStartCall = async () => {
    if (!receiver) {
      toast.error("Please select a user to call.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setLocalStream(stream);
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      peerConnection.current = new RTCPeerConnection(peerConnectionConfig);
      stream
        .getTracks()
        .forEach((track) => peerConnection.current.addTrack(track, stream));

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            targetId: receiver._id,
            candidate: event.candidate,
          });
        }
      };

      peerConnection.current.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        if (remoteVideoRef.current)
          remoteVideoRef.current.srcObject = event.streams[0];
      };

      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);

      socket.emit("video-offer", {
        senderId: userId,
        receiverId: receiver._id,
        sdp: offer,
      });

      setIsInCall(true);
    } catch (error) {
      console.error("Error starting call:", error);
      toast.error(
        "Failed to start the call. Please check your camera and microphone."
      );
    }
  };

  // **Receive Call**
  const handleReceiveCall = async ({ senderId, sdp }) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setLocalStream(stream);
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      peerConnection.current = new RTCPeerConnection(peerConnectionConfig);
      stream
        .getTracks()
        .forEach((track) => peerConnection.current.addTrack(track, stream));

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            targetId: senderId,
            candidate: event.candidate,
          });
        }
      };

      peerConnection.current.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        if (remoteVideoRef.current)
          remoteVideoRef.current.srcObject = event.streams[0];
      };

      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(sdp)
      );

      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      socket.emit("video-answer", {
        senderId,
        receiverId: userId,
        sdp: answer,
      });

      setIsInCall(true);
    } catch (error) {
      console.error("Error receiving call:", error);
      toast.error("Failed to answer the call.");
    }
  };

  // **Handle ICE Candidates**
  const handleICECandidate = ({ candidate }) => {
    if (peerConnection.current && candidate) {
      peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  // **End Call**
  const handleEndCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    if (localStream) localStream.getTracks().forEach((track) => track.stop());
    if (remoteStream) setRemoteStream(null);

    setLocalStream(null);
    setRemoteStream(null);
    setIsInCall(false);

    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    toast.success("Call ended successfully.");
  };

  // **Handle Socket Events**
  useEffect(() => {
    socket.on("video-offer", handleReceiveCall);
    socket.on("video-answer", ({ sdp }) => {
      if (peerConnection.current) {
        peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(sdp)
        );
      }
    });
    socket.on("ice-candidate", handleICECandidate);

    return () => {
      socket.off("video-offer");
      socket.off("video-answer");
      socket.off("ice-candidate");
    };
  }, []);

  const handleSendMessage = async () => {
    try {
      const receiverId = receiver._id;
      const receiverModel = receiver.Resident_status;

      const response = await SendMessage({
        userId,
        receiverId,
        message,
        senderModel,
        receiverModel,
        media,
      });

      const image = response.data.data.media;
      socket.emit("sendMessage", { userId, receiverId, message, media: image });

      fetchChatHistory();
      setDiscussions((prev) => [...prev, response.data.data.message]);
      setMedia(null);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setMessage("");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await GetResidents();
      setUserList(response.data.Residents);
      setOriginalUserList(response.data.Residents);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleChatClick = (user) => {
    setReceiver(user);
    socket.emit("join", { userId, receiverId: user._id });
  };

  const fetchChatHistory = async () => {
    try {
      const receiverId = receiver._id;
      const data = { senderId: userId, receiverId };
      const response = await GetChatHistory(data);
      setDiscussions(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateView = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    fetchUsers();
    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (newMessage) => {
      setDiscussions((prev) => [...prev, newMessage]);
    });
    return () => {
      socket.off("sendMessage");
    };
  }, [receiver]);

  useEffect(() => {
    receiver && fetchChatHistory();
  }, [receiver]);

  //search users
  useEffect(() => {
    setUserList(
      originalUserList.filter((user) =>
        user.Full_name.toLowerCase().includes(searching.toLowerCase())
      )
    );
  }, [searching]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [message, discussions]);

  return isMobile ? (
    <MobileViewAccessForums
      userList={userList}
      discussions={discussions}
      receiver={receiver}
      setReceiver={setReceiver}
      handleSendMessage={handleSendMessage}
      message={message}
      setMessage={setMessage}
      handleChatClick={handleChatClick}
    />
  ) : (
    <div className="flex bg-gray-100 p-6">
      {/* Chats Section */}
      <div className="w-1/4 flex flex-col space-y-4 max-md:w-full max-xl:w-1/2 max-2xl:w-1/2 max-sm:w-full">
        <div className="bg-white w-[410px] h-[840px] shadow-lg rounded-tl-[15px] p-6 max-sm:p-4">
          <h1 className="mb-[12px] text-[#202224] text-[20px] font-semibold">
            Chat
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Here"
              onChange={(e) => setSearching(e.target.value)}
              className="py-2 w-full outline-none pl-10 bg-[#F6F8FB] h-[48px] rounded-lg"
            />
            <img
              src={search}
              className="absolute  left-3 top-[14px] text-gray-400 text-[20px] mr-[20px]"
            />
          </div>

          <div className="overflow-x-auto custom-scrollbar h-[70vh]">
            {userList.map((user, i) => (
              <div
                key={i}
                className={`flex justify-between items-center p-2 transition-all duration-300 py-[12px] cursor-pointer rounded-[10px] ${
                  selectedChatId === user._id
                    ? "bg-gray-200"
                    : "hover:bg-gray-50 rounded-[10px]"
                }`}
                onClick={() => handleChatClick(user)}
              >
                <div className="flex items-center">
                  <img
                    className="h-[48px] w-[48px] rounded-full object-cover mr-[19px]"
                    src={user.profileImage}
                    alt="Avatar"
                  />
                  <div>
                    <h4 className="font-semibold">{user.Full_name}</h4>
                    <p className="text-sm text-gray-600">
                      {user.Email_address}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">2:00 AM</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Discussions Section */}
      <div className="flex-1  flex flex-col max-sm:hidden max-md:hidden">
        {/* Header Section */}
        {receiver && (
          <div className="flex justify-between items-center bg-white py-[18px] px-6 rounded-tr-[15px]">
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full object-cover mr-[19px]"
                src={receiver?.profileImage}
                alt="Avatar"
              />
              <div>
                <h4 className="font-semibold">{receiver?.Full_name}</h4>
                {/* Header shows the selected chat's name */}
                <span className="text-xs text-gray-400">
                  {receiver?.Email_address}
                </span>
              </div>
            </div>
            <div className="relative flex items-center space-x-4">
              {isInCall && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="relative w-[90%] max-w-4xl bg-white p-4 rounded-lg shadow-lg">
                    <video
                      ref={localVideoRef}
                      autoPlay
                      muted
                      className="w-1/2"
                    />
                    <video ref={remoteVideoRef} autoPlay className="w-1/2" />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                      onClick={handleEndCall}
                    >
                      End Call
                    </button>
                  </div>
                </div>
              )}
              <img
                src={videoicon}
                alt="Video Call Icon"
                onClick={handleStartCall}
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
        )}

        {/* Chat Messages */}
        <div className="overflow-x-hidden p-[20px] custom-scrollbar h-[73.2vh] bg-[#F4F4F4] flex flex-col">
          {discussions && discussions.length > 0 ? (
            discussions.map((chat) => (
              <div
                key={chat._id}
                className={`flex ${
                  chat.senderId === userId ? "justify-end" : "justify-start"
                } mb-4`}
              >
                {/* Message Bubble Container */}
                <div
                  className={`flex flex-col items-${
                    chat.senderId === userId ? "end" : "start"
                  } max-w-[75%]`}
                >
                  {/* Chat Media */}
                  {chat?.media && (
                    <img
                      src={chat.media}
                      alt="Chat Media"
                      className="w-[390px] h-auto rounded-lg mb-2 p-2"
                    />
                  )}

                  {/* Message Text */}
                  <div
                    className={` ${
                      chat?.message !== "" && "p-3"
                    } rounded-lg text-sm relative break-words ${
                      chat.senderId === userId
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {chat?.message}
                  </div>

                  {/* Timestamp */}
                  <span
                    className={`text-xs text-gray-500 mt-1 ${
                      chat.senderId === userId ? "self-end" : "self-start"
                    }`}
                  >
                    {format(chat?.timestamp)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages found.</p>
          )}

          {/* Scroll to Latest Message */}
          <div ref={chatEndRef} />
        </div>

        {/* Message Input Section */}
        {receiver && (
          <div className="flex items-center p-[10px] bg-white border-t  sticky bottom-0 left-0 ">
            <input
              type="text"
              className="w-[94%] border p-2 rounded-full shadow-[0px_7px_15px_0px_#0000000D] py-[9px] ps-[40px] pl-[40px] relative"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            {media && (
              <div className="absolute bottom-16">
                <div className="relative">
                  <img
                    src={URL.createObjectURL(media)}
                    alt=""
                    className="w-[auto] h-[100px]  p-2 bg-gray-200 rounded-md"
                  />
                  <button
                    onClick={() => setMedia(null)}
                    className="text-bold text-xs absolute w-[20px] h-[20px] top-0 right-0 p-1 flex items-center justify-center bg-white rounded-full"
                  >
                    x
                  </button>
                </div>
              </div>
            )}
            <img
              src={Smiley}
              alt="Smiley"
              className="absolute left-[35px] translate-x-[-20px] cursor-pointer"
            />
            <img
              src={camera}
              alt="Camera Icon"
              className="absolute right-[40px] translate-x-[-65px] cursor-pointer"
            />

            <label
              htmlFor="file-upload"
              className="cursor-pointer absolute right-[15px] translate-x-[-130px]"
            >
              <img src={Paperclip} alt="Attachment Icon" />
            </label>
            <input
              ref={fileInputRef}
              id="file-upload"
              onChange={(e) => {
                setMedia(e.target.files[0]);
                fileInputRef.current.value = "";
              }}
              accept=".png,.jpeg,.jpg"
              type="file"
              className="hidden"
            />
            <img
              src={speaker}
              alt="Speaker Icon"
              className="absolute w-16 right-[15px] p-1 cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
