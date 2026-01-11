import Navbar from "../components/Navbar";

export default function AboutMe() {
  return (
    <>
      <Navbar />

      <div className="container mt-4 mb-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title mb-3">About Me</h2>

            <p>
              Hi, I’m <strong>UDAY</strong>, a backend-focused developer with a
              strong interest in building scalable, secure, and user-friendly
              applications.
            </p>

            <p>
              I built this project end-to-end — from API design and
              authentication to frontend state management and drag-and-drop
              interactions.
            </p>

            <h5 className="mt-4">Tech Stack</h5>
            <ul>
              <li><strong>Backend:</strong> FastAPI, SQLAlchemy, JWT</li>
              <li><strong>Frontend:</strong> React, Bootstrap</li>
              <li><strong>Database:</strong> SQL</li>
            </ul>

            <p className="mt-3">
              I enjoy solving real-world problems and continuously improving my
              system design and full-stack skills.
            </p>

            <p className="text-muted">
              This page is unprotected. To access other pages, make sure you are logged in.
            </p>

            <hr className="my-4" />

            <h5>Contact Details</h5>

            <div className="mt-3">
              <p className="mb-2">
                <strong>📞 Mobile:</strong>{" "}
                <a href="tel:7989227578" className="text-decoration-none">
                  7989227578
                </a>
              </p>

              <p className="mb-2">
                <strong>📧 Email:</strong>{" "}
                <a
                  href="mailto:udaydivvi@gmail.com"
                  className="text-decoration-none"
                >
                  udaydivvi@gmail.com
                </a>
              </p>

              <p className="mb-2">
                <strong>🔗 LinkedIn:</strong>{" "}
                <a
                  href="https://www.linkedin.com/in/uday-divvi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  linkedin.com/in/uday-divvi/
                </a>
              </p>

              <p className="mb-0">
                <strong>💻 GitHub:</strong>{" "}
                <a
                  href="https://github.com/UDAYSUBRAMANYAM/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  github.com/UDAYSUBRAMANYAM/
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
