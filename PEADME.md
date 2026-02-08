# 📊 GRC Risk Assessment & Heatmap Dashboard

## 🔍 Overview

This project is a **small full-stack web application** that demonstrates a core  
**Governance, Risk, and Compliance (GRC)** workflow:

> **Risk assessment using a Likelihood × Impact matrix**

Organizations use this model to prioritize risks based on how likely an event is
to occur and how severe its impact would be.

### What this application does
- Allows users to assess organizational risks
- Automatically computes **risk scores** and **severity levels**
- Stores risk data persistently
- Visualizes overall risk posture using an interactive dashboard

The dashboard consists of:
- Summary metrics
- A risk register table
- A **5×5 risk heatmap**

The application emphasizes **correctness, clarity, and usability**, while
intentionally avoiding unnecessary over-engineering.

---

## ✨ Key Features

### 📝 Risk Assessment
- Add risks using:
  - **Likelihood (1–5)**
  - **Impact (1–5)**
- Real-time preview of calculated score and level

---

### 🧮 Automatic Risk Calculation
- **Risk Score** = Likelihood × Impact
- **Risk Levels**:
  - Low
  - Medium
  - High
  - Critical

---

### 💾 Data Persistence
- Risk data stored using **SQLite**
- File-based database (no external setup required)

---

### 📋 Risk Register
- Sortable risk table (by score)
- Filter risks by severity level
- Clear and readable presentation of risk details

---

### 📊 Dashboard Insights
- Summary metrics:
  - **Total risks**
  - **High / Critical risks**
  - **Average risk score**
- **5×5 Risk Heatmap** showing risk concentration by likelihood and impact

---

### 🎨 User Interface
- Clean, enterprise-style layout
- Minimal styling for clarity and readability
- Focus on usability rather than visual excess

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- SQLite (file-based database)

### Frontend
- React.js
- Fetch API
- Plain CSS (no UI frameworks)

---

## 📁 Project Structure

grc-filter-task-kaushal/
│
├── backend/
│ ├── server.js
│ ├── db.js
│ ├── initDb.js
│ ├── routes/
│ │ └── risks.js
│ ├── utils/
│ │ └── riskLogic.js
│ └── risks.db
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── RiskForm.js
│ │ │ ├── RiskTable.js
│ │ │ └── Heatmap.js
│ │ ├── services/
│ │ │ └── api.js
│ │ ├── App.js
│ │ └── styles.css
│ └── package.json
│
└── README.md

## ▶️ Setup & Run Instructions

### Backend

cd backend
npm install
npm start
Backend URL:
http://localhost:8000

### Frontend

cd frontend
npm install
npm start
Frontend URL:
http://localhost:3000

### API Endpoints 🔌
### POST /assess-risk

Creates a new risk after validation and risk calculation.

Request Body

{
  "asset": "Customer Database",
  "threat": "Unauthorized Access",
  "likelihood": 3,
  "impact": 4
}


Response

{
  "id": 1,
  "asset": "Customer Database",
  "threat": "Unauthorized Access",
  "likelihood": 3,
  "impact": 4,
  "score": 12,
  "level": "Medium"
}

### GET /risks

Returns all stored risks.

### GET /risks?level=High

Returns risks filtered by severity level.

### GRC Context 🧠

This application mirrors how real-world GRC tools assess and prioritize risks.

Risk evaluation follows the Likelihood × Impact model

This approach aligns with standards such as NIST SP 800-30 and ISO 27001

The heatmap helps decision-makers quickly identify high-severity risk areas

Summary metrics provide a high-level overview of organizational risk posture

### Assumptions & Notes 📝

No authentication is implemented (single-user demo)

SQLite was chosen for simplicity and fast local setup

Frontend styling is intentionally minimal

Focus is on core logic, data flow, and usability

### Backend Technology Choice

The assignment mentioned FastAPI / Flask as preferred backend frameworks.
However, the backend was implemented using Node.js (Express) to ensure full
ownership, clarity, and correctness of the solution.

Primary backend experience for this project is JavaScript-based (Node.js / MERN),
allowing stronger focus on:

API design

Input validation and business logic

Correct database modeling and querying

All API contracts, validation rules, database schema, and risk-scoring logic
strictly follow the assignment requirements.

