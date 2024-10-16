import React from "react";
import { useNavigate } from "react-router-dom";

const sampleStudents = [
  { id: 1, name: "Alice Johnson", email:'alicejoh@gmail.com', class: "3", status: "Active",  },
  { id: 2, name: "Bob Smith", email:'alicejoh@gmail.com' ,class: "4", status: "Inactive" },
  { id: 3, name: "Charlie Brown", email:'alicejoh@gmail.com', class: "5", status: "Active" },
  { id: 4, name: "Diana Prince", class: "6",email:'alicejoh@gmail.com', status: "Active" },
];

export default function Student() {
  const navigate = useNavigate()
  function handlesubmit(){
    navigate('add')

  }  
  return (
    <>
      <div className="rounded-md m-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Student</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
          onClick
          ={handlesubmit}>
            Add Student
          </button>
        </div>
      </div>

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
              >
                <td className="p-2">{student.id}</td>
                <td className="p-2">{student.name}</td>
                <td className="p-2">{student.class}</td>
                <td className="p-2">{student.email}</td>
                <td className="p-2">{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
