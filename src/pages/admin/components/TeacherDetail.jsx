import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TeacherDetail = () => {
  const { id } = useParams();
//   const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      // Simulate fetching teacher data
      const fetchedTeacher = {
        id: 1,
        name: "John Doe",
        father: "Richard Doe",
        email: "john.doe@example.com",
        password: "password123",
        grade: "10th",
        phoneNumber: "123-456-7890",
        address: "123 Elm Street, City, Country",
        status: "Active",
      };

      setTeacher(fetchedTeacher);
    };

    fetchTeacher();
  }, [id]);

  const handleDelete = (id) => {
    console.log(`Delete : ${id}`);
    // Add your deletion logic here
  };

  const onUpdate = (id) => {
    console.log(`Update : ${id}`);
    // Add your update logic here (e.g., redirect to edit form)
  };

  if (!teacher) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">{teacher.name}</h2>
      <p className="text-gray-700">
        <strong>Father&apos;s Name:</strong> {teacher.father}
      </p>
      <p className="text-gray-700">
        <strong>Email:</strong> {teacher.email}
      </p>
      <p className="text-gray-700">
        <strong>Password:</strong> {teacher.password}
      </p>
      <p className="text-gray-700">
        <strong>Grade:</strong> {teacher.grade}
      </p>
      <p className="text-gray-700">
        <strong>Phone Number:</strong> {teacher.phoneNumber}
      </p>
      <p className="text-gray-700">
        <strong>Address:</strong> {teacher.address}
      </p>
      <p className="text-gray-700">
        <strong>Status:</strong> {teacher.status}
      </p>

      <div className="mt-5">
        <button
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onUpdate(teacher.id)}
        >
          Update Teacher
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => handleDelete(teacher.id)}
        >
          Delete Teacher
        </button>
      </div>
    </div>
  );
};

export default TeacherDetail;
