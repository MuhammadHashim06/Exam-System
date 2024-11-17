import { NavLink, Outlet } from "react-router-dom";
import male_avatar from '../../assets/male_avatar.svg'
export default function TeacherDashboard() {
  return (
    <div className="dashboard flex bg-gray-100 h-screen">
    <aside className="w-56 bg-white py-5">
      <div className="flex flex-col items-center">
        <img src={male_avatar} alt="User Avatar" className="mb-4 max-w-28 " />
        <h2 className="text-xl mb-4">Dashboard</h2>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink
              to="exampapers"
              className={({ isActive }) =>
                `block w-full px-5 text-left p-2 ${
                  isActive ? "bg-gray-100 text-blue-500" : "hover:bg-gray-200"
                }`
              }
            >
              <i className="fas fa-graduation-cap mx-2"></i> Exam Papers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="result"
              className={({ isActive }) =>
                `block w-full px-5 text-left p-2 ${
                  isActive ? "bg-gray-100 text-blue-500" : "hover:bg-gray-200"
                }`
              }
            >
              <i className="fas fa-chalkboard-user mx-2 "></i> Results
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>

    <main className="flex-1">
      <div className="flex justify-between bg-white p-4 items-center">
        <h1 className="text-xl">Exam Sytem</h1>
        <img className="w-14" src={male_avatar} alt="" />
      </div>
      <Outlet />
    </main>
  </div>
);
}
