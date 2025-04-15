// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// export default function TeacherForm() {
//   const navigate = useNavigate();
//   const { id } = useParams();
  
//   const [teacherData, setTeacherData] = useState({
//     name: "",
//     guardian: "",
//     email: "",
//     password: "",
//     subject: "",
//     phonenumber: "",
//     address: "",
//     status: "",
//   });

//   useEffect(() => {
//     if (id) {
//       // Fetch teacher data if editing
//       axios
//         .get(`http://localhost:5000/viewteacher/${id}`)
//         .then((response) => setTeacherData({
//           name: response.data.teacher.name,
//           guardian: response.data.teacher.guardian,
//           email: response.data.user.email,
//           password: response.data.user.password,
//           subject: response.data.teacher.subject,
//           phonenumber: response.data.teacher.phonenumber,
//           address: response.data.teacher.address,
//           status: response.data.teacher.status,
//         }))
//         .catch((error) => console.error("Error fetching teacher data:", error));
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTeacherData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userdata = JSON.parse(sessionStorage.getItem("userdata"));
//       const token = userdata?.token;

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       if (id) {
//         // Update existing teacher
//         await axios.put(
//           `http://localhost:5000/updateteacher/${id}`,
//           teacherData,
//           config
//         );
//         console.log("Teacher Updated:", teacherData);
//       } else {
//         // Add new teacher
//         await axios.post(
//           "http://localhost:5000/addteacher",
//           { ...teacherData, role: "teacher" },
//           config
//         );
//         console.log("New Teacher Added:", teacherData);
//       }

//       setTeacherData({
//         name: "",
//         guardian: "",
//         email: "",
//         password: "",
//         subject: "",
//         phonenumber: "",
//         address: "",
//         status: "",
//       });

//       navigate("/admin/teacher");
//     } catch (error) {
//       console.error("Error submitting teacher data:", error);
//     }
//   };

//   return (
//     <div className="h-4/5 overflow-y-auto">
//       <div className="rounded-md m-4 p-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">
//             {id ? "Update Teacher" : "Add Teacher"}
//           </h1>
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
//                   <label htmlFor="name">Name</label>
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
//                     name="guardian"
//                     value={teacherData.guardian}
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
//                   <label htmlFor="email">Email</label>
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
//                     type="text"
//                     id="password"
//                     required={!id}
//                   />
//                 </div>
//               </td>
//             </tr>
// <tr>
//               <td>
//                 <div className="flex flex-col gap-2">
//                   <label htmlFor="subject">Subject </label>
//                   <input
//                     name="subject"
//                     value={teacherData.subject}
//                     onChange={handleChange}
//                     className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     type="text"
//                     id="subject"
//                     required
//                   />
//                 </div>
//               </td>
//               <td>
//                 <div className="flex flex-col gap-2">
//                   <label htmlFor="phonenumber">Phone Number</label>
//                   <input
//                     name="phonenumber"
//                     value={teacherData.phonenumber}
//                     onChange={handleChange}
//                     className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     type="text"
//                     id="phonenumber"
//                     required
//                   />
//                 </div>
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <div className="flex flex-col gap-2">
//                   <label htmlFor="address">Address </label>
//                   <input
//                     name="address"
//                     value={teacherData.address}
//                     onChange={handleChange}
//                     className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     type="text"
//                     id="address"
//                     required
//                   />
//                 </div>
//               </td>
//               <td>
//                 <div className="flex flex-col gap-2">
//                   <label htmlFor="status">Status</label>
//                   <input
//                     name="status"
//                     value={teacherData.status}
//                     onChange={handleChange}
//                     className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
//                     type="text"
//                     id="status"
//                     required
//                   />
//                 </div>
//               </td>
//             </tr>          </tbody>
//         </table>

//         <div className="flex justify-end w-full">
//           <button
//             type="submit"
//             className="w-max bg-blue-500 text-white p-2 m-4 rounded hover:bg-blue-600 transition duration-200"
//           >
//             {id ? "Update Teacher" : "Add Teacher"}
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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/viewteacher/${id}`)
        .then((response) =>
          setTeacherData({
            name: response.data.teacher.name,
            guardian: response.data.teacher.guardian,
            email: response.data.user.email,
            password: response.data.user.password,
            subject: response.data.teacher.subject,
            phonenumber: response.data.teacher.phonenumber,
            address: response.data.teacher.address,
            status: response.data.teacher.status,
          })
        )
        .catch((error) =>
          console.error("Error fetching teacher data:", error)
        );
    }
  }, [id]);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (!/^[A-Za-z\s]+$/.test(value))
          error = "Name can only contain letters and spaces";
        break;

      case "guardian":
        if (!value.trim()) error = "Guardian name is required";
        else if (!/^[A-Za-z\s]+$/.test(value))
          error = "Guardian name can only contain letters and spaces";
        break;

      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(value))
          error = "Invalid email format";
        break;

      case "password":
        if (!id && !value.trim()) error = "Password is required";
        else if (!id && value.length < 6)
          error = "Password must be at least 6 characters";
        else if (!id && !/[A-Z]/.test(value))
          error = "Password must include at least one uppercase letter";
        else if (!id && !/[a-z]/.test(value))
          error = "Password must include at least one lowercase letter";
        else if (!id && !/[0-9]/.test(value))
          error = "Password must include at least one number";
        else if (!id && !/[!@#$%^&*(),.?\":{}|<>]/.test(value))
          error = "Password must include at least one special character";
        break;

      case "subject":
        if (!value.trim()) error = "Subject is required";
        break;

      case "phonenumber":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^\d{10,15}$/.test(value))
          error = "Phone number must be 10-15 digits only";
        break;

      case "address":
        if (!value.trim()) error = "Address is required";
        break;

      case "status":
        if (!["Active", "Inactive"].includes(value))
          error = "Status must be Active or Inactive";
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trimStart(); // Prevent leading spaces

    const error = validateField(name, trimmedValue);

    setTeacherData((prevData) => ({
      ...prevData,
      [name]: trimmedValue,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(teacherData).forEach((field) => {
      const error = validateField(field, teacherData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.error("Validation errors:", newErrors);
      return;
    }

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
        await axios.put(
          `http://localhost:5000/updateteacher/${id}`,
          teacherData,
          config
        );
        console.log("Teacher Updated:", teacherData);
      } else {
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
      setErrors({});

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
            {/* Name */}
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
                  {errors.name && (
                    <span className="text-red-500 text-sm">{errors.name}</span>
                  )}
                </div>
              </td>

              {/* Guardian */}
              <td>
                <div className="flex flex-col gap-2">
                  <label htmlFor="guardian">Father/Guardian</label>
                  <input
                    name="guardian"
                    value={teacherData.guardian}
                    onChange={handleChange}
                    className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    id="guardian"
                    required
                  />
                  {errors.guardian && (
                    <span className="text-red-500 text-sm">
                      {errors.guardian}
                    </span>
                  )}
                </div>
              </td>
            </tr>

            {/* Email & Password */}
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
                  {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email}</span>
                  )}
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
                    type="text"
                    id="password"
                    required={!id}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password}
                    </span>
                  )}
                </div>
              </td>
            </tr>

            {/* Subject & Phone */}
            <tr>
              <td>
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject">Subject</label>
                  <input
                    name="subject"
                    value={teacherData.subject}
                    onChange={handleChange}
                    className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    id="subject"
                    required
                  />
                  {errors.subject && (
                    <span className="text-red-500 text-sm">
                      {errors.subject}
                    </span>
                  )}
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
                  {errors.phonenumber && (
                    <span className="text-red-500 text-sm">
                      {errors.phonenumber}
                    </span>
                  )}
                </div>
              </td>
            </tr>

            {/* Address & Status (Dropdown) */}
            <tr>
              <td>
                <div className="flex flex-col gap-2">
                  <label htmlFor="address">Address</label>
                  <input
                    name="address"
                    value={teacherData.address}
                    onChange={handleChange}
                    className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    id="address"
                    required
                  />
                  {errors.address && (
                    <span className="text-red-500 text-sm">
                      {errors.address}
                    </span>
                  )}
                </div>
              </td>

              <td>
                <div className="flex flex-col gap-2">
                  <label htmlFor="status">Status</label>
                  <select
                    name="status"
                    value={teacherData.status}
                    onChange={handleChange}
                    className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    id="status"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {errors.status && (
                    <span className="text-red-500 text-sm">
                      {errors.status}
                    </span>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Submit button */}
        <div className="flex justify-end w-full">
          <button
            type="submit"
            disabled={Object.keys(errors).some((key) => errors[key])}
            className={`w-max bg-blue-500 text-white p-2 m-4 rounded transition duration-200 ${
              Object.keys(errors).some((key) => errors[key])
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
          >
            {id ? "Update Teacher" : "Add Teacher"}
          </button>
        </div>
      </form>
    </div>
  );
}
