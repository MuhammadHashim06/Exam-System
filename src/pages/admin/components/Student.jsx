// import axios, { formToJSON } from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const sampleStudents = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     email: "alicejoh@gmail.com",
//     class: "3",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Bob Smith",  
//     email: "bobsmith@gmail.com",
//     class: "4",
//     status: "Inactive",
//   },
//   {
//     id: 3,
//     name: "Charlie Brown",
//     email: "charliebrown@gmail.com",
//     class: "5",
//     status: "Active",
//   },
//   {
//     id: 4,
//     name: "Diana Prince",
//     email: "dianaprince@gmail.com",
//     class: "6",
//     status: "Active",
//   },
// ];

// export default function Student() {
//   const navigate = useNavigate();
// const [sampleStudents ,setsampleStudents]=useState({})
//   function handlesubmit() {
//     navigate("add");
//   }
// async function getallstudent (){
//   let response = await axios.get('http://localhost:5000/getallstudents')
//   JSON.parse

// }

//   function StudentDetail(id) {
//     console.log("Student detail: ", id);
//     navigate(`detail/${id}`);
//   }

//   return (
//     <>
//       <div className="rounded-md m-4 p-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Students</h1>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
//             onClick={handlesubmit} // Pass the function reference
//           >
//             Add Student
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-md shadow-md m-4 p-2">
//         <table className="w-full">
//           <thead className="font-bold bg-gray-200">
//             <tr>
//               <td className="p-2">ID</td>
//               <td className="p-2">Name</td>
//               <td className="p-2">Class</td>
//               <td className="p-2">Email</td>
//               <td className="p-2">Status</td>
//             </tr>
//           </thead>
//           <tbody>
//             {sampleStudents.map((student) => (
//               <tr
//                 key={student.id}
//                 className="hover:bg-gray-50 hover:cursor-pointer"
//                 onClick={() => StudentDetail(student.id)} // Wrap in an arrow function
//               >
//                 <td className="p-2">{student.id}</td>
//                 <td className="p-2">{student.name}</td>
//                 <td className="p-2">{student.class}</td>
//                 <td className="p-2">{student.email}</td>
//                 <td className="p-2">{student.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Student() {
  const navigate = useNavigate();
  const [sampleStudents, setSampleStudents] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(""); // For error handling

  // Function to navigate to the Add Student page
  function handlesubmit() {
    navigate("add");
  }

  // Fetch all students from the API
  async function getallstudents() {
    try {
      const response = await axios.get("http://localhost:5000/getallstudents"); // API endpoint
      setSampleStudents(response.data.students); // Set the fetched students to state
    } catch (err) {
      setError("Failed to fetch students."); // Handle API errors
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  }

  // Fetch the students when the component mounts
  useEffect(() => {
    getallstudents();
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
            Add Student
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
              {sampleStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 hover:cursor-pointer"
                  onClick={() => StudentDetail(student._id)}
                >
                  <td className="p-2">{student._id}</td>
                  <td className="p-2">{student.name}</td>
                  <td className="p-2">{student.class}</td>
                  <td className="p-2">{student.user.email}</td>
                  <td className="p-2">{student.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
