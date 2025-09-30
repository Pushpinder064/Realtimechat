import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth";
import messageRoutes from "./routes/messages";
import cloudRoutes from "./routes/cloud";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/cloud", cloudRoutes);

app.get("/", (_req, res) => res.send("API running"));

export default app;
