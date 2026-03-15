import express from "express";
import { getNeoData } from "../controllers/neoController.js";

const router = express.Router();

router.get("/", getNeoData);

export default router;