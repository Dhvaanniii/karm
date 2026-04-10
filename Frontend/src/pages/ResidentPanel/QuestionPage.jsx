import React, { useState } from 'react';

export default function QuestionPage() {
  const [answers, setAnswers] = useState([
    "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
    "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
    "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
  ]);

  const [userAnswer, setUserAnswer] = useState('');

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handlePostAnswer = () => {
    if (userAnswer.trim()) {
      setAnswers([...answers, userAnswer]);
      setUserAnswer(''); // Clear the input after submission
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Question Section */}
        <div className="space-y-2">
          <h1 className="text-lg font-semibold text-gray-800">What is the capital of France?</h1>
          <p className="text-gray-600">
            Feel free to let me know if you need more examples or if there's anything specific you'd like to include in
            your dummy content!
          </p>
        </div>

        {/* Answers Section */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-2">Answers</h2>
          <ul className="space-y-4">
            {answers.map((answer, index) => (
              <li
                key={index}
                className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-gray-700"
              >
                {index + 1}. {answer}
              </li>
            ))}
          </ul>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <textarea
            value={userAnswer}
            onChange={handleInputChange}
            placeholder="Type your answer here"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <button
            onClick={handlePostAnswer}
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Post Your Answer
          </button>
        </div>
      </div>
    </div>
  );
}
