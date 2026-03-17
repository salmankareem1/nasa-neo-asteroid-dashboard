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