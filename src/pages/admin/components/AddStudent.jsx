import { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddStudent() {
  const { id } = useParams();
  const navigate = new useNavigate()

  const [studentData, setStudentData] = useState({
    name: "",
    guardian: "",
    email: "",
    password: "",
    phonenumber: "",
    address: "",
    status: "Active", // Default valid value
    class: "", // Class field
    role:'student',
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
    
    // Validate that all required fields are filled
    const requiredFields = ['name', 'guardian', 'email', 'password', 'phonenumber', 'address', 'status', 'class'];
    const isValid = requiredFields.every(field => studentData[field]);

    if (!isValid) {
      console.error("Please fill all required fields");
      return; // Prevent submission if not valid
    }

    try {
      const response = await axios.post('http://localhost:5000/addstudent', studentData);
      console.log('status : ',response.status);
      if(response.status=='201'){
        console.log("New Student Added:", response.data);

        // Reset form fields
        setStudentData({
          name: "",
          guardian: "",
          email: "",
          password: "",
          phonenumber: "",
          address: "",
          status: "Active", // Reset to default valid value
          class: "",
          role:'student',
        });

navigate('/admin/student')
      }else{
        console.log('Something went wrong');
        
      }
      
      
      // Optionally, you can show a success message here

    } catch (error) {
      console.error("Error adding student:", error);
      alert('Somthing went wrong')
      navigate('/admin/student')
      // Optionally, you can show an error message to the user
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      console.log(id);
      // Optionally fetch existing student data if editing
    }
  }, [id]);

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
              <td>
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
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end w-full">
          <button
            type="submit"
            className="w-max bg-blue-500 text-white p-2 m-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
}
