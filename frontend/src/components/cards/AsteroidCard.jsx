import React from "react";
import "../../styles/App.css";

const AsteroidCard = ({ asteroid }) => {
  const approach = asteroid.close_approach_data?.[0];

  const approachDate = approach?.close_approach_date || "N/A";

  const velocity = approach
    ? Number(approach.relative_velocity.kilometers_per_second).toFixed(2)
    : "N/A";

  const missDistance = approach
    ? Number(approach.miss_distance.kilometers).toLocaleString()
    : "N/A";

  const diameterMin =
    asteroid.estimated_diameter.kilometers.estimated_diameter_min;

  const diameterMax =
    asteroid.estimated_diameter.kilometers.estimated_diameter_max;

  return (
    <li className="asteroid-card">
      <div className="asteroid-header">
        <h3>{asteroid.name}</h3>

        {asteroid.is_potentially_hazardous_asteroid && (
          <span className="hazard-badge">Hazardous</span>
        )}
      </div>

      <div className="asteroid-details">
        <p>
          <strong>Approach Date:</strong> {approachDate}
        </p>

        <p>
          <strong>Diameter:</strong>{" "}
          {diameterMin.toFixed(2)} – {diameterMax.toFixed(2)} km
        </p>

        <p>
          <strong>Velocity:</strong> {velocity} km/s
        </p>

        <p>
          <strong>Miss Distance:</strong> {missDistance} km
        </p>
      </div>
    </li>
  );
};

export default AsteroidCard;