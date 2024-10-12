import { React, useState } from "react";

export default function ExamCode() {
  const [examcode, setexamcode] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Exam code : ", examcode);
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
