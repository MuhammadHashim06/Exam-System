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
//   let userdata = JSON.parse(sessionStorage.getItem('userdata'))
//   const STUDENT_ID = userdata.id;
//   const { examid } = useParams();

//   // Format time to show two digits
//   const padTime = (time) => time.toString().padStart(2, "0");

//   // Format time left as hh:mm:ss
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
//         console.log(examDetail);

//         // Initialize answers array with empty strings
//         setAnswers(examDetail.evaluationData.map(() => ""));

//         // Combine date and time
//         const examDate = new Date(examDetail.examDate).toISOString().split("T")[0];
//         const startDateTime = new Date(`${examDate}T${examDetail.startTime}:00`);
//         const endDateTime = new Date(`${examDate}T${examDetail.endTime}:00`);
//         const now = new Date();

//         if (now < startDateTime) {
//           setError("The exam has not started yet.");
//           setTimeLeft(0);
//           return;
//         }

//         if (now > endDateTime) {
//           setError("The exam has already ended.");
//           setTimeLeft(0);
//           return;
//         }

//         // Calculate and set remaining time
//         setTimeLeft(Math.max(0, endDateTime - now));

//         // Timer to update remaining time
//         const timerId = setInterval(() => {
//           setTimeLeft((prevTime) => {
//             if (prevTime <= 1000) {
//               clearInterval(timerId);
//               handleSubmit(); // Auto-submit on time expiration
//               return 0;
//             }
//             return prevTime - 1000;
//           });
//         }, 1000);

//         // Cleanup on unmount
//         return () => clearInterval(timerId);
//       } catch (err) {
//         setError("Failed to load exam details. Please try again later.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchExamDetails();
//   }, []);

//   // Handle answer changes
//   const handleChange = (index, value) => {
//     const MAX_ANSWER_LENGTH = 1000;
//     const newAnswers = [...answers];
//     newAnswers[index] = value.slice(0, MAX_ANSWER_LENGTH);
//     setAnswers(newAnswers);
//   };

//   // Submit exam
//   const handleSubmit = async () => {
//     if (isSubmitted) return;

//     setIsSubmitted(true);
//     const userData = JSON.parse(sessionStorage.getItem('userdata'))
//     const submissionData = {
//       examID: currentExam._id,
//       studentID: STUDENT_ID,
//       studentName: userData.name,
//       submissionTime: new Date().toISOString(),
//       answers: currentExam.evaluationData.map((question, index) => ({
//         question: question.question,
//         answer: answers[index] || "",
//         marks: question.marks,
//       })),
//     };
//     console.log("Submitted Data:", submissionData)

//     try {
//       const response = await axios.post(`http://localhost:5000/answers/answers`, submissionData);
//       console.log("Response from FastAPI:", response);
//       // console.log("Submitted Data:",submissionData)
//       alert("Exam evaluated and results stored successfully!");

//     } catch (err) {
//       console.error("Submission error:", err);
//       alert("Failed to submit or store the exam.");
//       setIsSubmitted(false);
//     }
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
//           <p className="text-xl">{isSubmitted ? "Exam is being submitted. Don't Close or Switch to other tab" : "Loading exam details..."}</p>
//         </div>
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
//   let userdata = JSON.parse(sessionStorage.getItem('userdata'));
//   const STUDENT_ID = userdata.id;
//   const { examid } = useParams();

//   // Restrict Right-Click, Copy, Paste, and DevTools
//   useEffect(() => {
//     const blockShortcuts = (e) => {
//       if (e.ctrlKey && (e.key === "c" || e.key === "v" || e.key === "u" || e.key === "i")) {
//         e.preventDefault();
//       }
//       if (e.keyCode === 123) { // F12 for DevTools
//         e.preventDefault();
//       }
//       if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) {
//         e.preventDefault();
//       }
//     };

//     document.addEventListener("contextmenu", (e) => e.preventDefault());
//     document.addEventListener("keydown", blockShortcuts);

//     return () => {
//       document.removeEventListener("contextmenu", (e) => e.preventDefault());
//       document.removeEventListener("keydown", blockShortcuts);
//     };
//   }, []);

//   // Detect Tab Switching
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         alert("Tab switching detected! Your exam may be auto-submitted.");
//       }
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, []);

//   // Enforce Full-Screen Mode
//   useEffect(() => {
//     const enterFullScreen = () => {
//       if (!document.fullscreenElement) {
//         document.documentElement.requestFullscreen();
//       }
//     };

//     const exitHandler = () => {
//       if (!document.fullscreenElement) {
//         alert("You have exited full-screen mode! Please return to full-screen to continue the exam.");
//         enterFullScreen();
//       }
//     };
    
//     enterFullScreen();
//     document.addEventListener("fullscreenchange", exitHandler);
//     return () => document.removeEventListener("fullscreenchange", exitHandler);
//   }, []);

//   // Fetch Exam Details
//   useEffect(() => {
//     const fetchExamDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`http://localhost:5000/exam/${examid}`);
//         const examDetail = response.data;
//         setCurrentExam(examDetail);

//         setAnswers(examDetail.evaluationData.map(() => ""));

//         const examDate = new Date(examDetail.examDate).toISOString().split("T")[0];
//         const startDateTime = new Date(`${examDate}T${examDetail.startTime}:00`);
//         const endDateTime = new Date(`${examDate}T${examDetail.endTime}:00`);
//         const now = new Date();

//         if (now < startDateTime) {
//           setError("The exam has not started yet.");
//           setTimeLeft(0);
//           return;
//         }
//         if (now > endDateTime) {
//           setError("The exam has already ended.");
//           setTimeLeft(0);
//           return;
//         }

//         setTimeLeft(Math.max(0, endDateTime - now));
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

//         return () => clearInterval(timerId);
//       } catch (err) {
//         setError("Failed to load exam details. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchExamDetails();
//   }, []);

//   const handleSubmit = async () => {
//     if (isSubmitted) return;
//     setIsSubmitted(true);
//     const userData = JSON.parse(sessionStorage.getItem('userdata'));
//     const submissionData = {
//       examID: currentExam._id,
//       studentID: STUDENT_ID,
//       studentName: userData.name,
//       submissionTime: new Date().toISOString(),
//       answers: currentExam.evaluationData.map((question, index) => ({
//         question: question.question,
//         answer: answers[index] || "",
//         marks: question.marks,
//       })),
//     };
//     try {
//       await axios.post(`http://localhost:5000/answers/answers`, submissionData);
//       alert("Exam evaluated and results stored successfully!");
//     } catch (err) {
//       alert("Failed to submit or store the exam.");
//       setIsSubmitted(false);
//     }
//   };

//   if (loading) return <p>Loading exam details...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div>
//       <h1>{currentExam.name}</h1>
//       {currentExam.evaluationData.map((question, index) => (
//         <div key={question._id}>
//           <p>{question.question}</p>
//           <textarea value={answers[index] || ""} onChange={(e) => {
//             const newAnswers = [...answers];
//             newAnswers[index] = e.target.value.slice(0, 1000);
//             setAnswers(newAnswers);
//           }}/>
//         </div>
//       ))}
//       <button onClick={handleSubmit}>Submit Exam</button>
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
  let userdata = JSON.parse(sessionStorage.getItem('userdata'));
  const STUDENT_ID = userdata.id;
  const { examid } = useParams();

  const padTime = (time) => time.toString().padStart(2, "0");
  const formatTimeLeft = () => {
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
  };
  const enableFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen().catch(err => console.error("request Fullscreen failed:", err));
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen().catch(err => console.error("mozRequest Fullscreen failed:", err));
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen().catch(err => console.error("webkitRequest Fullscreen failed:", err));
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen().catch(err => console.error("msRequest Fullscreen failed:", err));
    }
  };
  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/exam/${examid}`);
        const examDetail = response.data;
        

        setCurrentExam(examDetail);
        setAnswers(examDetail.evaluationData.map(() => ""));

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

        setTimeLeft(Math.max(0, endDateTime - now));
        const timerId = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1000) {
              clearInterval(timerId);
              handleSubmit();
              return 0;
            }
            return prevTime - 1000;
          });
        }, 1000);
        return () => clearInterval(timerId);
      } catch (err) {
        setError("Failed to load exam details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExamDetails();
    enableFullScreen();
  }, []);

  const handleChange = (index, value) => {
    const MAX_ANSWER_LENGTH = 1000;
    const newAnswers = [...answers];
    newAnswers[index] = value.slice(0, MAX_ANSWER_LENGTH);
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    const userData = JSON.parse(sessionStorage.getItem('userdata'));
    const submissionData = {
      examID: currentExam._id,
      studentID: STUDENT_ID,
      studentName: userData.name,
      submissionTime: new Date().toISOString(),
      answers: currentExam.evaluationData.map((question, index) => ({
        question: question.question,
        answer: answers[index] || "",
        marks: question.marks,
      })),
    };
    try {
      await axios.post(`http://localhost:5000/answers/answers`, submissionData);
      alert("Exam evaluated and results stored successfully!");
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit or store the exam.");
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
   
    const preventCheating = (e) => {
      if (e.type === "contextmenu") {
        e.preventDefault();
      }
      if (e.ctrlKey && ["u", "s", "h", "j", "c", "x", "v"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
      if (document.hidden) {
        alert("Tab switching is not allowed during the exam!");
      }
    };

    const blockDevTools = (e) => {
      if (e.keyCode === 123) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", preventCheating);
    document.addEventListener("keydown", preventCheating);
    document.addEventListener("keydown", blockDevTools);
    document.addEventListener("visibilitychange", preventCheating);
    document.addEventListener("enterfullscreen", enableFullScreen);

    return () => {
      document.removeEventListener("contextmenu", preventCheating);
      document.removeEventListener("keydown", preventCheating);
      document.removeEventListener("keydown", blockDevTools);
      document.removeEventListener("visibilitychange", preventCheating);
      document.removeEventListener("enterfullscreen", enableFullScreen);

    };
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading exam details...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-red-500 text-xl">{error}</p></div>;

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {currentExam && !isSubmitted ? (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">{`Exam: ${currentExam.name}`}</h1>
              <p className="text-gray-600">Total Marks: {currentExam.totalMarks}</p>
            </div>
            <div className="bg-white text-blue-600 shadow-md rounded-md px-4 py-2 flex items-center">
              <span className="font-semibold">Time Left: {formatTimeLeft()}</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            {currentExam.evaluationData.map((question, index) => (
              <div key={question._id} className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">{`Question ${index + 1}: ${question.question} (${question.marks} marks)`}</label>
                <textarea id={`question-${index}`} rows="4" value={answers[index] || ""} onChange={(e) => handleChange(index, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Type your answer here..." />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">Submit Exam</button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen"><p className="text-xl">{isSubmitted ? "Exam is being submitted. Don't close or switch tabs." : "Loading exam details..."}</p></div>
      )}
    </div>
  );
}


























// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// export default function ExamBoard() {
//   const [currentExam, setCurrentExam] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [examStarted, setExamStarted] = useState(false); // ✅ Exam state

//   let userdata = JSON.parse(sessionStorage.getItem("userdata"));
//   const STUDENT_ID = userdata.id;
//   const { examid } = useParams();
//   const navigate = useNavigate();

//   // ✅ Enable fullscreen when called (must be inside user action)
//   const enableFullScreen = () => {
//     const element = document.documentElement;
//     if (element.requestFullscreen) {
//       element.requestFullscreen();
//     } else if (element.mozRequestFullScreen) {
//       element.mozRequestFullScreen();
//     } else if (element.webkitRequestFullscreen) {
//       element.webkitRequestFullscreen();
//     } else if (element.msRequestFullscreen) {
//       element.msRequestFullscreen();
//     }
//   };

//   // ✅ "Start Exam" button click event
//   const startExam = () => {
//     enableFullScreen(); // 🔥 Triggers fullscreen mode
//     setExamStarted(true); // ✅ Shows the exam content
//   };

//   useEffect(() => {
//     const fetchExamDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`http://localhost:5000/exam/${examid}`);
//         setCurrentExam(response.data);
//         setAnswers(response.data.evaluationData.map(() => ""));
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load exam details. Please try again later.");
//         console.error(err);
//         setLoading(false);
//       }
//     };
//     fetchExamDetails();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-xl">Loading exam details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-red-500 text-xl">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 min-h-screen p-4">
//       {!examStarted ? (
//         // ✅ Show "Start Exam" button
//         <div className="flex justify-center items-center h-screen">
//           <button
//             onClick={startExam} // ✅ Clicking this enables fullscreen & starts exam
//             className="bg-blue-600 text-white px-6 py-3 rounded-md text-xl"
//           >
//             Start Exam
//           </button>
//         </div>
//       ) : (
//         // ✅ Show exam content after fullscreen is enabled
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-3xl font-bold mb-4">{`Exam: ${currentExam.name}`}</h1>
//           <div className="bg-white rounded-lg shadow-md p-6">
//             {currentExam.evaluationData.map((question, index) => (
//               <div key={question._id} className="mb-6">
//                 <label className="block text-gray-700 font-medium mb-2">{`Question ${index + 1}: ${question.question} (${question.marks} marks)`}</label>
//                 <textarea
//                   rows="4"
//                   value={answers[index] || ""}
//                   onChange={(e) =>
//                     setAnswers((prev) => {
//                       const newAnswers = [...prev];
//                       newAnswers[index] = e.target.value;
//                       return newAnswers;
//                     })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//                   placeholder="Type your answer here..."
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
