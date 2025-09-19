import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/users.routes";
import subjectRoutes from "./routes/subjects.routes";
import taskRoutes from "./routes/tasks.routes";
import classRoutes from "./routes/classes.routes";
import reminderRoutes from "./routes/reminders.routes";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();

const origins = (process.env.CORS_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: origins.length ? origins : true, credentials: true }));
app.use(express.json());

app.get("/", (_, res) => res.json({ ok: true, service: "EdPlanner API" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/reminders", reminderRoutes);

app.use(errorHandler);

export default app;
