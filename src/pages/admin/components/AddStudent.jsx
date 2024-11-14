// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function AddStudent() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [studentData, setStudentData] = useState({
//     name: "",
//     guardian: "",
//     email: "",
//     password: "",
//     phonenumber: "",
//     address: "",
//     status: "Active", // Default valid value
//     class: "", // Class field
//     role: "student",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStudentData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate that all required fields are filled
//     const requiredFields = [
//       "name",
//       "guardian",
//       "email",
//       "password",
//       "phonenumber",
//       "address",
//       "status",
//       "class",
//     ];
//     const isValid = requiredFields.every((field) => studentData[field]);

//     if (!isValid) {
//       console.error("Please fill all required fields");
//       return; // Prevent submission if not valid
//     }

//     const userdata = JSON.parse(sessionStorage.getItem("userdata"));
//     const token = userdata.token;
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/addstudent",
//         studentData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Include the JWT here
//           },
//         }
//       );
//       console.log("status : ", response.status);
//       if (response.status === 201) {
//         console.log("New Student Added:", response.data);

//         // Reset form fields
//         setStudentData({
//           name: "",
//           guardian: "",
//           email: "",
//           password: "",
//           phonenumber: "",
//           address: "",
//           status: "Active", // Reset to default valid value
//           class: "",
//           role: "student",
//         });

//         navigate("/admin/student");
//       } else {
//         console.log("Something went wrong");
//       }
//     } catch (error) {
//       console.error("Error adding student:", error);
//       alert("Something went wrong");
//       navigate("/admin/student");
//     }
//   };
//   function updateStudent(){
    
//   }

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       if (id !== undefined) {
//         console.log(id);

//         try {
//           const response = await axios.get(`http://localhost:5000/viewstudent/${id}`);

//           console.log(response);

//           setStudentData({
//             name: response.data.student.name,
//             guardian: response.data.student.guardian,
//             email: response.data.user.email,
//             password: response.data.user.password,
//             phonenumber: response.data.student.phonenumber,
//             address: response.data.student.address,
//             status: response.data.student.status,
//             class: response.data.student.class,
//             role: "student",
//           });
//         } catch (err) {
//           console.error("Error fetching student details:", err);
//         }
//       }
//     };

//     fetchStudentData();
//   }, [id]);

//   return (
//     <div className="h-4/5 overflow-y-auto">
//       <div className="rounded-md m-4 p-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Add Student</h1>
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
//                     value={studentData.name}
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
//                   <label htmlFor="guardian">Father/Guardian</label>
//                   <input
//                     name="guardian"
//                     value={studentData.guardian}
//                     onChange={handleChange}
//                     className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     type="text"
//                     id="guardian"
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
//                     value={studentData.email}
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
//                     value={studentData.password}
//                     onChange={handleChange}
//                     className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     type="password"
//                     id="password"
//                     required
//                   />
//                 </div>
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <div className="flex flex-col gap-2">
//                   <label htmlFor="phonenumber">Phone Number</label>
//                   <input
//                     name="phonenumber"
//                     value={studentData.phonenumber}
//                     onChange={handleChange}
//                     className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     type="text"
//                     id="phonenumber"
//                     required
//                   />
//                 </div>
//               </td>
//               <td>
//                 <div className="flex flex-col gap-2">
//                   <label htmlFor="address">Address </label>
//                   <input
//                     name="address"
//                     value={studentData.address}
//                     onChange={handleChange}
//                     className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     type="text"
//                     id="address"
//                     required
//                   />
//                 </div>
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <div className="flex flex-col gap-2">
//                   <label htmlFor="status">Status</label>
//                   <input
//                     name="status"
//                     value={studentData.status}
//                     onChange={handleChange}
//                     className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     type="text"
//                     id="status"
//                     required
//                   />
//                 </div>
//               </td>
//               <td>
//                 <div className="flex flex-col gap-2">
//                   <label htmlFor="class">Class </label>
//                   <input
//                     name="class"
//                     value={studentData.class}
//                     onChange={handleChange}
//                     className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     type="text"
//                     id="class"
//                     required
//                   />
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         <div className="flex justify-end w-full">
//         {if(id!==undefined){
//           return<button onClick={updateStudent} >Update Student</button>
//         }
// else return<button
//             type="submit"
//             className="w-max bg-blue-500 text-white p-2 m-4 rounded hover:bg-blue-600 transition duration-200"
//           >
//             Add Student
//           </button>
//         }
//           <button
//             type="submit"
//             className="w-max bg-blue-500 text-white p-2 m-4 rounded hover:bg-blue-600 transition duration-200"
//           >
//             Add Student
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }








import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    name: "",
    guardian: "",
    email: "",
    password: "",
    phonenumber: "",
    address: "",
    status: "Active",
    class: "",
    role: "student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "guardian",
      "email",
      "password",
      "phonenumber",
      "address",
      "status",
      "class",
    ];
    const isValid = requiredFields.every((field) => studentData[field]);

    if (!isValid) {
      console.error("Please fill all required fields");
      return;
    }

    const userdata = JSON.parse(sessionStorage.getItem("userdata"));
    const token = userdata?.token;

    try {
      const response = await axios.post(
        "http://localhost:5000/addstudent",
        studentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        console.log("New Student Added:", response.data);
        setStudentData({
          name: "",
          guardian: "",
          email: "",
          password: "",
          phonenumber: "",
          address: "",
          status: "Active",
          class: "",
          role: "student",
        });
        navigate("/admin/student");
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Something went wrong");
    }
  };

  const updateStudent = async () => {
    const userdata = JSON.parse(sessionStorage.getItem("userdata"));
    const token = userdata?.token;

    try {
      const response = await axios.put(
        `http://localhost:5000/updatestudent/${id}`,
        studentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Student Updated:", response.data);
        navigate("/admin/student");
      } else {
        console.log("Update failed");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:5000/viewstudent/${id}`);
          setStudentData({
            name: response.data.student.name,
            guardian: response.data.student.guardian,
            email: response.data.user.email,
            password: response.data.user.password,
            phonenumber: response.data.student.phonenumber,
            address: response.data.student.address,
            status: response.data.student.status,
            class: response.data.student.class,
            role: "student",
          });
        } catch (err) {
          console.error("Error fetching student details:", err);
        }
      }
    };
    fetchStudentData();
  }, [id]);

  return (
    <div className="h-4/5 overflow-y-auto">
      <div className="rounded-md m-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{id ? "Update Student" : "Add Student"}</h1>
        </div>
      </div>

      <form
        onSubmit={id ? updateStudent : handleSubmit}
        className="max-w-full bg-white rounded-md shadow-md m-4 p-4"
      >
        <table className="w-full">
          <tbody>
            {/* Form fields go here, each with `value` and `onChange` bound to `studentData` and `handleChange` */}
            <tr>
              <td>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Name</label>
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
                  <label htmlFor="guardian">Father/Guardian</label>
                  <input
                    name="guardian"
                    value={studentData.guardian}
                    onChange={handleChange}
                    className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    id="guardian"
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
                    value={studentData.email}
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
                <div className="flex flex-col gap-2">
                  <label htmlFor="phonenumber">Phone Number</label>
                  <input
                    name="phonenumber"
                    value={studentData.phonenumber}
                    onChange={handleChange}
                    className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    id="phonenumber"
                    required
                  />
                </div>
              </td>
              <td>
                <div className="flex flex-col gap-2">
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
            </tr>
            <tr>
              <td>
                <div className="flex flex-col gap-2">
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
              <td>
                <div className="flex flex-col gap-2">
                  <label htmlFor="class">Class </label>
                  <input
                    name="class"
                    value={studentData.class}
                    onChange={handleChange}
                    className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    id="class"
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
            {id ? "Update Student" : "Add Student"}
          </button>
        </div>
      </form>
    </div>
  );
}

