import React from 'react'
import ExamCode from './components/ExamCode'
import { Route, Routes } from 'react-router-dom'

export default function StudentDashboard() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ExamCode />} />
        {/* <Route path="courses" element={<StudentCourses />} /> */}
        {/* <Route path="grades" element={<StudentGrades />} /> */}
      </Routes>
    </div>
  )
}
