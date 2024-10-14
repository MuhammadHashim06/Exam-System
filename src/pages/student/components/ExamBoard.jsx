import React, { useEffect, useState } from "react";

export default function ExamBoard() {
  const [currentExam, setCurrentExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ExamQuestions = [
    {
      examid: "EXAM001",
      endtime: "2024-10-15T10:00:00Z",
      examquestionID: "QID001",
      questionslist: [
        { question: "What is the integral of x^2?", referenceAnswer: "1/3 * x^3 + C" },
        { question: "What is the derivative of sin(x)?", referenceAnswer: "cos(x)" },
        { question: "Solve the equation: 2x + 3 = 7.", referenceAnswer: "x = 2" },
      ],
    },
    // Other exam objects...
    {
      examid: "EXAM005",
      endtime: "2024-10-14T01:00:00Z",
      examquestionID: "QID005",
      questionslist: [
        { question: "What is the purpose of an operating system?", referenceAnswer: "An operating system manages computer hardware and software resources and provides common services for computer programs." },
        { question: "What is the time complexity of binary search?", referenceAnswer: "O(log n)" },
        { question: "Define polymorphism in programming.", referenceAnswer: "Polymorphism allows methods to do different things based on the object it is acting upon." },
      ],
    },
  ];

  useEffect(() => {
    const examDetail = ExamQuestions.find(e => e.examid === "EXAM005");
    setCurrentExam(examDetail);

    if (examDetail) {
      const endTime = new Date(examDetail.endtime).getTime();
      const now = new Date().getTime();
      const remainingTime = endTime - now;
      setTimeLeft(Math.max(0, remainingTime));

      const timerId = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1000) {
            clearInterval(timerId);
            handleSubmit();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, []);

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Handle submission logic here (e.g., save answers)
    alert("Exam submitted!");
  };

  const formatTimeLeft = () => {
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="bg-gray-100 h-screen p-4">
      {currentExam && !isSubmitted ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-5xl">{`Exam: ${currentExam.examid}`}</h1>
            <p className="bg-white text-blue-500 shadow-md rounded-md px-4 py-2">
              <i className="fas fa-hourglass-half"></i> Time Left: {formatTimeLeft()}
            </p>
          </div>

          <div className="bg-white rounded-md p-4">
            {currentExam.questionslist.map((question, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold">{`Question ${index + 1}: ${question.question}`}</p>
                <textarea
                  rows="3"
                  value={answers[index] || ""}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Type your answer here..."
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 text-white bg-blue-500 hover:bg-blue-300 w-max px-4 py-2 rounded-md"
          >
            Submit Exam
          </button>
        </>
      ) : (
        <p>{isSubmitted ? "Exam submitted!" : "Loading exam details..."}</p>
      )}
    </div>
  );
}
