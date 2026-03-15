import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://nasa-neo-project-backend.onrender.com";

export const fetchNeoData = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/neo`, {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });

    if (!response.data || !response.data.near_earth_objects) {
      throw new Error("Invalid API response");
    }

    const flattenedAsteroids = Object.values(
      response.data.near_earth_objects
    ).flat();

    return flattenedAsteroids;
  } catch (error) {
    const errorMessage = error.response?.data || error.message;
    console.error("Error fetching NEO data:", errorMessage);
    throw error;
  }
};