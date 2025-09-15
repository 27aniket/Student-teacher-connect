import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBook, FaPlus, FaChalkboardTeacher, FaTrash } from "react-icons/fa";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    deadline: "",
    subject: "",
  });
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // ✅ FIXED: same API URL for fetching assignments
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/assignments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAssignments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = async () => {
    if (role !== "Teacher") return alert("Only teachers can post assignments");
    const res = await axios.post(
      "http://localhost:8000/api/assignments",
      newAssignment,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setAssignments([...assignments, res.data]);
  };

  const handleDelete = async (id) => {
    if (role !== "Teacher")
      return alert("Only teachers can delete assignments");
    await axios.delete(`http://localhost:8000/api/assignments/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAssignments(assignments.filter((a) => a._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center text-indigo-700">
          <FaBook className="mr-2" /> Assignments
        </h2>

        {role === "Teacher" && (
          <div className="mb-6 bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <FaChalkboardTeacher className="mr-2" /> Add New Assignment
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="Title"
                className="border p-2 rounded-lg"
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, title: e.target.value })
                }
              />
              <input
                placeholder="Subject"
                className="border p-2 rounded-lg"
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    subject: e.target.value,
                  })
                }
              />
              <input
                placeholder="Description"
                className="border p-2 rounded-lg col-span-2"
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    description: e.target.value,
                  })
                }
              />
              <input
                type="date"
                className="border p-2 rounded-lg col-span-2"
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    deadline: e.target.value,
                  })
                }
              />
            </div>
            <button
              onClick={handleAdd}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center"
            >
              <FaPlus className="mr-2" /> Add Assignment
            </button>
          </div>
        )}

        <ul className="space-y-4">
          {assignments.map((a) => (
            <li
              key={a._id}
              className="p-4 bg-gray-50 rounded-lg shadow-md flex justify-between items-start"
            >
              <div>
                <h4 className="font-bold text-lg">{a.title}</h4>
                <p className="text-gray-600">{a.description}</p>
                <p className="text-sm text-gray-500">Subject: {a.subject}</p>
                <p className="text-sm text-red-500">
                  Deadline: {new Date(a.deadline).toDateString()}
                </p>
              </div>

              {role === "Teacher" && (
                <button
                  onClick={() => handleDelete(a._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete Assignment"
                >
                  <FaTrash size={18} />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Assignments;
