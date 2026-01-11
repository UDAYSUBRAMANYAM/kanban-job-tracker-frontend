import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("saved");
  const [applyLink, setApplyLink] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  // ---------------- FETCH JOBS ----------------
  const loadJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs.");
    }
  };

  // ---------------- CREATE JOB ----------------
  const createJob = async (e) => {
    e.preventDefault();
    setError("");

    if (!companyName.trim() || !role.trim()) {
      setError("Company name and role are required.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/jobs", {
        company_name: companyName,
        role,
        status,
        apply_link: applyLink,
        description,
      });

      // update UI instantly
      setJobs([...jobs, res.data]);

      // reset form
      setCompanyName("");
      setRole("");
      setStatus("saved");
      setApplyLink("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setError("Failed to create job.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE JOB ----------------
  const deleteJob = async (id) => {
    try {
      await api.delete(`/jobs/${id}`);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete job.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-3">Jobs</h2>

        {/* SUMMARY */}
        <div className="card p-3 shadow-sm mb-4">
          <h5>Total Jobs Applied</h5>
          <h2 className="fw-bold">{jobs.length}</h2>
        </div>

        {/* CREATE JOB */}
        <div className="card p-4 shadow-sm mb-4">
          <h5 className="mb-3">Create Job</h5>

          {error && <div className="alert alert-danger py-1">{error}</div>}

          <form onSubmit={createJob}>
            <div className="mb-3">
              <label className="form-label">Company Name *</label>
              <input
                className="form-control"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Google"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Role *</label>
              <input
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Frontend Intern"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interviewed">Interviewed</option>
                <option value="accepted">Accepted</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Apply Link</label>
              <input
                className="form-control"
                value={applyLink}
                onChange={(e) => setApplyLink(e.target.value)}
                placeholder="https://careers.google.com"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Notes about this job"
              />
            </div>

            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Create Job"}
            </button>
          </form>
        </div>

        {/* JOB LIST */}
        <div className="card p-3 shadow-sm">
          <h5 className="mb-3">Your Job Titles</h5>

          {jobs.length === 0 ? (
            <p className="text-muted">No jobs added yet.</p>
          ) : (
            <ul className="list-group">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{job.company_name}</strong> — {job.role}
                    <div className="small text-muted">
                      Status: {job.status}
                    </div>
                  </div>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteJob(job.id)}
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
