// import  { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const MarkSheet = () => {
//   const { examID } = useParams(); // Extract examID from URL params
//   const [examData, setExamData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch the exam data
//     const fetchExamData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/results/exam/${examID}` // Replace with your actual API endpoint
//         );
//         setExamData(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch exam data.");
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
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Exam Results</h1>
//       <h2 className="text-xl font-semibold text-center text-gray-600 mb-4">
//         Exam ID: {examData.examID}
//       </h2>
//       <p className="text-lg text-center text-gray-800 mb-8">
//         Total Marks for Exam:{" "}
//         <span className="font-bold">{examData.totalMarks}</span>
//       </p>

//       {examData.students.map((student) => (
//         <div
//           key={student._id}
//           className="bg-white shadow-md rounded-md p-4 mb-6"
//         >
//           <h3 className="text-lg font-semibold mb-2">
//             Student ID: <span className="text-blue-500">{student.studentID}</span>
//           </h3>
//           <p className="mb-4">
//             Total Marks Obtained:{" "}
//             <span className="font-bold">{student.totalObtainMarks}</span>
//           </p>

//           <h4 className="font-semibold text-gray-700 mb-2">Answers:</h4>
//           <div className="overflow-x-auto">
//             <table className="table-auto w-full border-collapse border border-gray-200">
//               <thead>
//                 <tr>
//                   <th className="border border-gray-200 px-4 py-2">Question</th>
//                   <th className="border border-gray-200 px-4 py-2">Answer</th>
//                   <th className="border border-gray-200 px-4 py-2">Marks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {student.answers.map((answer) => (
//                   <tr key={answer._id}>
//                     <td className="border border-gray-200 px-4 py-2">
//                       {answer.question}
//                     </td>
//                     <td className="border border-gray-200 px-4 py-2">
//                       {answer.answer}
//                     </td>
//                     <td className="border border-gray-200 px-4 py-2">
//                       {answer.obtainMarks}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MarkSheet;

import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MarkSheet = () => {
  const { examID } = useParams(); // Extract examID from the route parameters
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch exam data from the API
    const fetchExamData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/results/exam/${examID}` // Replace with your actual API endpoint
        );
        setExamData(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch exam data.");
        setLoading(false);
      }
    };

    fetchExamData();
  }, [examID]);

  if (loading) {
    return <div className="text-center text-xl font-bold">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl font-bold">{error}</div>
    );
  }

  return (
    <div className="h-4/5 overflow-y-auto" >
    <div className="min-h-screen bg-white m-4 p-4 shadow-lg rounded-lg">
      <div className="container mx-auto p-6 bg-white ">
        <h1 className="text-3xl font-bold text-center mb-6">MarkSheet</h1>
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-gray-600">
            <strong>Exam ID:</strong> {examData.examID}
          </p>
          <p className="text-lg font-semibold text-gray-600">
            <strong>Total Marks:</strong> {examData.totalMarks}
          </p>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                Student ID
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                Obtained Marks
              </th>
            </tr>
          </thead>
          <tbody>
            {examData.students.map((student) => (
              <tr key={student._id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {student.studentID}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {student.totalObtainMarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default MarkSheet;
