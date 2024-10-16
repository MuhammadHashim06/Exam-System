import { React, useState } from "react";

export default function AddStudent() {
  const [studentData, setStudentData] = useState({
    name: "",
    age: "",
    grade: "",
    cnic: "",
    guardian: "",
    contact: "",
    email: "",
    password: "",
    status: "",
    address: "",
    className: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Student Added:", studentData);
    // Reset form fields
    setStudentData({
      name: "",
      age: "",
      grade: "",
      cnic: "",
      guardian: "",
      contact: "",
      email: "",
      password: "",
      status: "",
      address: "",
      className: "",
    });
  };

  return (
    <div div className="h-4/5 overflow-y-auto">
      <div className="rounded-md m-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Add Student</h1>
          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
          onClick
          ={handlesubmit}>
            Add Student
          </button> */}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-full bg-white rounded-md shadow-md m-4 p-4"
      >
        <table className="w-full">
          <tr>
            <td>
              <label htmlFor="name">Name </label>
            </td>
            <td>
              <input
                className="w-4/5 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                id="name"
              />
            </td>
            <td>
              <label htmlFor="father">Father/Guardian</label>
            </td>
            <td>
              <input
                className="w-4/5 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                id="father"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="email">Email </label>
            </td>
            <td>
              <input
                className="w-4/5 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                id="email"
              />
            </td>
            <td>
              <label htmlFor="password">Password</label>
            </td>
            <td>
              <input
                className="w-4/5 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                id="password"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="class">Class </label>
            </td>
            <td>
              <input
                className="w-4/5 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                id="class"
              />
            </td>
            <td>
              <label htmlFor="phonenumber">Phone Number</label>
            </td>
            <td>
              <input
                className="w-4/5 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                id="phonenumber"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="address">Address </label>
            </td>
            <td>
              <input
                className="w-4/5 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                id="address"
              />
            </td>
            <td>
              <label htmlFor="status">Status</label>
            </td>
            <td>
              <input
                className="w-4/5 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                id="status"
              />
            </td>
          </tr>
        </table>

        <div className="flex justify-end">
          <button
            type="submit"
            className="w-max bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
}

{
  /* {Object.keys(studentData).map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 mb-1 capitalize" htmlFor={key}>
                {key.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={key === 'password' ? 'password' : 'text'}
                id={key}
                name={key}
                value={studentData[key]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          ))} */
}
