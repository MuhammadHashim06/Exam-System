import ExamCode from './components/ExamCode'
import { Route, Routes } from 'react-router-dom'
import ExamCard from './components/ExamCard'
import ExamBoard from './components/ExamBoard'

export default function StudentDashboard() {
  return (
    <div>
      <Routes>
        <Route path="" element={<ExamCode />} />
        <Route path="examcard/:examcode" element={<ExamCard />} />
        <Route path="examboard/:examid" element={<ExamBoard />} />
      </Routes>
    </div>
  )
}
