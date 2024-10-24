import { useState } from "react";
import axios from "axios"; // Import Axios for API calls

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add API call to create user and teacher
      const response = await axios.post('http://localhost:5000/addteacher', {
        email: teacherData.email,
        password: teacherData.password,
        role: 'teacher', // Setting the role as teacher
        guardian: teacherData.father,
        phonenumber: teacherData.phoneNumber,
        address: teacherData.address,
        subject: teacherData.subject,
      });

      console.log("New Teacher Added:", response.data);

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
      });

      // Optionally, show a success message here

    } catch (error) {
      console.error("Error adding teacher:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="h-4/5 overflow-y-auto">
      <div className="rounded-md m-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Add Teacher</h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-full bg-white rounded-md shadow-md m-4 p-4"
      >
        <table className="w-full">
          <tbody>
            <tr>
              <td>
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
                <div className="flex flex-col gap-2">
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
              <td>
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
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject">Subject </label>
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
              <td>
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
                <div className="flex flex-col gap-2">
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
                <div className="flex flex-col gap-2">
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
          </tbody>
        </table>

        <div className="flex justify-end w-full">
          <button
            type="submit"
            className="w-max bg-blue-500 text-white p-2 m-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Teacher
          </button>
        </div>
      </form>
    </div>
  );
}
