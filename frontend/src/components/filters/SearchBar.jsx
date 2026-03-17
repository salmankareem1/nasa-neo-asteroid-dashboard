import React from "react";
import "../../styles/App.css";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  showHazardous,
  setShowHazardous,
  sortBy,
  setSortBy,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleHazardToggle = () => {
    setShowHazardous((prev) => !prev);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search asteroid by name..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
        aria-label="Search asteroids"
      />

      <label className="filter-label">
        <input
          type="checkbox"
          checked={showHazardous}
          onChange={handleHazardToggle}
        />
        <span>Hazardous only</span>
      </label>

      <select
        className="sort-select"
        value={sortBy}
        onChange={handleSortChange}
        aria-label="Sort asteroids"
      >
        <option value="default">Sort: Default</option>
        <option value="largest">Largest Diameter</option>
        <option value="closest">Closest Approach</option>
        <option value="fastest">Fastest Velocity</option>
      </select>
      <div className="date-filter">
  <div className="date-group">
    <label htmlFor="start-date">Start</label>
    <input
      id="start-date"
      type="date"
      value={startDate}
      max={endDate || undefined}
      onChange={(e) => setStartDate(e.target.value)}
      className="date-input"
      aria-label="Start date"
    />
  </div>

  <div className="date-group">
    <label htmlFor="end-date">End</label>
    <input
      id="end-date"
      type="date"
      value={endDate}
      min={endDate || undefined}
      max={
    startDate
      ? new Date(new Date(startDate).getTime() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
      : undefined
  }
      onChange={(e) => setEndDate(e.target.value)}
      className="date-input"
      aria-label="End date"
    />
  </div>
</div>   
    </div>
  );
};

export default SearchBar;