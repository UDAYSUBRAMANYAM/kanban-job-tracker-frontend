import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const STATUSES = ["all", "saved", "applied", "interviewed", "accepted"];

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState("all");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/jobs/${id}`);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      console.error("Failed to delete job", err);
      alert("Failed to delete job.");
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "saved":
        return "secondary";
      case "applied":
        return "primary";
      case "interviewed":
        return "warning";
      case "accepted":
        return "success";
      default:
        return "dark";
    }
  };

  const filteredJobs =
    activeStatus === "all"
      ? jobs
      : jobs.filter((job) => job.status === activeStatus);

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-3">All Jobs</h2>

        {/* STATUS FILTER TABS */}
        <ul className="nav nav-pills mb-4">
          {STATUSES.map((status) => (
            <li className="nav-item" key={status}>
              <button
                className={`nav-link ${
                  activeStatus === status ? "active" : ""
                }`}
                onClick={() => setActiveStatus(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {loading ? (
          <p>Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-muted">No jobs found.</p>
        ) : (
          <div className="row">
            {filteredJobs.map((job) => (
              <div className="col-md-6 col-lg-4 mb-4" key={job.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{job.company_name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {job.role}
                    </h6>

                    <span
                      className={`badge bg-${statusColor(
                        job.status
                      )} mb-2 align-self-start`}
                    >
                      {job.status}
                    </span>

                    <p className="card-text flex-grow-1">
                      {job.description || "No description provided."}
                    </p>

                    {job.apply_link && (
                      <a
                        href={job.apply_link}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-outline-primary mb-2"
                      >
                        Apply Link
                      </a>
                    )}

                    {/* DELETE BUTTON */}
                    <button
                      className="btn btn-sm btn-outline-danger mt-auto"
                      onClick={() => deleteJob(job.id)}
                    >
                      Delete Job
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
