import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import male_avatar from "../../assets/male_avatar.svg";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard flex bg-gray-100 h-screen">
      <aside className="w-64 bg-white py-5">
        <div className="flex flex-col items-center">
          <img src={male_avatar} alt="User Avatar" className="mb-4 max-w-28 " />
          <h2 className="text-xl mb-4">Dashboard</h2>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink
                to="student"
                className={({ isActive }) =>
                  `block w-full px-5 text-left p-2 ${
                    isActive ? "bg-gray-100 text-blue-500" : "hover:bg-gray-200"
                  }`
                }
              >
                <i class="fas fa-graduation-cap mx-2"></i> Student
              </NavLink>
            </li>
            <li>
              <NavLink
                to="teacher"
                className={({ isActive }) =>
                  `block w-full px-5 text-left p-2 ${
                    isActive ? "bg-gray-100 text-blue-500" : "hover:bg-gray-200"
                  }`
                }
              >
                <i class="fas fa-chalkboard-user mx-2 "></i> Teacher
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
