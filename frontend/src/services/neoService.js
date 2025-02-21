import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://nasa-neo-project-backend.onrender.com";

export const fetchNeoData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/neo`);

        if (!response.data || !response.data.near_earth_objects) {
            throw new Error("Invalid API response");
        }

        return Object.values(response.data.near_earth_objects).flat();
    } catch (error) {
        console.error("Error fetching NEO data:", error.response ? error.response.data : error.message);
        throw error;
    }
};
