import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState([]);
  const [jobsCount, setJobsCount] = useState(0);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
  try {
    // USER
    const userRes = await api.get("/users/me");
    setName(userRes.data.email.split("@")[0]);
  } catch (err) {
    console.error("User fetch failed", err);
  }

  try {
    // SKILLS
    const skillsRes = await api.get("/skills");
    const skillsArray = Array.isArray(skillsRes.data)
      ? skillsRes.data
      : skillsRes.data.skills || [];
    setSkills(skillsArray);
  } catch (err) {
    console.error("Skills fetch failed", err);
    setSkills([]);
  }

  try {
    // JOBS
    const jobsRes = await api.get("/jobs");
    const jobsArray = Array.isArray(jobsRes.data)
      ? jobsRes.data
      : jobsRes.data.jobs || [];
    setJobsCount(jobsArray.length);
  } catch (err) {
    console.error("Jobs fetch failed", err);
    setJobsCount(0);
  }
};

  const addSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;

    if (skills.some(s => s.name.toLowerCase() === newSkill.toLowerCase())) return;

    const res = await api.post("/skills", { name: newSkill });
    setSkills([...skills, res.data]);
    setNewSkill("");
  };

  const deleteSkill = async (id) => {
    await api.delete(`/skills/${id}`);
    setSkills(skills.filter(s => s.id !== id));
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2>Hey, {name} 👋</h2>

        <div className="row my-4">
          <StatCard title="Skills" value={skills.length} />
          <StatCard title="Jobs" value={jobsCount} />
        </div>

        <div className="card p-3">
          <h5>Skills</h5>

          <form onSubmit={addSkill} className="d-flex gap-2 mb-2">
            <input className="form-control" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} />
            <button className="btn btn-success">➕</button>
          </form>

          <ul className="list-group">
            {skills.map(skill => (
              <li key={skill.id} className="list-group-item d-flex justify-content-between">
                {skill.name}
                <button className="btn btn-sm btn-outline-danger" onClick={() => deleteSkill(skill.id)}>
                  🗑
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-body">
          <h6>{title}</h6>
          <h2>{value}</h2>
        </div>
      </div>
    </div>
  );
}
