// import { useState } from 'react';
// import './AddExam.css';

// function AddExam() {
//     const [examDetails, setExamDetails] = useState({
//         name: '',
//         description: '',
//         examDate: '',
//         startTime: '',
//         endTime: '',
//         examCode: '',
//     });

//     const [evaluationMethod, setEvaluationMethod] = useState('pdf');
//     const [uploadedPdf, setUploadedPdf] = useState(null);
//     const [pdfQuestions, setPdfQuestions] = useState([]);
//     const [currentPdfQuestion, setCurrentPdfQuestion] = useState('');

//     const [referenceQuestions, setReferenceQuestions] = useState([]);
//     const [currentReferenceQuestion, setCurrentReferenceQuestion] = useState('');
//     const [currentReferenceAnswer, setCurrentReferenceAnswer] = useState('');

//     const [autoQuestions, setAutoQuestions] = useState([]);
//     const [selectedChapter, setSelectedChapter] = useState('');
//     const [selectedQuestion, setSelectedQuestion] = useState('');

//     const [errorMessage, setErrorMessage] = useState('');

//     // Dummy data for Auto option
//     const chaptersData = [
//         { name: 'Chapter 1', questions: ['Question 1.1', 'Question 1.2'] },
//         { name: 'Chapter 2', questions: ['Question 2.1', 'Question 2.2'] },
//         { name: 'Chapter 3', questions: ['Question 3.1', 'Question 3.2'] },
//     ];

//     const updateExamDetail = (key, value) => {
//         setExamDetails((prev) => ({ ...prev, [key]: value }));
//     };

//     const generateExamCode = () => {
//         const code = Math.random().toString(36).substring(2, 8).toUpperCase();
//         updateExamDetail('examCode', code);
//     };

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         if (file && file.type !== 'application/pdf') {
//             setErrorMessage('Please upload a valid PDF file.');
//             setUploadedPdf(null);
//         } else {
//             setErrorMessage('');
//             setUploadedPdf(file);
//         }
//     };

//     const addPdfQuestion = () => {
//         if (!currentPdfQuestion.trim()) return;
//         setPdfQuestions((prev) => [...prev, currentPdfQuestion.trim()]);
//         setCurrentPdfQuestion('');
//     };

//     const addReferenceQuestion = () => {
//         if (!currentReferenceQuestion.trim() || !currentReferenceAnswer.trim()) return;
//         setReferenceQuestions((prev) => [
//             ...prev,
//             { question: currentReferenceQuestion, answer: currentReferenceAnswer },
//         ]);
//         setCurrentReferenceQuestion('');
//         setCurrentReferenceAnswer('');
//     };

//     const addAutoQuestion = () => {
//         if (!selectedChapter || !selectedQuestion) return;
//         setAutoQuestions((prev) => [
//             ...prev,
//             { chapter: selectedChapter, question: selectedQuestion },
//         ]);
//         setSelectedQuestion('');
//     };

//     const handleSubmit = () => {
//         if (
//             !examDetails.name ||
//             !examDetails.description ||
//             !examDetails.examDate ||
//             !examDetails.startTime ||
//             !examDetails.endTime ||
//             !examDetails.examCode
//         ) {
//             setErrorMessage('Please fill in all required fields.');
//             return;
//         }

//         const payload = {
//             ...examDetails,
//             evaluationMethod,
//             pdfFile: uploadedPdf,
//             pdfQuestions: evaluationMethod === 'pdf' ? pdfQuestions : [],
//             referenceQuestions: evaluationMethod === 'reference' ? referenceQuestions : [],
//             autoQuestions: evaluationMethod === 'auto' ? autoQuestions : [],
//         };

//         console.log('Exam Data:', payload);
//         alert('Exam created successfully!');
//         // Reset form
//         setExamDetails({
//             name: '',
//             description: '',
//             examDate: '',
//             startTime: '',
//             endTime: '',
//             examCode: '',
//         });
//         setUploadedPdf(null);
//         setPdfQuestions([]);
//         setCurrentPdfQuestion('');
//         setReferenceQuestions([]);
//         setCurrentReferenceQuestion('');
//         setCurrentReferenceAnswer('');
//         setAutoQuestions([]);
//         setSelectedChapter('');
//         setSelectedQuestion('');
//     };

//     return (
//         <div className="addexam h-4/5 overflow-y-auto">
//             {/* <div className="header">
//                 <h1 className="text-2xl font-bold">Add Exam</h1>
//             </div> */}
//             <div className="">
//       <div className="rounded-md m-4 p-4">
//         <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Add Exam</h1>
//         </div>
//       </div>
//             {errorMessage && <p className="error-message">{errorMessage}</p>}

//             <form className="exam-form max-w-full bg-white rounded-md shadow-md m-4 p-4 ">

//             <table className="w-full">

//             <tr>
//               <td>
//                 <div className="flex flex-col gap-2">
//                 <label>Exam Name:</label>
//                     <input
//                         type="text"
//                         value={examDetails.name}
//                         onChange={(e) => updateExamDetail('name', e.target.value)}
//                     />
//                 </div>
//               </td>
//               <td>
//                 <div className="flex flex-col gap-2">
//                 <label>Exam Description:</label>
//                     <input
//                         value={examDetails.description}
//                         onChange={(e) => updateExamDetail('description', e.target.value)}
//                     />
//                 </div>
//               </td>
//             </tr>

//             <tr>
//               <td>
//                 <div className="flex flex-col gap-2">
//                 <label>Start Time:</label>
//                     <input
//                         type="time"
//                         value={examDetails.startTime}
//                         onChange={(e) => updateExamDetail('startTime', e.target.value)}
//                     />
//                 </div>
//               </td>
//               <td>
//                 <div className="flex flex-col gap-2">
//                 <label>End Time:</label>
//                     <input
//                         type="time"
//                         value={examDetails.endTime}
//                         onChange={(e) => updateExamDetail('endTime', e.target.value)}
//                     />
//                 </div>
//               </td>
//             </tr>

//             <tr>
//               <td>
//                 <div className="flex flex-col gap-2">
//                 <label>Exam Date:</label>
//                     <input
//                         type="date"
//                         value={examDetails.examDate}
//                         onChange={(e) => updateExamDetail('examDate', e.target.value)}
//                     />
//                 </div>
//               </td>
//               <td>
//                 <div className="flex flex-col gap-2">
//                 <label>Exam Code:</label>

//                    <div className='flex items-center'>
//                     <input className='' type="text" readOnly value={examDetails.examCode} />
//                     <button type="button" onClick={generateExamCode}>
//                         Generate Code
//                     </button>
//                     </div>
//                 </div>
//               </td>
//             </tr>

//             </table>

//             </form>

//             <div className="evaluation-methods">
//                 {['pdf', 'reference', 'auto'].map((method) => (
//                     <span
//                         key={method}
//                         className={`method ${evaluationMethod === method ? 'active' : ''}`}
//                         onClick={() => setEvaluationMethod(method)}
//                     >
//                         {method.charAt(0).toUpperCase() + method.slice(1)}
//                     </span>
//                 ))}
//             </div>

//             {/* PDF Option */}
//             {evaluationMethod === 'pdf' && (
//                 <div>
//                     <h3>Upload PDF and Add Questions</h3>
//                     <label>Upload PDF:</label>
//                     <input type="file" accept=".pdf" onChange={handleFileUpload} />
//                     <div className="form-group">
//                         <label>Question:</label>
//                         <textarea
//                             placeholder="Enter your question"
//                             value={currentPdfQuestion}
//                             onChange={(e) => setCurrentPdfQuestion(e.target.value)}
//                         />
//                     </div>
//                     <button type="button" onClick={addPdfQuestion} disabled={!uploadedPdf}>
//                         Add Question
//                     </button>
//                     <ul>
//                         {pdfQuestions.map((question, index) => (
//                             <li key={index}>{question}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {/* Reference Option */}
//             {evaluationMethod === 'reference' && (
//                 <div>
//                     <h3>Add Questions and Reference Answers</h3>
//                     <div className="form-group">
//                         <label>Question:</label>
//                         <textarea
//                             placeholder="Enter your question"
//                             value={currentReferenceQuestion}
//                             onChange={(e) => setCurrentReferenceQuestion(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Reference Answer:</label>
//                         <textarea
//                             placeholder="Enter reference answer"
//                             value={currentReferenceAnswer}
//                             onChange={(e) => setCurrentReferenceAnswer(e.target.value)}
//                         />
//                     </div>
//                     <button type="button" onClick={addReferenceQuestion}>
//                         Add Question
//                     </button>
//                     <ul>
//                         {referenceQuestions.map((item, index) => (
//                             <li key={index}>
//                                 <b>Q:</b> {item.question} <br />
//                                 <b>A:</b> {item.answer}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {/* Auto Option */}
//             {evaluationMethod === 'auto' && (
//                 <div>
//                     <h3>Select Chapters and Questions</h3>
//                     <div className="form-group">
//                         <label>Chapter:</label>
//                         <select
//                             value={selectedChapter}
//                             onChange={(e) => {
//                                 setSelectedChapter(e.target.value);
//                                 setSelectedQuestion('');
//                             }}
//                         >
//                             <option value="">Select Chapter</option>
//                             {chaptersData.map((chapter, index) => (
//                                 <option key={index} value={chapter.name}>
//                                     {chapter.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     {selectedChapter && (
//                         <div className="form-group">
//                             <label>Question:</label>
//                             <select
//                                 value={selectedQuestion}
//                                 onChange={(e) => setSelectedQuestion(e.target.value)}
//                             >
//                                 <option value="">Select Question</option>
//                                 {chaptersData
//                                     .find((chapter) => chapter.name === selectedChapter)
//                                     .questions.map((question, index) => (
//                                         <option key={index} value={question}>
//                                             {question}
//                                         </option>
//                                     ))}
//                             </select>
//                         </div>
//                     )}
//                     <button
//                         type="button"
//                         onClick={addAutoQuestion}
//                         disabled={!selectedChapter || !selectedQuestion}
//                     >
//                         Add Question
//                     </button>
//                     <ul>
//                         {autoQuestions.map((item, index) => (
//                             <li key={index}>
//                                 <b>Chapter:</b> {item.chapter}, <b>Question:</b> {item.question}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             <button type="button" onClick={handleSubmit}>
//                 Submit Exam
//             </button>
//             </div>
//         </div>
//     );
// }

// export default AddExam;

// import { useState, useEffect } from 'react';
// import './AddExam.css';

// function AddExam({ id }) {
//     const [examDetails, setExamDetails] = useState({
//         name: '',
//         description: '',
//         examDate: '',
//         startTime: '',
//         endTime: '',
//         examCode: '',
//     });

//     const [evaluationMethod, setEvaluationMethod] = useState('pdf');
//     const [uploadedPdf, setUploadedPdf] = useState(null);
//     const [pdfQuestions, setPdfQuestions] = useState([]);
//     const [currentPdfQuestion, setCurrentPdfQuestion] = useState('');

//     const [referenceQuestions, setReferenceQuestions] = useState([]);
//     const [currentReferenceQuestion, setCurrentReferenceQuestion] = useState('');
//     const [currentReferenceAnswer, setCurrentReferenceAnswer] = useState('');

//     const [autoQuestions, setAutoQuestions] = useState([]);
//     const [selectedChapter, setSelectedChapter] = useState('');
//     const [selectedQuestion, setSelectedQuestion] = useState('');

//     const [errorMessage, setErrorMessage] = useState('');

//     // Dummy data for Auto option
//     const chaptersData = [
//         { name: 'Chapter 1', questions: ['Question 1.1', 'Question 1.2'] },
//         { name: 'Chapter 2', questions: ['Question 2.1', 'Question 2.2'] },
//         { name: 'Chapter 3', questions: ['Question 3.1', 'Question 3.2'] },
//     ];

//     useEffect(() => {
//         if (id!==undefined) {
//             setExamDetails({
//                 name: existingExamData.name || '',
//                 description: existingExamData.description || '',
//                 examDate: existingExamData.examDate || '',
//                 startTime: existingExamData.startTime || '',
//                 endTime: existingExamData.endTime || '',
//                 examCode: existingExamData.examCode || '',
//             });
//             setEvaluationMethod(existingExamData.evaluationMethod || 'pdf');
//             setPdfQuestions(existingExamData.pdfQuestions || []);
//             setReferenceQuestions(existingExamData.referenceQuestions || []);
//             setAutoQuestions(existingExamData.autoQuestions || []);
//         }
//     }, []);

//     const updateExamDetail = (key, value) => {
//         setExamDetails((prev) => ({ ...prev, [key]: value }));

//     };

//     const generateExamCode = () => {
//         const code = Math.random().toString(36).substring(2, 8).toUpperCase();
//         updateExamDetail('examCode', code);
//     };

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         if (file && file.type !== 'application/pdf') {
//             setErrorMessage('Please upload a valid PDF file.');
//             setUploadedPdf(null);
//         } else {
//             setErrorMessage('');
//             setUploadedPdf(file);
//         }
//     };

//     const addPdfQuestion = () => {
//         if (!currentPdfQuestion.trim()) return;
//         setPdfQuestions((prev) => [...prev, currentPdfQuestion.trim()]);
//         setCurrentPdfQuestion('');
//     };

//     const addReferenceQuestion = () => {
//         if (!currentReferenceQuestion.trim() || !currentReferenceAnswer.trim()) return;
//         setReferenceQuestions((prev) => [
//             ...prev,
//             { question: currentReferenceQuestion, answer: currentReferenceAnswer },
//         ]);
//         setCurrentReferenceQuestion('');
//         setCurrentReferenceAnswer('');
//     };

//     const addAutoQuestion = () => {
//         if (!selectedChapter || !selectedQuestion) return;
//         setAutoQuestions((prev) => [
//             ...prev,
//             { chapter: selectedChapter, question: selectedQuestion },
//         ]);
//         setSelectedQuestion('');
//     };

//     const handleSubmit = () => {
//         if (
//             !examDetails.name ||
//             !examDetails.description ||
//             !examDetails.examDate ||
//             !examDetails.startTime ||
//             !examDetails.endTime ||
//             !examDetails.examCode
//         ) {
//             setErrorMessage('Please fill in all required fields.');
//             return;
//         }

//         const payload = {
//             ...examDetails,
//             evaluationMethod,
//             pdfFile: uploadedPdf,
//             pdfQuestions: evaluationMethod === 'pdf' ? pdfQuestions : [],
//             referenceQuestions: evaluationMethod === 'reference' ? referenceQuestions : [],
//             autoQuestions: evaluationMethod === 'auto' ? autoQuestions : [],
//         };

//         // Call the onSubmit callback
//         if (onSubmit) onSubmit(payload);

//         if (id) {
//             // Update existing exam
//             axios.put(`/api/exams/${id}`, examData)
//                 .then(() => {
//                     alert('Exam updated successfully!');
//                 })
//                 .catch((error) => {
//                     console.error("Error updating exam:", error);
//                 })
//                 .finally(() => setIsLoading(false));
//         } else {
//             // Add new exam
//             axios.post('/api/exams', examData)
//                 .then(() => {
//                     alert('Exam added successfully!');
//                     // Reset form fields after adding
//                     setExamName('');
//                     setDuration('');
//                     setEvaluationMethod('');
//                     setPdfQuestions([]);
//                     setReferenceQuestions([]);
//                     setAutoQuestions([]);
//                 })
//                 .catch((error) => {
//                     console.error("Error adding exam:", error);
//                 })
//                 .finally(() => setIsLoading(false));
//         }

//     };

//     return (
//         <div className="addexam h-4/5 overflow-y-auto">
//             <div className="rounded-md m-4 p-4">
//                 <div className="flex justify-between items-center">
//                     <h1 className="text-2xl font-bold">{id ? 'Add Exam' : 'Edit Exam'}</h1>
//                 </div>
//             </div>
//             {errorMessage && <p className="error-message">{errorMessage}</p>}

//             <form className="exam-form max-w-full bg-white rounded-md shadow-md m-4 p-4">
//                 <table className="w-full">
//                     <tr>
//                         <td>
//                             <div className="flex flex-col gap-2">
//                                 <label>Exam Name:</label>
//                                 <input
//                                     type="text"
//                                     value={examDetails.name}
//                                     onChange={(e) => updateExamDetail('name', e.target.value)}
//                                 />
//                             </div>
//                         </td>
//                         <td>
//                             <div className="flex flex-col gap-2">
//                                 <label>Exam Description:</label>
//                                 <input
//                                     value={examDetails.description}
//                                     onChange={(e) => updateExamDetail('description', e.target.value)}
//                                 />
//                             </div>
//                         </td>
//                     </tr>

//                     <tr>
//                         <td>
//                             <div className="flex flex-col gap-2">
//                                 <label>Start Time:</label>
//                                 <input
//                                     type="time"
//                                     value={examDetails.startTime}
//                                     onChange={(e) => updateExamDetail('startTime', e.target.value)}
//                                 />
//                             </div>
//                         </td>
//                         <td>
//                             <div className="flex flex-col gap-2">
//                                 <label>End Time:</label>
//                                 <input
//                                     type="time"
//                                     value={examDetails.endTime}
//                                     onChange={(e) => updateExamDetail('endTime', e.target.value)}
//                                 />
//                             </div>
//                         </td>
//                     </tr>

//                     <tr>
//                         <td>
//                             <div className="flex flex-col gap-2">
//                                 <label>Exam Date:</label>
//                                 <input
//                                     type="date"
//                                     value={examDetails.examDate}
//                                     onChange={(e) => updateExamDetail('examDate', e.target.value)}
//                                 />
//                             </div>
//                         </td>
//                         <td>
//                             <div className="flex flex-col gap-2">
//                                 <label>Exam Code:</label>
//                                 <div className="flex items-center">
//                                     <input className="" type="text" readOnly value={examDetails.examCode} />
//                                     {id && (
//                                         <button type="button" onClick={generateExamCode}>
//                                             Generate Code
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         </td>
//                     </tr>
//                 </table>
//             </form>

//             <div className="evaluation-methods">
//                 {['pdf', 'reference', 'auto'].map((method) => (
//                     <span
//                         key={method}
//                         className={`method ${evaluationMethod === method ? 'active' : ''}`}
//                         onClick={() => setEvaluationMethod(method)}
//                     >
//                         {method.charAt(0).toUpperCase() + method.slice(1)}
//                     </span>
//                 ))}
//             </div>

//             {/* PDF Option */}
//             {evaluationMethod === 'pdf' && (
//                 <div>
//                     <h3>Upload PDF and Add Questions</h3>
//                     <label>Upload PDF:</label>
//                     <input type="file" accept=".pdf" onChange={handleFileUpload} />
//                     <div className="form-group">
//                         <label>Question:</label>
//                         <input
//                             type="text"
//                             value={currentPdfQuestion}
//                             onChange={(e) => setCurrentPdfQuestion(e.target.value)}
//                         />
//                         <button type="button" onClick={addPdfQuestion}>
//                             Add Question
//                         </button>
//                     </div>
//                     <ul>
//                         {pdfQuestions.map((q, index) => (
//                             <li key={index}>{q}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {/* Reference Option */}
//             {evaluationMethod === 'reference' && (
//                 <div>
//                     <h3>Add Questions with Reference Answers</h3>
//                     <div className="form-group">
//                         <label>Question:</label>
//                         <input
//                             type="text"
//                             value={currentReferenceQuestion}
//                             onChange={(e) => setCurrentReferenceQuestion(e.target.value)}
//                         />
//                         <label>Answer:</label>
//                         <input
//                             type="text"
//                             value={currentReferenceAnswer}
//                             onChange={(e) => setCurrentReferenceAnswer(e.target.value)}
//                         />
//                         <button type="button" onClick={addReferenceQuestion}>
//                             Add Question
//                         </button>
//                     </div>
//                     <ul>
//                         {referenceQuestions.map((q, index) => (
//                             <li key={index}>
//                                 {q.question} - {q.answer}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {/* Auto Option */}
//             {evaluationMethod === 'auto' && (
//                 <div>
//                     <h3>Select Questions Automatically</h3>
//                     <label>Chapter:</label>
//                     <select
//                         onChange={(e) => setSelectedChapter(e.target.value)}
//                         value={selectedChapter}
//                     >
//                         <option value="">Select Chapter</option>
//                         {chaptersData.map((chapter) => (
//                             <option key={chapter.name} value={chapter.name}>
//                                 {chapter.name}
//                             </option>
//                         ))}
//                     </select>
//                     {selectedChapter && (
//                         <>
//                             <label>Question:</label>
//                             <select
//                                 onChange={(e) => setSelectedQuestion(e.target.value)}
//                                 value={selectedQuestion}
//                             >
//                                 <option value="">Select Question</option>
//                                 {chaptersData
//                                     .find((chapter) => chapter.name === selectedChapter)
//                                     .questions.map((question, index) => (
//                                         <option key={index} value={question}>
//                                             {question}
//                                         </option>
//                                     ))}
//                             </select>
//                             <button type="button" onClick={addAutoQuestion}>
//                                 Add Question
//                             </button>
//                         </>
//                     )}
//                     <ul>
//                         {autoQuestions.map((q, index) => (
//                             <li key={index}>
//                                 {q.chapter} - {q.question}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             <div className="submit-section">
//                 <button type="button" onClick={handleSubmit}>
//                     {id ? 'Add Exam' : 'Update Exam'}
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default AddExam;
































// import { useState, useEffect } from "react";
// import "./AddExam.css";
// import axios from "axios";

// function AddExam({ mode = "add", existingExamData = null, onSubmit }) {
//   const [examDetails, setExamDetails] = useState({
//     name: "",
//     description: "",
//     examDate: "",
//     startTime: "",
//     endTime: "",
//     examCode: "",
//   });

//   const [evaluationMethod, setEvaluationMethod] = useState("pdf");
//   const [uploadedPdf, setUploadedPdf] = useState(null);
//   const [pdfQuestions, setPdfQuestions] = useState([]);
//   const [currentPdfQuestion, setCurrentPdfQuestion] = useState("");

//   const [referenceQuestions, setReferenceQuestions] = useState([]);
//   const [currentReferenceQuestion, setCurrentReferenceQuestion] = useState("");
//   const [currentReferenceAnswer, setCurrentReferenceAnswer] = useState("");

//   const [autoQuestions, setAutoQuestions] = useState([]);
//   const [selectedChapter, setSelectedChapter] = useState("");
//   const [selectedQuestion, setSelectedQuestion] = useState("");

//   const [errorMessage, setErrorMessage] = useState("");

//   // Dummy data for Auto option
//   const chaptersData = [
//     { name: "Chapter 1", questions: ["Question 1.1", "Question 1.2"] },
//     { name: "Chapter 2", questions: ["Question 2.1", "Question 2.2"] },
//     { name: "Chapter 3", questions: ["Question 3.1", "Question 3.2"] },
//   ];

//   // Load existing exam data when in edit mode
//   useEffect(() => {
//     if (mode === "edit" && existingExamData) {
//       setExamDetails({
//         name: existingExamData.name || "",
//         description: existingExamData.description || "",
//         examDate: existingExamData.examDate || "",
//         startTime: existingExamData.startTime || "",
//         endTime: existingExamData.endTime || "",
//         examCode: existingExamData.examCode || "",
//       });
//       setEvaluationMethod(existingExamData.evaluationMethod || "pdf");
//       setPdfQuestions(existingExamData.pdfQuestions || []);
//       setReferenceQuestions(existingExamData.referenceQuestions || []);
//       setAutoQuestions(existingExamData.autoQuestions || []);
//     }
//   }, [mode, existingExamData]);

//   const updateExamDetail = (key, value) => {
//     setExamDetails((prev) => ({ ...prev, [key]: value }));
//   };

//   const generateExamCode = () => {
//     const code = Math.random().toString(36).substring(2, 8).toUpperCase();
//     updateExamDetail("examCode", code);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type !== "application/pdf") {
//       setErrorMessage("Please upload a valid PDF file.");
//       setUploadedPdf(null);
//     } else {
//       setErrorMessage("");
//       setUploadedPdf(file);
//     }
//   };

//   const addPdfQuestion = () => {
//     if (!currentPdfQuestion.trim()) return;
//     setPdfQuestions((prev) => [...prev, currentPdfQuestion.trim()]);
//     setCurrentPdfQuestion("");
//   };

//   const addReferenceQuestion = () => {
//     if (!currentReferenceQuestion.trim() || !currentReferenceAnswer.trim())
//       return;
//     setReferenceQuestions((prev) => [
//       ...prev,
//       { question: currentReferenceQuestion, answer: currentReferenceAnswer },
//     ]);
//     setCurrentReferenceQuestion("");
//     setCurrentReferenceAnswer("");
//   };

//   const addAutoQuestion = () => {
//     if (!selectedChapter || !selectedQuestion) return;
//     setAutoQuestions((prev) => [
//       ...prev,
//       { chapter: selectedChapter, question: selectedQuestion },
//     ]);
//     setSelectedQuestion("");
//   };

// //   const handleSubmit = async () => {
// //     if (
// //       !examDetails.name ||
// //       !examDetails.description ||
// //       !examDetails.examDate ||
// //       !examDetails.startTime ||
// //       !examDetails.endTime ||
// //       !examDetails.examCode
// //     ) {
// //       setErrorMessage("Please fill in all required fields.");
// //       return;
// //     }

// //     const payload = {
// //       ...examDetails,
// //       evaluationMethod,
// //       pdfFile: uploadedPdf,
// //       ReferenceEvaluation:evaluationMethod,
// //       pdfQuestions: evaluationMethod === "pdf" ? pdfQuestions : [],
// //       referenceQuestions:
// //         evaluationMethod === "reference" ? referenceQuestions : [],
// //       autoQuestions: evaluationMethod === "auto" ? autoQuestions : [],
// //     };

// //     console.log(`${mode === "add" ? "Creating" : "Updating"} Exam:`, payload);
// //     alert(`${mode === "add" ? "Exam created" : "Exam updated"} successfully!`);

// //     // Call the onSubmit callback
// //     if (onSubmit) onSubmit(payload);

// //     // Reset form only in add mode
// //     if (mode === "add") {
// //       setExamDetails({
// //         name: "",
// //         description: "",
// //         examDate: "",
// //         startTime: "",
// //         endTime: "",
// //         examCode: "",
// //       });
// //       setUploadedPdf(null);
// //       setPdfQuestions([]);
// //       setCurrentPdfQuestion("");
// //       setReferenceQuestions([]);
// //       setCurrentReferenceQuestion("");
// //       setCurrentReferenceAnswer("");
// //       setAutoQuestions([]);
// //       setSelectedChapter("");
// //       setSelectedQuestion("");

// //       const response = await axios
// //         .post("http://localhost:5000/addexam", payload)
// //         .then((res) => {
// //           console.log(res); // Handle success
// //         })
// //         .catch((error) => {
// //           console.log(error); // Handle error
// //         });
// //         console.log(response);
        
// //     }
// //   };
// // const handleSubmit = async () => {
// //     if (
// //       !examDetails.name ||
// //       !examDetails.description ||
// //       !examDetails.examDate ||
// //       !examDetails.startTime ||
// //       !examDetails.endTime ||
// //       !examDetails.examCode
// //     ) {
// //       setErrorMessage("Please fill in all required fields.");
// //       return;
// //     }
  
// //     const payload = {
// //       ...examDetails,
// //       evaluationMethod,
// //       pdfFile: uploadedPdf,
// //       pdfQuestions: evaluationMethod === "pdf" ? pdfQuestions : [],
// //       referenceQuestions:
// //         evaluationMethod === "reference" ? referenceQuestions : [],
// //       autoQuestions: evaluationMethod === "auto" ? autoQuestions : [],
// //     };
  
// //     try {
// //       const response = await axios.post(
// //         "http://localhost:5000/addexam",
// //         payload,
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );
  
// //       console.log("Exam successfully created:", response.data);
// //       alert(`${mode === "add" ? "Exam created" : "Exam updated"} successfully!`);
      
// //       // Call the onSubmit callback
// //       if (onSubmit) onSubmit(payload);
  
// //       // Reset form only in add mode
// //       if (mode === "add") {
// //         setExamDetails({
// //           name: "",
// //           description: "",
// //           examDate: "",
// //           startTime: "",
// //           endTime: "",
// //           examCode: "",
// //         });
// //         setUploadedPdf(null);
// //         setPdfQuestions([]);
// //         setCurrentPdfQuestion("");
// //         setReferenceQuestions([]);
// //         setCurrentReferenceQuestion("");
// //         setCurrentReferenceAnswer("");
// //         setAutoQuestions([]);
// //         setSelectedChapter("");
// //         setSelectedQuestion("");
// //       }
// //     } catch (error) {
// //       console.error("Error creating exam:", error);
// //       setErrorMessage("An error occurred while creating the exam.");
// //     }
// //   };


// const handleSubmit = async () => {
//   if (
//     !examDetails.name ||
//     !examDetails.description ||
//     !examDetails.examDate ||
//     !examDetails.startTime ||
//     !examDetails.endTime ||
//     !examDetails.examCode
//   ) {
//     setErrorMessage("Please fill in all required fields.");
//     return;
//   }

//   const payload = {
//     ...examDetails,
//     evaluationMethod, // Evaluation method is sent as a separate field
//     evaluationData: {
//       pdfQuestions: evaluationMethod === "pdf" ? pdfQuestions : [],
//       referenceQuestions:
//         evaluationMethod === "reference" ? referenceQuestions : [],
//       autoQuestions: evaluationMethod === "auto" ? autoQuestions : [],
//       pdfFile: evaluationMethod === "pdf" ? uploadedPdf : null, // Include PDF file only for 'pdf' method
//     },
//   };

//   try {
//     const response = await axios.post(
//       "http://localhost:5000/addexam",
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Exam successfully created:", response.data);
//     alert(`${mode === "add" ? "Exam created" : "Exam updated"} successfully!`);

//     // Call the onSubmit callback
//     if (onSubmit) onSubmit(payload);

//     // Reset form only in add mode
//     if (mode === "add") {
//       setExamDetails({
//         name: "",
//         description: "",
//         examDate: "",
//         startTime: "",
//         endTime: "",
//         examCode: "",
//       });
//       setUploadedPdf(null);
//       setPdfQuestions([]);
//       setCurrentPdfQuestion("");
//       setReferenceQuestions([]);
//       setCurrentReferenceQuestion("");
//       setCurrentReferenceAnswer("");
//       setAutoQuestions([]);
//       setSelectedChapter("");
//       setSelectedQuestion("");
//     }
//   } catch (error) {
//     console.error("Error creating exam:", error);
//     setErrorMessage("An error occurred while creating the exam.");
//   }
// };


  
//   return (
//     <div className="addexam h-4/5 overflow-y-auto">
//       <div className="rounded-md m-4 p-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">
//             {mode === "add" ? "Add Exam" : "Edit Exam"}
//           </h1>
//         </div>
//       </div>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       <form className="exam-form max-w-full bg-white rounded-md shadow-md m-4 p-4">
//         <table className="w-full">
//           <tr>
//             <td>
//               <div className="flex flex-col gap-2">
//                 <label>Exam Name:</label>
//                 <input
//                   type="text"
//                   value={examDetails.name}
//                   onChange={(e) => updateExamDetail("name", e.target.value)}
//                 />
//               </div>
//             </td>
//             <td>
//               <div className="flex flex-col gap-2">
//                 <label>Exam Description:</label>
//                 <input
//                   value={examDetails.description}
//                   onChange={(e) =>
//                     updateExamDetail("description", e.target.value)
//                   }
//                 />
//               </div>
//             </td>
//           </tr>

//           <tr>
//             <td>
//               <div className="flex flex-col gap-2">
//                 <label>Start Time:</label>
//                 <input
//                   type="time"
//                   value={examDetails.startTime}
//                   onChange={(e) =>
//                     updateExamDetail("startTime", e.target.value)
//                   }
//                 />
//               </div>
//             </td>
//             <td>
//               <div className="flex flex-col gap-2">
//                 <label>End Time:</label>
//                 <input
//                   type="time"
//                   value={examDetails.endTime}
//                   onChange={(e) => updateExamDetail("endTime", e.target.value)}
//                 />
//               </div>
//             </td>
//           </tr>

//           <tr>
//             <td>
//               <div className="flex flex-col gap-2">
//                 <label>Exam Date:</label>
//                 <input
//                   type="date"
//                   value={examDetails.examDate}
//                   onChange={(e) => updateExamDetail("examDate", e.target.value)}
//                 />
//               </div>
//             </td>
//             <td>
//               <div className="flex flex-col gap-2">
//                 <label>Exam Code:</label>
//                 <div className="flex items-center">
//                   <input
//                     className=""
//                     type="text"
//                     readOnly
//                     value={examDetails.examCode}
//                   />
//                   {mode === "add" && (
//                     <button type="button" onClick={generateExamCode}>
//                       Generate Code
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </td>
//           </tr>
//         </table>
//       </form>

//       <div className="evaluation-methods">
//         {["pdf", "reference", "auto"].map((method) => (
//           <span
//             key={method}
//             className={`method ${evaluationMethod === method ? "active" : ""}`}
//             onClick={() => setEvaluationMethod(method)}
//           >
//             {method.charAt(0).toUpperCase() + method.slice(1)}
//           </span>
//         ))}
//       </div>

//       {/* PDF Option */}
//       {evaluationMethod === "pdf" && (
//         <div>
//           <h3>Upload PDF and Add Questions</h3>
//           <label>Upload PDF:</label>
//           <input type="file" accept=".pdf" onChange={handleFileUpload} />
//           <div className="form-group">
//             <label>Question:</label>
//             <input
//               type="text"
//               value={currentPdfQuestion}
//               onChange={(e) => setCurrentPdfQuestion(e.target.value)}
//             />
//             <button type="button" onClick={addPdfQuestion}>
//               Add Question
//             </button>
//           </div>
//           <ul>
//             {pdfQuestions.map((q, index) => (
//               <li key={index}>{q}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Reference Option */}
//       {evaluationMethod === "reference" && (
//         <div>
//           <h3>Add Questions with Reference Answers</h3>
//           <div className="form-group">
//             <label>Question:</label>
//             <input
//               type="text"
//               value={currentReferenceQuestion}
//               onChange={(e) => setCurrentReferenceQuestion(e.target.value)}
//             />
//             <label>Answer:</label>
//             <input
//               type="text"
//               value={currentReferenceAnswer}
//               onChange={(e) => setCurrentReferenceAnswer(e.target.value)}
//             />
//             <button type="button" onClick={addReferenceQuestion}>
//               Add Question
//             </button>
//           </div>
//           <ul>
//             {referenceQuestions.map((q, index) => (
//               <li key={index}>
//                 {q.question} - {q.answer}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Auto Option */}
//       {evaluationMethod === "auto" && (
//         <div>
//           <h3>Select Questions Automatically</h3>
//           <label>Chapter:</label>
//           <select
//             onChange={(e) => setSelectedChapter(e.target.value)}
//             value={selectedChapter}
//           >
//             <option value="">Select Chapter</option>
//             {chaptersData.map((chapter) => (
//               <option key={chapter.name} value={chapter.name}>
//                 {chapter.name}
//               </option>
//             ))}
//           </select>
//           {selectedChapter && (
//             <>
//               <label>Question:</label>
//               <select
//                 onChange={(e) => setSelectedQuestion(e.target.value)}
//                 value={selectedQuestion}
//               >
//                 <option value="">Select Question</option>
//                 {chaptersData
//                   .find((chapter) => chapter.name === selectedChapter)
//                   .questions.map((question, index) => (
//                     <option key={index} value={question}>
//                       {question}
//                     </option>
//                   ))}
//               </select>
//               <button type="button" onClick={addAutoQuestion}>
//                 Add Question
//               </button>
//             </>
//           )}
//           <ul>
//             {autoQuestions.map((q, index) => (
//               <li key={index}>
//                 {q.chapter} - {q.question}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="submit-section">
//         <button type="button" onClick={handleSubmit}>
//           {mode === "add" ? "Add Exam" : "Update Exam"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddExam;

// import { useState, useEffect } from "react";
// import "./AddExam.css";
// import axios from "axios";

// function AddExam({ mode = "add", existingExamData = null, onSubmit }) {
//   const [examDetails, setExamDetails] = useState({
//     name: "",
//     description: "",
//     examDate: "",
//     startTime: "",
//     endTime: "",
//     examCode: "",
//   });

//   const [evaluationMethod, setEvaluationMethod] = useState("pdf");
//   const [uploadedPdf, setUploadedPdf] = useState(null);
//   const [pdfQuestions, setPdfQuestions] = useState([]);
//   const [currentPdfQuestion, setCurrentPdfQuestion] = useState("");

//   const [referenceQuestions, setReferenceQuestions] = useState([]);
//   const [currentReferenceQuestion, setCurrentReferenceQuestion] = useState("");
//   const [currentReferenceAnswer, setCurrentReferenceAnswer] = useState("");

//   const [autoQuestions, setAutoQuestions] = useState([]);
//   const [selectedChapter, setSelectedChapter] = useState("");
//   const [selectedQuestion, setSelectedQuestion] = useState("");

//   const [errorMessage, setErrorMessage] = useState("");

//   // Dummy data for Auto option
//   const chaptersData = [
//     { name: "Chapter 1", questions: ["Question 1.1", "Question 1.2"] },
//     { name: "Chapter 2", questions: ["Question 2.1", "Question 2.2"] },
//     { name: "Chapter 3", questions: ["Question 3.1", "Question 3.2"] },
//   ];

//   // Load existing exam data when in edit mode
//   useEffect(() => {
//     if (mode === "edit" && existingExamData) {
//       setExamDetails({
//         name: existingExamData.name || "",
//         description: existingExamData.description || "",
//         examDate: existingExamData.examDate || "",
//         startTime: existingExamData.startTime || "",
//         endTime: existingExamData.endTime || "",
//         examCode: existingExamData.examCode || "",
//       });
//       setEvaluationMethod(existingExamData.evaluationMethod || "pdf");
//       setPdfQuestions(existingExamData.pdfQuestions || []);
//       setReferenceQuestions(existingExamData.referenceQuestions || []);
//       setAutoQuestions(existingExamData.autoQuestions || []);
//     }
//   }, [mode, existingExamData]);

//   const updateExamDetail = (key, value) => {
//     setExamDetails((prev) => ({ ...prev, [key]: value }));
//   };

//   const generateExamCode = () => {
//     const code = Math.random().toString(36).substring(2, 8).toUpperCase();
//     updateExamDetail("examCode", code);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type !== "application/pdf") {
//       setErrorMessage("Please upload a valid PDF file.");
//       setUploadedPdf(null);
//     } else {
//       setErrorMessage("");
//       setUploadedPdf(file);
//     }
//   };

//   const addPdfQuestion = () => {
//     if (!currentPdfQuestion.trim()) return;
//     setPdfQuestions((prev) => [...prev, currentPdfQuestion.trim()]);
//     setCurrentPdfQuestion("");
//   };

//   const addReferenceQuestion = () => {
//     if (!currentReferenceQuestion.trim() || !currentReferenceAnswer.trim())
//       return;
//     setReferenceQuestions((prev) => [
//       ...prev,
//       { question: currentReferenceQuestion, answer: currentReferenceAnswer },
//     ]);
//     setCurrentReferenceQuestion("");
//     setCurrentReferenceAnswer("");
//   };

//   const addAutoQuestion = () => {
//     if (!selectedChapter || !selectedQuestion) return;
//     setAutoQuestions((prev) => [
//       ...prev,
//       { chapter: selectedChapter, question: selectedQuestion },
//     ]);
//     setSelectedQuestion("");
//   };


// const handleSubmit = async () => {
//   if (
//     !examDetails.name ||
//     !examDetails.description ||
//     !examDetails.examDate ||
//     !examDetails.startTime ||
//     !examDetails.endTime ||
//     !examDetails.examCode
//   ) {
//     setErrorMessage("Please fill in all required fields.");
//     return;
//   }

//   const payload = {
//     ...examDetails,
//     evaluationMethod, // Evaluation method is sent as a separate field
//     evaluationData: {
//       pdfQuestions: evaluationMethod === "pdf" ? pdfQuestions : [],
//       referenceQuestions:
//         evaluationMethod === "reference" ? referenceQuestions : [],
//       autoQuestions: evaluationMethod === "auto" ? autoQuestions : [],
//       pdfFile: evaluationMethod === "pdf" ? uploadedPdf : null, // Include PDF file only for 'pdf' method
//     },
//   };

//   try {
//     const response = await axios.post(
//       "http://localhost:5000/addexam",
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Exam successfully created:", response.data);
//     alert(`${mode === "add" ? "Exam created" : "Exam updated"} successfully!`);

//     // Call the onSubmit callback
//     if (onSubmit) onSubmit(payload);

//     // Reset form only in add mode
//     if (mode === "add") {
//       setExamDetails({
//         name: "",
//         description: "",
//         examDate: "",
//         startTime: "",
//         endTime: "",
//         examCode: "",
//       });
//       setUploadedPdf(null);
//       setPdfQuestions([]);
//       setCurrentPdfQuestion("");
//       setReferenceQuestions([]);
//       setCurrentReferenceQuestion("");
//       setCurrentReferenceAnswer("");
//       setAutoQuestions([]);
//       setSelectedChapter("");
//       setSelectedQuestion("");
//     }
//   } catch (error) {
//     console.error("Error creating exam:", error);
//     setErrorMessage("An error occurred while creating the exam.");
//   }
// };


  
//   return (
//     <div className="addexam h-4/5 overflow-y-auto">
//       <div className="rounded-md m-4 p-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">
//             {mode === "add" ? "Add Exam" : "Edit Exam"}
//           </h1>
//         </div>
//       </div>
//       {errorMessage && <p className="error-message">{errorMessage}</p>}

//       <form className="exam-form max-w-full bg-white rounded-md shadow-md m-4 p-4">
//         <table className="w-full">
//           <tr>
//             <td>
//               <div className="flex flex-col gap-2">
//                 <label>Exam Name:</label>
//                 <input
//                   type="text"
//                   value={examDetails.name}
//                   onChange={(e) => updateExamDetail("name", e.target.value)}
//                 />
//               </div>
//             </td>
//             <td>
//               <div className="flex flex-col gap-2">
//                 <label>Exam Description:</label>
//                 <input
//                   value={examDetails.description}
//                   onChange={(e) =>
//                     updateExamDetail("description", e.target.value)
//                   }
//                 />
//               </div>
//             </td>
//           </tr>

//           <tr>
//             <td>
//               <div className="flex flex-col gap-2">
//                 <label>Start Time:</label>
//                 <input
//                   type="time"
//                   value={examDetails.startTime}
//                   onChange={(e) =>
//                     updateExamDetail("startTime", e.target.value)
//                   }
//                 />
//               </div>
//             </td>
//             <td>
//               <div className="flex flex-col gap-2">
//                 <label>End Time:</label>
//                 <input
//                   type="time"
//                   value={examDetails.endTime}
//                   onChange={(e) => updateExamDetail("endTime", e.target.value)}
//                 />
//               </div>
//             </td>
//           </tr>

//           <tr>
//             <td>
//               <div className="flex flex-col gap-2">
//                 <label>Exam Date:</label>
//                 <input
//                   type="date"
//                   value={examDetails.examDate}
//                   onChange={(e) => updateExamDetail("examDate", e.target.value)}
//                 />
//               </div>
//             </td>
//             <td>
//               <div className="flex flex-col gap-2">
//                 <label>Exam Code:</label>
//                 <div className="flex items-center">
//                   <input
//                     className=""
//                     type="text"
//                     readOnly
//                     value={examDetails.examCode}
//                   />
//                   {mode === "add" && (
//                     <button type="button" onClick={generateExamCode}>
//                       Generate Code
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </td>
//           </tr>
//         </table>
//       </form>

//       <div className="evaluation-methods">
//         {["pdf", "reference", "auto"].map((method) => (
//           <span
//             key={method}
//             className={`method ${evaluationMethod === method ? "active" : ""}`}
//             onClick={() => setEvaluationMethod(method)}
//           >
//             {method.charAt(0).toUpperCase() + method.slice(1)}
//           </span>
//         ))}
//       </div>

//       {/* PDF Option */}
//       {evaluationMethod === "pdf" && (
//         <div>
//           <h3>Upload PDF and Add Questions</h3>
//           <label>Upload PDF:</label>
//           <input type="file" accept=".pdf" onChange={handleFileUpload} />
//           <div className="form-group">
//             <label>Question:</label>
//             <input
//               type="text"
//               value={currentPdfQuestion}
//               onChange={(e) => setCurrentPdfQuestion(e.target.value)}
//             />
//             <button type="button" onClick={addPdfQuestion}>
//               Add Question
//             </button>
//           </div>
//           <ul>
//             {pdfQuestions.map((q, index) => (
//               <li key={index}>{q}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Reference Option */}
//       {evaluationMethod === "reference" && (
//         <div>
//           <h3>Add Questions with Reference Answers</h3>
//           <div className="form-group">
//             <label>Question:</label>
//             <input
//               type="text"
//               value={currentReferenceQuestion}
//               onChange={(e) => setCurrentReferenceQuestion(e.target.value)}
//             />
//             <label>Answer:</label>
//             <input
//               type="text"
//               value={currentReferenceAnswer}
//               onChange={(e) => setCurrentReferenceAnswer(e.target.value)}
//             />
//             <button type="button" onClick={addReferenceQuestion}>
//               Add Question
//             </button>
//           </div>
//           <ul>
//             {referenceQuestions.map((q, index) => (
//               <li key={index}>
//                 {q.question} - {q.answer}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Auto Option */}
//       {evaluationMethod === "auto" && (
//         <div>
//           <h3>Select Questions Automatically</h3>
//           <label>Chapter:</label>
//           <select
//             onChange={(e) => setSelectedChapter(e.target.value)}
//             value={selectedChapter}
//           >
//             <option value="">Select Chapter</option>
//             {chaptersData.map((chapter) => (
//               <option key={chapter.name} value={chapter.name}>
//                 {chapter.name}
//               </option>
//             ))}
//           </select>
//           {selectedChapter && (
//             <>
//               <label>Question:</label>
//               <select
//                 onChange={(e) => setSelectedQuestion(e.target.value)}
//                 value={selectedQuestion}
//               >
//                 <option value="">Select Question</option>
//                 {chaptersData
//                   .find((chapter) => chapter.name === selectedChapter)
//                   .questions.map((question, index) => (
//                     <option key={index} value={question}>
//                       {question}
//                     </option>
//                   ))}
//               </select>
//               <button type="button" onClick={addAutoQuestion}>
//                 Add Question
//               </button>
//             </>
//           )}
//           <ul>
//             {autoQuestions.map((q, index) => (
//               <li key={index}>
//                 {q.chapter} - {q.question}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="submit-section">
//         <button type="button" onClick={handleSubmit}>
//           {mode === "add" ? "Add Exam" : "Update Exam"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AddExam;













import { useState, useEffect } from "react";
import axios from "axios";

function AddExam({ mode = "add", existingExamData = null, onSubmit }) {
  const [examDetails, setExamDetails] = useState({
    name: "",
    description: "",
    examDate: "",
    startTime: "",
    endTime: "",
    examCode: "",
    totalMarks: 0,
    evaluationType: "pdf",
    evaluationData: []
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Dummy data for Auto option
  const chaptersData = [
    { name: "Chapter 1", questions: ["Question 1.1", "Question 1.2"] },
    { name: "Chapter 2", questions: ["Question 2.1", "Question 2.2"] },
    { name: "Chapter 3", questions: ["Question 3.1", "Question 3.2"] },
  ];

  // Load existing exam data when in edit mode
  useEffect(() => {
    if (mode === "edit" && existingExamData) {
      setExamDetails({
        name: existingExamData.name || "",
        description: existingExamData.description || "",
        examDate: existingExamData.examDate || "",
        startTime: existingExamData.startTime || "",
        endTime: existingExamData.endTime || "",
        examCode: existingExamData.examCode || "",
        totalMarks: existingExamData.totalMarks || 0,
        evaluationType: existingExamData.evaluationType || "pdf",
        evaluationData: existingExamData.evaluationData || []
      });
    }
  }, [mode, existingExamData]);

  const updateExamDetail = (key, value) => {
    setExamDetails((prev) => ({ ...prev, [key]: value }));
  };

  const generateExamCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    updateExamDetail("examCode", code);
  };

  const addEvaluationData = () => {
    const newQuestion = {
      question: "",
      marks: 0,
      chapter: examDetails.evaluationType === "auto" ? selectedChapter : "",
      answer: examDetails.evaluationType === "reference" ? currentAnswer : ""
    };

    updateExamDetail("evaluationData", [
      ...examDetails.evaluationData, 
      newQuestion
    ]);
  };

  const updateEvaluationData = (index, field, value) => {
    const updatedEvaluationData = [...examDetails.evaluationData];
    updatedEvaluationData[index][field] = value;
    
    updateExamDetail("evaluationData", updatedEvaluationData);
  };

  const removeEvaluationData = (index) => {
    const updatedEvaluationData = examDetails.evaluationData.filter((_, i) => i !== index);
    updateExamDetail("evaluationData", updatedEvaluationData);
  };

  // State for adding questions dynamically
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentMarks, setCurrentMarks] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  const handleSubmit = async () => {
    // Validation
    if (
      !examDetails.name ||
      !examDetails.description ||
      !examDetails.examDate ||
      !examDetails.startTime ||
      !examDetails.endTime ||
      !examDetails.examCode ||
      examDetails.totalMarks <= 0 ||
      examDetails.evaluationData.length === 0
    ) {
      setErrorMessage("Please fill in all required fields and add at least one question.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/addexam",
        examDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Exam successfully created:", response.data);
      alert(`${mode === "add" ? "Exam created" : "Exam updated"} successfully!`);

      // Call the onSubmit callback
      if (onSubmit) onSubmit(examDetails);

      // Reset form only in add mode
      if (mode === "add") {
        setExamDetails({
          name: "",
          description: "",
          examDate: "",
          startTime: "",
          endTime: "",
          examCode: "",
          totalMarks: 0,
          evaluationType: "pdf",
          evaluationData: []
        });
      }
    } catch (error) {
      console.error("Error creating exam:", error);
      setErrorMessage("An error occurred while creating the exam.");
    }
  };

  return (
    <div className="addexam h-4/5 overflow-y-auto">
      <div className="rounded-md m-4 p-4">
        <h1 className="text-2xl font-bold">
          {mode === "add" ? "Add Exam" : "Edit Exam"}
        </h1>
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <form className="exam-form max-w-full bg-white rounded-md shadow-md m-4 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2">Exam Name:</label>
            <input
              type="text"
              value={examDetails.name}
              onChange={(e) => updateExamDetail("name", e.target.value)}
              className="border p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2">Exam Description:</label>
            <input
              value={examDetails.description}
              onChange={(e) => updateExamDetail("description", e.target.value)}
              className="border p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2">Start Time:</label>
            <input
              type="time"
              value={examDetails.startTime}
              onChange={(e) => updateExamDetail("startTime", e.target.value)}
              className="border p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2">End Time:</label>
            <input
              type="time"
              value={examDetails.endTime}
              onChange={(e) => updateExamDetail("endTime", e.target.value)}
              className="border p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2">Exam Date:</label>
            <input
              type="date"
              value={examDetails.examDate}
              onChange={(e) => updateExamDetail("examDate", e.target.value)}
              className="border p-2"
            />
          </div>

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
                  Generate Code
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2">Total Marks:</label>
            <input
              type="number"
              value={examDetails.totalMarks}
              onChange={(e) => updateExamDetail("totalMarks", parseInt(e.target.value))}
              className="border p-2"
              min="0"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2">Evaluation Type:</label>
            <select
              value={examDetails.evaluationType}
              onChange={(e) => updateExamDetail("evaluationType", e.target.value)}
              className="border p-2"
            >
              <option value="pdf">PDF</option>
              <option value="reference">Reference</option>
              <option value="auto">Automatic</option>
            </select>
          </div>
        </div>
      </form>

      {/* Questions Section */}
      <div className="m-4 p-4 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Exam Questions</h2>
        
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
          
          {examDetails.evaluationType === "auto" && (
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="border p-2"
            >
              <option value="">Select Chapter</option>
              {chaptersData.map((chapter) => (
                <option key={chapter.name} value={chapter.name}>
                  {chapter.name}
                </option>
              ))}
            </select>
          )}
          
          {examDetails.evaluationType === "reference" && (
            <input
              type="text"
              placeholder="Reference Answer"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              className="border p-2"
            />
          )}
          
          <button 
            onClick={() => {
              if (!currentQuestion || currentMarks <= 0) return;
              
              const newQuestion = {
                question: currentQuestion,
                marks: currentMarks,
                chapter: examDetails.evaluationType === "auto" ? selectedChapter : "",
                answer: examDetails.evaluationType === "reference" ? currentAnswer : ""
              };
              
              updateExamDetail("evaluationData", [...examDetails.evaluationData, newQuestion]);
              
              // Reset inputs
              setCurrentQuestion("");
              setCurrentMarks(0);
              setSelectedChapter("");
              setCurrentAnswer("");
            }}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add Question
          </button>
        </div>

        {/* Questions List */}
        <div>
          <h3 className="font-bold mb-2">Added Questions</h3>
          {examDetails.evaluationData.map((q, index) => (
            <div key={index} className="flex items-center mb-2 p-2 bg-gray-100 rounded">
              <div className="flex-grow">
                <p><strong>Question:</strong> {q.question}</p>
                <p><strong>Marks:</strong> {q.marks}</p>
                {q.chapter && <p><strong>Chapter:</strong> {q.chapter}</p>}
                {q.answer && <p><strong>Answer:</strong> {q.answer}</p>}
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

      <div className="m-4">
        <button 
          onClick={handleSubmit}
          className="bg-blue-600 text-white p-2 rounded w-full"
        >
          {mode === "add" ? "Add Exam" : "Update Exam"}
        </button>
      </div>
    </div>
  );
}

export default AddExam;