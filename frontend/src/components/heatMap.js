import React from "react";

function getColor(score) {
  if (score >= 1 && score <= 5) return "#38a169";     
  if (score >= 6 && score <= 12) return "#d69e2e";   
  if (score >= 13 && score <= 18) return "#dd6b20";  
  return "#e53e3e";                                  
}

function Heatmap({ risks }) {
  const grid = Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, () => [])
  );

  risks.forEach((risk) => {
    const l = risk.likelihood - 1;
    const i = risk.impact - 1;
    grid[l][i].push(risk);
  });

  return (
    <div className="card">
      <h3>Risk Heatmap</h3>

      {}
      <div style={{ marginBottom: "12px", fontSize: "14px" }}>
        <b>Legend:</b>{" "}
        <span style={{ background: "#38a169", color: "#fff", padding: "4px 8px", borderRadius: "4px" }}>
          Low
        </span>{" "}
        <span style={{ background: "#d69e2e", color: "#fff", padding: "4px 8px", borderRadius: "4px" }}>
          Medium
        </span>{" "}
        <span style={{ background: "#dd6b20", color: "#fff", padding: "4px 8px", borderRadius: "4px" }}>
          High
        </span>{" "}
        <span style={{ background: "#e53e3e", color: "#fff", padding: "4px 8px", borderRadius: "4px" }}>
          Critical
        </span>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center"
        }}
      >
        <thead>
          <tr>
            <th style={{ background: "#edf2f7" }}>
              Likelihood ↓ / Impact →
            </th>
            {[1, 2, 3, 4, 5].map((i) => (
              <th key={i} style={{ background: "#edf2f7" }}>
                {i}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4, 5].map((likelihood, rowIndex) => (
            <tr key={likelihood}>
              <th style={{ background: "#edf2f7" }}>{likelihood}</th>

              {[1, 2, 3, 4, 5].map((impact, colIndex) => {
                const cellRisks = grid[rowIndex][colIndex];
                const score = likelihood * impact;

                return (
                  <td
                    key={impact}
                    title={
                      cellRisks.length
                        ? cellRisks.map((r) => r.asset).join(", ")
                        : "No risks"
                    }
                    style={{
                      backgroundColor: cellRisks.length
                        ? getColor(score)
                        : "#f7fafc",
                      color: cellRisks.length ? "#fff" : "#666",
                      padding: "14px",
                      borderRadius: "4px",
                      border: "1px solid #cbd5e0",
                      fontWeight: "bold"
                    }}
                  >
                    {cellRisks.length}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Heatmap;
