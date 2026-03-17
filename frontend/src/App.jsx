import React, { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import { fetchNeoData } from "./services/neoApi";
import AsteroidCard from "./components/cards/AsteroidCard";
import SearchBar from "./components/filters/SearchBar";
import AsteroidCharts from "./components/charts/AsteroidCharts";
import StatsGrid from "./components/layout/StatsGrid";
import AboutSection from "./components/layout/AboutSection";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import "./styles/App.css";

const App = () => {
  const [neoData, setNeoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showHazardous, setShowHazardous] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

const getData = useCallback(async () => {
  if ((startDate && !endDate) || (!startDate && endDate)) {
    return;
  }

  if (startDate && endDate && startDate > endDate) {
    return;
  }

  try {
    setLoading(true);
    setError(null);

    const data = await fetchNeoData(startDate, endDate);
    setNeoData(data);
    setFilteredData(data);
  } catch (err) {
    setError("Failed to fetch asteroid data. Please try again.");
  } finally {
    setLoading(false);
  }
}, [startDate, endDate]);

useEffect(() => {
  if ((startDate && !endDate) || (!startDate && endDate)) {
    return;
  }

  if (startDate && endDate && startDate > endDate) {
    toast.error("Start date cannot be after end date");
    return;
  }

  getData();
}, [getData, startDate, endDate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    let filtered = [...neoData];

    if (debouncedSearchTerm) {
      filtered = filtered.filter((asteroid) =>
        asteroid.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (showHazardous) {
      filtered = filtered.filter(
        (asteroid) => asteroid.is_potentially_hazardous_asteroid
      );
    }

    if (sortBy === "largest") {
      filtered.sort(
        (a, b) =>
          b.estimated_diameter.kilometers.estimated_diameter_max -
          a.estimated_diameter.kilometers.estimated_diameter_max
      );
    }

    if (sortBy === "closest") {
      filtered.sort((a, b) => {
        const distanceA = Number(
          a.close_approach_data?.[0]?.miss_distance?.kilometers || Infinity
        );
        const distanceB = Number(
          b.close_approach_data?.[0]?.miss_distance?.kilometers || Infinity
        );

        return distanceA - distanceB;
      });
    }

    if (sortBy === "fastest") {
      filtered.sort((a, b) => {
        const speedA = Number(
          a.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second ||
            0
        );
        const speedB = Number(
          b.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second ||
            0
        );

        return speedB - speedA;
      });
    }

    setFilteredData(filtered);
  }, [neoData, debouncedSearchTerm, showHazardous, sortBy]);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);

    toast.success(`Switched to ${nextMode ? "Dark" : "Light"} Mode! 🌗`, {
      position: "bottom-right",
      autoClose: 2000,
      theme: nextMode ? "dark" : "light",
    });
  };

  const scrollToAsteroids = () => {
    const asteroidSection = document.querySelector(".neo-list");
    if (asteroidSection) {
      asteroidSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isSearching = searchTerm.length > 0;

  if (loading) {
    return (
      <div className="container">
        <div className="stats-grid">
          {[1, 2, 3, 4].map((i) => (
            <div className="stat-card" key={i}>
              <Skeleton height={20} width={120} />
              <Skeleton height={30} />
            </div>
          ))}
        </div>

        <div className="charts-container">
          {[1, 2, 3].map((i) => (
            <div className="chart-wrapper" key={i}>
              <Skeleton height={220} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Failed to load asteroid data</h2>
        <p>{error}</p>
        <button className="retry-btn" onClick={getData}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="toggle-btn" onClick={toggleDarkMode}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="top-section" onClick={scrollToAsteroids}>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/background.jpg"
          className="background-video"
        >
          <source src="/video/earth.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        <div className="overlay">🌍 Near-Earth Objects (NEOs)</div>
      </div>

      <AboutSection />
      <StatsGrid neoData={neoData} />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showHazardous={showHazardous}
        setShowHazardous={setShowHazardous}
        sortBy={sortBy}
        setSortBy={setSortBy}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <AsteroidCharts
        neoData={filteredData}
        isDarkMode={darkMode}
        isSearching={isSearching}
      />

      <ul className="neo-list">
        {filteredData.length > 0 ? (
          filteredData.map((asteroid) => (
            <AsteroidCard key={asteroid.id} asteroid={asteroid} />
          ))
        ) : (
          <li className="no-results">No results found.</li>
        )}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default App;