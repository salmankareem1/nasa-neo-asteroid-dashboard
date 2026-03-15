import axios from "axios";

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_URL = process.env.NASA_API_URL;

const formatDate = (date) => date.toISOString().split("T")[0];

const isValidDate = (value) => {
  return !Number.isNaN(new Date(value).getTime());
};

export const getNeoData = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const today = new Date();
    const defaultStartDate = new Date();
    defaultStartDate.setDate(today.getDate() - 3);

    const formattedStartDate = start_date
      ? start_date
      : formatDate(defaultStartDate);

    const formattedEndDate = end_date ? end_date : formatDate(today);

    if (!isValidDate(formattedStartDate) || !isValidDate(formattedEndDate)) {
      return res.status(400).json({
        error: "Invalid date format. Use YYYY-MM-DD.",
      });
    }

    if (new Date(formattedStartDate) > new Date(formattedEndDate)) {
      return res.status(400).json({
        error: "start_date cannot be later than end_date.",
      });
    }

    const { data } = await axios.get(NASA_API_URL, {
      params: {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        api_key: NASA_API_KEY,
      },
    });

    if (!data || !data.near_earth_objects) {
      throw new Error("Invalid API response");
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching Near-Earth Objects:", error.message);

    res.status(500).json({
      error: `Failed to fetch data from NASA API: ${error.message}`,
    });
  }
};