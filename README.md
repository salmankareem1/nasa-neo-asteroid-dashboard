# NASA NEO Asteroid Intelligence Dashboard

A full-stack data visualization dashboard for exploring **Near-Earth Object (NEO) asteroid data** using NASA's public NEO API.

This application provides an interactive interface to analyze asteroid characteristics, hazard classifications, and close-approach statistics through real-time data visualizations.

---

## Live Demo

https://nasa-neo-asteroid-dashboard-1.onrender.com/

# Project Overview

The **NASA NEO Asteroid Intelligence Dashboard** is designed to help users explore asteroid data retrieved from NASA's Near Earth Object API.

The system follows a **client-server architecture**:

- A **React frontend** provides interactive charts and filtering tools
- A **Node.js / Express backend** acts as a secure proxy layer to the NASA API
- The backend processes requests and ensures stable API communication

This architecture improves reliability, enables testability, and separates data processing from presentation logic.

# How to Use

- View asteroid data for the next 24 hours by default
- Extend the date range up to 7 days
- Search asteroids by name
- Filter potentially hazardous objects
- Sort by size or velocity
- Explore charts for trends and statistics

---

# System Architecture

```
User
  │
  ▼
Frontend (React)
  │
  ▼
Backend API (Node.js / Express)
  │
  ▼
NASA Near Earth Object API
```

### Responsibilities

**Frontend**

- Data visualization
- User interaction and filtering
- Dashboard rendering
- Client-side state management

**Backend**

- NASA API integration
- Request validation
- Error handling
- Data formatting

---

# Key Features

- Interactive asteroid data dashboard
- Real-time data from NASA's NEO API
- Visual analytics using charts
- Hazard classification filtering
- Date range asteroid search
- Sorting and filtering capabilities

---

# Data Visualizations

The dashboard presents asteroid insights through multiple chart types:

| Visualization | Description                                   |
| ------------- | --------------------------------------------- |
| Bar Chart     | Displays the largest detected asteroids       |
| Line Chart    | Shows asteroid approach trends over time      |
| Pie Chart     | Compares hazardous vs non-hazardous asteroids |

---

# Dashboard Metrics

The system calculates and displays key asteroid statistics:

- Total asteroids detected
- Number of potentially hazardous asteroids
- Largest asteroid diameter
- Closest recorded Earth approach

---

# User Experience

The dashboard includes several UI enhancements to improve usability:

- Dark / light theme support
- Responsive layout
- Loading indicators for API calls
- Error handling with retry functionality

---

# Technology Stack

## Frontend

- React
- Chart.js
- Axios
- CSS Grid
- Flexbox
- Jest
- React Testing Library

## Backend

- Node.js
- Express.js
- Axios
- CORS
- Dotenv
- Jest
- Supertest

---

# Project Structure

```
nasa-neo-asteroid-dashboard
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── tests
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   ├── styles
│   │   └── tests
│   └── package.json
│
└── README.md
```

---

# Installation

## Clone the Repository

```
git clone https://github.com/salmankareem1/nasa-neo-asteroid-dashboard.git
cd nasa-neo-asteroid-dashboard
```

---

# Backend Setup

Navigate to the backend directory:

```
cd backend
npm install
```

Create a `.env` file:

```
NASA_API_KEY=your_api_key
NASA_API_URL=https://api.nasa.gov/neo/rest/v1/feed
PORT=5000
```

Start the backend server:

```
npm start
```

The backend API will run on:

```
http://localhost:5000
```

---

# Frontend Setup

Navigate to the frontend directory:

```
cd frontend
npm install
npm start
```

The frontend application will run on:

```
http://localhost:3000
```

---

# Running Tests

## Frontend Tests

```
cd frontend
npm test
```

Tools used:

- Jest
- React Testing Library

## Backend Tests

```
cd backend
npm test
```

Tools used:

- Jest
- Supertest

---

# Performance Considerations

Several optimizations were implemented to improve responsiveness:

- Debounced search inputs
- Optimized React state updates
- Controlled chart rendering
- Backend API proxy to reduce API instability

---

# Author

Salman Abdul Kareem
