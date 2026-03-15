import { render, screen } from "@testing-library/react";
import AsteroidCard from "./AsteroidCard";

const asteroid = {
  id: "1",
  name: "Apollo Test",
  is_potentially_hazardous_asteroid: true,
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: 0.12,
      estimated_diameter_max: 0.45,
    },
  },
  close_approach_data: [
    {
      close_approach_date: "2026-03-14",
      relative_velocity: {
        kilometers_per_second: "12.34",
      },
      miss_distance: {
        kilometers: "123456.78",
      },
      orbiting_body: "Earth",
    },
  ],
};

describe("AsteroidCard", () => {
  test("renders asteroid details", () => {
    render(<AsteroidCard asteroid={asteroid} />);

    expect(screen.getByText(/apollo test/i)).toBeInTheDocument();
    expect(screen.getByText(/hazardous/i)).toBeInTheDocument();
    expect(screen.getByText(/2026-03-14/i)).toBeInTheDocument();
    expect(screen.getByText(/12.34 km\/s/i)).toBeInTheDocument();
  });
});