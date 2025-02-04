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
import ExamPapers from "./pages/teacher/components/ExamPapers";
import AddExam from "./pages/teacher/components/AddExam";
import ExamCard from "./pages/student/components/ExamCode";
import ExamBoard from "./pages/student/components/ExamBoard";
import ExamCode from "./pages/student/components/ExamCode";
import Results from "./pages/teacher/components/Results";
import MarkSheet from "./pages/teacher/components/MarkSheet";
import ExamDetail from "./pages/teacher/components/ExamDetail";
import ExamAnswers from "./pages/teacher/components/ExamAnswers";
import AnswerDetail from "./pages/teacher/components/AnswerDetail";

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
        <Route path="teacher/*" element={<TeacherDashboard />}>
          <Route index element={<Navigate to="exampapers" />} />
          <Route path="exampapers" element={<ExamPapers />} />
          <Route path="exampapers/add" element={<AddExam />} />
          <Route path="exampapers/edit/:examID" element={<AddExam mode="edit" />} />
          <Route path="exampapers/detail/:examID" element={<ExamDetail />} />

          <Route path="examanswers" element={<ExamAnswers />} />
          <Route path="examanswers/detail" element={<AnswerDetail />} />

          <Route path="results" element={<Results />} />
          <Route path="results/marksheet/:examID" element={<MarkSheet />} />

        </Route>
        <Route path="student/*" element={<StudentDashboard />} >
          <Route index element={<ExamCode />} />
          <Route path="examcard/:examcode" element={<ExamCard />} />
          <Route path="examboard/:examid" element={<ExamBoard />} /></Route>
      </Route>
    </Routes>
  );
}

export default App;
