// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// function AddExam({ mode = "add", existingExamData = null, onSubmit }) {
//   const { examID } = useParams();
//   const navigate = useNavigate();
//   const [examDetails, setExamDetails] = useState({
//     name: "",
//     description: "",
//     examDate: "",
//     startTime: "",
//     endTime: "",
//     examCode: "",
//     totalMarks: 0,
//     evaluationType: "pdf",
//     evaluationData: []
//   });

//   const [errorMessage, setErrorMessage] = useState("");

//   // Dummy data for Auto option
//   const chaptersData = [
//     { name: "Chapter 1", questions: ["Question 1.1", "Question 1.2"] },
//     { name: "Chapter 2", questions: ["Question 2.1", "Question 2.2"] },
//     { name: "Chapter 3", questions: ["Question 3.1", "Question 3.2"] },
//   ];

//   // Load existing exam data when in edit mode
//   // useEffect(() => {
//   //   if (mode === "edit" && existingExamData) {
//   //     setExamDetails({
//   //       name: existingExamData.name || "",
//   //       description: existingExamData.description || "",
//   //       examDate: existingExamData.examDate || "",
//   //       startTime: existingExamData.startTime || "",
//   //       endTime: existingExamData.endTime || "",
//   //       examCode: existingExamData.examCode || "",
//   //       totalMarks: existingExamData.totalMarks || 0,
//   //       evaluationType: existingExamData.evaluationType || "pdf",
//   //       evaluationData: existingExamData.evaluationData || []
//   //     });
//   //   }
//   // }, [mode, existingExamData]);
//   useEffect(() => {
//     const fetchExamData = async () => {
//       if (mode === "edit" && examID) {
//         try {
//           const response = await axios.get(`http://localhost:5000/exam/${examID}`);
//           setExamDetails(response.data);
//         } catch (error) {
//           console.error("Error fetching exam data:", error);
//           setErrorMessage("Failed to fetch exam data");
//         }
//       }
//     };

//     fetchExamData();
//   }, [mode, examID]);
//   const updateExamDetail = (key, value) => {
//     setExamDetails((prev) => ({ ...prev, [key]: value }));
//   };

//   const generateExamCode = () => {
//     const code = Math.random().toString(36).substring(2, 8).toUpperCase();
//     updateExamDetail("examCode", code);
//   };

//   const addEvaluationData = () => {
//     const newQuestion = {
//       question: "",
//       marks: 0,
//       chapter: examDetails.evaluationType === "auto" ? selectedChapter : "",
//       answer: examDetails.evaluationType === "reference" ? currentAnswer : ""
//     };

//     updateExamDetail("evaluationData", [
//       ...examDetails.evaluationData, 
//       newQuestion
//     ]);
//   };

//   const updateEvaluationData = (index, field, value) => {
//     const updatedEvaluationData = [...examDetails.evaluationData];
//     updatedEvaluationData[index][field] = value;
    
//     updateExamDetail("evaluationData", updatedEvaluationData);
//   };

//   const removeEvaluationData = (index) => {
//     const updatedEvaluationData = examDetails.evaluationData.filter((_, i) => i !== index);
//     updateExamDetail("evaluationData", updatedEvaluationData);
//   };

//   // State for adding questions dynamically
//   const [currentQuestion, setCurrentQuestion] = useState("");
//   const [currentMarks, setCurrentMarks] = useState(0);
//   const [currentAnswer, setCurrentAnswer] = useState("");
//   const [selectedChapter, setSelectedChapter] = useState("");

//   // const handleSubmit = async () => {
//   //   // Validation
//   //   if (
//   //     !examDetails.name ||
//   //     !examDetails.description ||
//   //     !examDetails.examDate ||
//   //     !examDetails.startTime ||
//   //     !examDetails.endTime ||
//   //     !examDetails.examCode ||
//   //     examDetails.totalMarks <= 0 ||
//   //     examDetails.evaluationData.length === 0
//   //   ) {
//   //     setErrorMessage("Please fill in all required fields and add at least one question.");
//   //     return;
//   //   }

//   //   try {
//   //     const response = await axios.post(
//   //       "http://localhost:5000/addexam",
//   //       examDetails,
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //       }
//   //     );

//   //     console.log("Exam successfully created:", response.data);
//   //     alert(`${mode === "add" ? "Exam created" : "Exam updated"} successfully!`);

//   //     // Call the onSubmit callback
//   //     if (onSubmit) onSubmit(examDetails);

//   //     // Reset form only in add mode
//   //     if (mode === "add") {
//   //       setExamDetails({
//   //         name: "",
//   //         description: "",
//   //         examDate: "",
//   //         startTime: "",
//   //         endTime: "",
//   //         examCode: "",
//   //         totalMarks: 0,
//   //         evaluationType: "pdf",
//   //         evaluationData: []
//   //       });
//   //     }
//   //   } catch (error) {
//   //     console.error("Error creating exam:", error);
//   //     setErrorMessage("An error occurred while creating the exam.");
//   //   }
//   // };
//   const handleSubmit = async () => {
//     try {
//       let response;
      
//       if (mode === "edit") {
//         response = await axios.put(
//           // `http://localhost:5000/exam/update/${examID}`,
//           `http://localhost:5000/updateexam`,
//           examDetails,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         alert("Exam updated successfully!");
//         navigate(`/teacher/exampapers/detail/${examID}`); // Navigate back to exam details
//       } else {
//         response = await axios.post(
//           "http://localhost:5000/addexam",
//           examDetails,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         alert("Exam created successfully!");
//         // Reset form only in add mode
//         setExamDetails({
//           name: "",
//           description: "",
//           examDate: "",
//           startTime: "",
//           endTime: "",
//           examCode: "",
//           totalMarks: 0,
//           evaluationType: "pdf",
//           evaluationData: []
//         });
//       }

//       console.log(`Exam ${mode === "edit" ? "updated" : "created"}:`, response.data);
//     } catch (error) {
//       console.error(`Error ${mode === "edit" ? "updating" : "creating"} exam:`, error);
//       setErrorMessage(`An error occurred while ${mode === "edit" ? "updating" : "creating"} the exam.`);
//     }
//   };
//   return (
//     <div className="addexam h-4/5 overflow-y-auto">
//     <div className="rounded-md m-4 p-4">
//       <h1 className="text-2xl font-bold">
//         {mode === "add" ? "Add New Exam" : "Edit Exam"}
//       </h1>
//     </div>

//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}

//       <form className="exam-form max-w-full bg-white rounded-md shadow-md m-4 p-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex flex-col">
//             <label className="mb-2">Exam Name:</label>
//             <input
//               type="text"
//               value={examDetails.name}
//               onChange={(e) => updateExamDetail("name", e.target.value)}
//               className="border p-2"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-2">Exam Description:</label>
//             <input
//               value={examDetails.description}
//               onChange={(e) => updateExamDetail("description", e.target.value)}
//               className="border p-2"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-2">Start Time:</label>
//             <input
//               type="time"
//               value={examDetails.startTime}
//               onChange={(e) => updateExamDetail("startTime", e.target.value)}
//               className="border p-2"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-2">End Time:</label>
//             <input
//               type="time"
//               value={examDetails.endTime}
//               onChange={(e) => updateExamDetail("endTime", e.target.value)}
//               className="border p-2"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-2">Exam Date:</label>
//             <input
//               type="date"
//               value={examDetails.examDate}
//               onChange={(e) => updateExamDetail("examDate", e.target.value)}
//               className="border p-2"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-2">Exam Code:</label>
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 readOnly
//                 value={examDetails.examCode}
//                 className="border p-2 flex-grow"
//               />
//               {mode === "add" && (
//                 <button 
//                   type="button" 
//                   onClick={generateExamCode}
//                   className="ml-2 bg-blue-500 text-white p-2 rounded"
//                 >
//                   Generate Code
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-2">Total Marks:</label>
//             <input
//               type="number"
//               value={examDetails.totalMarks}
//               onChange={(e) => updateExamDetail("totalMarks", parseInt(e.target.value))}
//               className="border p-2"
//               min="0"
//             />
//           </div>

//           <div className="flex flex-col">
//             {/* <label className="mb-2">Evaluation Type:</label>
//             <select
//               value={examDetails.evaluationType}
//               onChange={(e) => updateExamDetail("evaluationType", e.target.value)}
//               className="border p-2"
//             >
//               <option value="pdf">PDF</option>
//               <option value="reference">Reference</option>
//               <option value="auto">Automatic</option>
//             </select> */}
//           </div>
//         </div>
//       </form>

//       {/* Questions Section */}
//       <div className="m-4 p-4 bg-white rounded-md shadow-md">
//         <h2 className="text-xl font-bold mb-4">Exam Questions</h2>
        
//         <div className="grid grid-cols-3 gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="Question"
//             value={currentQuestion}
//             onChange={(e) => setCurrentQuestion(e.target.value)}
//             className="border p-2"
//           />
//           <input
//             type="number"
//             placeholder="Marks"
//             value={currentMarks}
//             onChange={(e) => setCurrentMarks(parseInt(e.target.value))}
//             className="border p-2"
//             min="0"
//           />
          
//           {examDetails.evaluationType === "auto" && (
//             <select
//               value={selectedChapter}
//               onChange={(e) => setSelectedChapter(e.target.value)}
//               className="border p-2"
//             >
//               <option value="">Select Chapter</option>
//               {chaptersData.map((chapter) => (
//                 <option key={chapter.name} value={chapter.name}>
//                   {chapter.name}
//                 </option>
//               ))}
//             </select>
//           )}
          
//           {examDetails.evaluationType === "reference" && (
//             <input
//               type="text"
//               placeholder="Reference Answer"
//               value={currentAnswer}
//               onChange={(e) => setCurrentAnswer(e.target.value)}
//               className="border p-2"
//             />
//           )}
          
//           <button 
//             onClick={() => {
//               if (!currentQuestion || currentMarks <= 0) return;
              
//               const newQuestion = {
//                 question: currentQuestion,
//                 marks: currentMarks,
//                 chapter: examDetails.evaluationType === "auto" ? selectedChapter : "",
//                 answer: examDetails.evaluationType === "reference" ? currentAnswer : ""
//               };
              
//               updateExamDetail("evaluationData", [...examDetails.evaluationData, newQuestion]);
              
//               // Reset inputs
//               setCurrentQuestion("");
//               setCurrentMarks(0);
//               setSelectedChapter("");
//               setCurrentAnswer("");
//             }}
//             className="bg-green-500 text-white p-2 rounded"
//           >
//             Add Question
//           </button>
//         </div>

//         {/* Questions List */}
//         <div>
//           <h3 className="font-bold mb-2">Added Questions</h3>
//           {examDetails.evaluationData.map((q, index) => (
//             <div key={index} className="flex items-center mb-2 p-2 bg-gray-100 rounded">
//               <div className="flex-grow">
//                 <p><strong>Question:</strong> {q.question}</p>
//                 <p><strong>Marks:</strong> {q.marks}</p>
//                 {q.chapter && <p><strong>Chapter:</strong> {q.chapter}</p>}
//                 {q.answer && <p><strong>Answer:</strong> {q.answer}</p>}
//               </div>
//               <button 
//                 onClick={() => removeEvaluationData(index)}
//                 className="bg-red-500 text-white p-1 rounded ml-2"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="m-4">
//       <button 
//         onClick={handleSubmit}
//         className="bg-blue-600 text-white p-2 rounded w-full"
//       >
//         {mode === "add" ? "Create Exam" : "Update Exam"}
//       </button>
//     </div>
//   </div>
//   );
// }

// export default AddExam;









import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AddExam({ mode = "add", existingExamData = null, onSubmit }) {
  const { examID } = useParams();
  const navigate = useNavigate();

  const [examDetails, setExamDetails] = useState({
    name: "",
    description: "",
    examDate: "",
    startTime: "",
    endTime: "",
    examCode: "",
    totalMarks: 0,
    evaluationType: "pdf",
    evaluationData: [],
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentMarks, setCurrentMarks] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  const chaptersData = [
    { name: "Chapter 1", questions: ["Question 1.1", "Question 1.2"] },
    { name: "Chapter 2", questions: ["Question 2.1", "Question 2.2"] },
    { name: "Chapter 3", questions: ["Question 3.1", "Question 3.2"] },
  ];

  useEffect(() => {
    const fetchExamData = async () => {
      if (mode === "edit" && examID) {
        try {
          const response = await axios.get(`http://localhost:5000/exam/${examID}`);
          setExamDetails(response.data);
        } catch (error) {
          console.error("Error fetching exam data:", error);
          setErrorMessage("Failed to fetch exam data");
        }
      }
    };
    fetchExamData();
  }, [mode, examID]);

  const updateExamDetail = (key, value) => {
    setExamDetails((prev) => ({ ...prev, [key]: value }));

    const fieldError = validateField(key, value);
    setErrors((prevErrors) => ({ ...prevErrors, [key]: fieldError }));
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Exam name is required";
        else if (value.trim().length < 3) error = "Exam name must be at least 3 characters";
        break;

      case "description":
        if (!value.trim()) error = "Description is required";
        else if (value.trim().length < 5) error = "Description must be at least 5 characters";
        break;

      case "examDate":
        if (!value) error = "Exam date is required";
        else if (new Date(value) < new Date(new Date().toDateString()))
          error = "Exam date cannot be in the past";
        break;

      case "startTime":
        if (!value) error = "Start time is required";
        break;

      case "endTime":
        if (!value) error = "End time is required";
        else if (examDetails.startTime && value <= examDetails.startTime)
          error = "End time must be after start time";
        break;

      case "examCode":
        if (!value.trim()) error = "Exam code is required";
        break;

      case "totalMarks":
        if (value <= 0) error = "Total marks must be greater than 0";
        break;

      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};

    Object.entries(examDetails).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    if (examDetails.evaluationData.length === 0) {
      newErrors.evaluationData = "At least one question is required";
    }

    const totalMarksFromQuestions = examDetails.evaluationData.reduce(
      (sum, q) => sum + Number(q.marks || 0),
      0
    );

    if (totalMarksFromQuestions !== Number(examDetails.totalMarks)) {
      newErrors.evaluationData = `Total marks of questions (${totalMarksFromQuestions}) must equal total exam marks (${examDetails.totalMarks})`;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const generateExamCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    updateExamDetail("examCode", code);
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.trim()) {
      setErrorMessage("Question text is required");
      return;
    }

    if (currentMarks <= 0) {
      setErrorMessage("Marks must be greater than 0");
      return;
    }

    const newQuestion = {
      question: currentQuestion,
      marks: currentMarks,
      chapter: examDetails.evaluationType === "auto" ? selectedChapter : "",
      answer: examDetails.evaluationType === "reference" ? currentAnswer : "",
    };

    updateExamDetail("evaluationData", [...examDetails.evaluationData, newQuestion]);

    // Reset question inputs
    setCurrentQuestion("");
    setCurrentMarks(0);
    setSelectedChapter("");
    setCurrentAnswer("");
    setErrorMessage("");
  };

  const removeEvaluationData = (index) => {
    const updatedEvaluationData = examDetails.evaluationData.filter((_, i) => i !== index);
    updateExamDetail("evaluationData", updatedEvaluationData);
  };

  const handleSubmit = async () => {
    if (!examDetails.examCode.trim()) {
      generateExamCode();
    }

    if (!validateForm()) {
      setErrorMessage("Please fix the errors above before submitting.");
      return;
    }

    try {
      let response;

      if (mode === "edit") {
        response = await axios.put(
          "http://localhost:5000/updateexam",
          examDetails,
          { headers: { "Content-Type": "application/json" } }
        );
        alert("Exam updated successfully!");
        navigate(`/teacher/exampapers/detail/${examID}`);
      } else {
        response = await axios.post(
          "http://localhost:5000/addexam",
          examDetails,
          { headers: { "Content-Type": "application/json" } }
        );
        alert("Exam created successfully!");
        setExamDetails({
          name: "",
          description: "",
          examDate: "",
          startTime: "",
          endTime: "",
          examCode: "",
          totalMarks: 0,
          evaluationType: "pdf",
          evaluationData: [],
        });
      }

      console.log(`Exam ${mode === "edit" ? "updated" : "created"}:`, response.data);
    } catch (error) {
      console.error("Error submitting exam:", error);
      setErrorMessage(`An error occurred while ${mode === "edit" ? "updating" : "creating"} the exam.`);
    }
  };

  return (
    <div className="addexam h-4/5 overflow-y-auto">
      <div className="rounded-md m-4 p-4">
        <h1 className="text-2xl font-bold">
          {mode === "add" ? "Add New Exam" : "Edit Exam"}
        </h1>
      </div>

      {errorMessage && <p className="text-red-500 ml-4">{errorMessage}</p>}

      <form className="exam-form max-w-full bg-white rounded-md shadow-md m-4 p-4">
        <div className="grid grid-cols-2 gap-4">

          {/* Exam Name */}
          <div className="flex flex-col">
            <label className="mb-2">Exam Name:</label>
            <input
              type="text"
              value={examDetails.name}
              onChange={(e) => updateExamDetail("name", e.target.value)}
              className="border p-2"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
          </div>

          {/* Exam Description */}
          <div className="flex flex-col">
            <label className="mb-2">Exam Description:</label>
            <input
              value={examDetails.description}
              onChange={(e) => updateExamDetail("description", e.target.value)}
              className="border p-2"
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
          </div>

          {/* Start Time */}
          <div className="flex flex-col">
            <label className="mb-2">Start Time:</label>
            <input
              type="time"
              value={examDetails.startTime}
              onChange={(e) => updateExamDetail("startTime", e.target.value)}
              className="border p-2"
            />
            {errors.startTime && <span className="text-red-500 text-sm">{errors.startTime}</span>}
          </div>

          {/* End Time */}
          <div className="flex flex-col">
            <label className="mb-2">End Time:</label>
            <input
              type="time"
              value={examDetails.endTime}
              onChange={(e) => updateExamDetail("endTime", e.target.value)}
              className="border p-2"
            />
            {errors.endTime && <span className="text-red-500 text-sm">{errors.endTime}</span>}
          </div>

          {/* Exam Date */}
          <div className="flex flex-col">
            <label className="mb-2">Exam Date:</label>
            {/* <input
              type="date"
              value={examDetails.examDate}
              onChange={(e) => updateExamDetail("examDate", e.target.value)}
              className="border p-2"
            /> */}
            <input
  type="date"
  value={
    examDetails.examDate
      ? new Date(examDetails.examDate).toISOString().split("T")[0]
      : ""
  }
  onChange={(e) => updateExamDetail("examDate", e.target.value)}
  className="border p-2"
/>

            {errors.examDate && <span className="text-red-500 text-sm">{errors.examDate}</span>}
          </div>

          {/* Exam Code */}
          <div className="flex flex-col">
            <label className="mb-2">Exam Code:</label>
            <div className="flex items-center">
              <input
                type="text"
                readOnly
                value={examDetails.examCode}
                className="border p-2 flex-grow"
              />
              {mode === "add" && (
                <button
                  type="button"
                  onClick={generateExamCode}
                  className="ml-2 bg-blue-500 text-white p-2 rounded"
                >
                  Generate
                </button>
              )}
            </div>
            {errors.examCode && <span className="text-red-500 text-sm">{errors.examCode}</span>}
          </div>

          {/* Total Marks */}
          <div className="flex flex-col">
            <label className="mb-2">Total Marks:</label>
            <input
              type="number"
              value={examDetails.totalMarks}
              onChange={(e) => updateExamDetail("totalMarks", parseInt(e.target.value))}
              className="border p-2"
              min="0"
            />
            {errors.totalMarks && <span className="text-red-500 text-sm">{errors.totalMarks}</span>}
          </div>
        </div>
      </form>

      {/* Questions Section */}
      <div className="m-4 p-4 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Exam Questions</h2>

        {/* Add question inputs */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Question"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Marks"
            value={currentMarks}
            onChange={(e) => setCurrentMarks(parseInt(e.target.value))}
            className="border p-2"
            min="0"
          />
          <button
            onClick={handleAddQuestion}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add Question
          </button>
        </div>

        {/* Error */}
        {errors.evaluationData && (
          <span className="text-red-500 text-sm">{errors.evaluationData}</span>
        )}

        {/* Questions List */}
        <div>
          {examDetails.evaluationData.map((q, index) => (
            <div
              key={index}
              className="flex items-center mb-2 p-2 bg-gray-100 rounded"
            >
              <div className="flex-grow">
                <p>
                  <strong>Q:</strong> {q.question}
                </p>
                <p>
                  <strong>Marks:</strong> {q.marks}
                </p>
              </div>
              <button
                onClick={() => removeEvaluationData(index)}
                className="bg-red-500 text-white p-1 rounded ml-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="m-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white p-2 rounded w-full"
        >
          {mode === "add" ? "Create Exam" : "Update Exam"}
        </button>
      </div>
    </div>
  );
}

export default AddExam;
