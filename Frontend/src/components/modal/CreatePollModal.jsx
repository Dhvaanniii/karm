import  { useState } from "react";
import handPollImage from "../../assets/images/handpoll.svg";
import multichoicepollsimage from "../../assets/images/multichoicepolls.svg";
import numericpolls from "../../assets/images/numericpolls.svg";
import rankingPollsImage from "../../assets/images/rankingpolls.svg";
import ratingPollsImage from "../../assets/images/ratingpolls.svg";
import textPollImage from "../../assets/images/textpoll.svg";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Loader } from "../../utils/Loader";

const pollImages = {
  "Multichoice polls": multichoicepollsimage,
  "Numeric Polls": numericpolls,
  "Ranking polls": rankingPollsImage,
  "Rating Polls": ratingPollsImage,
  "Text poll": textPollImage,
};

export default function CreatePollModal({ closeModal, handleCreate , isLoading}) {
  const [pollType, setPollType] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCreatePoll = () => {
    const newErrors = {};
    if (!pollType) newErrors.pollType = "Poll type is required";
    if (!question) newErrors.question = "Question is required";
    if (!option1) newErrors.option1 = "Option 1 is required";
    if (!option2) newErrors.option2 = "Option 2 is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      pollType,
      question,
      options: [option1, option2],
    };
    
    handleCreate(data);
    closeModal();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePollTypeSelection = (type) => {
    setPollType(type);
    setIsDropdownOpen(false);
  };

  const isFormValid = pollType && question && option1 && option2;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded-lg w-[410px] relative">
        <h2 className="text-xl font-semibold mb-4">Create Poll</h2>

        <div className="mb-4">
          <label className="block mb-2 text-[14px] leading-[21px] font-medium">
            Poll Type
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={toggleDropdown}
              className={`w-full p-2 rounded-[10px] text-left flex justify-between items-center 
                ${pollType ? "border-black" : "border-gray-300"} border`}
            >
              <span className={pollType ? "text-black" : "text-[#A7A7A7]"}>
                <div className="text-[14px] leading-[21px] font-normal flex">
                  <img
                    src={pollType ? pollImages[pollType] : handPollImage}
                    alt="handPollImage"
                    className={
                      pollType ? "w-4 h-4 mr-2 filter-grayscale" : "filter-none"
                    }
                  />
                  {pollType || "Select Polls"}
                </div>
              </span>
              {isDropdownOpen ? (
                <FaChevronUp className="text-black" />
              ) : (
                <FaChevronDown className="text-black" />
              )}
            </button>
            {isDropdownOpen && (
              <ul
                className="absolute w-full bg-white rounded-md shadow-[0px_0px_40px_0px_rgba(0,0,0,0.08)] max-h-[200px] overflow-y-auto 
                scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-4"
              >
                {Object.keys(pollImages).map((type, index) => (
                  <li
                    key={index}
                    onClick={() => handlePollTypeSelection(type)}
                    className={`flex items-center gap-2 cursor-pointer text-[14px] leading-[21px] 
                      ${
                        pollType === type
                          ? "text-black font-semibold"
                          : "text-[#A7A7A7]"
                      }
                      hover:text-black`}
                  >
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="pollType"
                        value={type}
                        checked={pollType === type}
                        className="hidden"
                      />
                      <span
                        className={`flex items-center gap-2 py-1.5 rounded-[10px] w-full text-[14px] 
                          ${
                            pollType === type
                              ? "border-[#FF6B07] bg-white font-medium"
                              : "border-gray-300"
                          }
                          hover:border-orange-500 transition-all duration-200`}
                      >
                        <div
                          className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center
                            ${
                              pollType === type
                                ? "border-orange-500"
                                : "border-gray-300"
                            }`}
                        >
                          {pollType === type && (
                            <div className="w-[12px] h-[12px] bg-[#FF6B07] rounded-full"></div>
                          )}
                        </div>
                        <img
                          src={pollImages[type]}
                          alt={type}
                          className={`w-6 h-6 ml-2 
                            ${
                              pollType === type
                                ? "filter-grayscale"
                                : "filter-none"
                            } 
                            ${
                              pollType === type ? "opacity-100" : "opacity-50"
                            }`}
                        />
                        <span className="capitalize">{type}</span>
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errors.pollType && (
            <p className="text-red-500 text-[14px]">{errors.pollType}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-[14px] leading-[21px] font-medium">
            Question
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded-[10px] text-[14px]"
            placeholder="Ask a question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {errors.question && (
            <p className="text-red-500 text-[14px]">{errors.question}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-[14px] leading-[21px] font-medium">
            Option 1
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded-[10px] text-[14px]"
            placeholder="Add"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          />
          {errors.option1 && (
            <p className="text-red-500 text-[14px]">{errors.option1}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-[14px] leading-[21px] font-medium">
            Option 2
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded-[10px] text-[14px]"
            placeholder="Add"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
          />
          {errors.option2 && (
            <p className="text-red-500 text-[14px]">{errors.option2}</p>
          )}
        </div>

        <div className="flex justify-between mt-[32px]">
          <button
            onClick={closeModal}
            className="bg-white border border-[#D3D3D3] px-4 rounded-[10px] mr-2 w-full py-[13.5px] font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePoll}
            className={`w-full py-[13.5px] font-semibold px-4 rounded-[10px] 
              ${
                isFormValid
                  ? "bg-custom-gradient text-white"
                  : "bg-[#F6F8FB] text-black"
              }`}
          >
           {isLoading ? <Loader /> : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
