import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const userId = Number(localStorage.getItem("userId"));
  const roleId = Number(localStorage.getItem("roleId"));

  const fetchComplaints = async () => {
    const res = await API.get("/complaints");
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleCreate = async () => {
    try {
      await API.post("/complaints", {
        title,
        description,
        createdById: userId,
      });

      setTitle("");
      setDescription("");
      fetchComplaints();
    } catch {
      alert("Error creating complaint");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/complaints/${id}/${userId}`);
      fetchComplaints();
    } catch {
      alert("Delete failed");
    }
  };

  const handleAssign = async (id: number) => {
    try {
      await API.patch(`/complaints/${id}/assign`, {
        reviewerId: userId, // reviewer assigns to self
      });
      fetchComplaints();
    } catch {
      alert("Assign failed");
    }
  };

  const handleResolve = async (id: number) => {
    try {
      await API.patch(`/complaints/${id}/resolve`);
      fetchComplaints();
    } catch {
      alert("Resolve failed");
    }
  };

  const handleComment = async (id: number) => {
    const message = prompt("Enter comment");
    if (!message) return;

    try {
      await API.post("/comments", {
        message,
        complaintId: id,
        userId,
      });
      fetchComplaints();
    } catch {
      alert("Comment failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const roleText = roleId === 1 ? "Consumer" : "Reviewer";

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="flex justify-between items-center bg-white px-6 py-4 shadow">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        <div className="flex items-center gap-4">
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            {roleText}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-6">

        {/* CREATE (ONLY CONSUMER) */}
        {roleId === 1 && (
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Create Complaint</h2>

            <input
              placeholder="Title"
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              placeholder="Description"
              className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button
              onClick={handleCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        )}

        {/* LIST */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Complaints</h2>

          {complaints.length === 0 && (
            <p className="text-gray-500">No complaints found</p>
          )}

          {complaints.map((c) => (
            <div
              key={c.id}
              className="border p-4 mb-4 rounded-xl bg-white shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="text-sm text-gray-600">{c.description}</p>

              <p className="text-xs mt-1">
                Status:{" "}
                <span
                  className={
                    c.status === "RESOLVED"
                      ? "text-green-600 font-medium"
                      : "text-yellow-600 font-medium"
                  }
                >
                  {c.status}
                </span>
              </p>

              {/* COMMENTS */}
              <div className="mt-2">
                {c.comments.map((cm: any) => (
                  <p key={cm.id} className="text-xs text-gray-600">
                    • {cm.message}
                  </p>
                ))}
              </div>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-3 flex-wrap">

                {/* REVIEWER */}
                {roleId === 2 && (
                  <>
                    <button
                      onClick={() => handleAssign(c.id)}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Assign
                    </button>

                    <button
                      onClick={() => handleResolve(c.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Resolve
                    </button>
                  </>
                )}

                {/* BOTH */}
                <button
                  onClick={() => handleComment(c.id)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                >
                  Comment
                </button>

                {/* CONSUMER */}
                {roleId === 1 && c.createdById === userId && (
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;