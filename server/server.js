import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./configs/db.js";

import authRoutes from "./routes/authRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/assignments", assignmentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    connectDb();
    console.log(`Server started at ${PORT}`)
})
