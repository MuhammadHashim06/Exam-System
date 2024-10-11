import './App.css'

import { Routes ,Route } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import StudentDashboard from './pages/student/StudentDashboard'
function App() {

  return (
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/admin' element={<AdminDashboard/>} />
        <Route path='/teacher' element={<TeacherDashboard/>} />
        <Route path='/student' element={<StudentDashboard/>} />
      </Routes>
  )
}

export default App
