import './App.css'

import { Routes ,Route } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import StudentDashboard from './pages/student/StudentDashboard'
import ProtectedGaurd from './utilities/ProtectedGaurd'
function App() {

  return (
      <Routes>
        <Route path='' element={<Login/>} />
        <Route element={<ProtectedGaurd/>} >
        <Route path='admin/*' element={<AdminDashboard/>} />
        <Route path='teacher/*' element={<TeacherDashboard/>} />
        <Route path='student/*' element={<StudentDashboard/>} />
        </Route>
      </Routes>
  )
}

export default App
