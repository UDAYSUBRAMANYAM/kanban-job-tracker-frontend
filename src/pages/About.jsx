import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>About This Application</h2>
        <p className="mt-3">
          This Job Tracker is a personal Kanban-style application designed to
          help users manage job applications across different stages such as
          Saved, Applied, Interviewed, and Accepted.
        </p>

        <ul>
          <li>Track jobs visually using a Kanban board</li>
          <li>Manage personal skills</li>
          <li>Secure authentication with JWT</li>
          <li>Drag-and-drop status updates</li>
        </ul>

        <p className="mt-3">
          This project demonstrates full-stack development using FastAPI,
          React, JWT authentication, and modern UI patterns.
        </p>
        <p className="mt-3">
          This page is unprotected and to access other pages make sure you logged in.
        </p>
      </div>
    </>
  );
}
