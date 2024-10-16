import React, { useState } from "react";

export default function AddStudent() {
  const [studentData, setStudentData] = useState({
    name: "",
    father: "",
    email: "",
    password: "",
    grade: "",
    phoneNumber: "",
    address: "",
    status: "",
    // className: '',
    // cnic: '',
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
      father: "",
      email: "",
      password: "",
      grade: "",
      phoneNumber: "",
      address: "",
      status: "",
      //   className: '',
      //   cnic: '',
    });
  };

  return (
    <div className="h-4/5 overflow-y-auto">
      <div className="rounded-md m-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Add Student</h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-full bg-white rounded-md shadow-md m-4 p-4"
      >
        <table className="w-full">
          <tbody>
            <tr>
              <td >
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name </label>
                <input
                  name="name"
                  value={studentData.name}
                  onChange={handleChange}
                  className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  id="name"
                  required
                />
                </div>
              </td>
              <td>
              <div className="flex flex-col gap-2">
                <label htmlFor="father">Father/Guardian</label>
                <input
                  name="father"
                  value={studentData.father}
                  onChange={handleChange}
                  className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  id="father"
                  required
                />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex flex-col gap-2" >
                <label htmlFor="email">Email </label>
                <input
                  name="email"
                  value={studentData.email}
                  onChange={handleChange}
                  className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                  id="email"
                  required
                />
                </div>
              </td>
              <td >
                <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  value={studentData.password}
                  onChange={handleChange}
                  className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                  id="password"
                  required
                />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex flex-col gap-2" >
                <label htmlFor="grade">Grade </label>
                <input
                  name="grade"
                  value={studentData.grade}
                  onChange={handleChange}
                  className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  id="grade"
                  required
                />
                </div>
              </td>
              <td >
                <div className="flex flex-col gap-2">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  value={studentData.phoneNumber}
                  onChange={handleChange}
                  className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  id="phoneNumber"
                  required
                />
                </div>
              </td>
            </tr>
            <tr>
               <td>
                <div className="flex flex-col gap-2" >
                <label htmlFor="address">Address </label>
                <input
                  name="address"
                  value={studentData.address}
                  onChange={handleChange}
                  className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  id="address"
                  required
                />
                </div>
              </td>
              <td>
                <div className="flex flex-col gap-2" >
                <label htmlFor="status">Status</label>
                <input
                  name="status"
                  value={studentData.status}
                  onChange={handleChange}
                  className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  id="status"
                  required
                />
                </div>
              </td>
            </tr>
            {/*<tr>
              <td>
                <label htmlFor="className">Class</label>
              </td>
              <td>
                <input
                  name="className"
                  value={studentData.className}
                  onChange={handleChange}
                  className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  id="className"
                  required
                />
              </td>
              <td>
                <label htmlFor="cnic">CNIC</label>
              </td>
              <td>
                <input
                  name="cnic"
                  value={studentData.cnic}
                  onChange={handleChange}
                  className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  id="cnic"
                  required
                />
              </td>
            </tr> */}
          </tbody>
        </table>

        <div className="flex justify-end w-full">
          <button
            type="submit"
            className="w-max bg-blue-500 text-white p-2 m-4  rounded hover:bg-blue-600 transition duration-200"
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
