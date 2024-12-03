import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExamCode() {
  const [examcode, setexamcode] = useState("");
  const navigate = useNavigate()
  // const exams = [
  //   {
  //     "examcode": "EXM101",
  //     "starttime": "2024-10-15T09:00:00Z",
  //     "endtime": "2024-10-15T10:00:00Z",
  //     "examDate": "2024-10-15",
  //     "examid": "EXAM001",
  //     "isconducted": true,
  //     "examtitle": "Math Midterm",
  //     "creationdatetime": "2024-09-01T14:30:00Z",
  //     "teacherid": "TEACHER001"
  //   },
  //   {
  //     "examcode": "EXM102",
  //     "starttime": "2024-10-16T11:00:00Z",
  //     "endtime": "2024-10-16T12:00:00Z",
  //     "examDate": "2024-10-16",
  //     "examid": "EXAM002",
  //     "isconducted": false,
  //     "examtitle": "Science Final",
  //     "creationdatetime": "2024-09-05T10:15:00Z",
  //     "teacherid": "TEACHER002"
  //   },
  //   {
  //     "examcode": "EXM103",
  //     "starttime": "2024-10-17T13:00:00Z",
  //     "endtime": "2024-10-17T14:00:00Z",
  //     "examDate": "2024-10-17",
  //     "examid": "EXAM003",
  //     "isconducted": true,
  //     "examtitle": "History Quiz",
  //     "creationdatetime": "2024-09-10T09:00:00Z",
  //     "teacherid": "TEACHER003"
  //   },
  //   {
  //     "examcode": "EXM104",
  //     "starttime": "2024-10-18T15:00:00Z",
  //     "endtime": "2024-10-18T16:00:00Z",
  //     "examDate": "2024-10-18",
  //     "examid": "EXAM004",
  //     "isconducted": false,
  //     "examtitle": "Geography Test",
  //     "creationdatetime": "2024-09-12T11:00:00Z",
  //     "teacherid": "TEACHER004"
  //   },
  //   {
  //     "examcode": "EXM105",
  //     "starttime": "2024-10-19T08:00:00Z",
  //     "endtime": "2024-10-19T09:00:00Z",
  //     "examDate": "2024-10-19",
  //     "examid": "EXAM005",
  //     "isconducted": true,
  //     "examtitle": "Computer Science Assessment",
  //     "creationdatetime": "2024-09-15T13:45:00Z",
  //     "teacherid": "TEACHER005"
  //   }
  // ];
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Exam code : ", examcode);

    // const exam = exams.find(e=> e.examCode==examcode)
    // console.log('Exam : ',exam);

    // <Navigate to={`/${examcode}`}/>
    navigate(`examcard/${examcode}`)
    

  };
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 "
      // style={{ backgroundImage: `url(${loginimg})`, backgroundSize: 'cover' }}
    >
      {/* <img className="w-1/2" src={loginimg} alt="login Image" /> */}

      <div className="bg-white p-6 rounded shadow-md w-96 border-t-4 border-blue-500 animate-right-left">
        <h2 className="text-2xl font-bold mb-6 text-center">Exam code</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* <label className="block text-gray-700" htmlFor="username">
              Exam Code
            </label> */}
            <input
              placeholder="Enter Exam Code"
              type="text"
              id="examcode"
              value={examcode}
              onChange={(e) => setexamcode(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Verify code
          </button>
        </form>
      </div>
    </div>
  );
}
