import express from "express";
import jwt from "jsonwebtoken";
import Assignment from "../models/Assignment.js";

const router = express.Router();

// Middleware for authentication
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
}

// Teacher: Create assignment
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "Teacher") return res.status(403).json({ error: "Only teachers can post" });

  const { title, description, deadline, subject } = req.body;
  const assignment = new Assignment({ title, description, deadline, subject, createdBy: req.user.id });
  await assignment.save();
  res.json(assignment);
});

// Student/Teacher: Get all assignments
router.get("/", authMiddleware, async (req, res) => {
  const assignments = await Assignment.find().populate("createdBy", "name role");
  res.json(assignments);
});


// Teacher: Delete assignment
router.delete("/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "Teacher") return res.status(403).json({ error: "Only teachers can delete assignments" });

  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({ message: "Assignment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting assignment" });
  }
});

export default router;
