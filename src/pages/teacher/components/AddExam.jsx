// import { useState } from 'react';
// import './AddExam.css';

// function AddExam() {
//     // State for exam details
//     const [examDetails, setExamDetails] = useState({
//         name: '',
//         description: '',
//         startTime: '',
//         endTime: '',
//         examDate: '',
//         examCode: '',
//     });

//     // State for questions
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestion, setCurrentQuestion] = useState({ text: '', answer: '' });

//     // Evaluation method state
//     const [evaluationMethod, setEvaluationMethod] = useState('pdf');
//     const [uploadedPdf, setUploadedPdf] = useState(null); // For the PDF upload method
//     const [selectedChapter, setSelectedChapter] = useState("");
//     const [selectedQuestion, setSelectedQuestion] = useState("");
//     const [selectedQuestionsList, setSelectedQuestionsList] = useState([]);

//     const data = {
//         chapters: [
//             {
//                 title: "Introduction to Programming",
//                 questions: [
//                     "What is the difference between a compiler and an interpreter?",
//                     "Explain the concept of variables and data types in programming.",
//                 ],
//             },
//             {
//                 title: "Data Structures",
//                 questions: [
//                     "What is the difference between an array and a linked list?",
//                     "Explain the concept of a stack and provide a real-world example where it is used.",
//                 ],
//             },
//         ],
//     };

//     // Generate a random 6-character exam code
//     const generateExamCode = () => {
//         const code = Math.random().toString(36).substring(2, 8).toUpperCase();
//         setExamDetails({ ...examDetails, examCode: code });
//     };

//     // Handle chapter change
//     const handleChapterChange = (event) => {
//         setSelectedChapter(event.target.value);
//         setSelectedQuestion(""); // Reset question dropdown when chapter changes
//     };

//     // Handle question change
//     const handleQuestionChange = (event) => {
//         setSelectedQuestion(event.target.value);
//     };

//     // Add selected question to the list
//     const addQuestionToList = () => {
//         if (selectedQuestion && !selectedQuestionsList.includes(selectedQuestion)) {
//             setSelectedQuestionsList([...selectedQuestionsList, selectedQuestion]);
//         }
//     };

//     // Get questions for the selected chapter
//     const getQuestionsForSelectedChapter = () => {
//         const chapter = data.chapters.find((c) => c.title === selectedChapter);
//         return chapter ? chapter.questions : [];
//     };

//     // Add a question for short-answer reference
//     const addQuestion = () => {
//         if (!currentQuestion.text || !currentQuestion.answer) {
//             alert("Both question and reference answer are required!");
//             return;
//         }
//         setQuestions([...questions, currentQuestion]);
//         setCurrentQuestion({ text: '', answer: '' });
//     };

//     // Handle file upload for PDF
//     const handleFileUpload = (e) => {
//         setUploadedPdf(e.target.files[0]);
//     };

//     // Handle exam submission
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!examDetails.name || !examDetails.description || !examDetails.examCode) {
//             alert("Please fill in all exam details!");
//             return;
//         }

//         const payload = {
//             ...examDetails,
//             evaluationMethod,
//             questions: evaluationMethod === 'reference' ? questions : [],
//             pdfFile: evaluationMethod === 'pdf' ? uploadedPdf : null,
//             chapterQuestions: evaluationMethod === 'auto' ? selectedQuestionsList : [],
//         };

//         console.log("Exam Data:", payload);
//         alert("Exam created successfully!");
//     };

//     return (
//         <div className="addexam h-4/5 overflow-y-auto">
//             <div className="rounded-md m-4 p-4">
//                 <h1 className="text-2xl font-bold">Add Exam</h1>
//             </div>

//             <form className="max-w-full bg-white rounded-md shadow-md m-4 p-4">
//                 <div>
//                     <label>Exam Name:</label>
//                     <input
//                         type="text"
//                         placeholder="Enter exam name"
//                         value={examDetails.name}
//                         onChange={(e) => setExamDetails({ ...examDetails, name: e.target.value })}
//                     />
//                 </div>

//                 <div>
//                     <label>Exam Description:</label>
//                     <textarea
//                         placeholder="Enter exam description"
//                         value={examDetails.description}
//                         onChange={(e) => setExamDetails({ ...examDetails, description: e.target.value })}
//                     />
//                 </div>

//                 <div>
//                     <label>Start Time:</label>
//                     <input
//                         type="time"
//                         value={examDetails.startTime}
//                         onChange={(e) => setExamDetails({ ...examDetails, startTime: e.target.value })}
//                     />
//                 </div>

//                 <div>
//                     <label>Exam Date:</label>
//                     <input
//                         type="date"
//                         value={examDetails.examDate}
//                         onChange={(e) => setExamDetails({ ...examDetails, examDate: e.target.value })}
//                     />
//                 </div>

//                 <div>
//                     <button type="button" onClick={generateExamCode}>
//                         Generate Code
//                     </button>
//                     <input type="text" readOnly value={examDetails.examCode} />
//                 </div>
//             </form>

//             <h2 className="text-2xl font-bold">Select Evaluation Method</h2>
//             <div>
//                 <span onClick={() => setEvaluationMethod('pdf')}>PDF</span>
//                 <span onClick={() => setEvaluationMethod('reference')}>Reference</span>
//                 <span onClick={() => setEvaluationMethod('auto')}>Auto</span>
//             </div>

//             {evaluationMethod === 'pdf' && (
//                 <div>
//                     <label>Upload PDF:</label>
//                     <input type="file" accept=".pdf" onChange={handleFileUpload} />
//                 </div>
//             )}

//             {evaluationMethod === 'reference' && (
//                 <div>
//                     <textarea
//                         placeholder="Question"
//                         value={currentQuestion.text}
//                         onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
//                     />
//                     <textarea
//                         placeholder="Reference Answer"
//                         value={currentQuestion.answer}
//                         onChange={(e) => setCurrentQuestion({ ...currentQuestion, answer: e.target.value })}
//                     />
//                     <button onClick={addQuestion}>Add Question</button>
//                     <ul>
//                         {questions.map((q, index) => (
//                             <li key={index}>
//                                 <strong>{q.text}</strong>: {q.answer}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             {evaluationMethod === 'auto' && (
//                 <div>
//                     <select value={selectedChapter} onChange={handleChapterChange}>
//                         <option value="">Select Chapter</option>
//                         {data.chapters.map((chapter, index) => (
//                             <option key={index} value={chapter.title}>
//                                 {chapter.title}
//                             </option>
//                         ))}
//                     </select>
//                     {selectedChapter && (
//                         <select value={selectedQuestion} onChange={handleQuestionChange}>
//                             <option value="">Select Question</option>
//                             {getQuestionsForSelectedChapter().map((question, index) => (
//                                 <option key={index} value={question}>
//                                     {question}
//                                 </option>
//                             ))}
//                         </select>
//                     )}
//                     <button onClick={addQuestionToList}>Add</button>
//                     <ul>
//                         {selectedQuestionsList.map((q, index) => (
//                             <li key={index}>{q}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//             <button onClick={handleSubmit}>Submit Exam</button>
//         </div>
//     );
// }

// export default AddExam;


import { useState } from 'react';
import './AddExam.css';

function AddExam() {
    const [examDetails, setExamDetails] = useState({
        name: '',
        description: '',
        examDate: '',
        startTime: '',
        endTime: '',
        examCode: '',
    });

    const [evaluationMethod, setEvaluationMethod] = useState('pdf');
    const [uploadedPdf, setUploadedPdf] = useState(null);
    const [pdfQuestions, setPdfQuestions] = useState([]);
    const [currentPdfQuestion, setCurrentPdfQuestion] = useState('');

    const [referenceQuestions, setReferenceQuestions] = useState([]);
    const [currentReferenceQuestion, setCurrentReferenceQuestion] = useState('');
    const [currentReferenceAnswer, setCurrentReferenceAnswer] = useState('');

    const [autoQuestions, setAutoQuestions] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    // Dummy data for Auto option
    const chaptersData = [
        { name: 'Chapter 1', questions: ['Question 1.1', 'Question 1.2'] },
        { name: 'Chapter 2', questions: ['Question 2.1', 'Question 2.2'] },
        { name: 'Chapter 3', questions: ['Question 3.1', 'Question 3.2'] },
    ];

    const updateExamDetail = (key, value) => {
        setExamDetails((prev) => ({ ...prev, [key]: value }));
    };

    const generateExamCode = () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        updateExamDetail('examCode', code);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type !== 'application/pdf') {
            setErrorMessage('Please upload a valid PDF file.');
            setUploadedPdf(null);
        } else {
            setErrorMessage('');
            setUploadedPdf(file);
        }
    };

    const addPdfQuestion = () => {
        if (!currentPdfQuestion.trim()) return;
        setPdfQuestions((prev) => [...prev, currentPdfQuestion.trim()]);
        setCurrentPdfQuestion('');
    };

    const addReferenceQuestion = () => {
        if (!currentReferenceQuestion.trim() || !currentReferenceAnswer.trim()) return;
        setReferenceQuestions((prev) => [
            ...prev,
            { question: currentReferenceQuestion, answer: currentReferenceAnswer },
        ]);
        setCurrentReferenceQuestion('');
        setCurrentReferenceAnswer('');
    };

    const addAutoQuestion = () => {
        if (!selectedChapter || !selectedQuestion) return;
        setAutoQuestions((prev) => [
            ...prev,
            { chapter: selectedChapter, question: selectedQuestion },
        ]);
        setSelectedQuestion('');
    };

    const handleSubmit = () => {
        if (
            !examDetails.name ||
            !examDetails.description ||
            !examDetails.examDate ||
            !examDetails.startTime ||
            !examDetails.endTime ||
            !examDetails.examCode
        ) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        const payload = {
            ...examDetails,
            evaluationMethod,
            pdfFile: uploadedPdf,
            pdfQuestions: evaluationMethod === 'pdf' ? pdfQuestions : [],
            referenceQuestions: evaluationMethod === 'reference' ? referenceQuestions : [],
            autoQuestions: evaluationMethod === 'auto' ? autoQuestions : [],
        };

        console.log('Exam Data:', payload);
        alert('Exam created successfully!');
        // Reset form
        setExamDetails({
            name: '',
            description: '',
            examDate: '',
            startTime: '',
            endTime: '',
            examCode: '',
        });
        setUploadedPdf(null);
        setPdfQuestions([]);
        setCurrentPdfQuestion('');
        setReferenceQuestions([]);
        setCurrentReferenceQuestion('');
        setCurrentReferenceAnswer('');
        setAutoQuestions([]);
        setSelectedChapter('');
        setSelectedQuestion('');
    };

    return (
        <div className="addexam h-4/5 overflow-y-auto">
            {/* <div className="header">
                <h1 className="text-2xl font-bold">Add Exam</h1>
            </div> */}
            <div className="">
      <div className="rounded-md m-4 p-4">
        <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add Exam</h1>
        </div>
      </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}


            <form className="exam-form max-w-full bg-white rounded-md shadow-md m-4 p-4 ">

            <table className="w-full">
         
            <tr>
              <td>
                <div className="flex flex-col gap-2">
                <label>Exam Name:</label>
                    <input
                        type="text"
                        value={examDetails.name}
                        onChange={(e) => updateExamDetail('name', e.target.value)}
                    />
                </div>
              </td>
              <td>
                <div className="flex flex-col gap-2">
                <label>Exam Description:</label>
                    <input
                        value={examDetails.description}
                        onChange={(e) => updateExamDetail('description', e.target.value)}
                    />
                </div>
              </td>
            </tr>


            <tr>
              <td>
                <div className="flex flex-col gap-2">
                <label>Start Time:</label>
                    <input
                        type="time"
                        value={examDetails.startTime}
                        onChange={(e) => updateExamDetail('startTime', e.target.value)}
                    />
                </div>
              </td>
              <td>
                <div className="flex flex-col gap-2">
                <label>End Time:</label>
                    <input
                        type="time"
                        value={examDetails.endTime}
                        onChange={(e) => updateExamDetail('endTime', e.target.value)}
                    />
                </div>
              </td>
            </tr>





            <tr>
              <td>
                <div className="flex flex-col gap-2">
                <label>Exam Date:</label>
                    <input
                        type="date"
                        value={examDetails.examDate}
                        onChange={(e) => updateExamDetail('examDate', e.target.value)}
                    />
                </div>
              </td>
              <td>
                <div className="flex flex-col gap-2">
                <label>Exam Code:</label>
                
                   <div className='flex items-center'>
                    <input className='' type="text" readOnly value={examDetails.examCode} />
                    <button type="button" onClick={generateExamCode}>
                        Generate Code
                    </button>
                    </div>
                </div>
              </td>
            </tr>












            </table>
               
            </form>

            <div className="evaluation-methods">
                {['pdf', 'reference', 'auto'].map((method) => (
                    <span
                        key={method}
                        className={`method ${evaluationMethod === method ? 'active' : ''}`}
                        onClick={() => setEvaluationMethod(method)}
                    >
                        {method.charAt(0).toUpperCase() + method.slice(1)}
                    </span>
                ))}
            </div>

            {/* PDF Option */}
            {evaluationMethod === 'pdf' && (
                <div>
                    <h3>Upload PDF and Add Questions</h3>
                    <label>Upload PDF:</label>
                    <input type="file" accept=".pdf" onChange={handleFileUpload} />
                    <div className="form-group">
                        <label>Question:</label>
                        <textarea
                            placeholder="Enter your question"
                            value={currentPdfQuestion}
                            onChange={(e) => setCurrentPdfQuestion(e.target.value)}
                        />
                    </div>
                    <button type="button" onClick={addPdfQuestion} disabled={!uploadedPdf}>
                        Add Question
                    </button>
                    <ul>
                        {pdfQuestions.map((question, index) => (
                            <li key={index}>{question}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Reference Option */}
            {evaluationMethod === 'reference' && (
                <div>
                    <h3>Add Questions and Reference Answers</h3>
                    <div className="form-group">
                        <label>Question:</label>
                        <textarea
                            placeholder="Enter your question"
                            value={currentReferenceQuestion}
                            onChange={(e) => setCurrentReferenceQuestion(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Reference Answer:</label>
                        <textarea
                            placeholder="Enter reference answer"
                            value={currentReferenceAnswer}
                            onChange={(e) => setCurrentReferenceAnswer(e.target.value)}
                        />
                    </div>
                    <button type="button" onClick={addReferenceQuestion}>
                        Add Question
                    </button>
                    <ul>
                        {referenceQuestions.map((item, index) => (
                            <li key={index}>
                                <b>Q:</b> {item.question} <br />
                                <b>A:</b> {item.answer}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Auto Option */}
            {evaluationMethod === 'auto' && (
                <div>
                    <h3>Select Chapters and Questions</h3>
                    <div className="form-group">
                        <label>Chapter:</label>
                        <select
                            value={selectedChapter}
                            onChange={(e) => {
                                setSelectedChapter(e.target.value);
                                setSelectedQuestion('');
                            }}
                        >
                            <option value="">Select Chapter</option>
                            {chaptersData.map((chapter, index) => (
                                <option key={index} value={chapter.name}>
                                    {chapter.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {selectedChapter && (
                        <div className="form-group">
                            <label>Question:</label>
                            <select
                                value={selectedQuestion}
                                onChange={(e) => setSelectedQuestion(e.target.value)}
                            >
                                <option value="">Select Question</option>
                                {chaptersData
                                    .find((chapter) => chapter.name === selectedChapter)
                                    .questions.map((question, index) => (
                                        <option key={index} value={question}>
                                            {question}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={addAutoQuestion}
                        disabled={!selectedChapter || !selectedQuestion}
                    >
                        Add Question
                    </button>
                    <ul>
                        {autoQuestions.map((item, index) => (
                            <li key={index}>
                                <b>Chapter:</b> {item.chapter}, <b>Question:</b> {item.question}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button type="button" onClick={handleSubmit}>
                Submit Exam
            </button>
            </div>
        </div>
    );
}

export default AddExam;










 {/* Exam Details */}
//  <div className="form-group">
//  <label>Exam Name:</label>
//  <input
//      type="text"
//      value={examDetails.name}
//      onChange={(e) => updateExamDetail('name', e.target.value)}
//  />
// </div>
// <div className="form-group">
//  <label>Exam Description:</label>
//  <textarea
//      value={examDetails.description}
//      onChange={(e) => updateExamDetail('description', e.target.value)}
//  ></textarea>
// </div>
// <div className="form-group">
//  <label>Exam Date:</label>
//  <input
//      type="date"
//      value={examDetails.examDate}
//      onChange={(e) => updateExamDetail('examDate', e.target.value)}
//  />
// </div>
// <div className="form-group">
//  <label>Start Time:</label>
//  <input
//      type="time"
//      value={examDetails.startTime}
//      onChange={(e) => updateExamDetail('startTime', e.target.value)}
//  />
// </div>
// <div className="form-group">
//  <label>End Time:</label>
//  <input
//      type="time"
//      value={examDetails.endTime}
//      onChange={(e) => updateExamDetail('endTime', e.target.value)}
//  />
// </div>
// <div className="form-group">
//  <label>Exam Code:</label>
//  <button type="button" onClick={generateExamCode}>
//      Generate Code
//  </button>
//  <input type="text" readOnly value={examDetails.examCode} />
// </div>