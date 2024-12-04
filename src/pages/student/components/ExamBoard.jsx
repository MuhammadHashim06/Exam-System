// import  { useEffect, useState } from "react";

// export default function ExamBoard() {
//   const [currentExam, setCurrentExam] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const ExamQuestions = [
//     {
//       examid: "EXAM001",
//       endtime: "2024-10-15T10:00:00Z",
//       examquestionID: "QID001",
//       questionslist: [
//         { question: "What is the integral of x^2?", referenceAnswer: "1/3 * x^3 + C" },
//         { question: "What is the derivative of sin(x)?", referenceAnswer: "cos(x)" },
//         { question: "Solve the equation: 2x + 3 = 7.", referenceAnswer: "x = 2" },
//       ],
//     },
//     // Other exam objects...
//     {
//       examid: "EXAM005",
//       endtime: "2024-10-14T01:00:00Z",
//       examquestionID: "QID005",
//       questionslist: [
//         { question: "What is the purpose of an operating system?", referenceAnswer: "An operating system manages computer hardware and software resources and provides common services for computer programs." },
//         { question: "What is the time complexity of binary search?", referenceAnswer: "O(log n)" },
//         { question: "Define polymorphism in programming.", referenceAnswer: "Polymorphism allows methods to do different things based on the object it is acting upon." },
//       ],
//     },
//   ];

//   useEffect(() => {
//     const examDetail = ExamQuestions.find(e => e.examid === "EXAM005");
//     setCurrentExam(examDetail);

//     if (examDetail) {
//       const endTime = new Date(examDetail.endtime).getTime();
//       const now = new Date().getTime();
//       const remainingTime = endTime - now;
//       setTimeLeft(Math.max(0, remainingTime));

//       const timerId = setInterval(() => {
//         setTimeLeft(prev => {
//           if (prev <= 1000) {
//             clearInterval(timerId);
//             handleSubmit();
//             return 0;
//           }
//           return prev - 1000;
//         });
//       }, 1000);

//       return () => clearInterval(timerId);
//     }
//   }, []);

//   const handleChange = (index, value) => {
//     const newAnswers = [...answers];
//     newAnswers[index] = value;
//     setAnswers(newAnswers);
//   };

//   const handleSubmit = () => {
//     setIsSubmitted(true);
//     // Handle submission logic here (e.g., save answers)
//     alert("Exam submitted!");
//   };

//   const formatTimeLeft = () => {
//     const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
//     const seconds = Math.floor((timeLeft / 1000) % 60);
//     return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//   };

//   return (
//     <div className="bg-gray-100 h-screen p-4">
//       {currentExam && !isSubmitted ? (
//         <>
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-5xl">{`Exam: ${currentExam.examid}`}</h1>
//             <p className="bg-white text-blue-500 shadow-md rounded-md px-4 py-2">
//               <i className="fas fa-hourglass-half"></i> Time Left: {formatTimeLeft()}
//             </p>
//           </div>

//           <div className="bg-white rounded-md p-4">
//             {currentExam.questionslist.map((question, index) => (
//               <div key={index} className="mb-4">
//                 <p className="font-semibold">{`Question ${index + 1}: ${question.question}`}</p>
//                 <textarea
//                   rows="3"
//                   value={answers[index] || ""}
//                   onChange={(e) => handleChange(index, e.target.value)}
//                   className="mt-1 block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
//                   placeholder="Type your answer here..."
//                 />
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={handleSubmit}
//             className="mt-4 text-white bg-blue-500 hover:bg-blue-300 w-max px-4 py-2 rounded-md"
//           >
//             Submit Exam
//           </button>
//         </>
//       ) : (
//         <p>{isSubmitted ? "Exam submitted!" : "Loading exam details..."}</p>
//       )}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// export default function ExamBoard() {
//   const [currentExam, setCurrentExam] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const {examid} = useParams(); // Replace with dynamic exam ID if needed

//   useEffect(() => {
//     // Fetch exam data from the API
//     const fetchExamDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`http://localhost:5000/exam/${examid}`);
//         const examDetail = response.data;

//         // Set the exam details
//         setCurrentExam(examDetail);

//         // Calculate time left
//         const startDateTime = new Date(`${examDetail.examDate}T${examDetail.startTime}`);
//         const endDateTime = new Date(`${examDetail.examDate}T${examDetail.endTime}`);
//         const now = new Date();
//         const remainingTime = endDateTime - now;

//         // If the exam has already ended
//         if (now > endDateTime) {
//           setTimeLeft(0);
//           setError("The exam has already ended.");
//         } else {
//           setTimeLeft(Math.max(0, remainingTime));

//           const timerId = setInterval(() => {
//             setTimeLeft((prev) => {
//               if (prev <= 1000) {
//                 clearInterval(timerId);
//                 handleSubmit();
//                 return 0;
//               }
//               return prev - 1000;
//             });
//           }, 1000);

//           return () => clearInterval(timerId);
//         }
//       } catch (err) {
//         setError("Failed to load exam details. Please try again later.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExamDetails();
//   }, []);

//   const handleChange = (index, value) => {
//     const newAnswers = [...answers];
//     newAnswers[index] = value;
//     setAnswers(newAnswers);
//   };

//   const handleSubmit = () => {
//     setIsSubmitted(true);
//     // Post answers to the API
//     const submissionData = currentExam.evaluationData.map((q, index) => ({
//       questionId: q._id,
//       answer: answers[index] || "",
//     }));

//     axios
//       .post(`https://api.example.com/exams/${examid}/submit`, { submissionData })
//       .then(() => alert("Exam submitted!"))
//       .catch((err) => {
//         console.error("Failed to submit exam:", err);
//         alert("Failed to submit exam. Please try again.");
//       });
//   };

//   const formatTimeLeft = () => {
//     const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
//     const seconds = Math.floor((timeLeft / 1000) % 60);
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   if (loading) {
//     return <p>Loading exam details...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   return (
//     <div className="bg-gray-100 h-screen p-4">
//       {currentExam && !isSubmitted ? (
//         <>
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-5xl">{`Exam: ${currentExam.name}`}</h1>
//             <p className="bg-white text-blue-500 shadow-md rounded-md px-4 py-2">
//               <i className="fas fa-hourglass-half"></i> Time Left: {formatTimeLeft()}
//             </p>
//           </div>

//           <div className="bg-white rounded-md p-4">
//             {currentExam.evaluationData.map((question, index) => (
//               <div key={question._id} className="mb-4">
//                 <p className="font-semibold">{`Question ${index + 1}: ${question.question}`}</p>
//                 <textarea
//                   rows="3"
//                   value={answers[index] || ""}
//                   onChange={(e) => handleChange(index, e.target.value)}
//                   className="mt-1 block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
//                   placeholder="Type your answer here..."
//                 />
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={handleSubmit}
//             className="mt-4 text-white bg-blue-500 hover:bg-blue-300 w-max px-4 py-2 rounded-md"
//           >
//             Submit Exam
//           </button>
//         </>
//       ) : (
//         <p>{isSubmitted ? "Exam submitted!" : "Loading exam details..."}</p>
//       )}
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// export default function ExamBoard() {
//   const [currentExam, setCurrentExam] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Simulated student ID (in a real app, this would come from authentication)
//   const STUDENT_ID = "9012";

//   const { examid } = useParams();

//   // Format time to always show two digits
//   const padTime = (time) => time.toString().padStart(2, '0');

//   // Format time left
//   const formatTimeLeft = () => {
//     const hours = Math.floor(timeLeft / (1000 * 60 * 60));
//     const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
//     const seconds = Math.floor((timeLeft / 1000) % 60);
//     return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
//   };

//   // Fetch exam details
//   useEffect(() => {
//     const fetchExamDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`http://localhost:5000/exam/${examid}`);
//         const examDetail = response.data;
//         setCurrentExam(examDetail);

//         // Initialize answers array with empty strings matching exam questions
//         setAnswers(
//           examDetail.evaluationData.map(() => "")
//         );

//         const startDateTime = new Date(`${examDetail.examDate.split('T')[0]}T${examDetail.startTime}`);
//         const endDateTime = new Date(`${examDetail.examDate.split('T')[0]}T${examDetail.endTime}`);
//         const now = new Date();

//         // Check exam status
//         if (now < startDateTime) {
//           setError("The exam has not started yet.");
//           setTimeLeft(0);
//           return;
//         }

//         if (now > endDateTime) {
//           setTimeLeft(0);
//           setError("The exam has already ended.");
//           return;
//         }

//         // Calculate remaining time
//         const remainingTime = endDateTime - now;
//         setTimeLeft(Math.max(0, remainingTime));

//         // Set up timer
//         const timerId = setInterval(() => {
//           setTimeLeft((prevTime) => {
//             if (prevTime <= 1000) {
//               clearInterval(timerId);
//               handleSubmit();
//               return 0;
//             }
//             return prevTime - 1000;
//           });
//         }, 1000);

//         // Cleanup timer on component unmount
//         return () => clearInterval(timerId);
//       } catch (err) {
//         setError("Failed to load exam details. Please try again later.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExamDetails();
//   }, [examid]);

//   // Handle answer changes
//   const handleChange = (index, value) => {
//     const MAX_ANSWER_LENGTH = 1000;
//     const newAnswers = [...answers];
//     newAnswers[index] = value.slice(0, MAX_ANSWER_LENGTH);
//     setAnswers(newAnswers);
//   };

//   // Submit exam
//   const handleSubmit = () => {
//     if (isSubmitted) return;

//     setIsSubmitted(true);

//     // Prepare submission data according to the specified schema
//     const submissionData = {
//       examID: currentExam._id,
//       studentID: STUDENT_ID,
//       submissionTime: new Date().toISOString(),
//       answersList: currentExam.evaluationData.map((question, index) => ({
//         question: question.question,
//         answer: answers[index] || "",
//         marks: question.marks
//       }))
//     };

//     axios
//       .post(`https://api.example.com/exams/submit`, submissionData)
//       .then((response) => {
//         // Successful submission handling
//         alert("Exam submitted successfully!");
//       })
//       .catch((err) => {
//         // Error handling
//         setIsSubmitted(false);
//         console.error("Failed to submit exam:", err);
//         alert(err.response?.data?.message || "Failed to submit exam. Please try again.");
//       });
//   };

//   // Render loading state
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-xl">Loading exam details...</p>
//       </div>
//     );
//   }

//   // Render error state
//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-red-500 text-xl">{error}</p>
//       </div>
//     );
//   }

//   // Render exam content
//   return (
//     <div className="bg-gray-100 min-h-screen p-4">
//       {currentExam && !isSubmitted ? (
//         <div className="max-w-4xl mx-auto">
//           {/* Exam Header */}
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h1 className="text-3xl font-bold">{`Exam: ${currentExam.name}`}</h1>
//               <p className="text-gray-600">Total Marks: {currentExam.totalMarks}</p>
//             </div>
//             <div className="bg-white text-blue-600 shadow-md rounded-md px-4 py-2 flex items-center">
//               <i className="fas fa-hourglass-half mr-2"></i>
//               <span className="font-semibold">Time Left: {formatTimeLeft()}</span>
//             </div>
//           </div>

//           {/* Questions Container */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             {currentExam.evaluationData.map((question, index) => (
//               <div key={question._id} className="mb-6">
//                 <label 
//                   htmlFor={`question-${index}`} 
//                   className="block text-gray-700 font-medium mb-2"
//                 >
//                   {`Question ${index + 1}: ${question.question} (${question.marks} marks)`}
//                 </label>
//                 <textarea
//                   id={`question-${index}`}
//                   rows="4"
//                   value={answers[index] || ""}
//                   onChange={(e) => handleChange(index, e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md 
//                              focus:outline-none focus:ring-2 focus:ring-blue-500 
//                              transition duration-300"
//                   placeholder="Type your answer here..."
//                 />
//                 <p className="text-right text-sm text-gray-500">
//                   {`${(answers[index] || "").length}/1000`}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Submit Button */}
//           <div className="mt-6 text-center">
//             <button
//               onClick={handleSubmit}
//               className="bg-blue-600 text-white px-6 py-3 rounded-md 
//                          hover:bg-blue-700 transition duration-300 
//                          focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Submit Exam
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="flex justify-center items-center h-screen">
//           <p className="text-xl">{isSubmitted ? "Exam submitted successfully!" : "Loading exam details..."}</p>
//         </div>
//       )}
//     </div>
//   );
// }





import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ExamBoard() {
  const [currentExam, setCurrentExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
let userdata = JSON.parse(sessionStorage.getItem('userdata'))
  const STUDENT_ID = userdata.id; 
  const { examid } = useParams();

  // Format time to show two digits
  const padTime = (time) => time.toString().padStart(2, "0");

  // Format time left as hh:mm:ss
  const formatTimeLeft = () => {
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
  };

  // Fetch exam details
  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/exam/${examid}`);
        const examDetail = response.data;
        setCurrentExam(examDetail);

        // Initialize answers array with empty strings
        setAnswers(examDetail.evaluationData.map(() => ""));

        // Combine date and time
        const examDate = new Date(examDetail.examDate).toISOString().split("T")[0];
        const startDateTime = new Date(`${examDate}T${examDetail.startTime}:00`);
        const endDateTime = new Date(`${examDate}T${examDetail.endTime}:00`);
        const now = new Date();

        if (now < startDateTime) {
          setError("The exam has not started yet.");
          setTimeLeft(0);
          return;
        }

        if (now > endDateTime) {
          setError("The exam has already ended.");
          setTimeLeft(0);
          return;
        }

        // Calculate and set remaining time
        setTimeLeft(Math.max(0, endDateTime - now));

        // Timer to update remaining time
        const timerId = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1000) {
              clearInterval(timerId);
              handleSubmit(); // Auto-submit on time expiration
              return 0;
            }
            return prevTime - 1000;
          });
        }, 1000);

        // Cleanup on unmount
        return () => clearInterval(timerId);
      } catch (err) {
        setError("Failed to load exam details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, []);

  // Handle answer changes
  const handleChange = (index, value) => {
    const MAX_ANSWER_LENGTH = 1000;
    const newAnswers = [...answers];
    newAnswers[index] = value.slice(0, MAX_ANSWER_LENGTH);
    setAnswers(newAnswers);
  };

  // Submit exam
  const handleSubmit = async () => {
    if (isSubmitted) return;
  
    setIsSubmitted(true);
  
    const submissionData = {
      examID: currentExam._id,
      studentID: STUDENT_ID,
      submissionTime: new Date().toISOString(),
      answers: currentExam.evaluationData.map((question, index) => ({
        question: question.question,
        answer: answers[index] || "",
        marks: question.marks,
      })),
    };
  
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/evaluate`, submissionData);
      console.log("Response from FastAPI:", response.data);
      alert("Exam evaluated and results stored successfully!");
    
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit or store the exam.");
      setIsSubmitted(false);
    }
  };
  

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading exam details...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  // Render exam content
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {currentExam && !isSubmitted ? (
        <div className="max-w-4xl mx-auto">
          {/* Exam Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">{`Exam: ${currentExam.name}`}</h1>
              <p className="text-gray-600">Total Marks: {currentExam.totalMarks}</p>
            </div>
            <div className="bg-white text-blue-600 shadow-md rounded-md px-4 py-2 flex items-center">
              <i className="fas fa-hourglass-half mr-2"></i>
              <span className="font-semibold">Time Left: {formatTimeLeft()}</span>
            </div>
          </div>

          {/* Questions Container */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {currentExam.evaluationData.map((question, index) => (
              <div key={question._id} className="mb-6">
                <label
                  htmlFor={`question-${index}`}
                  className="block text-gray-700 font-medium mb-2"
                >
                  {`Question ${index + 1}: ${question.question} (${question.marks} marks)`}
                </label>
                <textarea
                  id={`question-${index}`}
                  rows="4"
                  value={answers[index] || ""}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 
                             transition duration-300"
                  placeholder="Type your answer here..."
                />
                <p className="text-right text-sm text-gray-500">
                  {`${(answers[index] || "").length}/1000`}
                </p>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-3 rounded-md 
                         hover:bg-blue-700 transition duration-300 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Exam
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl">{isSubmitted ? "Exam submitted successfully!" : "Loading exam details..."}</p>
        </div>
      )}
    </div>
  );
}
