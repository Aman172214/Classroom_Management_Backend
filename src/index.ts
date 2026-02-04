import "dotenv/config";
import express from "express";
import cors from "cors";
import subjectsRouter from "./routes/subjects";

const app = express();
const PORT = 3000;

if (process.env.FRONTEND_URL) {
  throw new Error("FRONTEND URL not found in .env");
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Middleware
app.use(express.json());

app.use("/api/subjects", subjectsRouter);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Classroom Manager API" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
