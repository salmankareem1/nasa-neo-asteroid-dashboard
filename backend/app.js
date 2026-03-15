import express from "express";
import cors from "cors";
import "dotenv/config";
import neoRoutes from "./routes/neoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "API is running successfully" });
});

app.use("/neo", neoRoutes);

export default app;