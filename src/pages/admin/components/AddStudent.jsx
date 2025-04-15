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

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (!/^[A-Za-z\s]+$/.test(value)) error = "Name can only contain letters and spaces";
        break;

      case "guardian":
        if (!value.trim()) error = "Guardian name is required";
        else if (!/^[A-Za-z\s]+$/.test(value)) error = "Guardian name can only contain letters and spaces";
        break;

      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(value)) error = "Invalid email format";
        break;

      case "password":
        if (!value.trim()) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
        else if (!/[A-Z]/.test(value)) error = "Password must include at least one uppercase letter";
        else if (!/[a-z]/.test(value)) error = "Password must include at least one lowercase letter";
        else if (!/[0-9]/.test(value)) error = "Password must include at least one number";
        else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) error = "Password must include at least one special character";
        break;

      case "phonenumber":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^\d{10,15}$/.test(value)) error = "Phone number must be 10-15 digits only";
        break;

      case "address":
        if (!value.trim()) error = "Address is required";
        break;

      case "status":
        if (!["Active", "Inactive"].includes(value)) error = "Status must be Active or Inactive";
        break;

      case "class":
        if (!value.trim()) error = "Class is required";
        else if (!/^[A-Za-z0-9\s]+$/.test(value)) error = "Class can only contain letters, numbers, and spaces";
        break;

      default:
        break;
    }

    return error;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trimStart(); // remove leading spaces only while typing

    const error = validateField(name, trimmedValue);

    setStudentData((prevData) => ({
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
    Object.keys(studentData).forEach((field) => {
      const error = validateField(field, studentData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.error("Validation errors:", newErrors);
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
        setErrors({});
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
      console.log("Student Data : ",studentData);
      
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
          setErrors({});
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
                  {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
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
                  {errors.guardian && <span className="text-red-500 text-sm">{errors.guardian}</span>}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    name="email"
                    value={studentData.email}
                    onChange={handleChange}
                    className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    type="email"
                    id="email"
                    required
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
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
                    type="text"
                    id="password"
                    required
                  />
                  {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
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
                  {errors.phonenumber && <span className="text-red-500 text-sm">{errors.phonenumber}</span>}
                </div>
              </td>
              <td>
                <div className="flex flex-col gap-2">
                  <label htmlFor="address">Address</label>
                  <input
                    name="address"
                    value={studentData.address}
                    onChange={handleChange}
                    className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    id="address"
                    required
                  />
                  {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="flex flex-col gap-2">
                  <label htmlFor="status">Status</label>
                  <select
                    name="status"
                    value={studentData.status}
                    onChange={handleChange}
                    className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    id="status"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {errors.status && <span className="text-red-500 text-sm">{errors.status}</span>}

                </div>
              </td>
              <td>
                <div className="flex flex-col gap-2">
                  <label htmlFor="class">Class</label>
                  <input
                    name="class"
                    value={studentData.class}
                    onChange={handleChange}
                    className="w-4/5 bg-slate-50 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    id="class"
                    required
                  />
                  {errors.class && <span className="text-red-500 text-sm">{errors.class}</span>}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end w-full">
          <button
            type="submit"
            disabled={Object.keys(errors).some((key) => errors[key])}
            className={`w-max bg-blue-500 text-white p-2 m-4 rounded transition duration-200 ${Object.keys(errors).some((key) => errors[key]) ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
          >
            {id ? "Update Student" : "Add Student"}
          </button>
        </div>
      </form>
    </div>
  );
}
