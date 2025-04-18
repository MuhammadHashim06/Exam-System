// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const StudentDetail = () => {
//   const { id } = useParams();
// //   const navigate = useNavigate();
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     const fetchStudent = async () => {
//       // Simulate fetching student data
//       const fetchedStudent = {
//         id: 1,
//         name: "John Doe",
//         father: "Richard Doe",
//         email: "john.doe@example.com",
//         password: "password123",
//         grade: "10th",
//         phoneNumber: "123-456-7890",
//         address: "123 Elm Street, City, Country",
//         status: "Active",
//       };

//         setStudent(fetchedStudent);
//     };

//     fetchStudent();
//   }, [id]);

// const handleDelete = (id) => {
//   console.log(`Delete : ${id}`);
//   // Add your deletion logic here
// };

// const onUpdate = (id) => {
//   console.log(`Update : ${id}`);
//   // Add your update logic here (e.g., redirect to edit form)
// };

//   if (!student) {
//     return <div>Loading...</div>; // Show loading state while fetching
//   }

// return (
//   <div className="max-w-2xl mx-auto my-10 p-5 border rounded-lg shadow-lg bg-white">
//     <h2 className="text-2xl font-bold mb-4">{student.name}</h2>
//     <p className="text-gray-700">
//       <strong>Father&apos;s Name:</strong> {student.father}
//     </p>
//     <p className="text-gray-700">
//       <strong>Email:</strong> {student.email}
//     </p>
//     <p className="text-gray-700">
//       <strong>Password:</strong> {student.password}
//     </p>
//     <p className="text-gray-700">
//       <strong>Grade:</strong> {student.grade}
//     </p>
//     <p className="text-gray-700">
//       <strong>Phone Number:</strong> {student.phoneNumber}
//     </p>
//     <p className="text-gray-700">
//       <strong>Address:</strong> {student.address}
//     </p>
//     <p className="text-gray-700">
//       <strong>Status:</strong> {student.status}
//     </p>

//     <div className="mt-5">
//       <button
//         className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         onClick={() => onUpdate(student.id)}
//       >
//         Update Student
//       </button>
//       <button
//         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//         onClick={() => handleDelete(student.id)}
//       >
//         Delete Student
//       </button>
//     </div>
//   </div>
// );
// };

// export default StudentDetail;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentDetail() {
  const { id } = useParams(); 
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = new useNavigate();
  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:5000/deletestudent/${id}`);
      if (res.status == 200) {
        navigate("/admin/student");
      }
    } catch (error) {
      console.error("Error Deleting student details:", error);
    } finally {
      navigate("/admin/student");
    }
  };

  const onUpdate = (id) => {
    navigate(`/admin/student/edit/${id}`);
    console.log(`Update : ${id}`);
  };

  // Fetch student details
  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await axios.get(
          `http://localhost:5000/viewstudent/${id}`
        );
        setStudent(response.data);
      } catch (err) {
        console.error("Error fetching student details:", err);
        setError("Failed to load student details.");
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!student) {
    return <div>Student not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">{student.student.name}</h2>

      <table className="w-full">
        <tr>
          {" "}
          <td>
            <strong>Father:</strong>
          </td>
          <td>
            <p className="text-gray-700">{student.student.guardian}</p>
          </td>
        </tr>
        <tr>
          <td>
            <strong>Email:</strong>
          </td>
          <td>
            <p className="text-gray-700">{student.user.email}</p>
          </td>
        </tr>
        <tr>
          <td>
            <strong>Grade:</strong>
          </td>
          <td>
            <p className="text-gray-700">{student.student.class}</p>
          </td>
        </tr>
        <tr>
          {" "}
          <td>
            <strong>Phone Number:</strong>
          </td>
          <td>
            <p className="text-gray-700">{student.student.phonenumber}</p>
          </td>
        </tr>
        <tr>
          <td>
            <strong>Address:</strong>
          </td>
          <td>
            <p className="text-gray-700">{student.student.address}</p>
          </td>
        </tr>
        <tr>
          <td>
            <strong>Status:</strong>
          </td>
          <td>
            <p className="text-gray-700"> {student.student.status}</p>
          </td>
        </tr>
      </table>

      <div className="mt-5">
        <button
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onUpdate(student.student._id)}
        >
          Update Student
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => handleDelete(student.student._id)}
        >
          Delete Student
        </button>
      </div>
    </div>
  );
}
