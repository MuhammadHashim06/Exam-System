import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";

export default function ExamCard() {
  const { examcode } = useParams();
  const [currentexam, setCurrentExam] = useState(null);
  const [examStatus, setExamStatus] = useState(""); // State to track exam status

  const rules = [
    "You can't Minimize Window",
    "You cannot Change the tab",
    "You cannot move to other window",
    "Anything done can be considered cheating",
  ];

  const exams = [
    {
      examcode: "EXM101",
      starttime: "2024-10-15T09:00:00Z",
      endtime: "2024-10-15T10:00:00Z",
      examDate: "2024-10-15",
      examid: "EXAM001",
      isconducted: true,
      examtitle: "Math Midterm",
      creationdatetime: "2024-09-01T14:30:00Z",
      teacherid: "TEACHER001",
    },
    {
      examcode: "EXM102",
      starttime: "2024-10-16T11:00:00Z",
      endtime: "2024-10-16T12:00:00Z",
      examDate: "2024-10-16",
      examid: "EXAM002",
      isconducted: false,
      examtitle: "Science Final",
      creationdatetime: "2024-09-05T10:15:00Z",
      teacherid: "TEACHER002",
    },
    {
      examcode: "EXM103",
      starttime: "2024-10-17T13:00:00Z",
      endtime: "2024-10-17T14:00:00Z",
      examDate: "2024-10-17",
      examid: "EXAM003",
      isconducted: true,
      examtitle: "History Quiz",
      creationdatetime: "2024-09-10T09:00:00Z",
      teacherid: "TEACHER003",
    },
    {
      examcode: "EXM104",
      starttime: "2024-10-18T15:00:00Z",
      endtime: "2024-10-18T16:00:00Z",
      examDate: "2024-10-18",
      examid: "EXAM004",
      isconducted: false,
      examtitle: "Geography Test",
      creationdatetime: "2024-09-12T11:00:00Z",
      teacherid: "TEACHER004",
    },
    {
      examcode: "EXM105",
      starttime: "2024-10-14T00:00:00Z",
      endtime: "2024-10-14T01:00:00Z",
      examDate: "2024-10-14",
      examid: "EXAM005",
      isconducted: true,
      examtitle: "Computer Science Assessment",
      creationdatetime: "2024-09-13T13:45:00Z",
      teacherid: "TEACHER005",
    },
  ];

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return new Date(dateString).toLocaleTimeString([], options);
  };

  const calculateDurationInMinutes = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationInMinutes = Math.floor((endTime - startTime) / 60000); // Convert milliseconds to minutes
    return `${durationInMinutes} min`;
  };

  useEffect(() => {
    const examDetail = exams.find((e) => e.examcode === examcode);
    setCurrentExam(examDetail);

    // Check the exam time and update status
    if (examDetail) {
      const now = new Date();
      const startTime = new Date(examDetail.starttime);
      const endTime = new Date(examDetail.endtime);

      if (now < startTime) {
        setExamStatus("not_started");
      } else if (now > endTime) {
        setExamStatus("already_taken");
      } else {
        setExamStatus("in_progress");
      }
    }
  }, [examcode]);

  // Determine if the button should be enabled
  const isExamActive = () => {
    const now = new Date();
    return now >= new Date(currentexam.starttime) && now <= new Date(currentexam.endtime);
  };

  return (
    <div>
      {currentexam ? (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
          <div className="flex justify-between items-center">
            <h1 className="text-5xl">{currentexam.examtitle}</h1>
            <p className=" bg-white text-blue-500 shadow-md rounded-md px-3 py-1">
              <i className="fas fa-calendar-alt"></i> Exam Date: {currentexam.examDate}
            </p>
          </div>
          <div className="flex justify-center items-center h-full">
            <div className="bg-white rounded-md shadow-md p-5 w-1/2 flex flex-col gap-10">
              <div className="flex gap-4 justify-between items-center">
                <p className="bg-gray-100 text-sm shadow-md rounded-md px-3 py-1 ">
                  <i className="fas fa-clock"></i> Start Time: {formatTime(currentexam.starttime)}
                </p>

                <p className="bg-blue-500 border text-white text-sm shadow-md rounded-md px-3 py-1">
                  <i className="fas fa-hourglass-half"></i> Duration:{" "}
                  {calculateDurationInMinutes(currentexam.starttime, currentexam.endtime)}
                </p>
              </div>
<div className="rules">
  <p className="font-bold">
    Rules for the Exam
  </p>
<ul className="list-disc pl-5 mb-4">
                {rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
</div>
              
              <div className="bottomlink flex justify-end gap-5 items-center">
                {examStatus === "not_started" && (
                  <p className="text-red-500">The exam has not started yet.</p>
                )}
                {examStatus === "already_taken" && (
                  <p className="text-red-500">The exam has already been taken.</p>
                )}
                {examStatus === "in_progress" && (
                  <p className="text-green-500">The exam has started.</p>
                )}
                <button
                  className="text-white bg-blue-500 hover:bg-blue-300 w-max px-4 py-2 rounded-md disabled:bg-gray-200 disabled:text-black"
                  disabled={!isExamActive()}
                >
                  Start Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Exam not found.</p>
      )}
    </div>
  );
}
