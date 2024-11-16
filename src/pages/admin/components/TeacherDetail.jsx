import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch teacher details from API
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/viewteacher/${id}`);
        setTeacher(response.data);
      } catch (err) {
        console.error("Error fetching teacher details:", err);
        setError("Failed to load teacher details.");
      } finally {
        setLoading(false);
      }
    };
    fetchTeacher();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/deleteteacher/${id}`);
      if (res.status === 200) {
        navigate("/admin/teacher");
      }
    } catch (error) {
      console.error("Error deleting teacher details:", error);
    } finally {
      navigate("/admin/teacher");
    }
  };

  const onUpdate = (id) => {
    navigate(`/admin/teacher/edit/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!teacher) {
    return <div>Teacher not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">{teacher.teacher.name}</h2>
      <p className="text-gray-700"><strong>Fathers Name:</strong> {teacher.teacher.guardian}</p>
      <p className="text-gray-700"><strong>Email:</strong> {teacher.user.email}</p>
      {/* <p className="text-gray-700"><strong>Password:</strong> {teacher.password}</p> */}
      <p className="text-gray-700"><strong>Subject:</strong> {teacher.teacher.subject}</p>
      <p className="text-gray-700"><strong>Phone Number:</strong> {teacher.teacher.phoneNumber}</p>
      <p className="text-gray-700"><strong>Address:</strong> {teacher.teacher.address}</p>
      <p className="text-gray-700"><strong>Status:</strong> {teacher.teacher.status}</p>

      <div className="mt-5">
        <button
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onUpdate(teacher.teacher._id)}
        >
          Update Teacher
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => handleDelete(teacher.teacher._id)}
        >
          Delete Teacher
        </button>
      </div>
    </div>
  );
};

export default TeacherDetail;
