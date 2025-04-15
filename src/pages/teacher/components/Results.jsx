// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Results() {
//   const navigate = useNavigate();
//   const [ExamList, setExamList] = useState([]); // Initialize with an empty array
//   const [loading, setLoading] = useState(true); // For loading state
//   const [error, setError] = useState(""); // For error handling

//   // Function to navigate to the Add Student page
// //   function handlesubmit() {
// //     navigate("add");
// //   }

//   // Fetch all students from the API
//   async function getallexam() {
//     try {
//       const response = await axios.get("http://localhost:5000/results"); // API endpoint
//       setExamList(response.data);
//       console.log(response.data);
//        // Set the fetched students to state
//     } catch (error) {
//       console.error("Error fetching teacher data:", error);
//       setError("Failed to fetch students."); // Handle API errors
//     } finally {
//       setLoading(false); // Set loading to false after API call
//     }
//   }

//   // Fetch the students when the component mounts
//   useEffect(() => {
//     getallexam();
//   }, []); // Empty dependency array to run only once on mount

//   // Function to navigate to the student detail page
//   function ResultDetail(id) {
//     console.log("Student detail: ", id);
//     navigate(`marksheet/${id}`);
//   }

//   // Render the loading state, error state, or the student list
//   return (
//     <div className="h-4/5 overflow-y-auto">
//       <div className="rounded-md m-4 p-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Results</h1>
//           {/* <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
//             onClick={handlesubmit}
//           >
//             Add Paper
//           </button> */}
//         </div>
//       </div>

//       {loading ? (
//         <div className="text-center text-gray-500">Loading Results...</div> // Show loading text while fetching data
//       ) : error ? (
//         <div className="text-center text-red-500">{error}</div> // Show error message if API call fails
//       ) : (
//         <div className="bg-white rounded-md shadow-md m-4 p-2">
//           <table className="w-full">
//             <thead className="font-bold bg-gray-200">
//               <tr>
//                 <td className="p-2">ID</td>
//                 <td className="p-2">Total Marks</td>
//                 <td className="p-2">Total Student</td>
//                 {/* <td className="p-2">Email</td>
//                 <td className="p-2">Status</td> */}
//               </tr>
//             </thead>
//             <tbody>
//               {ExamList.map((exam ,key) => (
//                 <tr
//                   key={key}
//                   className="hover:bg-gray-50 hover:cursor-pointer"
//                   onClick={() => ResultDetail(exam.examID)}
//                 >
//                   <td className="p-2">{exam._id}</td>
//                   <td className="p-2">{exam.totalMarks}</td>
//                   <td className="p-2">{exam.students.length}</td>
//                   {/* <td className="p-2">{exam.examCode}</td>
//                   <td className="p-2">{exam.evaluationMethod}</td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Results() {
//   const navigate = useNavigate();
//   const [ExamList, setExamList] = useState([]);
//   const [GroupedExams, setGroupedExams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     getAllResults();
//   }, []);

//   async function getAllResults() {
//     try {
//       const response = await axios.get("http://localhost:5000/results");
//       setExamList(response.data);

//       // Group by examID
//       const grouped = response.data.reduce((acc, result) => {
//         const examID = result.examID;
//         if (!acc[examID]) {
//           acc[examID] = {
//             examID,
//             totalMarks: 0,
//             students: [],
//           };
//         }
//         acc[examID].totalMarks += result.totalObtainedMarks || 0;
//         acc[examID].students.push(result);
//         return acc;
//       }, {});

//       setGroupedExams(Object.values(grouped));
//     } catch (error) {
//       console.error("Error fetching results:", error);
//       setError("Failed to fetch results.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   function ResultDetail(examID) {
//     console.log("Exam detail: ", examID);
//     navigate(`marksheet/${examID}`);
//   }

//   return (
//     <div className="h-4/5 overflow-y-auto">
//       <div className="rounded-md m-4 p-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Results</h1>
//         </div>
//       </div>

//       {loading ? (
//         <div className="text-center text-gray-500">Loading Results...</div>
//       ) : error ? (
//         <div className="text-center text-red-500">{error}</div>
//       ) : (
//         <div className="bg-white rounded-md shadow-md m-4 p-2">
//           <table className="w-full">
//             <thead className="font-bold bg-gray-200">
//               <tr>
//                 <td className="p-2">Exam ID</td>
//                 <td className="p-2">Total Marks</td>
//                 <td className="p-2">Total Students</td>
//               </tr>
//             </thead>
//             <tbody>
//               {GroupedExams.map((exam, index) => (
//                 <tr
//                   key={index}
//                   className="hover:bg-gray-50 hover:cursor-pointer"
//                   onClick={() => ResultDetail(exam.examID)}
//                 >
//                   <td className="p-2">{exam.examID}</td>
//                   <td className="p-2">{exam.totalMarks}</td>
//                   <td className="p-2">{exam.students.length}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }










import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Results() {
  const navigate = useNavigate();
  const [ExamList, setExamList] = useState([]);
  const [GroupedExams, setGroupedExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllResults();
  }, []);

  async function getAllResults() {
    try {
      const response = await axios.get("http://localhost:5000/results");
      setExamList(response.data);

      const grouped = response.data.reduce((acc, result) => {
        const examID = result.examID;
        const marks = result.totalObtainedMarks || 0;

        if (!acc[examID]) {
          acc[examID] = {
            examID,
            examName : result.examName,
            totalMarks: 0,
            students: [],
            highestMarks: marks,
            lowestMarks: marks,
          };
        }

        acc[examID].totalMarks += marks;
        acc[examID].highestMarks = Math.max(acc[examID].highestMarks, marks);
        acc[examID].lowestMarks = Math.min(acc[examID].lowestMarks, marks);
        acc[examID].students.push(result);

        return acc;
      }, {});

      const examsArray = Object.values(grouped).map((exam) => ({
        ...exam,
        averageMarks: exam.students.length > 0
          ? (exam.totalMarks / exam.students.length).toFixed(2)
          : 0,
      }));

      setGroupedExams(examsArray);
      
    } catch (error) {
      console.error("Error fetching results:", error);
      setError("Failed to fetch results.");
    } finally {
      setLoading(false);
    }
  }

  function ResultDetail(examID) {
    console.log("Exam detail: ", examID);
    console.log("Exam Detail",GroupedExams);
    
    navigate(`marksheet/${examID}`);
  }

  return (
    <div className="h-4/5 overflow-y-auto">
      <div className="rounded-md m-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Results</h1>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading Results...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="bg-white rounded-md shadow-md m-4 p-2">
          <table className="w-full text-center">
            <thead className="font-bold bg-gray-200">
              <tr>
                <td className="p-2">Exam ID</td>
                <td className="p-2">Exam Name</td>

                <td className="p-2">Total Students</td>
                <td className="p-2">Average Marks</td>
                <td className="p-2">Highest Marks</td>
                <td className="p-2">Lowest Marks</td>
              </tr>
            </thead>
            <tbody>
              {GroupedExams.map((exam, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 hover:cursor-pointer"
                  onClick={() => ResultDetail(exam.examID)}
                >
                  <td className="p-2">{exam.examID}</td>
                  <td className="p-2">{exam.examName || "N/A"}</td>

                  <td className="p-2">{exam.students.length}</td>
                  <td className="p-2">{exam.averageMarks}</td>
                  <td className="p-2">{exam.highestMarks}</td>
                  <td className="p-2">{exam.lowestMarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
