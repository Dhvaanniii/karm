import React, { useState } from "react";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import Avatar from "../../assets/images/avatar.png";
import usericon from "../../assets/images/usericon.png";
import eyeicon from "../../assets/images/eyeicon.svg";

export default function DiscussionMobile() {
  const [selectedChatId, setSelectedChatId] = useState(3);
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [isAnswerModal, setIsAnswerModal] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [answers, setAnswers] = useState([
    "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
  ]);

  const chats = [
    { id: 1, name: "Michael John", message: "Hi, John! How are you?", time: "10:27" },
    { id: 2, name: "Jenny Wilson", message: "Hello, Jenny", time: "7:00", unreadCount: 7 },
    { id: 3, name: "Community", message: "Typing...", time: "9:20" },
  ];

  const handleChatClick = (chatId) => setSelectedChatId(chatId);

  const handleInputChange = (e) => setUserAnswer(e.target.value);

  const handlePostAnswer = () => {
    if (userAnswer.trim()) {
      setAnswers([...answers, userAnswer]);
      setUserAnswer("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 shadow">
        <div className="flex items-center">
          <img
            src={usericon}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="text-base font-semibold text-gray-800">Community</h4>
            <span className="text-sm text-gray-400">9:00 pm</span>
          </div>
        </div>
        <FiMoreVertical className="text-gray-600 text-xl" />
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto bg-white p-3">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
              selectedChatId === chat.id ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={() => handleChatClick(chat.id)}
          >
            <div className="flex items-center">
              <img
                src={Avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <h4 className="text-sm font-semibold text-gray-800">{chat.name}</h4>
                <p className="text-xs text-gray-500">{chat.message}</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">{chat.time}</div>
          </div>
        ))}
      </div>

      {/* Answer Modal */}
      {isAnswerModal && (
        <div className="fixed inset-0 bg-gray-100 p-4 flex flex-col space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Your Answer</h2>
          <textarea
            value={userAnswer}
            onChange={handleInputChange}
            placeholder="Type your answer..."
            className="w-full p-3 border border-gray-300 rounded-md"
            rows="6"
          ></textarea>
          <button
            onClick={handlePostAnswer}
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg"
          >
            Post Your Answer
          </button>
        </div>
      )}
    </div>
  );
}
