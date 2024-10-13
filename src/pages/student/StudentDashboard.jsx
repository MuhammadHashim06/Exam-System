import React from 'react'
import ExamCode from './components/ExamCode'
import { Route, Routes } from 'react-router-dom'
import ExamCard from './components/ExamCard'

export default function StudentDashboard() {
  return (
    <div>
      <Routes>
        <Route path="" element={<ExamCode />} />
        <Route path="/:examcode" element={<ExamCard />} />
        {/* <Route path="grades" element={<StudentGrades />} /> */}
      </Routes>
    </div>
  )
}
