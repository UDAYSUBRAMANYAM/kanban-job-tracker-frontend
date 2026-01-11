import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkClass = (path) =>
    `nav-link btn btn-link text-start ${
      location.pathname === path ? "active fw-bold text-white" : "text-secondary"
    }`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-bold">Job Tracker</span>

      <ul className="navbar-nav me-auto gap-2">
        <li className="nav-item">
          <button
            className={linkClass("/dashboard")}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </li>

        <li className="nav-item">
          <button
            className={linkClass("/jobs")}
            onClick={() => navigate("/jobs")}
          >
            Jobs
          </button>
        </li>

        <li className="nav-item">
          <button
            className={linkClass("/pinboard")}
            onClick={() => navigate("/pinboard")}
          >
            Pinboard
          </button>
        </li>

        <li className="nav-item">
          <button
            className={linkClass("/about")}
            onClick={() => navigate("/about")}
          >
            Project
          </button>
        </li>

        <li className="nav-item">
          <button
            className={linkClass("/about_me")}
            onClick={() => navigate("/about_me")}
          >
            About Me
          </button>
        </li>
      </ul>

      <button className="btn btn-outline-danger btn-sm" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}
