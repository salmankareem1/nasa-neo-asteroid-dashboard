import React from "react";
import "../../styles/App.css";

const StatsGrid = ({ neoData }) => {
  const totalAsteroids = neoData.length;

  const hazardousAsteroids = neoData.filter(
    (asteroid) => asteroid.is_potentially_hazardous_asteroid
  ).length;

  const largestAsteroid =
    neoData.length > 0
      ? neoData.reduce((largest, current) =>
          current.estimated_diameter.kilometers.estimated_diameter_max >
          largest.estimated_diameter.kilometers.estimated_diameter_max
            ? current
            : largest
        )
      : null;

  const closestAsteroid =
    neoData.length > 0
      ? neoData.reduce((closest, current) => {
          const currentDistance = Number(
            current.close_approach_data?.[0]?.miss_distance?.kilometers || Infinity
          );

          const closestDistance = Number(
            closest.close_approach_data?.[0]?.miss_distance?.kilometers || Infinity
          );

          return currentDistance < closestDistance ? current : closest;
        })
      : null;

  return (
    <section className="stats-grid">
      <div className="stat-card">
        <h3>Total Asteroids</h3>
        <p>{totalAsteroids}</p>
      </div>

      <div className="stat-card">
        <h3>Hazardous Asteroids</h3>
        <p>{hazardousAsteroids}</p>
      </div>

      <div className="stat-card">
        <h3>Largest Asteroid</h3>
        <p>
          {largestAsteroid ? (
            <>
              <span className="stat-highlight">{largestAsteroid.name}</span>
              <br />
              {largestAsteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
            </>
          ) : (
            "N/A"
          )}
        </p>
      </div>

      <div className="stat-card">
        <h3>Closest Approach</h3>
        <p>
          {closestAsteroid ? (
            <>
              <span className="stat-highlight">{closestAsteroid.name}</span>
              <br />
              {Number(
                closestAsteroid.close_approach_data?.[0]?.miss_distance?.kilometers || 0
              ).toLocaleString()}{" "}
              km
            </>
          ) : (
            "N/A"
          )}
        </p>
      </div>
    </section>
  );
};

export default StatsGrid;