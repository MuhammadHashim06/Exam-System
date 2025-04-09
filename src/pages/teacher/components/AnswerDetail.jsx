import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function AnswerDetail() {
  const { examID } = useParams();
  const [examData, setExamData] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("I am rendered");
    
    const fetchExamData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/answers/${examID}`);
        setExamData(response.data);
      } catch (error) {
        console.error("Error fetching exam data:", error);
      }
    };
    fetchExamData();
  }, [examID]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCalculateResult = async () => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }
  
    setLoading(true);
    const formData = new FormData();
    formData.append("exam_pdf", file); // Correct field name
    formData.append("exam_id", examID); // Correct field name
    formData.append("submissions_json", JSON.stringify(examData)); // Include this!
  
    try {
      const response = await axios.post("http://localhost:8000/api/examine", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Result calculated successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error calculating result:", error);
      alert("Failed to calculate result.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-4 bg-white rounded-md shadow-md m-4">
      <h1 className="text-2xl font-bold mb-4">Exam Details</h1>
      <p><strong>Exam ID:</strong> {examID}</p>
      <table className="w-full mt-4 border border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Student Name</th>
            <th className="p-2 border">Submission Time</th>
            <th className="p-2 border">Total Answers</th>
          </tr>
        </thead>
        <tbody>
          {examData.map((submission, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-2 border">{submission.studentName}</td>
              <td className="p-2 border">{new Date(submission.submissionTime).toLocaleString()}</td>
              <td className="p-2 border">{submission.answers.length}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <button
          onClick={handleCalculateResult}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md ml-2"
        >
          {loading ? "Calculating..." : "Calculate Result"}
        </button>
      </div>
    </div>
  );
}
