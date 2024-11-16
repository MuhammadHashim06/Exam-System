// import { useEffect, useState } from "react";
// import axios from "axios"; // Import Axios for API calls
// import { useNavigate} from "react-router-dom";

// export default function AddTeacher() {
//   const navigate = useNavigate();
//   const [teacherData, setTeacherData] = useState({
//     name: "",
//     father: "",
//     email: "",
//     password: "",
//     subject: "",
//     phonenumber: "",
//     address: "",
//     status: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTeacherData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Add API call to create user and teacher
//       const response = await axios.post("http://localhost:5000/addteacher", {
//         email: teacherData.email,
//         password: teacherData.password,
//         role: "teacher", // Setting the role as teacher
//         guardian: teacherData.father,
//         phonenumber: teacherData.phonenumber,
//         address: teacherData.address,
//         subject: teacherData.subject,
//       });

//       console.log("New Teacher Added:", response.data);

//       // Reset form fields
//       setTeacherData({
//         name: "",
//         father: "",
//         email: "",
//         password: "",
//         subject: "",
//         phonenumber: "",
//         address: "",
//         status: "",
//       });

//       // Optionally, show a success message here
//       navigate("/admin/teacher");
//     } catch (error) {
//       console.error("Error adding teacher:", error);
//       navigate("/admin/teacher");
//       // Optionally, show an error message to the user
//     }
//   };
//   useEffect(() => {

//   }, [])

//   return (
//     <div className="h-4/5 overflow-y-auto">
//       <div className="rounded-md m-4 p-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Add Teacher</h1>
//         </div>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="max-w-full bg-white rounded-md shadow-md m-4 p-4"
//       >
//         <table className="w-full">
//           <tbody>
//             <tr>
//               <td>
//                 <div className="flex flex-col gap-2">
//                   <label htmlFor="name">Name </label>
//                   <input
//                     name="name"
//                     value={teacherData.name}
//                     onChange={handleChange}
//                     className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     type="text"
//                     id="name"
//                     required
//                   />
//                 </div>
//               </td>
//               <td>
//                 <div className="flex flex-col gap-2">
//                   <label htmlFor="father">Father/Guardian</label>
//                   <input
//                     name="father"
//                     value={teacherData.father}
//                     onChange={handleChange}
//                     className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     type="text"
//                     id="father"
//                     required
//                   />
//                 </div>
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <div className="flex flex-col gap-2">
//                   <label htmlFor="email">Email </label>
//                   <input
//                     name="email"
//                     value={teacherData.email}
//                     onChange={handleChange}
//                     className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     type="email"
//                     id="email"
//                     required
//                   />
//                 </div>
//               </td>
//               <td>
//                 <div className="flex flex-col gap-2">
//                   <label htmlFor="password">Password</label>
//                   <input
//                     name="password"
//                     value={teacherData.password}
//                     onChange={handleChange}
//                     className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     type="password"
//                     id="password"
//                     required
//                   />
//                 </div>
//               </td>
//             </tr>
            // <tr>
            //   <td>
            //     <div className="flex flex-col gap-2">
            //       <label htmlFor="subject">Subject </label>
            //       <input
            //         name="subject"
            //         value={teacherData.subject}
            //         onChange={handleChange}
            //         className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            //         type="text"
            //         id="subject"
            //         required
            //       />
            //     </div>
            //   </td>
            //   <td>
            //     <div className="flex flex-col gap-2">
            //       <label htmlFor="phonenumber">Phone Number</label>
            //       <input
            //         name="phonenumber"
            //         value={teacherData.phonenumber}
            //         onChange={handleChange}
            //         className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            //         type="text"
            //         id="phonenumber"
            //         required
            //       />
            //     </div>
            //   </td>
            // </tr>
            // <tr>
            //   <td>
            //     <div className="flex flex-col gap-2">
            //       <label htmlFor="address">Address </label>
            //       <input
            //         name="address"
            //         value={teacherData.address}
            //         onChange={handleChange}
            //         className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            //         type="text"
            //         id="address"
            //         required
            //       />
            //     </div>
            //   </td>
            //   <td>
            //     <div className="flex flex-col gap-2">
            //       <label htmlFor="status">Status</label>
            //       <input
            //         name="status"
            //         value={teacherData.status}
            //         onChange={handleChange}
            //         className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
            //         type="text"
            //         id="status"
            //         required
            //       />
            //     </div>
            //   </td>
            // </tr>
//           </tbody>
//         </table>

//         <div className="flex justify-end w-full">
//           <button
//             type="submit"
//             className="w-max bg-blue-500 text-white p-2 m-4 rounded hover:bg-blue-600 transition duration-200"
//           >
//             Add Teacher
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function TeacherForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [teacherData, setTeacherData] = useState({
    name: "",
    guardian: "",
    email: "",
    password: "",
    subject: "",
    phonenumber: "",
    address: "",
    status: "",
  });

  useEffect(() => {
    if (id) {
      // Fetch teacher data if editing
      axios
        .get(`http://localhost:5000/viewteacher/${id}`)
        .then((response) => setTeacherData({
          name: response.data.teacher.name,
          guardian: response.data.teacher.guardian,
          email: response.data.user.email,
          password: response.data.user.password,
          subject: response.data.teacher.subject,
          phonenumber: response.data.teacher.phonenumber,
          address: response.data.teacher.address,
          status: response.data.teacher.status,
        }))
        .catch((error) => console.error("Error fetching teacher data:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userdata = JSON.parse(sessionStorage.getItem("userdata"));
      const token = userdata?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      if (id) {
        // Update existing teacher
        await axios.put(
          `http://localhost:5000/updateteacher/${id}`,
          teacherData,
          config
        );
        console.log("Teacher Updated:", teacherData);
      } else {
        // Add new teacher
        await axios.post(
          "http://localhost:5000/addteacher",
          { ...teacherData, role: "teacher" },
          config
        );
        console.log("New Teacher Added:", teacherData);
      }

      setTeacherData({
        name: "",
        guardian: "",
        email: "",
        password: "",
        subject: "",
        phonenumber: "",
        address: "",
        status: "",
      });

      navigate("/admin/teacher");
    } catch (error) {
      console.error("Error submitting teacher data:", error);
    }
  };

  return (
    <div className="h-4/5 overflow-y-auto">
      <div className="rounded-md m-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {id ? "Update Teacher" : "Add Teacher"}
          </h1>
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
                  <label htmlFor="name">Name</label>
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
                    name="guardian"
                    value={teacherData.guardian}
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
                  <label htmlFor="email">Email</label>
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
                    required={!id}
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
                  <label htmlFor="phonenumber">Phone Number</label>
                  <input
                    name="phonenumber"
                    value={teacherData.phonenumber}
                    onChange={handleChange}
                    className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    id="phonenumber"
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
            </tr>          </tbody>
        </table>

        <div className="flex justify-end w-full">
          <button
            type="submit"
            className="w-max bg-blue-500 text-white p-2 m-4 rounded hover:bg-blue-600 transition duration-200"
          >
            {id ? "Update Teacher" : "Add Teacher"}
          </button>
        </div>
      </form>
    </div>
  );
}
