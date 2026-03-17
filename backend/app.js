import express from "express";
import cors from "cors";
import "dotenv/config";
import neoRoutes from "./routes/neoRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://nasa-neo-asteroid-dashboard-1.onrender.com"
    ],
    methods: ["GET", "OPTIONS"]
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "API is running successfully" });
});

app.use("/neo", neoRoutes);

export default app;