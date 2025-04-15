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























// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const MarkSheet = () => {
//   const { examID } = useParams();
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchExamData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/results/exam/${examID}`
//         );
//         setStudents(response.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch exam data.");
//       } finally {
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

//   // Calculate total marks across all students (if needed)
//   const totalMarks = students.reduce(
//     (acc, student) => acc + (student.totalObtainedMarks || 0),
//     0
//   );

//   return (
//     <div className="h-4/5 overflow-y-auto">
//       <div className="min-h-screen bg-white m-4 p-4 shadow-lg rounded-lg">
//         <div className="container mx-auto p-6 bg-white">
//           <h1 className="text-3xl font-bold text-center mb-6">MarkSheet</h1>
//           <div className="text-center mb-6">
//             <p className="text-lg font-semibold text-gray-600">
//               <strong>Exam ID:</strong> {examID}
//             </p>
//             <p className="text-lg font-semibold text-gray-600">
//               <strong>Total Students:</strong> {students.length}
//             </p>
//             <p className="text-lg font-semibold text-gray-600">
//               <strong>Combined Obtained Marks:</strong> {totalMarks}
//             </p>
//           </div>

//           <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 px-4 py-2 bg-gray-100">
//                   Student Name
//                 </th>
//                 <th className="border border-gray-300 px-4 py-2 bg-gray-100">
//                   Student ID
//                 </th>
//                 <th className="border border-gray-300 px-4 py-2 bg-gray-100">
//                   Obtained Marks
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student) => (
//                 <tr key={student._id}>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {student.studentName}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {student.studentID}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-center">
//                     {student.totalObtainedMarks}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MarkSheet;

















import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";

const MarkSheet = () => {
  const { examID } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/results/exam/${examID}`
        );
        setStudents(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch exam data.");
      } finally {
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

  const obtainedMarks = students.map((s) => s.totalObtainedMarks || 0);
  const totalStudents = students.length;
  const averageMarks =
    totalStudents > 0
      ? (obtainedMarks.reduce((acc, val) => acc + val, 0) / totalStudents).toFixed(2)
      : 0;
  const highestMarks = Math.max(...obtainedMarks);
  const lowestMarks = Math.min(...obtainedMarks);

  const exportToExcel = () => {
    // First, prepare summary data
    const summary = [
      ["Exam ID", examID],
      ["Total Students", totalStudents],
      ["Average Marks", averageMarks],
      ["Highest Marks", highestMarks],
      ["Lowest Marks", lowestMarks],
      [], // empty row between summary and table
    ];

    // Table data
    const data = students.map((s) => ({
      "Student Name": s.studentName,
      "Student ID": s.studentID,
      "Obtained Marks": s.totalObtainedMarks,
    }));

    const worksheet = XLSX.utils.aoa_to_sheet(summary);
    XLSX.utils.sheet_add_json(worksheet, data, { origin: -1 });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Marksheet");

    XLSX.writeFile(workbook, `Marksheet_Exam_${examID}.xlsx`);
  };

  return (
    <div className="h-4/5 overflow-y-auto">
      <div className="min-h-screen bg-white m-4 p-4 shadow-lg rounded-lg">
        <div className="container mx-auto p-6 bg-white">
          <h1 className="text-3xl font-bold text-center mb-6">MarkSheet</h1>
          <div className="text-center mb-6">
            <p className="text-lg font-semibold text-gray-600">
              <strong>Exam ID:</strong> {examID}
            </p>
            <p className="text-lg font-semibold text-gray-600">
              <strong>Total Students:</strong> {totalStudents}
            </p>
            <p className="text-lg font-semibold text-gray-600">
              <strong>Average Marks:</strong> {averageMarks}
            </p>
            <p className="text-lg font-semibold text-gray-600">
              <strong>Highest Marks:</strong> {highestMarks}
            </p>
            <p className="text-lg font-semibold text-gray-600">
              <strong>Lowest Marks:</strong> {lowestMarks}
            </p>
          </div>

          <table className="table-auto w-full border-collapse border border-gray-200 bg-white mb-6">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                  Student Name
                </th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                  Student ID
                </th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                  Obtained Marks
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {student.studentName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {student.studentID}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {student.totalObtainedMarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-center">
            <button
              onClick={exportToExcel}
              className="bg-blue-600 p-2 text-white font-bold py-2 px-4 rounded"
            >
              Export to Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkSheet;


