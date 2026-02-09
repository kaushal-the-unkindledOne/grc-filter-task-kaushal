import React, { useState } from "react";
import { createRisk } from "../services/api";

function RiskForm({ onRiskAdded }) {
  const [asset, setAsset] = useState("");
  const [threat, setThreat] = useState("");
  const [likelihood, setLikelihood] = useState(3);
  const [impact, setImpact] = useState(3);

  const score = likelihood * impact;

  let level = "Low";
  if (score >= 6 && score <= 12) level = "Medium";
  else if (score >= 13 && score <= 18) level = "High";
  else if (score >= 19) level = "Critical";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createRisk({
        asset,
        threat,
        likelihood: Number(likelihood),
        impact: Number(impact),
      });

      alert("Risk added successfully!");
      setAsset("");
      setThreat("");
      if (onRiskAdded) onRiskAdded();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="card">
      <h3>Add Risk</h3>

      <form onSubmit={handleSubmit}>
        {}
        <div style={{ marginBottom: "10px" }}>
          <input
            placeholder="Asset (e.g. Database Server)"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            required
          />
        </div>

        {}
        <div style={{ marginBottom: "10px" }}>
          <input
            placeholder="Threat (e.g. Data Breach)"
            value={threat}
            onChange={(e) => setThreat(e.target.value)}
            required
          />
        </div>

        {}
        <div style={{ marginBottom: "12px" }}>
          <label>
            Likelihood: <b>{likelihood}</b>
          </label>
          <br />
          <input
            type="range"
            min="1"
            max="5"
            value={likelihood}
            onChange={(e) => setLikelihood(e.target.value)}
          />
        </div>

        {}
        <div style={{ marginBottom: "12px" }}>
          <label>
            Impact: <b>{impact}</b>
          </label>
          <br />
          <input
            type="range"
            min="1"
            max="5"
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
          />
        </div>

        {}
        <p style={{ marginBottom: "12px" }}>
          Preview:&nbsp;
          <b>Score = {score}</b> |{" "}
          <b>Level = {level}</b>
        </p>

        <button type="submit">Add Risk</button>
      </form>
    </div>
  );
}

export default RiskForm;
