import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import ProtectedGaurd from "./utilities/ProtectedGaurd";
import Student from "./pages/admin/components/Student";
import Teacher from "./pages/admin/components/Teacher";
import AddTeacher from "./pages/admin/components/AddTeacher";
import AddStudent from "./pages/admin/components/AddStudent";
import StudentDetail from "./pages/admin/components/StudentDetail";
import TeacherDetail from "./pages/admin/components/TeacherDetail";

function App() {
  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route element={<ProtectedGaurd />}>
        <Route path="admin/*" element={<AdminDashboard />}>
          <Route path="" element={<Navigate to="student" />} />
          <Route path="student/*" element={<Student />} />
          <Route path="student/add" element={<AddStudent />} />
          <Route path="student/edit/:id" element={<AddStudent />} />
          <Route path="student/detail/:id" element={<StudentDetail />} />
          <Route path="teacher/*" element={<Teacher />} />
          <Route path="teacher/add" element={<AddTeacher />} />
          <Route path="teacher/edit/:id" element={<AddTeacher />} />
          <Route path="teacher/detail/:id" element={<TeacherDetail />} />
        </Route>
        <Route path="teacher/*" element={<TeacherDashboard />} />
        <Route path="student/*" element={<StudentDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
