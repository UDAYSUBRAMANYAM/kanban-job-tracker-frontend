---

# 🧩 Kanban Job Tracker – Full Stack Application

A full-stack **Kanban-style Job Tracking application** that helps users manage job applications across different stages with a clean UI, secure authentication, and real-time drag-and-drop updates.

This project is designed and built to demonstrate **practical full-stack development skills**, not just basic CRUD.

---

## 🚀 Live Demo

> Frontend: `https://your-frontend-url`
> Backend API: `https://your-backend-url`

---

## 🛠 Tech Stack

### Frontend

* **React (Vite)**
* **React Router**
* **Bootstrap 5**
* **Axios**
* **@hello-pangea/dnd** (Drag & Drop)

### Backend

* **FastAPI**
* **JWT Authentication**
* **SQLAlchemy**
* **SQLite / PostgreSQL**
* **Pydantic**

---

## ✨ Features

### 🔐 Authentication

* User **Signup & Login**
* **JWT-based authentication**
* Protected routes using middleware
* **Guest Login** for hiring managers (one-click access)

---

### 📊 Dashboard

* Personalized greeting (username derived from email)
* Summary cards:

  * Total Skills
  * Total Jobs
* Skills management directly from dashboard

---

### 🧠 Skills Management

* Add skills
* Delete skills
* Client-side duplicate prevention (case-insensitive)
* Skills scoped strictly to logged-in user

---

### 💼 Job Management

* Create job entries with:

  * Company name
  * Role
  * Status
  * Apply link
  * Description
* View all jobs
* Delete jobs
* Jobs are user-specific and secure

---

### 🧲 Kanban Pinboard

* Drag-and-drop Kanban board
* Four stages:

  * Saved
  * Applied
  * Interviewed
  * Accepted
* Dragging a card updates job status **in the backend**
* Optimistic UI updates with rollback on failure

---

### 📖 About Pages

* **About Project** – explains app purpose and design
* **About Me** – developer introduction and tech stack

---

### 🚪 Logout

* Clears JWT token
* Redirects user to home page
* Stateless and secure

---

## 🧪 Validation Strategy

### Client-side Validation

* Required field checks (login, signup, jobs)
* Duplicate skill prevention
* Controlled dropdowns for job status
* Drag-and-drop validation (invalid drops blocked)

### Server-side Validation

* JWT authentication on all protected endpoints
* User ownership enforced for skills and jobs
* Backend error handling surfaced to frontend

---

## 📁 Project Structure

```text
src/
├── api/
│   └── axios.js
├── components/
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── Jobs.jsx
├── pages/
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── Pinboard.jsx
│   ├── About.jsx
│   └── AboutMe.jsx
├── App.jsx
└── main.jsx
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/UDAYSUBRAMANYAM/job-tracker-api
git clone https://github.com/UDAYSUBRAMANYAM/job-tracker-frontend
```
#and run both accordingly

### 2️⃣ Frontend Setup

```bash
npm install
npm run dev
```

Create `.env`:

```env
VITE_API_URL=http://localhost:8000
```

---

### 3️⃣ Backend Setup

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 👤 Guest Login (For Reviewers)

Use the **“Login as Guest”** checkbox on the login page to explore the app without signing up.

(Default credentials are auto-filled.)

---

## 🔒 Security Considerations

* JWT tokens stored securely
* Backend enforces user ownership
* Protected routes on frontend and backend
* Stateless authentication model

---

## 📈 Scalability Notes

In a production environment, the application can be scaled by:

* Separating frontend and backend deployments
* Introducing API versioning
* Adding role-based access control (RBAC)
* Using Redis for caching and rate limiting
* Deploying with Docker and CI/CD pipelines

---

## 🎯 Why This Project?

This project was built to:

* Go beyond tutorial CRUD apps
* Demonstrate real-world UI/UX decisions
* Show understanding of authentication, state management, and system design
* Provide a hiring-manager-friendly experience

---

## 👨‍💻 Author

**UDAY**
Backend-focused Full Stack Developer
Interested in building scalable, secure, and user-centric applications.

---

## 📜 License

This project is for educational and demonstration purposes.

---

### ✅ Final Note

This project is **complete, functional, and interview-ready**.
It demonstrates **product thinking**, not just coding ability.

