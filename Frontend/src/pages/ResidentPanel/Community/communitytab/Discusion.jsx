import React, { useEffect, useState } from "react";
import { FiMoreVertical, FiSearch, FiEye } from "react-icons/fi";
import Avatar from "../../../../assets/images/Avatar.png";
import usericon from "../../../../assets/images/usericon.png";
import eyeicon from "../../../../assets/images/eyeicon.svg";
import { FaChevronRight } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import {
  AddNewQuestion,
  GetQuestionList,
  PostAnswer,
} from "../../../../services/communityServices";

const answers = [
  "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
  "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
  "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
];

export default function Discussion() {
  const [selectedChatId, setSelectedChatId] = useState(3);
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [isAnswerModal, setIsAnswerModal] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionList, setQuestionList] = useState(true);
  const [userAnswer, setUserAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedQue, setSelectedQue] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const handlePostAnswer = async () => {
    try {
      // setIsLoading(true);
      const response = await PostAnswer(selectedQue._id, { answer });
      toast.success(response.data.message);
      fetchQuestions();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setSelectedQue(null);
      setAnswer("");
      setIsAnswerModal(false);
      setQuestionList(true);
      // setIsLoading(false);
    }
  };

  const chats = [
    {
      id: 1,
      name: "Michael John",
      message: "Hi, John! How are you doing?",
      time: "10:27",
    },
    {
      id: 2,
      name: "Jenny Wilson",
      message: "Hello, Jenny",
      time: "7:00",
      unreadCount: 7,
    },
    { id: 3, name: "Community", message: "Typing...", time: "9:20" },
    { id: 4, name: "Esther Howard", message: "Hello, Esther", time: "10:27" },
    {
      id: 5,
      name: "Cody Fisher",
      message: "Thank you for your order!",
      time: "7:00",
    },
  ];

  const handleChatClick = (chatId) => {
    setSelectedChatId(chatId);
  };

  const handleAskQuestionClick = () => {
    setIsAskingQuestion(true);
    setQuestionList(false);
    setIsAnswerModal(false);
  };

  const handleAnswerModal = (que) => {
    setSelectedQue(que);
    setIsAnswerModal(true);
    setQuestionList(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AddNewQuestion({ question: question });
      toast.success(response.data.message);
      fetchQuestions();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setQuestion("");
      setQuestionList(true);
      setIsAskingQuestion(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      // setIsLoading(true);
      const response = await GetQuestionList();
      setQuestions(response.data.Question);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="flex h-full bg-gray-100 overflow-hidden">
      {/* Sidebar (Chats List) */}

      <div className="w-1/4 max-xl:w-2/4 max-2xl:w-2/4 bg-white shadow-lg rounded-tl-lg flex flex-col p-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Chat</h1>
          <div className="relative mt-4">
            <input
              type="text"
              placeholder="Search Here"
              className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-lg"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400 text-lg" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedChatId === chat.id ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={() => handleChatClick(chat.id)}
            >
              <div className="flex items-center">
                <img
                  src={Avatar}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{chat.name}</h4>
                  <p className="text-sm text-gray-500">{chat.message}</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <span className="text-xs text-gray-400">{chat.time}</span>
                {chat.unreadCount && (
                  <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 ">
        {/* Header */}

        <div className="flex items-center justify-between p-4 bg-white shadow sticky top-0 z-10">
          <div className="flex items-center max-sm:mb-[15px] max-sm:items-center">
            <img
              src={usericon}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="font-semibold text-gray-800">Community</h4>
              <span className="text-sm text-gray-400">9:00 pm</span>
            </div>
          </div>
          <div className="flex  gap-3 flex-wrap max-sm:gap-2 items-center">
            {!isAskingQuestion && (
              <button
                className="px-4 py-2  bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all duration-200 rounded-[10px] h-[51px] text-sm sm:text-base max-sm:w-full"
                onClick={handleAskQuestionClick}
              >
                Ask Question
              </button>
            )}
            <FiMoreVertical
              size={40}
              className="text-gray-600 rounded-full p-2 bg-gray-100 cursor-pointer max-sm:w-full"
            />
          </div>
        </div>

        {isAskingQuestion && (
          <div className="flex-1 p-6 bg-[#F4F4F4] space-y-4">
            <div className="bg-indigo-50 rounded-xl border border-blue-500 p-4">
              <h2 className="text-xl font-normal text-gray-800 mb-4">
                Writing a good question
              </h2>
              <p>
                You're ready to ask a programming-related question and this form
                will help guide you through the process. <br /> Looking to ask a
                non-programming question? See the topics here to find a relevant
                site.
              </p>
              <div className="mt-6">
                <p className="text-lg font-medium">Steps</p>
                <ul className="list-disc list-inside">
                  <li className="my-1">
                    Summarize your problem in a one-line title.
                  </li>
                  <li className="my-1">
                    Describe your problem in more detail.
                  </li>
                  <li className="my-1">
                    Describe what you tried and what you expected to happen.
                  </li>
                  <li className="my-1">
                    Add "tags" which help surface your question to members of
                    the community.
                  </li>
                  <li className="my-1">
                    Review your question and post it to the site.
                  </li>
                </ul>
              </div>
            </div>
            <form
              onSubmit={handleFormSubmit}
              className="bg-gray-100 p-6 rounded-xl shadow-lg space-y-4"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Title
                </h3>
                <p>
                  Be specific and imagine you're asking a question to another
                  person.
                </p>
              </div>
              <div>
                <input
                  type="text"
                  name="question"
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 hover:border-blue-300 transition-all duration-200"
                  placeholder="e.g Is there an R function for finding the index of an element in a Vector ?"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-custom-gradient text-white font-medium rounded-md"
              >
                Next
              </button>
            </form>
          </div>
        )}

        {questionList && (
          <div className=" overflow-x-auto p-[20px] custom-scrollbar h-[73vh] bg-[#F4F4F4] space-y-3 ">
            {selectedChatId === 3 &&
              questions.map((q) => (
                <div
                  key={q._id}
                  onClick={() => handleAnswerModal(q)}
                  className="p-4 bg-[rgb(234_236_245)]  rounded-lg shadow-sm flex  items-s justify-between"
                >
                  <div className="flex flex-col items-center justify-start text-gray-400 mr-4 space-y-2 max-sm:hidden mt-[10px]">
                    <div className="flex items-center space-x-1">
                      <span
                        className={`text-sm font-normal ${
                          q.upVote === 0 ? "text-[#A7A7A7]" : "text-[#39973D]"
                        }`}
                      >
                        {q.upVote + q.downVote}
                      </span>
                      <span
                        className={`text-sm font-normal ${
                          q.upVote === 0 ? "text-[#A7A7A7]" : "text-[#39973D]"
                        }`}
                      >
                        Votes
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <span
                        className={`text-sm font-normal ${
                          q.ans.length === 0
                            ? "text-gray-400"
                            : "text-[#5678E9]"
                        }`}
                      >
                        {q.ans.length}
                      </span>
                      <span
                        className={`text-sm font-normal ${
                          q.ans.length === 0
                            ? "text-gray-400"
                            : "text-[#5678E9]"
                        }`}
                      >
                        Answers
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-end">
                      <h5 className="text-[#4F4F4F] font-semibold mb-2 max-sm:text-[14px]">
                        {q.question}
                      </h5>
                      <div className="flex bg-white rounded-[30px] p-2 items-center space-x-1 w-[61px] max-sm:w-[70px]">
                        <img
                          src={eyeicon}
                          className="text-gray-800 text-xl cursor-pointer hover:text-gray-600 transition"
                        />
                        <span className="text-gray-600 font-normal">20</span>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600">
                      <li className="mb-1 text-wrap max-sm:text-[14px] text-[#A7A7A7] max-w-[900px] font-light leading-[24px]">
                        {/* {q.ans[0].answer} */}
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        )}

        {isAnswerModal && (
          <div className="flex p-6">
            <div className="flex flex-col pr-[10px]">
              <button className="w-[42px] h-[42px] bg-[#FFFFFF] rounded-[10px] border border-[#D3D3D3] mb-[5px] py-[13px] px-[13px]">
                <FaChevronRight className="mr-[3px] w-[12px] rotate-[-88deg]" />
              </button>
              <span className="text-center text-[#FE512E]">1</span>
              <button className="w-[42px] h-[42px] bg-[#FFFFFF] rounded-[10px] border border-[#D3D3D3] mt-[5px] py-[13px] px-[13px]">
                <FaChevronRight className="mr-[3px] w-[12px] rotate-[88deg]" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-5 bg-gray-100 h-[70vh] custom-scrollbar overflow-y-auto">
              {/* Question Section */}
              <div className="space-y-4 bg-[rgb(234_236_245)] w-full h-36 p-4 rounded-lg relative">
                <h1 className="text-lg pb-[3.5px] font-medium text-[#4F4F4F]">
                  {selectedQue.question}
                </h1>
                <p className="text-[#4F4F4F]">
                  Feel free to let me know if you need more examples or if
                  there's anything specific you'd like to include in your dummy
                  content!
                </p>
                <div className="absolute bg-white top-4 right-8 flex items-center space-x-1 rounded-[30px] p-2 w-[61px] max-sm:w-[70px]">
                  <img
                    src={eyeicon}
                    className="text-gray-800 text-xl cursor-pointer hover:text-gray-600 transition"
                  />
                  <span className="text-gray-600 font-normal">20</span>
                </div>
              </div>

              {/* Answers Section */}
              <div className="space-y-4 bg-[rgb(234_236_245)] w-full h-[24vh] overflow-y-auto p-4 rounded-lg">
                <h2 className="font-semibold text-blue-500 mb-2">Answers</h2>
                <ul className="space-y-4">
                  {(showMore
                    ? selectedQue.ans
                    : selectedQue.ans.slice(0, 3)
                  ).map((answer, index) => (
                    <li key={index} className="p-1 rounded-lg text-gray-700">
                      {index + 1}. {answer.answer}
                    </li>
                  ))}
                </ul>

                {/* Read More / Read Less Button */}
                {selectedQue.ans.length > 3 && (
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="text-blue-500 underline hover:text-blue-700 transition"
                  >
                    {showMore ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>

              {/* Input Section */}
              <div className="space-y-4 w-full h-[26vh] p-4 rounded-lg">
                <h2 className="text-semibold">Your Answers</h2>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type here"
                  className="w-full p-3 rounded-lg"
                  rows="6"
                />
                <button
                  onClick={handlePostAnswer}
                  className="bg-custom-gradient w-[238px] h-[51px] ml-[900px] text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition"
                >
                  Post Your Answer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
