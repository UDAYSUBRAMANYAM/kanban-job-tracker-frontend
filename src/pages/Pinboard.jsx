import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const COLUMNS = [
  { key: "saved", title: "Saved" },
  { key: "applied", title: "Applied" },
  { key: "interviewed", title: "Interviewed" },
  { key: "accepted", title: "Accepted" },
];

export default function Pinboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  // ---------------- FETCH JOBS ----------------
  const loadJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to load jobs", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DRAG END HANDLER ----------------
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    // dropped outside any column
    if (!destination) return;

    // dropped in same column
    if (source.droppableId === destination.droppableId) return;

    const jobId = Number(draggableId);
    const newStatus = destination.droppableId;

    // optimistic UI update
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);

    try {
      await api.put(`/jobs/${jobId}`, {
        status: newStatus,
      });
    } catch (err) {
      console.error("Failed to update job status", err);
      // rollback if backend fails
      loadJobs();
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <p>Loading pinboard...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="mb-4">Pinboard</h2>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="row">
            {COLUMNS.map((column) => (
              <div className="col-md-3" key={column.key}>
                <div className="card shadow-sm">
                  <div className="card-header text-center fw-bold">
                    {column.title}
                  </div>

                  <Droppable droppableId={column.key}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="card-body"
                        style={{ minHeight: "300px" }}
                      >
                        {jobs
                          .filter((job) => job.status === column.key)
                          .map((job, index) => (
                            <Draggable
                              key={job.id}
                              draggableId={job.id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="card mb-2 shadow-sm"
                                >
                                  <div className="card-body p-2">
                                    <strong>{job.company_name}</strong>
                                    <div className="text-muted small">
                                      {job.role}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </>
  );
}
