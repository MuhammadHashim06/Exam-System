// import  { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const ExamDetail = () => {
//   const { examID } = useParams(); // Extract examID from the route parameters
//   const [examData, setExamData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch exam details from the API
//     const fetchExamData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/exam/${examID}` // Replace with your API endpoint
//         );
//         setExamData(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch exam details.");
//         setLoading(false);
//       }
//     };

//     fetchExamData();
//   }, [examID]);

//   if (loading) {
//     return <div className="text-center text-xl font-bold">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 text-xl font-bold">{error}</div>
//     );
//   }

//   return (
//     <div className="h-4/5 overflow-y-auto" >
//     <div className="min-h-screen bg-gray-100 py-8">
//       <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
//         <h1 className="text-3xl font-bold text-center mb-6">Exam Details</h1>

//         <div className="mb-6">
//           <p className="text-lg font-semibold text-gray-700">
//             <strong>Name:</strong> {examData.name}
//           </p>
//           <p className="text-lg font-semibold text-gray-700">
//             <strong>Description:</strong> {examData.description}
//           </p>
//           <p className="text-lg font-semibold text-gray-700">
//             <strong>Exam Date:</strong>{" "}
//             {new Date(examData.examDate.$date).toLocaleDateString()}
//           </p>
//           <p className="text-lg font-semibold text-gray-700">
//             <strong>Start Time:</strong> {examData.startTime}
//           </p>
//           <p className="text-lg font-semibold text-gray-700">
//             <strong>End Time:</strong> {examData.endTime}
//           </p>
//           <p className="text-lg font-semibold text-gray-700">
//             <strong>Exam Code:</strong> {examData.examCode}
//           </p>
//           <p className="text-lg font-semibold text-gray-700">
//             <strong>Total Marks:</strong> {examData.totalMarks}
//           </p>
//           <p className="text-lg font-semibold text-gray-700">
//             <strong>Evaluation Type:</strong> {examData.evaluationType}
//           </p>
//         </div>

//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Evaluation Details
//           </h2>
//           <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 px-4 py-2 bg-gray-100">
//                   Question
//                 </th>
//                 <th className="border border-gray-300 px-4 py-2 bg-gray-100">
//                   Marks
//                 </th>
//                 <th className="border border-gray-300 px-4 py-2 bg-gray-100">
//                   Chapter
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {examData.evaluationData.map((evaluation) => (
//                 <tr key={evaluation._id.$oid}>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {evaluation.question}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {evaluation.marks}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {evaluation.chapter || "N/A"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ExamDetail;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ExamDetail = () => {
  const { examID } = useParams(); // Extract examID from the route parameters
  const navigate = useNavigate(); // For redirection after delete
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch exam details from the API
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/exam/${examID}` // Replace with your API endpoint
        );
        setExamData(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch exam details.");
        setLoading(false);
      }
    };

    fetchExamData();
  }, [examID]);

  // Handle delete exam
  const handleDeleteExam = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this exam?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/exam/delete/${examID}`); // Replace with your delete API endpoint
      alert("Exam deleted successfully.");
      navigate("/teacher"); // Redirect to exams list page
    } catch (err) {
      console.error("Failed to delete exam:", err);
      alert("An error occurred while deleting the exam.");
    }
  };

  // Handle update exam
  const handleUpdateExam = () => {
    navigate(`/teacher/exampapers/edit/${examID}`); // Navigate to an update form or edit page
  };

  if (loading) {
    return <div className="text-center text-xl font-bold">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl font-bold">{error}</div>
    );
  }

  return (
    <div className="h-4/5 overflow-y-auto ">
      <div className="min-h-screen bg-gray-100  m-4 p-4">
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Exam Details</h1>

          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-700">
              <strong>Name:</strong> {examData.name}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              <strong>Description:</strong> {examData.description}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              <strong>Exam Date:</strong>{" "}
              {new Date(examData.examDate.$date).toLocaleDateString()}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              <strong>Start Time:</strong> {examData.startTime}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              <strong>End Time:</strong> {examData.endTime}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              <strong>Exam Code:</strong> {examData.examCode}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              <strong>Total Marks:</strong> {examData.totalMarks}
            </p>
            <p className="text-lg font-semibold text-gray-700">
              <strong>Evaluation Type:</strong> {examData.evaluationType}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Evaluation Details
            </h2>
            <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                    Question
                  </th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                    Marks
                  </th>
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                    Chapter
                  </th>
                </tr>
              </thead>
              <tbody>
                {examData.evaluationData.map((evaluation) => (
                  <tr key={evaluation._id.$oid}>
                    <td className="border border-gray-300 px-4 py-2">
                      {evaluation.question}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {evaluation.marks}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {evaluation.chapter || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-6">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleUpdateExam}
            >
              Update Exam
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDeleteExam}
            >
              Delete Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;
