import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Users = [
    {
        username : 'admin123@gmail.com',
        password : 'admin@123',
        role:'admin'
    },
    {
        username : 'teacher123@gmail.com',
        password : 'teacher@123',
        role:'teacher'
    },
    {
        username : 'student123@gmail.com',
        password : 'student@123',
        role:'student'
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // Add your login logic here
    Users.forEach(user=>{
        if(user.username==username && user.password==password){
            if(user.role=='admin'){
                navigate("/admin");
            }else if(user.role=='student'){
                navigate("/student");
            }else if(user.role=='teacher'){
                navigate("/teacher");
            }
            
        }
    })
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <div className="bg-white p-6 rounded shadow-md w-96 border-t-4 border-blue-500 ">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;