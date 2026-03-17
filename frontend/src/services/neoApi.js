import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://nasa-neo-asteroid-dashboard.onrender.com";

export const fetchNeoData = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/neo`, {
      params: {
        start_date: startDate || undefined,
        end_date: endDate || undefined
      }
    });

    if (!response.data || !response.data.near_earth_objects) {
      throw new Error("Invalid API response");
    }

    return Object.values(response.data.near_earth_objects).flat();
  } catch (error) {
    const errorMessage = error.response?.data || error.message;
    console.error("Error fetching NEO data:", errorMessage);
    throw error;
  }
};