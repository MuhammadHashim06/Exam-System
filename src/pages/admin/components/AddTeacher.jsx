

import { useState } from "react";

export default function AddTeacher() {
  const [teacherData, setTeacherData] = useState({
    name: "",
    father: "",
    email: "",
    password: "",
    subject: "",
    phoneNumber: "",
    address: "",
    status: "",
    // className: '',
    // cnic: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Student Added:", teacherData);
    // Reset form fields
    setTeacherData({
      name: "",
      father: "",
      email: "",
      password: "",
      subject: "",
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
                  value={teacherData.name}
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
                  value={teacherData.father}
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
                  value={teacherData.email}
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
                  value={teacherData.password}
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
                <label htmlFor="subject">subject </label>
                <input
                  name="subject"
                  value={teacherData.subject}
                  onChange={handleChange}
                  className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  id="subject"
                  required
                />
                </div>
              </td>
              <td >
                <div className="flex flex-col gap-2">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  value={teacherData.phoneNumber}
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
                  value={teacherData.address}
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
                  value={teacherData.status}
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
                  value={teacherData.className}
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
                  value={teacherData.cnic}
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
  /* {Object.keys(teacherData).map((key) => (
              <div key={key} className="mb-4">
                <label className="block text-gray-700 mb-1 capitalize" htmlFor={key}>
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type={key === 'password' ? 'password' : 'text'}
                  id={key}
                  name={key}
                  value={teacherData[key]}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            ))} */
}
