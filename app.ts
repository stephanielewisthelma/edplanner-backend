import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes";
import userRoutes from "./src/routes/userRoute.routes";
import subjectRoutes from "./src/routes/subjects.routes";
import taskRoutes from "./src/routes/task.routes";
import classRoutes from "./src/routes/classes.routes";
import reminderRoutes from "./src/routes/reminders.routes";
import { errorHandler } from "./src/middlewares/error.middleware";

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
