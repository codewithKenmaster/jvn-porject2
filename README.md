# Open Source Health Dashboard

A web application that analyzes a public GitHub repository and provides a "health report" based on open-source best practices.  
The app checks for common repository elements such as LICENSE, README.md, .gitignore, recent commits, and GitHub Actions workflows.

---

## Table of Contents

- [Purpose](#purpose)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Frontend Usage](#frontend-usage)
- [API Routes](#api-routes)
- [Docker Setup](#docker-setup)
- [CI/CD](#cicd)
- [Contributing](#contributing)

---

## Purpose

The main goal of this project is to provide developers and maintainers with a **quick health check** for any public GitHub repository. The dashboard identifies whether the repository:

- Has a LICENSE file
- Contains a README.md
- Contains a .gitignore
- Has had commits in the last 6 months
- Uses GitHub Actions for CI/CD workflows

---

## Tech Stack

- **Frontend:** React (Create React App)
- **Backend:** Node.js, Express.js
- **HTTP Client:** Axios
- **DevOps & Containerization:** Docker, Docker Compose
- **Linting & Code Quality:** ESLint
- **CI/CD:** GitHub Actions

---

## Project Structure

## open-source-health-dashboard

│
├── client/ # Frontend (React SPA)
│ ├── src/
│ │ ├── components/
│ │ │ └── HealthChecklist.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
│
├── server/ # Backend (Node.js + Express)
│ ├── routes/
│ │ └── repo.js
│ ├── services/
│ │ └── githubService.js
│ ├── server.js
│ └── package.json
│
├── .github/workflows/
│ └── ci.yml
│
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── README.md
└── .husky/

---

---

## Installation

1. Clone the repository:

```bash
git clone <YOUR_REPO_URL>
cd open-source-health-dashboard
```

2. Install dependencies for both frontend and backend:

# Backend

```bash
cd server
npm install
```

# Frontend

```bash
cd ../client
npm install
```

# Running the App

1.  Development

Run the backend:

```bash
cd server
npm start

Run the frontend:

cd client
npm start

Open your browser at http://localhost:3000 (React dev server). API requests go to http://localhost:4008/analyze.
```

2. Production (Docker)

Build and run with Docker:

```bash

docker compose up --build

The app will be available at http://localhost:4008

The backend serves the frontend static build.

API Routes
POST /analyze

Analyze a public GitHub repository.
```

## Body parameters:

```bash
{
  "repoUrl": "https://github.com/facebook/react"
}

Response:

{
  "hasLicense": true,
  "hasReadme": true,
  "hasGitignore": true,
  "recentCommit": true,
  "hasGitHubActions": true
}
```

# Frontend Usage

Input a public GitHub repository URL into the field.

Click Analyze.

Results show a Health Checklist with Yes/No for each best practice.

# Docker Setup

Dockerfile builds React frontend first, then sets up Node/Express backend.

docker-compose.yml defines the service and exposes port 4008.

Commands:

# Build containers

docker compose build

# Start app

docker compose up

# Stop app

docker compose down
CI/CD

GitHub Actions workflow performs:

Linting – runs ESLint on the backend and frontend.

Tests – placeholder tests can be executed.

Linting

To check code style locally:

# Backend

```bash
cd server
npm run lint
```

ESLint enforces import syntax and detects unused variables.

-- Contributing

-- Fork the repo

-- Create a feature branch

-- Add features or fix bugs

-- Ensure ESLint passes

-- Submit a pull request

## Happy Coding :)

-- codeWithKenmaster
