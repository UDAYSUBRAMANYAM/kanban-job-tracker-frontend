import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Jobs from "./components/Jobs";
import Pinboard from "./pages/Pinboard";
import About from "./pages/About";
import AboutMe from "./pages/AboutMe";
import AllJobs from "./pages/AllJobs";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pinboard"
        element={
          <ProtectedRoute>
            <Pinboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/all-jobs"
        element={
          <ProtectedRoute>
            <AllJobs />
          </ProtectedRoute>
        }
      />
      <Route path="/about" element={<About/>}/>
      <Route path="/about_me" element={<AboutMe/>}/>
    </Routes>
    
  );
}
