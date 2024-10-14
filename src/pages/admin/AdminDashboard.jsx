
import React from 'react';
import { BrowserRouter as router, Link, Outlet, Routes } from 'react-router-dom';
import Student from './components/Student';
import Teacher from './components/Teacher';

const AdminDashboard = () => {
    return (
        <div className="flex">
            <aside className="w-64 bg-gray-800 text-white p-5">
                <h2 className="text-xl mb-4">Dashboard</h2>
                <nav>
                    <ul>
                        <li><Link to="student" className="block w-full text-left p-2 hover:bg-gray-700">Student</Link></li>
                        <li><Link to="teacher" className="block w-full text-left p-2 hover:bg-gray-700">Teacher</Link></li>
                        
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
