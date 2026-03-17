import React from "react";

const AboutSection = () => {
  return (
    <section className="about-section">

      <h2>About This Dashboard</h2>

      <p>
        This dashboard visualizes Near-Earth Object (NEO) data provided by
        NASA's public asteroid tracking systems. It enables users to explore
        asteroids that pass relatively close to Earth by analysing their size,
        velocity, hazard classification, and closest approach distance.
      </p>
      
       <p>
        By default, the dashboard displays asteroid data for the next 24 hours.
        Users can extend the date range to explore data for up to a maximum of
        7 days.
      </p>

      <p>
        Users can search asteroids by name, filter potentially hazardous
        objects, sort by size or speed, and analyse trends using interactive
        charts and statistics.
      </p>

      <p>
        Interested in learning more about asteroids and Near-Earth Objects?
        Watch the short NASA explainer below.
      </p>

      <a
        className="learn-link"
        href="https://www.youtube.com/watch?v=r-OCcFnp2RA"
        target="_blank"
        rel="noopener noreferrer"
      >
        Watch: Understanding Near-Earth Objects
      </a>

      <p className="data-source">
        Data Source: 
        <a
          href="https://api.nasa.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          NASA Open Asteroid API
        </a>
      </p>

    </section>
  );
};

export default AboutSection;