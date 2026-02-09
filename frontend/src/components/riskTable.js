import React, { useEffect, useState } from "react";
import { fetchRisks } from "../services/api";
import Heatmap from "./heatMap"; 

function RiskTable() {
  const [risks, setRisks] = useState([]);
  const [levelFilter, setLevelFilter] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);

  const loadRisks = async () => {
    const data =
      levelFilter === "All"
        ? await fetchRisks()
        : await fetchRisks(levelFilter);

    setRisks(data);
  };

  useEffect(() => {
    loadRisks();
  }, [levelFilter]);

  const sortByScore = () => {
    const sorted = [...risks].sort((a, b) =>
      sortAsc ? a.score - b.score : b.score - a.score
    );
    setRisks(sorted);
    setSortAsc(!sortAsc);
  };

  const totalRisks = risks.length;
  const highCriticalCount = risks.filter(
    (r) => r.level === "High" || r.level === "Critical"
  ).length;

  const avgScore =
    risks.length > 0
      ? (
          risks.reduce((sum, r) => sum + r.score, 0) / risks.length
        ).toFixed(1)
      : 0;

  if (risks.length === 0) {
    return <p>No risks assessed yet.</p>;
  }

  return (
    <div className="card">
      <h3>Risk Overview</h3>

      {}
      <div className="stats">
        <div className="stat-card">
          <h4>Total Risks</h4>
          <p>{totalRisks}</p>
        </div>

        <div className="stat-card">
          <h4>High / Critical</h4>
          <p>{highCriticalCount}</p>
        </div>

        <div className="stat-card">
          <h4>Average Score</h4>
          <p>{avgScore}</p>
        </div>
      </div>

      {}
      <div className="filter">
        <label>
          Filter by Level:&nbsp;
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </label>
      </div>

      <br />

      {}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Asset</th>
            <th>Threat</th>
            <th>Likelihood</th>
            <th>Impact</th>
            <th onClick={sortByScore} style={{ cursor: "pointer" }}>
              Score {sortAsc ? "↑" : "↓"}
            </th>
            <th>Level</th>
          </tr>
        </thead>

        <tbody>
          {risks.map((risk) => (
            <tr key={risk.id}>
              <td>{risk.id}</td>
              <td>{risk.asset}</td>
              <td>{risk.threat}</td>
              <td>{risk.likelihood}</td>
              <td>{risk.impact}</td>
              <td>{risk.score}</td>
              <td>
                <span className={`badge ${risk.level.toLowerCase()}`}>
                  {risk.level}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      {}
      <Heatmap risks={risks} />
    </div>
  );
}

export default RiskTable;
