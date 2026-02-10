import "dotenv/config";
import express from "express";
import cors from "cors";
import subjectsRouter from "./routes/subjects";
import securityMiddleware from "./middleware/securityMiddleware";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();
const PORT = 3000;

if (!process.env.FRONTEND_URL) {
  throw new Error("FRONTEND URL not found in .env");
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

// Middleware
app.use(express.json());

app.use(securityMiddleware);

app.use("/api/subjects", subjectsRouter);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Classroom Manager API" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
