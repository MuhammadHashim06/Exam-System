// import { useEffect, useState } from "react";
// import React from "react";
// import { useParams } from "react-router-dom";

// export default function ExamCard() {
//   const { examcode } = useParams();
//   const [currentexam, setCurrentExam] = useState(null);
//   const [examStatus, setExamStatus] = useState(""); // State to track exam status

//   const rules = [
//     "You can't Minimize Window",
//     "You cannot Change the tab",
//     "You cannot move to other window",
//     "Anything done can be considered cheating",
//   ];

//   const exams = [
//     {
//       examcode: "EXM101",
//       starttime: "2024-10-15T09:00:00Z",
//       endtime: "2024-10-15T10:00:00Z",
//       examDate: "2024-10-15",
//       examid: "EXAM001",
//       isconducted: true,
//       examtitle: "Math Midterm",
//       creationdatetime: "2024-09-01T14:30:00Z",
//       teacherid: "TEACHER001",
//     },
//     {
//       examcode: "EXM102",
//       starttime: "2024-10-16T11:00:00Z",
//       endtime: "2024-10-16T12:00:00Z",
//       examDate: "2024-10-16",
//       examid: "EXAM002",
//       isconducted: false,
//       examtitle: "Science Final",
//       creationdatetime: "2024-09-05T10:15:00Z",
//       teacherid: "TEACHER002",
//     },
//     {
//       examcode: "EXM103",
//       starttime: "2024-10-17T13:00:00Z",
//       endtime: "2024-10-17T14:00:00Z",
//       examDate: "2024-10-17",
//       examid: "EXAM003",
//       isconducted: true,
//       examtitle: "History Quiz",
//       creationdatetime: "2024-09-10T09:00:00Z",
//       teacherid: "TEACHER003",
//     },
//     {
//       examcode: "EXM104",
//       starttime: "2024-10-18T15:00:00Z",
//       endtime: "2024-10-18T16:00:00Z",
//       examDate: "2024-10-18",
//       examid: "EXAM004",
//       isconducted: false,
//       examtitle: "Geography Test",
//       creationdatetime: "2024-09-12T11:00:00Z",
//       teacherid: "TEACHER004",
//     },
//     {
//       examcode: "EXM105",
//       starttime: "2024-10-14T00:00:00Z",
//       endtime: "2024-10-14T01:00:00Z",
//       examDate: "2024-10-14",
//       examid: "EXAM005",
//       isconducted: true,
//       examtitle: "Computer Science Assessment",
//       creationdatetime: "2024-09-13T13:45:00Z",
//       teacherid: "TEACHER005",
//     },
//   ];

//   const formatTime = (dateString) => {
//     const options = { hour: "2-digit", minute: "2-digit", hour12: true };
//     return new Date(dateString).toLocaleTimeString([], options);
//   };

//   const calculateDurationInMinutes = (start, end) => {
//     const startTime = new Date(start);
//     const endTime = new Date(end);
//     const durationInMinutes = Math.floor((endTime - startTime) / 60000); // Convert milliseconds to minutes
//     return `${durationInMinutes} min`;
//   };

//   useEffect(() => {
//     const examDetail = exams.find((e) => e.examcode === examcode);
//     setCurrentExam(examDetail);

//     // Check the exam time and update status
//     if (examDetail) {
//       const now = new Date();
//       const startTime = new Date(examDetail.starttime);
//       const endTime = new Date(examDetail.endtime);

//       if (now < startTime) {
//         setExamStatus("not_started");
//       } else if (now > endTime) {
//         setExamStatus("already_taken");
//       } else {
//         setExamStatus("in_progress");
//       }
//     }
//   }, [examcode]);

//   // Determine if the button should be enabled
//   const isExamActive = () => {
//     const now = new Date();
//     return now >= new Date(currentexam.starttime) && now <= new Date(currentexam.endtime);
//   };

//   return (
//     <div>
//       {currentexam ? (
//         <div className="flex flex-col h-screen p-4 bg-gray-100">
//           <div className="flex justify-between items-center">
//             <h1 className="text-5xl">{currentexam.examtitle}</h1>
//             <p className=" bg-white text-blue-500 shadow-md rounded-md px-3 py-1">
//               <i className="fas fa-calendar-alt"></i> Exam Date: {currentexam.examDate}
//             </p>
//           </div>
//           <div className="flex justify-center items-center h-full">
//             <div className="bg-white rounded-md shadow-md p-5 w-1/2 flex flex-col gap-10">
//               <div className="flex gap-4 justify-between items-center">
//                 <p className="bg-gray-100 text-sm shadow-md rounded-md px-3 py-1 ">
//                   <i className="fas fa-clock"></i> Start Time: {formatTime(currentexam.starttime)}
//                 </p>

//                 <p className="bg-blue-500 border text-white text-sm shadow-md rounded-md px-3 py-1">
//                   <i className="fas fa-hourglass-half"></i> Duration:{" "}
//                   {calculateDurationInMinutes(currentexam.starttime, currentexam.endtime)}
//                 </p>
//               </div>
// <div className="rules">
//   <p className="font-bold">
//     Rules for the Exam
//   </p>
// <ul className="list-disc pl-5 mb-4">
//                 {rules.map((rule, index) => (
//                   <li key={index}>{rule}</li>
//                 ))}
//               </ul>
// </div>
              
//               <div className="bottomlink flex justify-end gap-5 items-center">
//                 {examStatus === "not_started" && (
//                   <p className="text-red-500">The exam has not started yet.</p>
//                 )}
//                 {examStatus === "already_taken" && (
//                   <p className="text-red-500">The exam has already been taken.</p>
//                 )}
//                 {examStatus === "in_progress" && (
//                   <p className="text-green-500">The exam has started.</p>
//                 )}
//                 <button
//                   className="text-white bg-blue-500 hover:bg-blue-300 w-max px-4 py-2 rounded-md disabled:bg-gray-200 disabled:text-black"
//                   disabled={!isExamActive()}
//                 >
//                   Start Exam
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>Exam not found.</p>
//       )}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios"; // Import Axios

// export default function ExamCard() {
//   const { examcode } = useParams();
//   const [currentexam, setCurrentExam] = useState(null);
//   const [examStatus, setExamStatus] = useState(""); // State to track exam status
//   const [errorMessage, setErrorMessage] = useState(""); // State for error message
//   const navigate = useNavigate(); // Initialize the navigate function

//   const rules = [
//     "You can't Minimize Window",
//     "You cannot Change the tab",
//     "You cannot move to other window",
//     "Anything done can be considered cheating",
//   ];

//   // Fetch exam details from the API using Axios
//   const fetchExamDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/exambycode/${examcode}`);
//       const examDetail = response.data;
//       setCurrentExam(examDetail);

//       // Check the exam time and update status
//       const now = new Date();
//       const startTime = new Date(examDetail.starttime);
//       const endTime = new Date(examDetail.endtime);

//       if (now < startTime) {
//         setExamStatus("not_started");
//       } else if (now > endTime) {
//         setExamStatus("already_taken");
//       } else {
//         setExamStatus("in_progress");
//       }
//     } catch (error) {
//       setErrorMessage("Exam not found. Check the exam code.");
//       setTimeout(() => navigate(-1), 3000); // Redirect back to previous page after 3 seconds
//     }
//   };

//   const formatTime = (dateString) => {
//     const options = { hour: "2-digit", minute: "2-digit", hour12: true };
//     return new Date(dateString).toLocaleTimeString([], options);
//   };

//   const calculateDurationInMinutes = (start, end) => {
//     const startTime = new Date(start);
//     const endTime = new Date(end);
//     const durationInMinutes = Math.floor((endTime - startTime) / 60000); // Convert milliseconds to minutes
//     return `${durationInMinutes} min`;
//   };

//   useEffect(() => {
//     fetchExamDetails(); // Fetch exam details when the component mounts
//   }, [examcode]);

//   // Determine if the button should be enabled
//   const isExamActive = () => {
//     const now = new Date();
//     return now >= new Date(currentexam.starttime) && now <= new Date(currentexam.endtime);
//   };

//   return (
//     <div>
//       {errorMessage && (
//         <div className="text-red-500 p-4 bg-yellow-100">
//           <p>{errorMessage}</p>
//         </div>
//       )}
//       {currentexam ? (
//         <div className="flex flex-col h-screen p-4 bg-gray-100">
//           <div className="flex justify-between items-center">
//             <h1 className="text-5xl">{currentexam.examtitle}</h1>
//             <p className=" bg-white text-blue-500 shadow-md rounded-md px-3 py-1">
//               <i className="fas fa-calendar-alt"></i> Exam Date: {currentexam.examDate}
//             </p>
//           </div>
//           <div className="flex justify-center items-center h-full">
//             <div className="bg-white rounded-md shadow-md p-5 w-1/2 flex flex-col gap-10">
//               <div className="flex gap-4 justify-between items-center">
//                 <p className="bg-gray-100 text-sm shadow-md rounded-md px-3 py-1 ">
//                   <i className="fas fa-clock"></i> Start Time: {formatTime(currentexam.starttime)}
//                 </p>

//                 <p className="bg-blue-500 border text-white text-sm shadow-md rounded-md px-3 py-1">
//                   <i className="fas fa-hourglass-half"></i> Duration:{" "}
//                   {calculateDurationInMinutes(currentexam.starttime, currentexam.endtime)}
//                 </p>
//               </div>
//               <div className="rules">
//                 <p className="font-bold">Rules for the Exam</p>
//                 <ul className="list-disc pl-5 mb-4">
//                   {rules.map((rule, index) => (
//                     <li key={index}>{rule}</li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="bottomlink flex justify-end gap-5 items-center">
//                 {examStatus === "not_started" && (
//                   <p className="text-red-500">The exam has not started yet.</p>
//                 )}
//                 {examStatus === "already_taken" && (
//                   <p className="text-red-500">The exam has already been taken.</p>
//                 )}
//                 {examStatus === "in_progress" && (
//                   <p className="text-green-500">The exam has started.</p>
//                 )}
//                 <button
//                   className="text-white bg-blue-500 hover:bg-blue-300 w-max px-4 py-2 rounded-md disabled:bg-gray-200 disabled:text-black"
//                   disabled={!isExamActive()}
//                 >
//                   Start Exam
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>Loading exam details...</p>
//       )}
//     </div>
//   );
// }












// import { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// export default function ExamCard() {
//   const { examcode } = useParams();
//   const [currentExam, setCurrentExam] = useState(null);
//   const [examStatus, setExamStatus] = useState(""); 
//   const [errorMessage, setErrorMessage] = useState(""); 
//   const navigate = useNavigate();

//   const rules = [
//     "You can't minimize the window",
//     "You cannot change tabs",
//     "You cannot move to other windows",
//     "Any unauthorized action will be considered cheating",
//   ];

//   // Fetch exam details from the API
//   const fetchExamDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/exambycode/${examcode}`);
//       const examDetail = response.data;
//       console.log(examDetail);
      
      
//       // Validate exam details
//       if (!examDetail || !examDetail.startTime || !examDetail.endTime) {
//         throw new Error("Invalid exam configuration");
//       }

//       setCurrentExam(examDetail);

//       // Improved time checking logic
//       const now = new Date();
//       const startTime = new Date(examDetail.starttime);
//       const endTime = new Date(examDetail.endtime);

//       // Detailed status checking
//       if (now < startTime) {
//         setExamStatus("not_started");
//       } else if (now > endTime) {
//         setExamStatus("already_taken");
//       } else {
//         setExamStatus("in_progress");
//       }
//     } catch (error) {
//       console.error("Exam fetch error:", error);
//       setErrorMessage(error.response?.data?.message || "Exam not found. Check the exam code.");
      
//       // More robust error handling
//       setTimeout(() => {
//         navigate(-1); // Fallback navigation
//       }, 3000);
//     }
//   };

//   // Enhanced time formatting
//   const formatTime = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleString('en-US', { 
//         hour: '2-digit', 
//         minute: '2-digit', 
//         hour12: true 
//       });
//     } catch (error) {
//       console.error("Time formatting error:", error);
//       return "Invalid Time";
//     }
//   };

//   // More precise duration calculation
//   const calculateDurationInMinutes = (start, end) => {
//     try {
//       const startTime = new Date(start);
//       const endTime = new Date(end);
      
//       // Handle potential invalid dates
//       if (isNaN(startTime) || isNaN(endTime)) {
//         return "Invalid Duration";
//       }

//       const durationInMinutes = Math.floor((endTime - startTime) / 60000);
//       return durationInMinutes > 0 ? `${durationInMinutes} min` : "Invalid Duration";
//     } catch (error) {
//       console.error("Duration calculation error:", error);
//       return "Invalid Duration";
//     }
//   };

//   useEffect(() => {
//     if (examcode) {
//       fetchExamDetails();
//     }
//   }, [examcode]);

//   // More robust exam active checking
//   const isExamActive = () => {
//     if (!currentExam) return false;

//     const now = new Date();
//     const startTime = new Date(currentExam.starttime);
//     const endTime = new Date(currentExam.endtime);

//     return now >= startTime && now <= endTime;
//   };

//   // Handle exam start navigation
//   const handleStartExam = () => {
//     if (isExamActive()) {
//       navigate(`/exam-board/${examcode}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Error Message */}
//       {errorMessage && (
//         <div className="fixed top-0 left-0 w-full bg-red-100 text-red-700 p-4 text-center z-50">
//           {errorMessage}
//         </div>
//       )}

//       {/* Exam Details */}
//       {currentExam ? (
//         <div className="container mx-auto px-4 py-8">
//           <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//             {/* Exam Header */}
//             <div className="bg-blue-600 text-white p-6">
//               <div className="flex justify-between items-center">
//                 <h1 className="text-3xl font-bold">{currentExam.examtitle}</h1>
//                 <div className="flex items-center space-x-2">
//                   <i className="fas fa-calendar-alt"></i>
//                   <span>Exam Date: {currentExam.examDate}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Exam Details Body */}
//             <div className="p-6">
//               {/* Timing Information */}
//               <div className="flex justify-between mb-6">
//                 <div className="bg-gray-100 p-3 rounded-md">
//                   <i className="fas fa-clock mr-2"></i>
//                   Start Time: {formatTime(currentExam.starttime)}
//                 </div>
//                 <div className="bg-blue-100 p-3 rounded-md">
//                   <i className="fas fa-hourglass-half mr-2"></i>
//                   Duration: {calculateDurationInMinutes(currentExam.starttime, currentExam.endtime)}
//                 </div>
//               </div>

//               {/* Exam Rules */}
//               <div className="mb-6">
//                 <h2 className="text-xl font-semibold mb-4">Exam Rules</h2>
//                 <ul className="list-disc list-inside space-y-2 text-gray-700">
//                   {rules.map((rule, index) => (
//                     <li key={index} className="flex items-center">
//                       <span className="mr-2">•</span>{rule}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Exam Status and Start Button */}
//               <div className="flex justify-between items-center">
//                 {/* Status Indicators */}
//                 <div>
//                   {examStatus === "not_started" && (
//                     <p className="text-yellow-600">
//                       <i className="fas fa-info-circle mr-2"></i>
//                       The exam has not started yet
//                     </p>
//                   )}
//                   {examStatus === "already_taken" && (
//                     <p className="text-red-600">
//                       <i className="fas fa-times-circle mr-2"></i>
//                       The exam has already ended
//                     </p>
//                   )}
//                   {examStatus === "in_progress" && (
//                     <p className="text-green-600">
//                       <i className="fas fa-check-circle mr-2"></i>
//                       The exam is currently active
//                     </p>
//                   )}
//                 </div>

//                 {/* Start Exam Button */}
//                 <button
//                   onClick={handleStartExam}
//                   disabled={!isExamActive()}
//                   className={`px-6 py-2 rounded-md transition-colors duration-300 ${
//                     isExamActive()
//                       ? "bg-blue-600 text-white hover:bg-blue-700"
//                       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   }`}
//                 >
//                   Start Exam
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         // Loading State
//         <div className="flex justify-center items-center h-screen">
//           <div className="animate-pulse text-blue-600">
//             Loading exam details...
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }















import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ExamCard() {
  const { examcode } = useParams();
  const [currentExam, setCurrentExam] = useState(null);
  const [examStatus, setExamStatus] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const rules = [
    "You can't minimize the window",
    "You cannot change tabs",
    "You cannot move to other windows",
    "Any unauthorized action will be considered cheating",
  ];
  // const enableFullScreen = () => {
  //   const element = document.documentElement;
  //   if (element.requestFullscreen) {
  //     element.requestFullscreen();
  //   } else if (element.mozRequestFullScreen) {
  //     element.mozRequestFullScreen();
  //   } else if (element.webkitRequestFullscreen) {
  //     element.webkitRequestFullscreen();
  //   } else if (element.msRequestFullscreen) {
  //     element.msRequestFullscreen();
  //   }
  // };
  // Fetch exam details from the API
  const fetchExamDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/exambycode/${examcode}`);
      const examDetail = response.data;

      if (!examDetail || !examDetail.startTime || !examDetail.endTime || !examDetail.examDate) {
        throw new Error("Invalid exam configuration");
      }

      const now = new Date(); // Current timestamp

      // Combine date and time for parsing
      const datePart = new Date(examDetail.examDate).toISOString().split("T")[0]; // Extract the date part
      const startDateTime = `${datePart}T${examDetail.startTime}:00`;
      const endDateTime = `${datePart}T${examDetail.endTime}:00`;

      const startTime = new Date(startDateTime).getTime(); // Start timestamp
      const endTime = new Date(endDateTime).getTime(); // End timestamp

      if (isNaN(startTime) || isNaN(endTime)) {
        throw new Error("Invalid start or end time format");
      }

      if (now.getTime() < startTime) {
        setExamStatus("not_started");
      } else if (now.getTime() > endTime) {
        setExamStatus("already_taken");
      } else {
        setExamStatus("in_progress");
      }

      setCurrentExam({
        ...examDetail,
        startDateTime,
        endDateTime,
      });
    } catch (error) {
      console.error("Exam fetch error:", error);
      setErrorMessage(error.response?.data?.message || "Exam not found. Check the exam code.");
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    }
  };

  const formatTime = (dateTimeString) => {
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    } catch (error) {
      console.error("Time formatting error:", error);
      return "Invalid Time";
    }
  };

  const calculateDurationInMinutes = (start, end) => {
    try {
      const startTime = new Date(start).getTime();
      const endTime = new Date(end).getTime();

      if (isNaN(startTime) || isNaN(endTime)) return "Invalid Duration";

      const durationInMinutes = Math.floor((endTime - startTime) / 60000);
      return durationInMinutes > 0 ? `${durationInMinutes} min` : "Invalid Duration";
    } catch (error) {
      console.error("Duration calculation error:", error);
      return "Invalid Duration";
    }
  };

  useEffect(() => {
    if (examcode) {
      fetchExamDetails();
    }
  }, []);

  const isExamActive = () => {
    if (!currentExam) return false;

    const now = new Date().getTime();
    const startTime = new Date(currentExam.startDateTime).getTime();
    const endTime = new Date(currentExam.endDateTime).getTime();

    return now >= startTime && now <= endTime;
  };

  const handleStartExam = () => {
    if (isExamActive()) {
      // enableFullScreen();
      navigate(`/student/examboard/${currentExam._id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {errorMessage && (
        <div className="fixed top-0 left-0 w-full bg-red-100 text-red-700 p-4 text-center z-50">
          {errorMessage}
        </div>
      )}

      {currentExam ? (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{currentExam.name}</h1>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-calendar-alt"></i>
                  <span>Exam Date: {new Date(currentExam.examDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between mb-6">
                <div className="bg-gray-100 p-3 rounded-md">
                  <i className="fas fa-clock mr-2"></i>
                  Start Time: {formatTime(currentExam.startDateTime)}
                </div>
                <div className="bg-blue-100 p-3 rounded-md">
                  <i className="fas fa-hourglass-half mr-2"></i>
                  Duration: {calculateDurationInMinutes(currentExam.startDateTime, currentExam.endDateTime)}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Exam Rules</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {rules.map((rule, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">•</span>{rule}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  {examStatus === "not_started" && (
                    <p className="text-yellow-600">
                      <i className="fas fa-info-circle mr-2"></i>
                      The exam has not started yet
                    </p>
                  )}
                  {examStatus === "already_taken" && (
                    <p className="text-red-600">
                      <i className="fas fa-times-circle mr-2"></i>
                      The exam has already ended
                    </p>
                  )}
                  {examStatus === "in_progress" && (
                    <p className="text-green-600">
                      <i className="fas fa-check-circle mr-2"></i>
                      The exam is currently active
                    </p>
                  )}
                </div>

                <button
                  onClick={handleStartExam}
                  disabled={!isExamActive()}
                  className={`px-6 py-2 rounded-md transition-colors duration-300 ${
                    isExamActive()
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Start Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-pulse text-blue-600">
            Loading exam details...
          </div>
        </div>
      )}
    </div>
  );
}
