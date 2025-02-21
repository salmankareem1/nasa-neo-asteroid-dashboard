import express from "express";
import axios from "axios";
import cors from "cors";
import "dotenv/config";



const app = express();
const PORT = process.env.PORT || 5000;
const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_URL = process.env.NASA_API_URL;


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send({ message: "API is running successfully " });
});


app.get("/neo", async (req, res) => {
    try {
        const today = new Date();
        const startDate = new Date();
        startDate.setDate(today.getDate() - 3);
        const formattedStartDate = startDate.toISOString().split("T")[0];
        const formattedEndDate = today.toISOString().split("T")[0];

        const { data } = await axios.get(
            `${NASA_API_URL}?start_date=${formattedStartDate}&end_date=${formattedEndDate}&api_key=${NASA_API_KEY}`
        );

        if (!data || !data.near_earth_objects) {
            throw new Error("Invalid API response");
        }

        res.json(data);
    } catch (error) {
        console.error("Error fetching Near-Earth Objects:", error.message);
        res.status(500).json({ error: `Failed to fetch data from NASA API: ${error.message}` });
    }
});


app.listen(PORT,'0.0.0.0', () => console.log(`Server running at http://localhost:${PORT}`));
