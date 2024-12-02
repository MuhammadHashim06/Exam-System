import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ExamPapers() {
  const navigate = useNavigate();
  const [ExamList, setExamList] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(""); // For error handling

  // Function to navigate to the Add Student page
  function handlesubmit() {
    navigate("add");
  }

  // Fetch all students from the API
  async function getallexam() {
    try {
      const response = await axios.get("http://localhost:5000/exam"); // API endpoint
      setExamList(response.data);
      console.log(response.data);
       // Set the fetched students to state
    } catch (error) {
      console.error("Error fetching teacher data:", error);
      setError("Failed to fetch students."); // Handle API errors
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  }

  // Fetch the students when the component mounts
  useEffect(() => {
    getallexam();
  }, []); // Empty dependency array to run only once on mount

  // Function to navigate to the student detail page
  function StudentDetail(id) {
    console.log("Student detail: ", id);
    navigate(`detail/${id}`);
  }

  // Render the loading state, error state, or the student list
  return (
    <>
      <div className="rounded-md m-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Students</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
            onClick={handlesubmit}
          >
            Add Paper
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading students...</div> // Show loading text while fetching data
      ) : error ? (
        <div className="text-center text-red-500">{error}</div> // Show error message if API call fails
      ) : (
        <div className="bg-white rounded-md shadow-md m-4 p-2">
          <table className="w-full">
            <thead className="font-bold bg-gray-200">
              <tr>
                <td className="p-2">ID</td>
                <td className="p-2">Name</td>
                <td className="p-2">Class</td>
                <td className="p-2">Email</td>
                <td className="p-2">Status</td>
              </tr>
            </thead>
            <tbody>
              {ExamList.map((exam ,key) => (
                <tr
                  key={key}
                  className="hover:bg-gray-50 hover:cursor-pointer"
                  onClick={() => StudentDetail(exam._id)}
                >
                  <td className="p-2">{exam._id}</td>
                  <td className="p-2">{exam.name}</td>
                  <td className="p-2">{exam.examDate}</td>
                  <td className="p-2">{exam.examCode}</td>
                  <td className="p-2">{exam.evaluationMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
